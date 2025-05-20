import { AppDataSource } from "../../../database/configuration/data-source";

export const deleteAccount = async (account: string) => {
  try {
    const accountRepository = AppDataSource.getRepository("Account");
    const accountData = await accountRepository.delete({
      account_id: account,
    });
    if (!accountData) throw new Error("Account not found");
    return "Account deleted successfully !";
  } catch {
    throw new Error("Account not found");
  }
};
