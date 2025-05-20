import { AppDataSource } from "../../../database/configuration/data-source";

export const findAccountByUser = async (account: string) => {
  try {
    const accountRepository = AppDataSource.getRepository("Account");
    const accountData = await accountRepository.findOne({
      where: { account_id: account },
      relations: ["user"],
    });
    if (!accountData) throw new Error("Account not found");
    return accountData;
  } catch {
    throw new Error("Account not found");
  }
};
