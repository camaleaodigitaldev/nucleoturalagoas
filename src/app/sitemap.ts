import { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { SITE_URL } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [{ data: associados }, { data: noticias }, { data: eventos }] = await Promise.all([
    supabase.from("associados").select("slug, updated_at").eq("status", "active"),
    supabase.from("noticias").select("slug, updated_at").eq("published", true),
    supabase.from("eventos").select("slug, updated_at").eq("published", true),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/quem-somos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/associados`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/noticias`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/eventos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/seja-associado`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const associadoPages: MetadataRoute.Sitemap = (associados ?? []).map((a) => ({
    url: `${SITE_URL}/associados/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const noticiaPages: MetadataRoute.Sitemap = (noticias ?? []).map((n) => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: new Date(n.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const eventoPages: MetadataRoute.Sitemap = (eventos ?? []).map((e) => ({
    url: `${SITE_URL}/eventos/${e.slug}`,
    lastModified: new Date(e.updated_at),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticPages, ...associadoPages, ...noticiaPages, ...eventoPages]
}
