import { createClient } from "@/lib/supabase/server"
import type { SiteContent, SiteSetting } from "@/types"

export async function getSiteContent(keys: string[]): Promise<Record<string, SiteContent>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("site_content")
    .select("*")
    .in("key", keys)

  const result: Record<string, SiteContent> = {}
  for (const row of data ?? []) {
    result[row.key] = row
  }
  return result
}

export async function getAllSiteContent(): Promise<Record<string, SiteContent>> {
  const supabase = await createClient()
  const { data } = await supabase.from("site_content").select("*")

  const result: Record<string, SiteContent> = {}
  for (const row of data ?? []) {
    result[row.key] = row
  }
  return result
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data } = await supabase.from("site_settings").select("*")

  const result: Record<string, string> = {}
  for (const row of data ?? []) {
    result[row.key] = row.value ?? ""
  }
  return result
}
