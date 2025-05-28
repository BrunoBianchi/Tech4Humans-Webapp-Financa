import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { Card } from "../../../utils/types/card-types";
import { cardService } from "../../../utils/services/card/card-service";
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
        name: "name",
        type: "string",
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
    name:string;
    card_type: string;
    account_id: string;
  }) {
    const { card_number,name, card_type, account_id } = params;
    return await cardService.create({ card_number,name, card_type } as Card, [
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
}
