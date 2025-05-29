import type { Card } from "../types/card-type";
import { apiService } from "./api-service";

export const cardService = {
  getAll: (token: string,account_id:string) => apiService.get<Card[]>(`/account/${account_id}/cards`, token),

  getById: (id: string, token: string) =>
    apiService.get<Card>(`/card/${id}`, token),

  create: (data: Card, token: string,account_id:string) =>
    apiService.post<Card>(`/account/${account_id}/card`, data, token),

  delete: (account_id:string,card_id: string, token: string) =>
    apiService.delete<void>(`/account/${account_id}/card/${card_id}`, token),
};
