import { Card } from "./card-types";
export type Account = {
    account_id:string;
    amount:number;
    bank:string;
    user:string;
    cards: Card[];
    
}