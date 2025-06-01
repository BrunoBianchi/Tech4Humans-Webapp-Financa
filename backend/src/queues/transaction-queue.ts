import Bull from "bull";
import { EventEmitter } from "stream";
import { transaction } from "../utils/types/transaction-type";
import { accountService } from "../utils/services/account/account-service";
import { transactionService } from "../utils/services/transaction/transaction-service";
import { Account } from "../utils/types/account-type";
import { ApiError } from "../utils/class/errors-class";

class TransactionQueue extends EventEmitter {
  private queue: Bull.Queue<{ transactionId: string }>;
  private eventEmitter: EventEmitter;

  constructor() {
    super();
    this.queue = new Bull("transaction-queue", {
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      },
    });
    this.eventEmitter = new EventEmitter();
    this.instantiateWorkers();

    this.queue.on("ready", () => {
      console.log("Bull está conectado ao Redis!");
    });

    this.queue.on("error", (err) => {
      console.error("Erro na fila Bull:", err);
    });
  }

  async addTransaction(transactionId: string) {
    await this.queue.add({ transactionId });
  }

  private instantiateWorkers() {
    this.queue.process(async (job) => {
      try {
        const { transactionId } = job.data;
        let transaction: transaction = (await transactionService.getById(
          transactionId,
          ["sourceAccount", "destinationAccount", "category"],
        )) as unknown as transaction;
        let sourceAccount: Account = (await accountService.getById(
          transaction.sourceAccount.id,
        )) as unknown as Account;
        let destinationAccount: Account = (await accountService.getById(
          transaction.destinationAccount.id,
        )) as unknown as Account;
        if (!sourceAccount || !destinationAccount) {
          throw new ApiError(404, "Conta de origem ou destino não encontrada.");
        }

        // Delay artificial de 10 segundos
        await new Promise(resolve => setTimeout(resolve, 10000));

        sourceAccount.balance -= transaction.amount;
        destinationAccount.balance += transaction.amount;
        if (sourceAccount.balance < 0) {
          throw new ApiError(400, "Saldo insuficiente na conta de origem.");
        }
        await accountService.update(sourceAccount.id, sourceAccount);
        await accountService.update(destinationAccount.id, destinationAccount);
        transaction.status = "completed";

        (await transactionService.update(
          transaction.id,
          transaction,
        )) as transaction;
        this.eventEmitter.emit("processed", transactionId);
        return true;
      } catch (error) {
        this.emit("failed", job.data, error);
        throw error;
      }
    });
  }
}

export const transactionQueue = new TransactionQueue();