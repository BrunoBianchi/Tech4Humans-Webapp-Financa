import { userService } from "../../../utils/services/user/user-service";
import { accountService } from "../../../utils/services/account/account-service";

interface TestUser {
    id: string;
    token?: string;
    name: string;
    email: string;
}

const userData = {
    id: "test-account-user",
    name: "Conta Teste",
    email: "conta.teste@example.com",
    password: "senha123",
};

const accountsTestPayloads = [
    {
        bank: "Banco Teste",
        balance: 100,
        type: "poupanca",
    },
    {
        bank: "",
        balance: 100,
        type: "poupanca",
    },
    {
        bank: "Banco Teste",
        balance: 0,
        type: "poupanca",
    },
    {
        bank: "Banco Teste",
        balance: 100,
        type: "tipo_invalido",
    },
];

describe("Account Service", () => {
    let user: TestUser;
    let token: string;
    const createdAccountIds: string[] = [];

    beforeAll(async () => {
        const createdUser = await userService.create(userData);
        if (!createdUser || !createdUser.id) {
            throw new Error("Test user creation failed or user ID is missing.");
        }
        user = createdUser as TestUser;

        if (user.token) {
            token = user.token;
        } else {
            token = "fake-token";
        }
    });

    afterAll(async () => {
        for (const accountId of createdAccountIds) {
            try {
                await accountService.delete(accountId, token);
            } catch (error) {
                console.error(`Error deleting account ${accountId} during cleanup:`, error);
            }
        }
        createdAccountIds.length = 0;

        if (user && user.id) {
            try {
                await userService.delete(user.id);
            } catch (error) {
                console.error(`Error deleting user ${user.id} during cleanup:`, error);
            }
        }
    });

    it("should create an account successfully with valid data", async () => {
        const accountPayload = { ...accountsTestPayloads[0], userId: user.id };
        const createdAccount = await accountService.create(accountPayload, token as any);

        expect(createdAccount).toBeDefined();
        expect(createdAccount.id).toEqual(expect.any(String));
        createdAccountIds.push(createdAccount.id);

        expect(createdAccount).toMatchObject({
            bank: accountPayload.bank,
            balance: accountPayload.balance,
            type: accountPayload.type,
        });
    });

    it("should throw error when bank is empty", async () => {
        const accountPayload = { ...accountsTestPayloads[1], userId: user.id };
        await expect(
            accountService.create(accountPayload, token as any)
        ).rejects.toThrow();
    });

    it("should throw error when balance is less than 1", async () => {
        const accountPayload = { ...accountsTestPayloads[2], userId: user.id };
        await expect(
            accountService.create(accountPayload, token as any)
        ).rejects.toThrow();
    });

    it("should throw error when type is invalid", async () => {
        const accountPayload = { ...accountsTestPayloads[3], userId: user.id };
        await expect(
            accountService.create(accountPayload, token as any)
        ).rejects.toThrow();
    });

    it("should remove an existing account successfully", async () => {
        const accountPayload = { ...accountsTestPayloads[0], userId: user.id };
        const accountToDelete = await accountService.create(accountPayload, token as any);
        createdAccountIds.push(accountToDelete.id);

        const deletedAccount = await accountService.delete(accountToDelete.id, token as any);

        expect(deletedAccount).toBeDefined();
        expect(deletedAccount).toMatchObject({
            bank: accountPayload.bank,
            balance: accountPayload.balance,
            type: accountPayload.type,
        });

        const index = createdAccountIds.indexOf(accountToDelete.id);
        if (index > -1) {
            createdAccountIds.splice(index, 1);
        }
    });

    it("should throw error when trying to remove an invalid account", async () => {
        await expect(
            accountService.delete("invalid-account-id", token)
        ).rejects.toThrowError("Account not found !");
    });
});
