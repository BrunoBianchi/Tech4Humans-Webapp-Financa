import { Account } from "./account-type";

export type transaction = {
  id: string;
  date: Date;
  amount: number;
  status:string;
  description: string;
  sourceAccount: Account;
  destinationAccount: Account;
};
