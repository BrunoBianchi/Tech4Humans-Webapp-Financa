import type { Account } from "./account-type";

export type Contact = {
  id?: string;
  account?: Account;
  name: string;
  destinationAccountId: string;
};
