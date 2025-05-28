import { type User } from "./user-type";
export type Account = {
  id?: string;
  balance: string;
  bank: string;
  type: string;
  user?: User;
  user_id?: string;
};
