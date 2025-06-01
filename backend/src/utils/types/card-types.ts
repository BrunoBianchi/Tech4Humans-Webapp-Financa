import { CardEnum } from "../enums/card-enum";
import { Account } from "./account-type";

export type Card = {
  id: string;
  cardNumber: string;
  cardType: CardEnum;
  account: Account;
  limit: number;
};
