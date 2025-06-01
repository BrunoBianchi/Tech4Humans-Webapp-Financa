import jwt from "jsonwebtoken";
import { jwtOptions } from "./jwt-configuration";
import { ApiError } from "../../class/errors-class";
import type { JwtPayload } from "jsonwebtoken";

export const jwtVerify = async (
  token: string,
): Promise<JwtPayload | string> => {
  try {
    return jwt.verify(token, jwtOptions.secret, {
      algorithms: [jwtOptions.alg],
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, `JWT Error: ${error.message}`);
    } else if (error instanceof Error) {
      throw new ApiError(401, `Verification Error: ${error.message}`);
    }
    throw new ApiError(
      401,
      "Not a valid authorization token for verification! Unknown error.",
    );
  }
};
