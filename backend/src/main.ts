import express from "express";
import * as dotenv from "dotenv";
import featuresController from "./features/features-controller";
dotenv.config();
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(featuresController);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
