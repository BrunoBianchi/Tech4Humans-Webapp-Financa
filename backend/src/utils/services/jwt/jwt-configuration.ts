export const jwtOptions = {
  secret:
    process.env.JWT_SECRET || process.env.Private_key || "default_secret_key",
  alg: "HS256" as const,
};
