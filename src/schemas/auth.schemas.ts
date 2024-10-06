import { z } from "zod";

export const authUserZod = z.object({
  email: z.string().email("Informe um e-mail válido"),
  senha: z.string(),
});
