import { Get } from "../../../utils/decorators/router/get-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { budgetsService } from "../../../utils/services/budgets-service";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { budget } from "../../../utils/types/budgets-type";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
@Router()
export class BudgetsRoute {
  @Get({
    path: "/:card/budgets",
    params: [
      {
        name: "card",
        type: "string",
        header: true,
      },
    ],
  })
  public async getBudgetsRoute(param: { card: string }) {
    return await budgetsService.getAllWithJoin("card", param.card);
  }

  @Post({
    path: "/:card/budget",
    params: [
      {
        name: "card",
        type: "string",
        header: true,
      },
      {
        name: "value",
        type: "number",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "category",
        type: "string",
      },
    ],
  })
  public async createBudgetRoute(params: budget) {
    const budget: Omit<budget, "id"> = {
      name: params.name,
      category: params.category,
      value: params.value,
      card: params.card,
    };
    return await budgetsService.create(budget, [
      { name: "card", id: params.card },
      { name: "category", id: params.category },
    ]);
  }

  @Delete({
    path: "/card/:card/budget/:budget_id",
    params: [
      {
        name: "budget_id",
        type: "string",
        header: true,
      },
      {
        name: "card",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteBudgetRoute(params: { budget_id: string; card: string }) {
    return await budgetsService.delete(params.budget_id);
  }
}
