import { AppDataSource } from "../../../database/configuration/data-source";
import { getAccountById } from "../account/get-account-uid-service";
import { Transaction } from "../../../database/entities/Transaction-entity";
import { updateAccount } from "../account/update-account-service";
import { Account } from "../../types/account-type";
export const createTransaction = async (source: {
  id: string;
  amount: number;
  description: string;
  destination: string;
}) => {
  try {
    const transactionRepository = AppDataSource.getRepository("Transaction");
    const sourceAccount: Account = (await getAccountById(source.id)) as Account;
    const destinationAccount: Account = (await getAccountById(
      source.destination
    )) as Account;
    if (sourceAccount.balance - source.amount < 0)
      throw new Error("Insufficient funds");
    if (source.amount <= 0) throw new Error("Invalid amount");
    const transaction: Transaction = (await transactionRepository.create({
      sourceAccount: sourceAccount.account_id,
      destinationAccount: destinationAccount.account_id,
      amount: source.amount,
      description: source.description,
    })) as Transaction;
    await transactionRepository.save(transaction);
    sourceAccount.balance -= source.amount;
    destinationAccount.balance += source.amount;
    await updateAccount(sourceAccount.account_id, sourceAccount);
    await updateAccount(destinationAccount.account_id, destinationAccount);
    return transaction;
  } catch (err: any) {
    throw new Error(err.toString());
  }
};
