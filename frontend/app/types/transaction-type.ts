
export type Transaction = {
  id?: string;
  date?: Date;
  amount: number;
  status?: string;
  category?: string;
  type:string;
  description: string;
  sourceAccount:string;
  destinationAccount: string;
};
