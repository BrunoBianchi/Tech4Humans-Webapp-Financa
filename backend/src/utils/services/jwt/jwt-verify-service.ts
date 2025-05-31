import jwt from "jsonwebtoken";
import { jwt_options } from "./jwt-configuration";
import { ApiError } from "../../class/errors-class";
import type { JwtPayload } from "jsonwebtoken";

export const jwt_verify = async (token: string): Promise<JwtPayload | string> => {
  try {
    return jwt.verify(token, jwt_options.secret, { algorithms: [jwt_options.alg] });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, `JWT Error: ${error.message}`);
    }
    throw new ApiError(401, "Not a valid authorization token!");
  }
};
