import { BaseService } from "../../class/base-service-class";
import { ApiError } from "../../class/errors-class";
import { Account } from "../../types/account-type";
import { CategoryType } from "../../types/category-type";
import { transaction } from "../../types/transaction-type";
import { accountService } from "../account/account-service";
import { categoryService } from "../category/category-service";
class TransactionService extends BaseService<transaction> {
  public async create(
    object: transaction,
    relations?: Array<{ name: string; id: string }>,
  ): Promise<transaction> {
    const sourceAccountId = relations?.find(
      (relation) => relation.name === "sourceAccount",
    );
    const destinationAccountId = relations?.find(
      (relation) => relation.name === "destinationAccount",
    );
    const categoryId = relations?.find(
      (relation) => relation.name === "category",
    );
    if (sourceAccountId?.id == destinationAccountId?.id)
      throw new ApiError(
        400,
        "Source and destination accounts cannot be the same!",
      );
    const category = (await categoryService.getById(
      categoryId!.id,
    )) as CategoryType;
    const source = (await accountService.getById(
      sourceAccountId?.id as string,
      ["user"],
    )) as Account;
    const destination = (await accountService.getById(
      destinationAccountId?.id as string,
      ["user"],
    )) as Account;
    if (source.balance - object.amount < 0)
      throw new ApiError(400, "Insufficient funds !");
    if (object.amount <= 0) throw new ApiError(400, "Invalid amount !");
    const newTransaction = this.repository.create({
      ...object,
      sourceAccount: source,
      destinationAccount: destination,
      category: category,
    } as unknown as transaction);
    const savedTransaction = await this.repository.save(newTransaction);
    source.balance -= object.amount;
    destination.balance += object.amount;
    await accountService.update(source.id, source);
    await accountService.update(destination.id, destination);

    return Array.isArray(savedTransaction)
      ? savedTransaction[0]
      : savedTransaction;
  }
}

export const transactionService = new TransactionService();
