import * as jose from "jose";
import { jwt_options } from "./jwt-configuration";
import { ApiError } from "../../class/errors-class";

export const jwt_decrypt = async (token: string) => {
  try {
    return await jose.jwtDecrypt(token, jwt_options.secret);
  } catch {
    throw new ApiError(401, "Not a valid authorization token !");
  }
};
