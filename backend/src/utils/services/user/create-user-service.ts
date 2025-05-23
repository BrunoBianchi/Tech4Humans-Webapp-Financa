import { User } from "../../types/user-type";
import { AppDataSource } from "../../../database/configuration/data-source";
import { userExists } from "./user-exists-service";
import { jwt_sign } from "../jwt/jwt-signin-service";
import { createNotification } from "../notification/create-notification-service";
import { ApiError } from "../../class/errors-class";
export const createUser = async (user: User) => {

    if (await userExists(user))
      throw new ApiError(400, "User already exists !");
    const userRepository = AppDataSource.getRepository("User");
    const newUser = userRepository.create(user);
    await userRepository.save(newUser);
    await createNotification(
      newUser.user_id,
      "Você já pode começar a usar o TechFinance",
      "Bem vindo ao TechFinance"
    );
    return await jwt_sign(user, "7d");

};
