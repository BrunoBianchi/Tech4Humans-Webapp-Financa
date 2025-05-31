import express from "express";
import * as dotenv from "dotenv";
import featuresController from "./features/features-controller";
import "reflect-metadata";
import { AppDataSource } from "./database/configuration/data-source";
import { errorHandler } from "./middlewares/error-handler-middleware";
import { ApiError } from "./utils/class/errors-class";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
dotenv.config();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});
AppDataSource.initialize()
  .then(async () => {
    console.log("👌 Database connection established successfully.");
    const server = express();
    server.use(
      cors({
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "authorization"],
      }),
    );
    server.use(limiter);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(featuresController);
    server.use(() => {
      throw new ApiError(404, "Page not found !");
    });
    server.use(errorHandler);

    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
