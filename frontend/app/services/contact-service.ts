import { apiService } from "./api-service";
import { type Contact } from "../types/contact-type";
export const ContactService = {
  getAll: (token: string, id: string) =>
    apiService.get<Contact[]>(`/account/${id}/contacts`, token),

  getById: (account_id: string, token: string, contact_id: string) =>
    apiService.get<Contact>(
      `/account/${account_id}/contact/${contact_id}`,
      token,
    ),

  create: (data: Contact, token: string, account_id: string) =>
    apiService.post<Contact>(`/account/${account_id}/contact`, data, token),

  delete: (account_id: string, token: string, contact_id: string) =>
    apiService.delete<void>(
      `/account/${account_id}/contact/${contact_id}`,
      token,
    ),
};
