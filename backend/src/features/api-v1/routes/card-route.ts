import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { createCard } from "../../../utils/services/card/create-card-service";
import { deleteCard } from "../../../utils/services/card/delete-card-service";
import { Card } from "../../../utils/types/card-types";

@Router()
export class cardRouter {
  @Post({
    path: "/account/:id/card",
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
        name: "id",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async createCardRoute(params: Card) {
    return await createCard(params);
  }
  @Delete({
    path: "/account/:id/card/:card_id",
    permissions: [isUserOwner],
    params: [
      {
        name: "id",
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
  public async deleteCardRoute(params: { card_id: string; id: string }) {
    return await deleteCard(params.card_id, params.id);
  }
}
