import { userService } from "../../../utils/services/user/user-service";
import { categoryService } from "../../../utils/services/category/category-service";

const userData = {
    id: "test-category-user",
    name: "Categoria Teste",
    email: "categoria.teste@example.com",
    password: "senha123",
};

const categoriesTestPayloads = [
    {
        name: "Alimentação",
    },
    {
        name: "", 
    },
];

describe("Category Service", () => {
    let user: any;
    let token: string;
    const createdCategoryIds: string[] = [];

    beforeAll(async () => {
        user = await userService.create(userData);
        token = user.token || "fake-token";
    });

    afterAll(async () => {
        for (const categoryId of createdCategoryIds) {
            try {
                await categoryService.delete(categoryId, token);
            } catch (error) {
                console.error(`Error deleting category ${categoryId} during cleanup:`, error);
            }
        }
        createdCategoryIds.length = 0;

        if (user && user.id) {
            try {
                await userService.delete(user.id);
            } catch (error) {
                console.error(`Error deleting user ${user.id} during cleanup:`, error);
            }
        }
    });

    it("should create a category successfully with valid data", async () => {
        const createdCategory = await categoryService.create(
            { ...categoriesTestPayloads[0], user: user.id },
            token as any
        );
        expect(createdCategory).toBeDefined();
        expect(createdCategory.id).toEqual(expect.any(String));
        createdCategoryIds.push((createdCategory as any).id);
        expect(createdCategory).toMatchObject({
            name: categoriesTestPayloads[0].name,
        });
    });

    it("should throw error when name is empty", async () => {
        await expect(
            categoryService.create({ ...categoriesTestPayloads[1], user: user.id }, token as any)
        ).rejects.toThrow();
    });

});