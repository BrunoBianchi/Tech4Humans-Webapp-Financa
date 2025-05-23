import express from "express";
import * as dotenv from "dotenv";
import featuresController from "./features/features-controller";
import "reflect-metadata";
import { AppDataSource } from "./database/configuration/data-source";
import { errorHandler } from "./middlewares/error-handler-middleware";
import { ApiError } from "./utils/class/errors-class";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const server = express();
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
