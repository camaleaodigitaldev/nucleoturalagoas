import { z } from "zod"

export const contatoSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mensagem muito curta").max(2000, "Mensagem muito longa"),
})

export type ContatoValues = z.infer<typeof contatoSchema>
