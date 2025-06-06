import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./database/configuration/data-source";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test.local" : ".env",
});

if (process.env.NODE_ENV === "test") {
  process.env.JWT_SECRET = process.env.JWT_SECRET_TEST;
}

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize();
});
