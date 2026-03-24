import { createClient } from "@/lib/supabase/server"
import type { Noticia, PaginatedResult } from "@/types"

export async function getPublishedNoticias(
  page = 1,
  pageSize = 9
): Promise<PaginatedResult<Noticia>> {
  const supabase = await createClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count } = await supabase
    .from("noticias")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, to)

  const total = count ?? 0
  return {
    data: data ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getLatestNoticias(limit = 3): Promise<Noticia[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("noticias")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  return data ?? []
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("noticias")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  return data
}

export async function getAllNoticiasAdmin(): Promise<Noticia[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("noticias")
    .select("*")
    .order("created_at", { ascending: false })

  return data ?? []
}
