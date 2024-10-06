import { Request, Response } from "express";
import { prisma } from "../model";
import { createUserZod } from "../schemas/user.schemas";
import { zodVerify } from "../utils/zodverify";
import { createHash } from "../utils/bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createUser = async (req: Request, res: Response) => {
  const userData = createUserZod.safeParse(req.body);
  if (userData.error) {
    zodVerify(userData.error, res);
    return;
  }
  const password = await createHash(userData.data.senha);
  try {
    const user = await prisma.user.create({
      data: {
        ...userData.data,
        senha: password,
      },
      select: {
        id: true,
        nome_completo: true,
        email: true,
        contacto: true,
      },
    });
    res.status(201).json({
      status: 201,
      message: "Usuário cadastrado com sucesso.",
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(403).json({
          status: 403,
          message: "O email ou telefone que pretende cadastrar já existe.",
          data: {},
        });
      }
    } else if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message:
          "Ocorreu um erro ao criar o usuário, contacte o programador da API.",
        data: {},
      });
    }
  }
};
