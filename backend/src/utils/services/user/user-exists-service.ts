import { User } from "../../types/user-type";
import { AppDataSource } from "../../../database/configuration/data-source";
export const userExists = async (user: User) => {
  const userRepository = AppDataSource.getRepository("User");
  const userData = await userRepository.findOneBy({ email: user.email });
  return userData ? true : false;
};
