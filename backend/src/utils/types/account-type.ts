import { User } from "./user-type";

export type Account = {
  id: string;
  balance: number;
  type: string;
  bank: string;
  user?: User;
  userId: string;
};
