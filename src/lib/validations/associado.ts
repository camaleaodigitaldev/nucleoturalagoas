import { z } from "zod"

export const associadoPublicSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  description: z.string().max(300, "Resumo deve ter no máximo 300 caracteres").optional(),
  description_html: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  external_link: z.string().url("URL inválida").optional().or(z.literal("")),
})

export const associadoAdminSchema = associadoPublicSchema.extend({
  slug: z.string().min(2, "Slug deve ter ao menos 2 caracteres").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  category_id: z.string().uuid().optional().nullable(),
  city_id: z.string().uuid().optional().nullable(),
  status: z.enum(["pending", "active", "inactive"]),
  featured: z.boolean().optional().default(false),
  sort_order: z.number().int().min(0).optional().default(0),
})

export type AssociadoPublicValues = z.infer<typeof associadoPublicSchema>
export type AssociadoAdminValues = z.infer<typeof associadoAdminSchema>
