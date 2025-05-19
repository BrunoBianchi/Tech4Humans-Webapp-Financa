export const jwt_options = {
  secret: new TextEncoder().encode(process.env.Private_key),
  alg: "HS256",
};
