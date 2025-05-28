import { CardEnum } from "../enums/card-enum";
import { Account } from "./account-type";

export type Card = {
  id: string;
  name:string;
  card_number: string;
  card_type: CardEnum;
  account: Account;
};
