import { User } from "../../types/user-type";
import { jwt_sign } from "../jwt/jwt-signin-service";
import { getUser } from "./get-user-service";
import * as bcrypt from "bcrypt";
export const loginUser = async (email: string, password: string) => {
  try {
    const user: User = (await getUser(email)) as User;
    if (!user) throw new Error("Invalid password or email");
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new Error("Invalid password or email");
    return {
      authorization: await jwt_sign(user, "1h"),
      expiration: "1h",
      user: {
        name: user.name,
        email: user.email,
        user_id: user.user_id,
      },
    };
  } catch {
    throw new Error("Invalid password or email");
  }
};
