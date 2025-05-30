import { Account } from "./account-type";

export type transaction = {
  id: string;
  date: Date;
  amount: number;
  type: string;
  status: string;
  description: string;
  sourceAccount: Account;
  destinationAccount: Account;
};
