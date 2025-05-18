import { Router, Request, Response } from "express";

const apiRoutes: Router = Router();

apiRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API v1",
    status: 200,
  });
});

export default apiRoutes;
