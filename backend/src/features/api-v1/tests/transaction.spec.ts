import { userService } from "../../../utils/services/user/user-service";
import { accountService } from "../../../utils/services/account/account-service";
import { categoryService } from "../../../utils/services/category/category-service";
import { transactionService } from "../../../utils/services/transaction/transaction-service";
import { createClient } from "redis";


const userData1 = {
    id: "test-transaction-user-1",
    name: "Transaction Teste 1",
    email: "transaction.teste1@example.com",
    password: "senha123",
};

const userData2 = {
    id: "test-transaction-user-2",
    name: "Transaction Teste 2",
    email: "transaction.teste2@example.com",
    password: "senha123",
};

const accountData = {
    bank: "Banco Transaction",
    balance: 1000,
    type: "poupanca",
};

const categoryData = {
    name: "Categoria Teste",
};

const transactionsTestPayloads = [
    {
        amount: 100,
        description: "Transferência válida",
        type: "debito",
    },
    // ... outros payloads ...
];

describe("Transaction Service", () => {
    let user1: any, user2: any;
    let token1: string, token2: string;
    let account1: any, account2: any;
    let category: any;
    const createdTransactionIds: string[] = [];
    let redisClient: ReturnType<typeof createClient>;

    beforeAll(async () => {
        redisClient = createClient({
            url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
        });
        await redisClient.connect();

        user1 = await userService.create(userData1);
        token1 = user1.token || "fake-token-1";
        user2 = await userService.create(userData2);
        token2 = user2.token || "fake-token-2";

        account1 = await accountService.create(
            { ...accountData, userId: user1.id },
            token1 as any
        );
        account2 = await accountService.create(
            { ...accountData, bank: "Banco Destino", userId: user2.id },
            token2 as any
        );
        category = await categoryService.create(
            { ...categoryData, user: user1.id },
            token1 as any
        );
    });

    afterAll(async () => {
        // ... igual ao seu cleanup, só adicionar user2/account2 ...
        for (const transactionId of createdTransactionIds) {
            try {
                await transactionService.delete(transactionId, token1);
            } catch (error) {
                console.error(`Error deleting transaction ${transactionId} during cleanup:`, error);
            }
        }
        createdTransactionIds.length = 0;

        if (category && category.id) {
            try {
                await categoryService.delete(category.id, token1);
            } catch (error) {
                console.error(`Error deleting category ${category.id} during cleanup:`, error);
            }
        }

        if (account1 && account1.id) {
            try {
                await accountService.delete(account1.id, token1);
            } catch (error) {
                console.error(`Error deleting account ${account1.id} during cleanup:`, error);
            }
        }
        if (account2 && account2.id) {
            try {
                await accountService.delete(account2.id, token2);
            } catch (error) {
                console.error(`Error deleting account ${account2.id} during cleanup:`, error);
            }
        }
        if (user1 && user1.id) {
            try {
                await userService.delete(user1.id);
            } catch (error) {
                console.error(`Error deleting user ${user1.id} during cleanup:`, error);
            }
        }
        if (user2 && user2.id) {
            try {
                await userService.delete(user2.id);
            } catch (error) {
                console.error(`Error deleting user ${user2.id} during cleanup:`, error);
            }
        }
        if (redisClient) {
            await redisClient.disconnect();
        }
    });

    it("should create a transaction successfully with valid data", async () => {
                console.log(                { name: "sourceAccount", id: account1.id },
                { name: "destinationAccount", id: account2.id },
                { name: "category", id: category.id },)
        const txPayload = {
            ...transactionsTestPayloads[0],
        };

        const createdTx = await transactionService.create(
            txPayload as any,
            [
                { name: "sourceAccount", id: account1.id },
                { name: "destinationAccount", id: account2.id },
                { name: "category", id: category.id },
            ]
        );
        createdTransactionIds.push(createdTx.id);

        expect(createdTx).toBeDefined();
        expect(createdTx.id).toEqual(expect.any(String));
        expect(createdTx.amount).toBe(txPayload.amount);
        expect(createdTx.status).toBe("pending");
    });

    // ... os outros testes, usando account1 e account2 ...
});
