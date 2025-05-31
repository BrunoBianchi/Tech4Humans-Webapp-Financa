import { CardEnum } from "../enums/card-enum";
import { Account } from "./account-type";
import { budget } from "./budgets-type";

export type Card = {
  id: string;
  cardNumber: string;
  cardType: CardEnum;
  account: Account;
  budgets?: budget[];
  limit: number;
};
