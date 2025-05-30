import type { Card } from "../types/card-type";
import type { Category } from "../types/category-type";
import { apiService } from "./api-service";

export const categoryService = {
  getAll: (token: string) =>
    apiService.get<Category[]>(`/categories`, token),

  getById: (id: string, token: string) =>
    apiService.get<Category>(`/category/${id}`, token),

  create: (data: Category, token: string, ) =>
    apiService.post<Category>(`/category`, data, token),

  delete: ( token: string) =>
    apiService.delete<void>(`/category`, token),
};
