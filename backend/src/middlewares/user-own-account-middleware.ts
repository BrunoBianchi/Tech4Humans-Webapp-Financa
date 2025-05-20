import { NextFunction, Request, RequestHandler, Response } from "express";
import { findAccountByUser } from "../utils/services/account/find-account-owned-by-user-service";
import z from "zod";

export const isUserOwner: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountUID = z.string().parse(req.params.id);
    const account = await findAccountByUser(accountUID);
    account.user.user_id === req.user?.user_id
      ? next()
      : res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};
