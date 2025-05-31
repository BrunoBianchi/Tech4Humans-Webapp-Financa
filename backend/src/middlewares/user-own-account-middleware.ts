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
  if (!req.params) throw new ApiError(401, "Params missing !");
  if (!req.params.accountId)
    throw new ApiError(401, "Params accountId missing !");
  const accountId = z.string().parse(req.params.accountId);

  const account = (await accountService.getById(accountId, [
    "user",
  ])) as Account;
  if (!account) throw new ApiError(404, "Account not found !");
  if (account.user!.id !== req.user!.id) {
    throw new ApiError(403, "You are not authorized to access this account !");
  } else {
    next();
  }
};
