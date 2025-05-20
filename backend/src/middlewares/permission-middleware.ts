import { RequestHandler } from "express";
import z from "zod";
import { jwt_verify } from "../utils/services/jwt/jwt-verify-service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
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
      req.user = payload;
      next();
    }
  } catch (err: any) {
    res.status(401).send(err.toString());
  }
};

export default auth;
