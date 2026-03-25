import { createClient } from "@/lib/supabase/server"
import type { AssociadoWithRelations, AssociadoFilters, PaginatedResult } from "@/types"

const ASSOC_SELECT = `
  *,
  category:categories(id, name, slug, icon),
  city:cities(id, name, slug),
  services:associado_services(id, name, sort_order),
  photos:associado_photos(id, url, caption, sort_order)
`

export async function getAssociados(
  filters: AssociadoFilters = {},
  pageSize = 12
): Promise<PaginatedResult<AssociadoWithRelations>> {
  const supabase = await createClient()
  const page = filters.page ?? 1
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("associados")
    .select(ASSOC_SELECT, { count: "exact" })
    .eq("status", "active")

  if (filters.category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.category)
      .single()
    if (cat) query = query.eq("category_id", cat.id)
  }

  if (filters.city) {
    const { data: city } = await supabase
      .from("cities")
      .select("id")
      .eq("slug", filters.city)
      .single()
    if (city) query = query.eq("city_id", city.id)
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`)
  }

  query = query
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })
    .range(from, to)

  const { data, count, error } = await query

  if (error) {
    console.error("getAssociados error:", error)
    return { data: [], total: 0, page, pageSize, totalPages: 0 }
  }

  const total = count ?? 0
  return {
    data: (data ?? []) as unknown as AssociadoWithRelations[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getAllActiveAssociados(): Promise<AssociadoWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .eq("status", "active")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })

  return (data ?? []) as unknown as AssociadoWithRelations[]
}

export async function getFeaturedAssociados(limit = 6): Promise<AssociadoWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .eq("status", "active")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit)

  return (data ?? []) as unknown as AssociadoWithRelations[]
}

export async function getAssociadoBySlug(slug: string): Promise<AssociadoWithRelations | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  return data as unknown as AssociadoWithRelations | null
}

export async function getAssociadoBySlugAdmin(slug: string): Promise<AssociadoWithRelations | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .eq("slug", slug)
    .single()

  return data as unknown as AssociadoWithRelations | null
}

export async function getAllAssociadosAdmin(): Promise<AssociadoWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .order("created_at", { ascending: false })

  return (data ?? []) as unknown as AssociadoWithRelations[]
}

export async function getAssociadoByUserId(userId: string): Promise<AssociadoWithRelations | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("associados")
    .select(ASSOC_SELECT)
    .eq("user_id", userId)
    .single()

  return data as unknown as AssociadoWithRelations | null
}
