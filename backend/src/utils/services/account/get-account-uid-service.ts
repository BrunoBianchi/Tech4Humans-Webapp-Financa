import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";

export const getAccountById = async (account: string) => {
    const accountRepository = AppDataSource.getRepository("Account");
    const accountData = await accountRepository.findOneBy({
      account_id: account,
    });
    if (!accountData) throw new ApiError(404, "Couldn't find this Account !");
    return accountData;

};
