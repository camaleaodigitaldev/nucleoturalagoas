import { z } from "zod"

export const sejaAssociadoSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  category_id: z.string().uuid("Selecione uma categoria").optional().nullable(),
  city_id: z.string().uuid("Selecione uma cidade").optional().nullable(),
  message: z.string().max(1000, "Mensagem muito longa").optional(),
})

export type SejaAssociadoValues = z.infer<typeof sejaAssociadoSchema>
