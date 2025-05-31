import { PaymentEnum } from "../enums/payment-enum";

export type PaymentType = {
  paymentId: string;
  amount: number;
  date: Date;
  description: string;
  type: PaymentEnum;
};
