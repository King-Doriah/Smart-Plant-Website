import { Request, Response } from "express";
import { prisma } from "../model";
import { createToken } from "../utils/jwt";
import { authUserZod } from "../schemas/auth.schemas";
import { zodVerify } from "../utils/zodverify";
import { checkExist, getPwdWithEmail, getUserData } from "../model/userModel";
import { verifyHash } from "../utils/bcrypt";

export const login = async (req: Request, res: Response) => {
  const authData = authUserZod.safeParse(req.body);
  if (authData.error) {
    zodVerify(authData, res);
    return;
  }
  const email = authData.data.email;

  if (!(await checkExist(email))) {
    return res.status(404).json({
      status: 404,
      message: `Nenhum usuário encontrado com o email ${email}`,
      data: {},
    });
  }
  const user_pwd: string = await getPwdWithEmail(email);
  try {
    if (await verifyHash(authData.data.senha, user_pwd)) {
      const userData = await getUserData(email);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      const token = createToken(userData);
      await prisma.token.create({
        data: {
          token,
          expires_at: expiresAt,
          user: { connect: { id: Number(userData.id) } },
        },
      });
      res.status(200).json({
        status: 200,
        message: "Token do usuário",
        data: { token },
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Senha Incorreta.",
        data: {},
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json(error.message);
    }
  }
};
