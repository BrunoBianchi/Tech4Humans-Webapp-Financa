import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";
export const getUser = async (email: string) => {
  const userRepository = AppDataSource.getRepository("User");
  const userData = await userRepository.findOneBy({ email: email });
  if (!userData) throw new ApiError(404, "User not found !");

  return userData;
};
