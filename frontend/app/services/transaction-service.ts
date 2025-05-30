import { apiService } from "./api-service";
import type { Transaction } from "../types/transaction-type";

export const transactionService = {
  getAll: (token: string, id: string) =>
    apiService.get<Transaction[]>(`/account/${id}/transactions`, token),

  getById: (id: string, token: string) =>
    apiService.get<Transaction>(`/account/${id}`, token),

  create: (
    data: Transaction,
    token: string,
    sourceAccount: string,
    destinationAccount: string,
  ) =>
    apiService.post<Transaction>(
      `/transaction/${sourceAccount}/${destinationAccount}`,
      data,
      token,
    ),

  delete: (id: string, token: string) =>
    apiService.delete<void>(`/account/${id}`, token),
};
