import * as jose from "jose";
import { jwt_options } from "./jwt-configuration";

export const jwt_decrypt = async (token: string) => {
  try {
    return await jose.jwtDecrypt(token, jwt_options.secret);
  } catch {
    throw new Error("Invalid token");
  }
};
