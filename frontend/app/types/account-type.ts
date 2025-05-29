import { type User } from "./user-type";
export type Account = {
  id?: string;
  balance: number;
  bank: string;
  type: string;
  cards?:any[]
  user?: User;
  user_id?: string;
};
