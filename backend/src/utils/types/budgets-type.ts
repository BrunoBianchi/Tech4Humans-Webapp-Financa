import { User } from "./user-type";

export type budget ={
    id:string;
    name: string;
    category: string;
    value: number;
    amount: number;
    user?:User;
}