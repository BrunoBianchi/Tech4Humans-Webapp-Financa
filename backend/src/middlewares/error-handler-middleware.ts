import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/class/errors-class";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, details: err.details });
  } else if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}
