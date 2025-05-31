import type { Category } from "./category-type";
import { type User } from "./user-type";
export type Account = {
  id?: string;
  balance: number;
  bank: string;
  type: string;
  cards?: any[];
  user?: User;
  category?: Category[];
  user_id?: string;
};
