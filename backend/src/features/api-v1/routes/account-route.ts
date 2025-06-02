import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Get } from "../../../utils/decorators/router/get-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { Request } from "express";
import { Account } from "../../../utils/types/account-type";
import { Delete } from "../../../utils/decorators/router/delete-decorator";
import { accountService } from "../../../utils/services/account/account-service";
@Router()
export class AccountRoute {
  @Post({
    path: "/account",
    params: [
      {
        name: "bank",
        type: "string",
        required: true,
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
    const account: Account = await accountService.create(Account, [
      { name: "user", id: req.user!.id },
    ]);
    return account;
  }

  @Get({
    path: "/account/:accountId",
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async getAccountRoute(params: { id: string }) {
    return await accountService.getById(params.id);
  }

  @Delete({
    path: "/account/:accountId",
    permissions: [isUserOwner],
    params: [
      {
        name: "accountId",
        type: "string",
        header: true,
      },
    ],
  })
  public async deleteAccountRoute(params: { id: string }) {
    return await accountService.delete(params.id);
  }

  @Get({
    path: "/accounts",
  })
  public async getAllAccountsRoute(_: unknown, req: Request) {
    const result = await accountService.getAllWithJoin("user", req.user!.id, [
      "cards",
      "investments",
      "contacts",
      "incomingTransactions",
      "outgoingTransactions",
    ]);

    return result;
  }
}
