import { User } from "./user-type";

export type Account = {
  id: string;
  balance: number;
  bank: string;
  user?: User;
  user_id:string;
};
