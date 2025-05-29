import type { Account } from "./account-type";
import type { budget } from "./budget-type";

export type Card = {
  id?: string;
  card_number: string;
  card_type: "credito" | "debito";
  account?: Account;
  budgets?: string;
  limit: number;
};
