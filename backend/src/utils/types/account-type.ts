import { User } from "./user-type";

export type Account = {
  account_id: string;
  balance: number;
  bank: string;
  user?: User | string;
};
