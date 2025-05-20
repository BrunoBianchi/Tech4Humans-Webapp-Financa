import { Card } from "./card-types";
export type Account = {
    account_uid:string;
    amount:number;
    user_uid:string;
    cards: Card[];
    
}