import { prisma } from ".";

export const checkExist = async (email: string): Promise<Boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return false;
  }
  return true;
};

export const getPwdWithEmail = async (email: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      senha: true,
    },
  });
  if (!user) {
    return "";
  }
  return user.senha;
};

export const getUserData = async (
  email: string
): Promise<{
  id: number;
  nome_completo: string;
  email: string;
  contacto: string;
}> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      nome_completo: true,
      email: true,
      contacto: true,
    },
  });
  if (!user) {
    return { id: 0, nome_completo: "", email: "", contacto: "" };
  }
  return user;
};
