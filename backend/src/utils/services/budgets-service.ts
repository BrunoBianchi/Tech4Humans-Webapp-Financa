import { BaseService } from "../class/base-service-class";
import { budget } from "../types/budgets-type";

class BudgetsService extends BaseService<budget> {}

export const budgetsService = new BudgetsService();
