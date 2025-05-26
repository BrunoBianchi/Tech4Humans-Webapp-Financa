import { User } from "../../types/user-type";
import { AppDataSource } from "../../../database/configuration/data-source";
import { userExists } from "./user-exists-service";
import { jwt_sign } from "../jwt/jwt-signin-service";
import { ApiError } from "../../class/errors-class";
import { notificationService } from "../notification/notification-service";
import { NotificationType } from "../../types/notification-type";
export const createUser = async (user: User) => {
  if (await userExists(user)) throw new ApiError(400, "User already exists !");
  const userRepository = AppDataSource.getRepository("User");
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);
  await notificationService.create(
    {
      description: "Você já pode começar a usar o TechFinance",
      title: `Seja bem vindo ao TechFinance`,
    } as NotificationType,
    [
      {
        name: "user",
        id: newUser.id,
      },
    ],
  );
  return await jwt_sign(user, "7d");
};
