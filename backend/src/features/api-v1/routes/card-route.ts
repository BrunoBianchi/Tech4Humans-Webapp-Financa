import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { Card } from "../../../utils/types/card-types";
import { cardService } from "../../../utils/services/card/card-service";
import { Get } from "../../../utils/decorators/router/get-decorator";
@Router()
export class cardRouter {
  @Post({
    path: "/account/:accountId/card",
    params: [
      {
        name: "cardNumber",
        type: "string",
      },
      {
        name: "cardType",
        type: "string",
      },
      {
        name: "limit",
        type: "number",
      },
      {
        name: "accountId",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async createCardRoute(params: {
    cardNumber: string;
    cardType: string;
    limit: number;
    accountId: string;
  }) {
    const { cardNumber, limit, cardType, accountId } = params;
    return await cardService.create({ cardNumber, cardType, limit } as Card, [
      {
        name: "account",
        id: accountId,
      },
    ]);
  }
  @Delete({
    path: "/account/:accountId/card/:cardId",
    permissions: [isUserOwner],
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
      {
        name: "cardId",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteCardRoute(params: { cardID: string; accountId: string }) {
    return await cardService.delete(params.cardID, params.accountId, [
      "account",
    ]);
  }

  @Get({
    path: "/account/:accountId/cards",
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async getCardsRoute(params: { accountId: string }) {
    return await cardService.getAllWithJoin("account", params.accountId);
  }
}
