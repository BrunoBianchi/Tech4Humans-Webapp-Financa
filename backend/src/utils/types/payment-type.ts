import { PaymentEnum } from "../enums/payment-enum";

export type PaymentType = {
    payment_id: string;
    amount: number;
    date: Date;
    description: string;
    type: PaymentEnum
}