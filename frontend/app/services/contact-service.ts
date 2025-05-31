import { apiService } from "./api-service";
import { type Contact } from "../types/contact-type";
export const ContactService = {
  getAll: (token: string, id: string) =>
    apiService.get<Contact[]>(`/account/${id}/contacts`, token),

  getById: (accountId: string, token: string, contactId: string) =>
    apiService.get<Contact>(
      `/account/${accountId}/contact/${contactId}`,
      token,
    ),

  create: (data: Contact, token: string, accountId: string) =>
    apiService.post<Contact>(`/account/${accountId}/contact`, data, token),

  delete: (account_id: string, token: string, contactId: string) =>
    apiService.delete<void>(
      `/account/${account_id}/contact/${contactId}`,
      token,
    ),
};
