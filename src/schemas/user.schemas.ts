import { z } from "zod";

export const createUserZod = z.object({
  nome_completo: z
    .string()
    .min(3, "Informe pelo menos 3 caracteres para o nome completo."),
  email: z.string().email("Informe um e-mail válido"),

  contacto: z.string().refine(
    (value) => {
      const regex = /^\d{6}-\d{4}$/;
      return regex.test(value);
    },
    {
      message: "Informe um número de telefone válido.",
    }
  ),
  senha: z.string().min(6, "Informe pelo menos 6 caracteres como senha."),
});
