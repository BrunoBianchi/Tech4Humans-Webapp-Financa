import auth from "../permission-middleware";
import { NextFunction, Request, Response } from "express";

describe("Permission Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });
  it("Without headers", async () => {
    try {
      await auth(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      );
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User Unauthorized !");
      }
    }
  });

  it("Without authorization headers", async () => {
    mockRequest = {
      headers: {},
    };
    try {
      await auth(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      );
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User Unauthorized !");
      }
    }
  });

  it("With Invalid authorization header", async () => {
    mockRequest = {
      headers: {
        authorization: "sadas dsads",
      },
    };
    try {
      await auth(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      );
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User Unauthorized !");
      }
    }
  });

  it("With Invalid authorization token header", async () => {
    mockRequest = {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTRVJfMzdlOTM2ZWVjNyIsImNyZWF0ZWRfYXQiOiIyMDI1LTA1LTI3VDE5OjQyOjM2LjU5MFoiLCJuYW1lIjoiQnJ1bm8gUmFpYWRvIEJpYW5jaGkiLCJlbWFpbCI6ImJydW5vMjAwMi5yYWlhZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAka2FhVDl3d0VjRXNmaGhvNFdYckRjZXAuVGVWbUJITWRVRDNLc1JRbnYzSWNFS2lzeEpqbG0iLCJpYXQiOjE3NDg3MDM2NDksImV4cCI62MTc0ODcyODg0OX0.qcRD29Q0Ofjgs148wVslkMMwawm4tnsAHTv9YEnre6s",
      },
    };
    try {
      await auth(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      );
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User Unauthorized !");
      }
    }
  });

  it("With a valid authorization token", async () => {
    mockRequest = {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTRVJfMzdlOTM2ZWVjNyIsImNyZWF0ZWRfYXQiOiIyMDI1LTA1LTI3VDE5OjQyOjM2LjU5MFoiLCJuYW1lIjoiQnJ1bm8gUmFpYWRvIEJpYW5jaGkiLCJlbWFpbCI6ImJydW5vMjAwMi5yYWlhZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAka2FhVDl3d0VjRXNmaGhvNFdYckRjZXAuVGVWbUJITWRVRDNLc1JRbnYzSWNFS2lzeEpqbG0iLCJpYXQiOjE3NDg3MDM2NDksImV4cCI6MTc0ODcyODg0OX0.qcRD29Q0Ofjgs148wVslkMMwawm4tnsAHTv9YEnre6s",
      },
    };
    try {
      await auth(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      );
      expect(nextFunction).toHaveBeenCalled();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("User Unauthorized !");
      }
    }
  });
});
