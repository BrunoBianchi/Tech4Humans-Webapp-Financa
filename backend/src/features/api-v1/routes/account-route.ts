import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Get } from "../../../utils/decorators/router/get-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { createAccount } from "../../../utils/services/account/create-account-service";
import { Request } from "express";
import { Account } from "../../../utils/types/account-type";
import { getAccountById } from "../../../utils/services/account/get-account-uid-service";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { deleteAccount } from "../../../utils/services/account/delete-account";

@Router()
export class AccountRoute {
  @Post({
    path: "/account",
    params: [
      {
        name: "bank",
        type: "string",
      },
      {
        name: "type",
        type: "string",
      },
      {
        name: "balance",
        type: "number",
      },
    ],
  })
  public async createNewAccountRoute(Account: Account, req: Request) {
    return await createAccount(Account, req.user!.user_id);
  }

  @Get({
    path: "/account/:id",
    params: [
      {
        name: "id",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async getAccountRoute(params: { id: string }) {
    return await getAccountById(params.id);
  }

  @Delete({
    path: "/account/:id",
    permissions: [isUserOwner],
    params: [
      {
        name: "id",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteAccountRoute(params: { id: string }) {
    return await deleteAccount(params.id);
  }
}
