import type { Account } from "./account-type";
import type { budget } from "./budget-type";

export type Card = {
  id?: string;
  cardNumber: string;
  cardType: "credito" | "debito";
  account?: Account;
  budgets?: string;
  limit: number;
};
