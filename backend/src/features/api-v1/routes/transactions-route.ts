import { isUserOwner } from "../../../middlewares/user-own-account-middleware";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { createTransaction } from "../../../utils/services/transaction/create-transaction-service";

@Router()
export class TransactionRoute {
  @Post({
    path: "/transaction/:id/:destination",
    params: [
      {
        name: "id",
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
        name: "description",
        type: "string",
      },
    ],
    permissions: [isUserOwner],
  })
  public async createTransactionRoute(params: {
    id: string;
    amount: number;
    description: string;
    destination: string;
  }) {
    return await createTransaction({
      id: params.id,
      amount: params.amount,
      description: params.description,
      destination: params.destination,
    });
  }
}
