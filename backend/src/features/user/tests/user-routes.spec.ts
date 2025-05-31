import { userService } from "../../../utils/services/user/user-service";
const usersTestes = [
  {
    id: "test-Id-123",
    name: "João Silva",
    email: "",
    password: "senha123",
  },
  {
    id: "test-Id-123",
    name: "João Silva",
    email: "exam.con",
    password: "senha123",
  },
  {
    id: "test-Id-123",
    name: "João Silva",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-Id-123",
    name: "",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-Id-123",
    name: "",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-Id-123",
    name: "teste",
    email: "example@gmail.com",
    password: "s",
  },
];

describe("createUser", () => {
  it("should create a user successfully with valId data", async () => {
    const userData = usersTestes[2];

    const createdUser = await userService.create(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      createdAt: expect.any(Date),
      id: expect.any(String),
      password: expect.any(String),
    });
  });

  it("should throw error when email is invalid", async () => {
    const userData = usersTestes[1];
    await expect(userService.create(userData)).rejects.toThrow();
  });

  it("should throw error when name is empty", async () => {
    const userData = usersTestes[3];

    await expect(userService.create(userData)).rejects.toThrow();
  });

  it("should throw error when password is too short", async () => {
    const userData = usersTestes[5];

    await expect(userService.create(userData)).rejects.toThrow();
  });
  afterAll(async () => {
    await userService.delete(usersTestes[2].id);
  });
});

describe("Remove a user", () => {
  let createdUserId: string;

  beforeAll(async () => {
    const userData = usersTestes[2];
    const createdUser = await userService.create(userData);
    createdUserId = createdUser.id;
  });

  it("should remove an existing user successfully!", async () => {
    const deletedUser = await userService.delete(createdUserId);
    expect(deletedUser).toBeDefined();
    expect(deletedUser).toMatchObject({
      name: expect.any(String),
      createdAt: expect.any(Date),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  it("should trow an error when trying to remove an invalid user", async () => {
    try {
      await userService.delete(createdUserId);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User not found !");
      }
    }
  });
});
