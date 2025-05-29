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
    path: "/account/:account_id/card",
    params: [
      {
        name: "card_number",
        type: "string",
      },
      {
        name: "card_type",
        type: "string",
      },
      {
        name: "limit",
        type: "number",
      },
      {
        name: "account_id",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async createCardRoute(params: {
    card_number: string;
    card_type: string;
    limit:number;
    account_id: string;
  }) {
    const { card_number,limit, card_type, account_id } = params;
    return await cardService.create({ card_number, card_type,limit } as Card, [
      {
        name: "account",
        id: account_id,
      },
    ]);
  }
  @Delete({
    path: "/account/:account_id/card/:card_id",
    permissions: [isUserOwner],
    params: [
      {
        name: "account_id",
        type: "string",
        header: true,
      },
      {
        name: "card_id",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteCardRoute(params: {
    card_id: string;
    account_id: string;
  }) {
    return await cardService.delete(params.card_id, params.account_id, [
      "account",
    ]);
  }

  @Get({
    path:'/account/:account_id/cards',
    params:[
      {
        name: "account_id",
        type: "string",
        header: true,
      }
    ],
    permissions: [isUserOwner],
  })
  public async getCardsRoute(params: { account_id: string }) {
    return await cardService.getAllWithJoin("account",params.account_id);
  }
}
