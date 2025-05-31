import { User } from "../../../database/entities/User-entity";
import { createUser } from "../../../utils/services/user/create-user-service";
import { userService } from "../../../utils/services/user/user-service";
const usersTestes = [
  {
    id: "test-id-123",
    name: "João Silva",
    email: "",
    password: "senha123",
  },
  {
    id: "test-id-123",
    name: "João Silva",
    email: "exam.con",
    password: "senha123",
  },
  {
    id: "test-id-123",
    name: "João Silva",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-id-123",
    name: "",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-id-123",
    name: "",
    email: "example@gmail.com",
    password: "senha123",
  },
  {
    id: "test-id-123",
    name: "teste",
    email: "example@gmail.com",
    password: "s",
  },
];

describe("createUser", () => {
  it("should create a user successfully with valid data", async () => {
    const userData = usersTestes[2];

    const createdUser = await userService.create(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      created_at: expect.any(Date),
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
});

describe("Remove a user", () => {
  it("should remove a  existing user successfully !", async () => {
    const userData = {
      id: "test-id-123",
    };
    const deletedUser = await userService.delete(userData.id);
    expect(deletedUser).toBeDefined();
    await expect(deletedUser).toMatchObject({
      name: expect.any(String),
      created_at: expect.any(Date),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  it("should throw error when trying to remove a non-existing user", async () => { 
    const userData = {
      id: "non-existing-id",
    };
    await expect(userService.delete(userData.id)).rejects.toThrow();
  });
  
});
