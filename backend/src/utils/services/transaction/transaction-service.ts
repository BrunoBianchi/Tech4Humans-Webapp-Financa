import { BaseService } from "../../class/base-service-class";
import { ApiError } from "../../class/errors-class";
import { Account } from "../../types/account-type";
import { transaction } from "../../types/transaction-type";
import { accountService } from "../account/account-service";
import { notificationService } from "../notification/notification-service";
class TransactionService extends BaseService<transaction> {
  public async create(
    object: transaction,
    relations?: Array<{ name: string; id: string }>,
  ): Promise<transaction> {
    const sourceAccount_id = relations?.find(
      (relation) => relation.name === "sourceAccount",
    );
    const destinationAccount_id = relations?.find(
      (relation) => relation.name === "destinationAccount",
    );
    let source = (await accountService.getById(sourceAccount_id?.id as string, [
      "user",
    ])) as Account;
    let destination = (await accountService.getById(
      destinationAccount_id?.id as string,
      ["user"],
    )) as Account;
    if (source.balance - object.amount < 0)
      throw new ApiError(400, "Insufficient funds !");
    if (object.amount <= 0) throw new ApiError(400, "Invalid amount !");
    const transaction = this.repository.create({
      ...object,
      sourceAccount: { ...source },
      destinationAccount: { ...destination },
    });
    const savedTransaction = await this.repository.save(transaction);
    source.balance -= object.amount;
    destination.balance += object.amount;
    await accountService.update(source.id, source);
    await accountService.update(destination.id, destination);
    await notificationService.create(
      {
        date: new Date(),
        description: `Você recebeu R$ ${object.amount} de ${source.user!.name}`,
        title: `Transação recebida de  ${source.user!.name}`,
      },
      [
        {
          name: "user",
          id: destination.user!.id,
        },
      ],
    );
    return savedTransaction;
  }
}

export const transactionService = new TransactionService();
