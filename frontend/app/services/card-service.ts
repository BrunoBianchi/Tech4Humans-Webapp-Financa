import type { Card } from "../types/card-type";
import { apiService } from "./api-service";

export const cardService = {
  getAll: (token: string, accountId: string) =>
    apiService.get<Card[]>(`/account/${accountId}/cards`, token),

  getById: (id: string, token: string) =>
    apiService.get<Card>(`/card/${id}`, token),

  create: (data: Card, token: string, accountId: string) =>
    apiService.post<Card>(`/account/${accountId}/card`, data, token),

  delete: (account_id: string, card_id: string, token: string) =>
    apiService.delete<void>(`/account/${account_id}/card/${card_id}`, token),
};
