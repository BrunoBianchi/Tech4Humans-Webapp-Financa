import jwt from "jsonwebtoken";
import { jwtOptions } from "./jwt-configuration";
import { User } from "../../types/user-type";

export const jwtSign = async (
  user: User,
  expiresIn: string,
): Promise<string> => {
  const payload = { ...user };
  return jwt.sign(payload, jwtOptions.secret, {
    algorithm: jwtOptions.alg as jwt.Algorithm,
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};
