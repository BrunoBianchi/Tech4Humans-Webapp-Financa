import { userService } from "../../../utils/services/user/user-service";
import { accountService } from "../../../utils/services/account/account-service";
import { cardService } from "../../../utils/services/card/card-service";

interface TestUser {
    id: string;
    token?: string;
    name: string;
    email: string;
}

interface TestAccount {
    id: string;
    bank: string;
    balance: number;
    type: string;
}

const userData = {
    id: "test-card-user",
    name: "Card Teste",
    email: "card.teste@example.com",
    password: "senha123",
};

const accountData = {
    bank: "Banco Card",
    balance: 200,
    type: "poupanca",
};

const cardsTestPayloads = [
    {
        cardNumber: "4111111111111111", // Visa
        cardType: "credito",
        limit: 5000,
    },
    {
        cardNumber: "", // inválido
        cardType: "credito",
        limit: 5000,
    },
    {
        cardNumber: "4111111111111111",
        cardType: "tipo_invalido", // inválido
        limit: 5000,
    },
    {
        cardNumber: "4111111111111111",
        cardType: "credito",
        limit: -100, // inválido
    },
];

describe("Card Service", () => {
    let user: TestUser;
    let token: string;
    let account: TestAccount;
    const createdCardIds: string[] = [];

    beforeAll(async () => {
        const createdUser = await userService.create(userData);
        if (!createdUser || !createdUser.id) {
            throw new Error("Test user creation failed or user ID is missing.");
        }
        user = createdUser as TestUser;
        token = user.token || "fake-token";

        const createdAccount = await accountService.create(
            { ...accountData, userId: user.id },
            token as any
        );
        if (!createdAccount || !createdAccount.id) {
            throw new Error("Test account creation failed or account ID is missing.");
        }
        account = createdAccount as TestAccount;
    });

    afterAll(async () => {
        for (const cardId of createdCardIds) {
            try {
                await cardService.delete(cardId, token);
            } catch (error) {
                console.error(`Error deleting card ${cardId} during cleanup:`, error);
            }
        }
        createdCardIds.length = 0;

        if (account && account.id) {
            try {
                await accountService.delete(account.id, token);
            } catch (error) {
                console.error(`Error deleting account ${account.id} during cleanup:`, error);
            }
        }

        if (user && user.id) {
            try {
                await userService.delete(user.id);
            } catch (error) {
                console.error(`Error deleting user ${user.id} during cleanup:`, error);
            }
        }
    });

    it("should create a card successfully with valid data", async () => {
        const cardPayload = { ...cardsTestPayloads[0], accountId: account.id };
        const createdCard = await cardService.create(cardPayload as any, token as any);

        expect(createdCard).toBeDefined();
        expect(createdCard.id).toEqual(expect.any(String));
        createdCardIds.push(createdCard.id);
        expect(createdCard).toMatchObject({
            cardNumber: cardPayload.cardNumber,
            cardType: cardPayload.cardType,
            limit: cardPayload.limit,
        });
    });

    it("should throw error when card number is empty", async () => {
        const cardPayload = { ...cardsTestPayloads[1], accountId: account.id };
        await expect(
            cardService.create(cardPayload  as any, token as any)
        ).rejects.toThrow();
    });

    it("should throw error when card type is invalid", async () => {
        const cardPayload = { ...cardsTestPayloads[2], accountId: account.id };
        await expect(
            cardService.create(cardPayload  as any, token as any)
        ).rejects.toThrow();
    });

    it("should throw error when limit is negative", async () => {
        const cardPayload = { ...cardsTestPayloads[3], accountId: account.id };
        await expect(
            cardService.create(cardPayload  as any, token as any)
        ).rejects.toThrow();
    });

    it("should remove an existing card successfully", async () => {
        const cardPayload = { ...cardsTestPayloads[0], accountId: account.id };
        const cardToDelete = await cardService.create(cardPayload  as any, token as any);
        createdCardIds.push(cardToDelete.id);

        const deletedCard = await cardService.delete(cardToDelete.id, token as any);

        expect(deletedCard).toBeDefined();
        expect(deletedCard).toMatchObject({
            cardNumber: cardPayload.cardNumber,
            cardType: cardPayload.cardType,
            limit: cardPayload.limit,
        });

        const index = createdCardIds.indexOf(cardToDelete.id);
        if (index > -1) {
            createdCardIds.splice(index, 1);
        }
    });

    it("should throw error when trying to remove an invalid card", async () => {
        await expect(
            cardService.delete("invalid-card-id", token)
        ).rejects.toThrowError("Card not found !");
    });
});