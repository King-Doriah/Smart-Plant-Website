import { hash, compare } from "bcrypt";

export const createHash = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

export const verifyHash = async (
  password: string,
  hashPwd: string
): Promise<boolean> => {
  return await compare(password, hashPwd);
};
