import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";

@Router()
export class ContactRoute {
  @Post({
    path: "/account/:id/contact",
    params: [
      {
        name: "id",
        type: "string",
        header: true,
      },
      {
        name:"contact_name",
        type:"string",
      },
      {
        name:"contact_account_id",
        type:"string",
      }
    ],
    permissions: [isUserOwner],
  })
  public async createContactRoute(params: { id: string }, _: unknown) {
    return {
      message: "Contact created",
      params,
    };
  }

  @Delete({
    path: "/account/:id/contact/:contact_id",
    permissions: [isUserOwner],
    params: [
      {
        name: "id",
        type: "string",
        header: true,
      },
      {
        name: "contact_id",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteContactRoute(params: { id: string }, _: unknown) {
    return {
      message: "Contact deleted",
    };
  }
}
