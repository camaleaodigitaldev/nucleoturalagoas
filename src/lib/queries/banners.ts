import { createClient } from "@/lib/supabase/server"
import type { Banner } from "@/types"

export async function getActiveBanners(): Promise<Banner[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })

  return data ?? []
}

export async function getAllBanners(): Promise<Banner[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true })

  return data ?? []
}
