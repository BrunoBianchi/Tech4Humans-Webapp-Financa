import * as jose from "jose";
import { jwt_options } from "./jwt-configuration";
import { ApiError } from "../../class/errors-class";
export const jwt_verify = async (token: string) => {
  try {
    return await jose.jwtVerify(token, jwt_options.secret);
  } catch {
    throw new ApiError(401, "Not a valid authorization token !");
  }
};
