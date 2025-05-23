import { NextFunction, Request, RequestHandler, Response } from "express";
import { findAccountByUser } from "../utils/services/account/find-account-owned-by-user-service";
import z from "zod";
import { ApiError } from "../utils/class/errors-class";

export const isUserOwner: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accountUID = z.string().parse(req.params.id);
  const account = await findAccountByUser(accountUID);

  if (account.user.user_id === req.user?.user_id) {
    next();
  } else {
    throw new ApiError(401, "User not authorized to access this account");
  }
};
