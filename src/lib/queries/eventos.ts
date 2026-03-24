import { createClient } from "@/lib/supabase/server"
import type { EventoWithCity, PaginatedResult } from "@/types"

const EVENTO_SELECT = `*, city:cities(id, name, slug)`

export async function getUpcomingEventos(limit = 4): Promise<EventoWithCity[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("eventos")
    .select(EVENTO_SELECT)
    .eq("published", true)
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true })
    .limit(limit)

  return (data ?? []) as unknown as EventoWithCity[]
}

export async function getPublishedEventos(
  page = 1,
  pageSize = 9
): Promise<PaginatedResult<EventoWithCity>> {
  const supabase = await createClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count } = await supabase
    .from("eventos")
    .select(EVENTO_SELECT, { count: "exact" })
    .eq("published", true)
    .order("start_date", { ascending: true })
    .range(from, to)

  const total = count ?? 0
  return {
    data: (data ?? []) as unknown as EventoWithCity[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getAllEventosAdmin(): Promise<EventoWithCity[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("eventos")
    .select(EVENTO_SELECT)
    .order("start_date", { ascending: false })

  return (data ?? []) as unknown as EventoWithCity[]
}
