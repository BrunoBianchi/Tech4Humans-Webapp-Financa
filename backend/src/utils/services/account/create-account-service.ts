import { Account } from "../../types/account-type";
import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";
export const createAccount = async (account: Account, user: string) => {
  try {
    const accountRepository = AppDataSource.getRepository("Account");
    account.user = user;
    const newAccount = accountRepository.create(account);
    await accountRepository.save(newAccount);
    return newAccount;
  } catch {
    throw new ApiError(400, "Account already exists!");
  }
};
