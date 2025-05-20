import * as jose from "jose";
import { jwt_options } from "./jwt-configuration";
import { User } from "../../types/user-type";

export const jwt_sign = async (user: User, experiationTime: string) => {
  return await new jose.SignJWT(user)
    .setProtectedHeader({ alg: jwt_options.alg })
    .setExpirationTime(experiationTime)
    .sign(jwt_options.secret);
};
