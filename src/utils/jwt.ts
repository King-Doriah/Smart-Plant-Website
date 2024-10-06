import jwt from "jsonwebtoken";

const token_key: any = process.env.TOKEN_KEY;

export const createToken = (data: {}): string => {
  return jwt.sign({ data }, token_key, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, token_key);
};
