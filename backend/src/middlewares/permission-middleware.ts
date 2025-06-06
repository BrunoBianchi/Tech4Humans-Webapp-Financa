import { NextFunction, Request, RequestHandler, Response } from "express";
import z from "zod";
import { jwtVerify } from "../utils/services/jwt/jwt-verify-service";
import { User } from "../utils/types/user-type";
import { getUser } from "../utils/services/user/get-user-service";
import { ApiError } from "../utils/class/errors-class";

declare module "express" {
  interface Request {
    user?: User;
  }
}

const auth: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization)
      throw new ApiError(401, "Headers missing !");
    const Authorization =
      z.string().parse(req.headers.authorization).split("Bearer ")[1] || null;
    const payload = await jwtVerify(Authorization!.trim() || "");
    if (!payload) {
      throw new ApiError(401, "User Unauthorized !");
    } else {
      if (typeof payload === "string") {
        throw new ApiError(401, "User Unauthorized !");
      }
      const { email } = payload;
      const user = (await getUser(email as string)) as User;
      if (!user) throw new ApiError(401, "User Unauthorized !");
      if (user.password != payload.password)
        throw new ApiError(401, "User Unauthorized !");
      req.user = user;
      next();
    }
  } catch {
    throw new ApiError(401, "User Unauthorized !");
  }
};

export default auth;
