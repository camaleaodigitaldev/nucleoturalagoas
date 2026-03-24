import { z } from "zod"

export const noticiaSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(300).optional(),
  content_html: z.string().min(10, "Conteúdo obrigatório"),
  cover_url: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
})

export type NoticiaValues = z.infer<typeof noticiaSchema>
