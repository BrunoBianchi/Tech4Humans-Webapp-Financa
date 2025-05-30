import type { Account } from "./account-type";

export type Contact = {
  id?: string;
  account?: Account;
  name: string;
  destination_account_id: string;
};
