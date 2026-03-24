import type { Database } from "./database.types"

// ── Row types ──────────────────────────────────────────────────────────────
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type City = Database["public"]["Tables"]["cities"]["Row"]
export type Associado = Database["public"]["Tables"]["associados"]["Row"]
export type AssociadoService = Database["public"]["Tables"]["associado_services"]["Row"]
export type AssociadoPhoto = Database["public"]["Tables"]["associado_photos"]["Row"]
export type Noticia = Database["public"]["Tables"]["noticias"]["Row"]
export type Evento = Database["public"]["Tables"]["eventos"]["Row"]
export type Banner = Database["public"]["Tables"]["banners"]["Row"]
export type SiteContent = Database["public"]["Tables"]["site_content"]["Row"]
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"]
export type SejaAssociadoLead = Database["public"]["Tables"]["seja_associado_leads"]["Row"]
export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"]

// ── Enriched / joined types ────────────────────────────────────────────────
export type AssociadoWithRelations = Associado & {
  category: Category | null
  city: City | null
  services: AssociadoService[]
  photos: AssociadoPhoto[]
}

export type NoticiaWithAuthor = Noticia & {
  author: { id: string } | null
}

export type EventoWithCity = Evento & {
  city: City | null
}

// ── User context ───────────────────────────────────────────────────────────
export type UserWithProfile = {
  id: string
  email: string | undefined
  profile: Profile | null
  associado: Associado | null
}

// ── Form types (for React Hook Form + Zod) ────────────────────────────────
export type AssociadoStatus = "pending" | "active" | "inactive"
export type LeadStatus = "new" | "contacted" | "converted" | "rejected"
export type UserRole = "super_admin" | "associado"

// ── Pagination ─────────────────────────────────────────────────────────────
export type PaginationParams = {
  page: number
  pageSize: number
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ── Filter params for Associados listing ───────────────────────────────────
export type AssociadoFilters = {
  category?: string
  city?: string
  search?: string
  page?: number
}
