import { User } from "../../types/user-type";
import { AppDataSource } from "../../../database/configuration/data-source";
import { userExists } from "./user-exists-service";
import { jwt_sign } from "../jwt/jwt-signin-service";
export const createUser = async (user: User) => {
  try {
    if (await userExists(user)) throw new Error("User already exists");
    const userRepository = AppDataSource.getRepository("User");
    const newUser = userRepository.create(user);
    await userRepository.save(newUser);
    return await jwt_sign(user, "1h");
  } catch (err) {
    
    throw new Error("User already exists");
  }
};
