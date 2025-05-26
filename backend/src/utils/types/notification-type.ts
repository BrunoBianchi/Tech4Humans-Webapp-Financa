import { User } from "./user-type";

export type NotificationType = {
  id?: string;
  description: string;
  date: Date;
  title: string;
  user?: User;
};
