import { AppDataSource } from "../../../database/configuration/data-source";
export const getUser = async (email: string) => {
  try {
    const userRepository = AppDataSource.getRepository("User");
    const userData = await userRepository.findOneBy({ email: email });
    if (!userData) throw new Error("User not found");
    return userData;
  } catch {
    return new Error("User not found");
  }
};
