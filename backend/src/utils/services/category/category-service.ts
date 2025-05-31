import { BaseService } from "../../class/base-service-class";
import { CategoryType } from "../../types/category-type";

class CategoryService extends BaseService<CategoryType> {}

export const categoryService = new CategoryService();
