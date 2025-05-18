import { Router } from "express";

const userRoutes:Router = Router();

userRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the User API",
    status: 200,
  });
});

export default userRoutes;