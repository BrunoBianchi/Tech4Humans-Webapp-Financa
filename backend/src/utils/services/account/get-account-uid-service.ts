import { AppDataSource } from "../../../database/configuration/data-source";

export const getAccountById = async (account: string) => {
  try {
    const accountRepository = AppDataSource.getRepository("Account");
    const accountData = await accountRepository.findOneBy({
      account_id: account,
    });
    if (!accountData) throw new Error("Account not found");
    return accountData;
  } catch {
    throw new Error("Account not found");
  }
};
