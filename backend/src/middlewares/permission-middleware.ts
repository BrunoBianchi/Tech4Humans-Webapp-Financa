import { NextFunction, Request, RequestHandler, Response } from "express";
import z from "zod";
import { jwt_verify } from "../utils/services/jwt/jwt-verify-service";
import { User } from "../utils/types/user-type";
import { getUser } from "../utils/services/user/get-user-service";
import { jwt_decrypt } from "../utils/services/jwt/jwt-decrypt-service";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const auth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      z.string().parse(req.headers.authorization).split("Bearer ")[1] || null;
    const { payload } = await jwt_verify(Authorization || "");
    if (!payload) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const { password, ...userWithoutPassword } = payload;

      const user = (await getUser(userWithoutPassword as User)) as User;
      if (!user) res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      next();
    }
  } catch (err: unknown) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
