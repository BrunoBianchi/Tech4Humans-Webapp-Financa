import { userService } from "../../../utils/services/user/user-service";
import { accountService } from "../../../utils/services/account/account-service";
import { contactService } from "../../../utils/services/contact/contact-service";

const userData = {
    id: "test-contact-user",
    name: "Contact Teste",
    email: "contact.teste@example.com",
    password: "senha123",
};

const accountData = {
    bank: "Banco Contact",
    balance: 500,
    type: "poupanca",
};

const contactsTestPayloads = [
    {
        name: "Contato Válido",
        destination_account_id: "", // será preenchido no teste
    },
    {
        name: "", // nome inválido
        destination_account_id: "", // será preenchido no teste
    },
    {
        name: "Contato sem conta destino",
        destination_account_id: "", // inválido
    },
];

describe("Contact Service", () => {
    let user: any;
    let token: string;
    let account: any;
    let destinationAccount: any;
    const createdContactIds: string[] = [];

    beforeAll(async () => {
        user = await userService.create(userData);
        token = user.token || "fake-token";

        account = await accountService.create(
            { ...accountData, userId: user.id },
            token as any
        );
        destinationAccount = await accountService.create(
            { ...accountData, bank: "Banco Destino", userId: user.id },
            token as any
        );
    });

    afterAll(async () => {
        for (const contactId of createdContactIds) {
            try {
                await contactService.delete(contactId, token);
            } catch (error) {
                console.error(`Error deleting contact ${contactId} during cleanup:`, error);
            }
        }
        createdContactIds.length = 0;

        if (account && account.id) {
            try {
                await accountService.delete(account.id, token);
            } catch (error) {
                console.error(`Error deleting account ${account.id} during cleanup:`, error);
            }
        }
        if (destinationAccount && destinationAccount.id) {
            try {
                await accountService.delete(destinationAccount.id, token);
            } catch (error) {
                console.error(`Error deleting account ${destinationAccount.id} during cleanup:`, error);
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

    it("should create a contact successfully with valid data", async () => {
        const contactPayload = {
            ...contactsTestPayloads[0],
            destination_account_id: destinationAccount.id,
            accountId: account.id,
        };
        const createdContact = await contactService.create(contactPayload, token as any);

        expect(createdContact).toBeDefined();
        expect((createdContact as any).id).toEqual(expect.any(String));
        createdContactIds.push((createdContact as any).id);
        expect(createdContact).toMatchObject({
            name: contactPayload.name,
            destinationAccountId: contactPayload.destination_account_id,
        });
    });

    it("should throw error when name is empty", async () => {
        const contactPayload = {
            ...contactsTestPayloads[1],
            destination_account_id: destinationAccount.id,
            accountId: account.id,
        };
        await expect(
            contactService.create(contactPayload, token as any)
        ).rejects.toThrow();
    });

    it("should throw error when destination_account_id is empty", async () => {
        const contactPayload = {
            ...contactsTestPayloads[2],
            destination_account_id: "",
            accountId: account.id,
        };
        await expect(
            contactService.create(contactPayload, token as any)
        ).rejects.toThrow();
    });

    it("should remove an existing contact successfully", async () => {
        const contactPayload = {
            ...contactsTestPayloads[0],
            destination_account_id: destinationAccount.id,
            accountId: account.id,
        };
        const contactToDelete = await contactService.create(contactPayload, token as any);
        createdContactIds.push((contactToDelete as any).id);

        const deletedContact = await contactService.delete((contactToDelete as any).id, token);

        expect(deletedContact).toBeDefined();
        expect((deletedContact as any).id).toEqual((contactToDelete as any).id);

        const idx = createdContactIds.indexOf((contactToDelete as any).id);
        if (idx > -1) createdContactIds.splice(idx, 1);
    });

    it("should throw error when trying to remove an invalid contact", async () => {
        await expect(
            contactService.delete("invalid-contact-id", token)
        ).rejects.toThrow();
    });
});