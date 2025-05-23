import { Account } from "../../types/account-type";
import { getAccountById } from "./get-account-uid-service";
import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";
export const updateAccount = async (accountId: string, newAccount: Account) => {
  let account = await getAccountById(accountId);
  if (!account) throw new ApiError(404, "Couldn't find this Account !");
  account = newAccount;
  const accountRepository = AppDataSource.getRepository("Account");
  return await accountRepository.save(account);
};
