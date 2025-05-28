import { apiService } from "./api-service";
import type { Account } from "../types/account-type";

export const accountService = {
  getAll: (token: string) => apiService.get<Account[]>("/accounts", token),

  getById: (id: string, token: string) =>
    apiService.get<Account>(`/account/${id}`, token),

  create: (data: Account, token: string) =>
    apiService.post<Account>("/account", data, token),

  delete: (id: string, token: string) =>
    apiService.delete<void>(`/account/${id}`, token),
};
