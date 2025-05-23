import { AppDataSource } from "../../../database/configuration/data-source";
import { Transaction } from "../../../database/entities/Transaction-entity";
import { updateAccount } from "../account/update-account-service";
import { Account } from "../../types/account-type";
import { createNotification } from "../notification/create-notification-service";
import { findAccountByUser } from "../account/find-account-owned-by-user-service";
import { User } from "../../types/user-type";
import { ApiError } from "../../class/errors-class";
export const createTransaction = async (source: {
  id: string;
  amount: number;
  description: string;
  destination: string;
}) => {
  const transactionRepository = AppDataSource.getRepository("Transaction");
  const sourceAccount: Account = (await findAccountByUser(
    source.id,
  )) as Account;
  const destinationAccount: Account = (await findAccountByUser(
    source.destination,
  )) as Account;
  if (sourceAccount.balance - source.amount < 0)
    throw new ApiError(400, "Insufficient funds !");
  if (source.amount <= 0) throw new ApiError(400, "Invalid amount !");

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
  await createNotification(
    (destinationAccount.user! as User).user_id,
    `Você recebeu R$ ${source.amount} de ${(sourceAccount.user! as User).name}`,
    `Transação recebida de  ${(sourceAccount.user! as User).name}`,
  );
  return transaction;
};
