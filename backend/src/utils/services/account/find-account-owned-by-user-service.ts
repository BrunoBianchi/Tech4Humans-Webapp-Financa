import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";

export const findAccountByUser = async (account: string) => {
  const accountRepository = AppDataSource.getRepository("Account");
  const accountData = await accountRepository.findOne({
    where: { account_id: account },
    relations: ["user"],
  });
  if (!accountData) throw new ApiError(404, "Couldn't find this Account !");
  return accountData;
};
