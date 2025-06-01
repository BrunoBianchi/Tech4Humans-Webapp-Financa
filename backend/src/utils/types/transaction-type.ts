import { Account } from "./account-type";
import { CategoryType } from "./category-type";

export type transaction = {
  id: string;
  date?: Date;
  amount: number;
  type: string;
  category: CategoryType;
  status: string;
  description: string;
  sourceAccount: Account;
  destinationAccount: Account;
};
