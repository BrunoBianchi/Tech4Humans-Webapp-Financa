import { NextFunction, Request, Response } from "express";
import { isUserOwner } from "../user-own-account-middleware";

import { userService } from "../../utils/services/user/user-service";
import { accountService } from "../../utils/services/account/account-service";


describe("User Own Account Middleware", () => {
  let response: Partial<Response>;
  let request: Partial<Request>;
  const nextFunction: NextFunction = jest.fn();

  let user: any;
  let account: any;

  beforeAll(async () => {
    user = await userService.create({
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    });
    account = await accountService.create({
      bank: "Test Bank",
      balance: 1000,
      type: "poupanca"
    }, [{ name: "user", id: user.id }]);
  });

  afterAll(async () => {
    await accountService.delete(account.id);
    await userService.delete(user.id);
  });

  beforeEach(() => {
    response = {};
    request = {};
    jest.clearAllMocks();
  });

  it("Should throw an error if no params is provided", async () => {
    try {
      await isUserOwner(request as Request, response as Response, nextFunction);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error)
        expect(error.message).toBe("Params missing !");
    }
  });

  it("Should throw an error if account id is missing", async () => {
    request = {
      params: {},
    };
    try {
      await isUserOwner(request as Request, response as Response, nextFunction);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error)
        expect(error.message).toBe("Params accountId missing !");
    }
  });

  it("should throw an error if account is not found", async () => {
    request = {
      params: {
        accountId: "non-existing-account-id",
      },
    };
    try {
      await isUserOwner(request as Request, response as Response, nextFunction);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error)
        expect(error.message).toBe("Account not found !");
    }
  });

  it("should throw an error if user is not the owner of the account", async () => {
    const otherUser = await userService.create({
      email: "other@example.com",
      name: "Other User",
      password: "password123",
    });

    request = {
      user: {
        id: otherUser.id,
        email: otherUser.email,
        name: otherUser.name,
        password: otherUser.password,
      },
      params: {
        accountId: account.id,
      },
    };
    try {
      await isUserOwner(request as Request, response as Response, nextFunction);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error)
        expect(error.message).toBe(
          "You are not authorized to access this account !",
        );
    } finally {
      await userService.delete(otherUser.id);
    }
  });

  it("should call next if user is the owner of the account", async () => {
    request = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      params: {
        accountId: account.id,
      },
    };

    await isUserOwner(request as Request, response as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });
});
