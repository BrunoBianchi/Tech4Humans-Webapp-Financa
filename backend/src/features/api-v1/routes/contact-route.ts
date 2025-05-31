import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { contactService } from "../../../utils/services/contact/contact-service";
import { Get } from "../../../utils/decorators/router/get-decorator";

@Router()
export class ContactRoute {
  @Post({
    path: "/account/:accountId/contact",
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "destinationAccountId",
        type: "string",
      },
    ],
    permissions: [isUserOwner],
  })
  public async createContactRoute(params: {
    accountId: string;
    name: string;
    destinationAccountId: string;
  }) {
    return await contactService.create(
      {
        name: params.name,
        destinationAccountId: params.destinationAccountId,
      },
      [
        {
          name: "account",
          id: params.accountId,
        },
      ],
    );
  }

  @Get({
    path: "/account/:accountId/contacts",
    permissions: [isUserOwner],
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
    ],
  })
  public async getAllContactsRoute(params: { accountId: string }) {
    return await contactService.getAllWithJoin("account", params.accountId);
  }
  @Delete({
    path: "/account/:accountId/contact/:contactId",
    permissions: [isUserOwner],
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
      {
        name: "contactId",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteContactRoute(params: {
    accountId: string;
    contactId: string;
  }) {
    return await contactService.delete(params.contactId, params.accountId);
  }
}
