import { Category } from "../../../database/entities/Category-entity";
import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Get } from "../../../utils/decorators/router/get-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { transactionService } from "../../../utils/services/transaction/transaction-service";
import { transaction } from "../../../utils/types/transaction-type";
@Router()
export class TransactionRoute {
  @Post({
    path: "/transaction/:account_id/:destination",
    params: [
      {
        name: "account_id",
        type: "string",
        header: true,
      },
      {
        name: "destination",
        type: "string",
        header: true,
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "type",
        type: "string",
      },
      {
        name: "category",
        type: "string",
        required:false,
      },
      {
        name: "description",
        type: "string",
      },
    ],
    permissions: [isUserOwner],
  })
  public async createTransactionRoute(params: {
    account_id: string;
    amount: number;
    type: string;
    category: string;
    description: string;
    destination: string;
  }) {
    const transaction: Omit<
      transaction,
      "sourceAccount" | "destinationAccount"
    > = await transactionService.create(
      {
        amount: params.amount,
        description: params.description,
        type: params.type,
        date: new Date(),
      } as transaction,
      [
        { name: "sourceAccount", id: params.account_id },
        { name: "destinationAccount", id: params.destination },
        { name: "category", id: params.category },
      ],
    );
    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      category: transaction.category.id,
    };
  }

  @Get({
    path: `/account/:account_id/transactions`,
    params: [
      {
        name: "account_id",
        type: "string",
        header: true,
      },
    ],
    permissions: [isUserOwner],
  })
  public async getTransactionsByAccountRoute(params: { account_id: string }) {
    return await transactionService.getAllWithJoin(
      "transaction",
      params.account_id,
      ["sourceAccount", "destinationAccount", "category"],
    );
  }
}
