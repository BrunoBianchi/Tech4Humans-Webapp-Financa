import * as jose from "jose";
import { jwt_options } from "./jwt-configuration";
export const jwt_verify = async (token: string) => {
  try {
    return await jose.jwtVerify(token, jwt_options.secret);
  } catch {
    throw new Error("Invalid token");
  }
};
