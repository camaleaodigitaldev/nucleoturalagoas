import { createClient } from "@/lib/supabase/server"
import type { Category, City } from "@/types"

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })

  return data ?? []
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("cities")
    .select("*")
    .order("name", { ascending: true })

  return data ?? []
}
