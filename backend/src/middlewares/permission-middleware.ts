import { RequestHandler } from "express";
import z from "zod";
import { jwt_verify } from "../utils/services/jwt/jwt-verify-service";
import { User } from "../utils/types/user-type";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const auth: RequestHandler = async (req, res, next) => {
  try {
    const Authorization = z
      .string()
      .parse(req.headers.authorization)
      .split("Bearer ")[1];
    const { payload } = await jwt_verify(Authorization);
    if (!payload) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const { password, ...userWithoutPassword } = payload;
      req.user = userWithoutPassword as User;
      next();
    } 
}   catch (err: unknown) {
    res.status(401).send(String(err));
  }
};

export default auth;
