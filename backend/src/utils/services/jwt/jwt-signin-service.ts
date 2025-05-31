import jwt from "jsonwebtoken";
import { jwt_options } from "./jwt-configuration";
import { User } from "../../types/user-type";

export const jwt_sign = async (user: User, expiresIn: string): Promise<string> => {
  const payload = { ...user };
  return jwt.sign(payload,jwt_options.secret,{
    algorithm: jwt_options.alg as jwt.Algorithm,
    expiresIn:'7 hours'
  })
};
