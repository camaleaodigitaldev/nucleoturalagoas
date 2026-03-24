import { z } from "zod"

export const eventoSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(300).optional(),
  content_html: z.string().optional(),
  cover_url: z.string().optional().nullable(),
  location: z.string().optional(),
  city_id: z.string().uuid().optional().nullable(),
  start_date: z.string().min(1, "Data de início obrigatória"),
  end_date: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
})

export type EventoValues = z.infer<typeof eventoSchema>
