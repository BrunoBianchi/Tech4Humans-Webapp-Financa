import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { User } from "../entities/User-entity";
import { Account } from "../entities/Account-entity";
import { Card } from "../entities/Card-entity";
import { Transaction } from "../entities/Transaction-entity";
import { Contact } from "../entities/Contact-entity";
import { Payment } from "../entities/Payment.entity";
import { Investiment } from "../entities/Investment-entity";
import { Notification } from "../entities/Notification-entity";
import { Bugedts } from "../entities/Bugedts-entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  synchronize: true,
  logging: process.env.POSTGRES_LOGS === "true" ? true : false,
  entities: [
    User,
    Account,
    Card,
    Transaction,
    Contact,
    Payment,
    Investiment,
    Notification,
    Bugedts
  ],
  migrations: ["../migrations/*.ts"],
});
