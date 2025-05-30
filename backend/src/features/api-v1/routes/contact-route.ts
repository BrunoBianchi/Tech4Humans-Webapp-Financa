import { permission } from "process";
import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { contactService } from "../../../utils/services/contact/contact-service";
import { Get } from "../../../utils/decorators/router/get-decorator";

@Router()
export class ContactRoute {
  @Post({
    path: "/account/:account_id/contact",
    params: [
      {
        name: "account_id",
        type: "string",
        header: true,
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "destination_account_id",
        type: "string",
      },
    ],
    permissions: [isUserOwner],
  })
  public async createContactRoute(params: {
    account_id: string;
    name: string;
    destination_account_id: string;
  }) {
    return await contactService.create(
      {
        name: params.name,
        destination_account_id: params.destination_account_id,
      },
      [
        {
          name: "account",
          id: params.account_id,
        },
      ],
    );
  }

  @Get({
    path: "/account/:account_id/contacts",
    permissions: [isUserOwner],
    params: [
      {
        name: "account_id",
        type: "string",
        header: true,
      },
    ],
  })
  public async getAllContactsRoute(params: { account_id: string }) {
    return await contactService.getAllWithJoin("account", params.account_id);
  }
  @Delete({
    path: "/account/:account_id/contact/:contact_id",
    permissions: [isUserOwner],
    params: [
      {
        name: "account_id",
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
  public async deleteContactRoute(params: {
    account_id: string;
    contact_id: string;
  }) {
    return await contactService.delete(params.contact_id, params.account_id);
  }
}
