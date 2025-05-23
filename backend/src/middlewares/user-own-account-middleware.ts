import { NextFunction, Request, RequestHandler, Response } from "express";
import z from "zod";
import { ApiError } from "../utils/class/errors-class";
import { accountService } from "../utils/services/account/account-service";
import { Account } from "../utils/types/account-type";
export const isUserOwner: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accountUID = z.string().parse(req.params.account_id);

  const account = (await accountService.getById(accountUID, [
    "user",
  ])) as Account;
  if (!account) throw new ApiError(404, "Account not found !");
  if (account.user!.id !== req.user!.id) {
    throw new ApiError(403, "You are not authorized to access this account !");
  } else {
    next();
  }
};
