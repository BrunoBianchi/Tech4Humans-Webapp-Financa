import { CardEnum } from "../enums/card-enum";
import { Account } from "./account-type";
import { budget } from "./budgets-type";

export type Card = {
  id: string;
  card_number: string;
  card_type: CardEnum;
  account: Account;
  budgets?:budget[];
  limit: number;
};
