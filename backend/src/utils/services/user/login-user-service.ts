import { ApiError } from "../../class/errors-class";
import { User } from "../../types/user-type";
import { jwtSign } from "../jwt/jwt-signin-service";
import { getUser } from "./get-user-service";
import * as bcrypt from "bcrypt";
export const loginUser = async (email: string, password: string) => {
  const user: User = (await getUser(email)) as User;
  if (!user) throw new ApiError(401, "Invalid password or email");
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) throw new ApiError(401, "Invalid password or email");
  return {
    authorization: await jwtSign(user, "1h"),
    expiration: "1h",
    user: {
      name: user.name,
      email: user.email,
      userId: user.id,
    },
  };
};
