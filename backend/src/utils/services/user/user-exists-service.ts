import { User } from "../../types/user-type";
import { AppDataSource } from "../../../database/configuration/data-source";
export const userExists = async (user: User) => {
  try {
    const userRepository = AppDataSource.getRepository("User");
    const userData = await userRepository.findOneBy({ email: user.email });
    return userData ? true : false;
  } catch {
    throw new Error("User not found !");
  }
};
