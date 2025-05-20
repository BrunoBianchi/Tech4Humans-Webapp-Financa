import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from "../entities/User-entity";
import { Account } from "../entities/Account-entity";
export const AppDataSource = new DataSource({
  type: "postgres", 
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  synchronize: true, 
  logging: process.env.POSTGRES_LOGS as any ,
  entities: [User,Account],
  migrations: ["../migrations/*.ts"],
});
