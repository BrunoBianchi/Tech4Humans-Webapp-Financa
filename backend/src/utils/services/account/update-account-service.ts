import { Account } from "../../types/account-type";
import { getAccountById } from "./get-account-uid-service";
import { AppDataSource } from "../../../database/configuration/data-source";
export const updateAccount = async (accountId: string, newAccount: Account) => {
  try {
    let account = await getAccountById(accountId);
    account = newAccount;
    const accountRepository = AppDataSource.getRepository("Account");
    return await accountRepository.save(account);
  } catch {
    throw new Error("Account not found");
  }
};
