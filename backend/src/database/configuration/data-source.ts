import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
const rootEnvPath = path.resolve(process.cwd(), '../.env');
import { resolve } from 'path';

dotenv.config({ path: rootEnvPath });
import { User } from "../entities/User-entity";
import { Account } from "../entities/Account-entity";
import { Card } from "../entities/Card-entity";
import { Transaction } from "../entities/Transaction-entity";
import { Contact } from "../entities/Contact-entity";
import { Investiment } from "../entities/Investment-entity";
import { Category } from "../entities/Category-entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  synchronize: false,
  logging: process.env.POSTGRES_LOGS === "true" ? true : false,
  entities: [
    User,
    Account,
    Card,
    Transaction,
    Contact,
    Investiment,
 
    Category,
  ],
  migrations:[resolve(__dirname, '../migrations/*.ts')],
});
