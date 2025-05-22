import { CardEnum } from "../enums/card-enum";

export type Card = {
    id: string;
    card_number: string;
    card_type: CardEnum;
    account: string;
}