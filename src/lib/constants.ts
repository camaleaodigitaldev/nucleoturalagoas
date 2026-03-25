export const SITE_NAME = "NúcleoTur Alagoas"

// Hero YouTube video ID — paste only the ID (e.g. "dQw4w9WgXcQ" from youtu.be/dQw4w9WgXcQ)
export const HERO_YOUTUBE_ID = "01Sb2nUDOr0"
export const SITE_DESCRIPTION =
  "Núcleo de empresas e profissionais do turismo do estado de Alagoas. Conectamos, fortalecemos e damos visibilidade ao setor turístico alagoano."
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nucleoturalagoas.com.br"
export const SITE_INSTAGRAM = "https://www.instagram.com/nucleoturalagoas/"

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Associados", href: "/associados" },
  { label: "Notícias", href: "/noticias" },
  { label: "Eventos", href: "/eventos" },
  { label: "Seja Associado", href: "/seja-associado" },
  { label: "Contato", href: "/contato" },
] as const

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Associados", href: "/admin/associados", icon: "Users" },
  { label: "Notícias", href: "/admin/noticias", icon: "Newspaper" },
  { label: "Eventos", href: "/admin/eventos", icon: "Calendar" },
  { label: "Banners", href: "/admin/banners", icon: "Image" },
  { label: "Conteúdo", href: "/admin/conteudo", icon: "FileText" },
  { label: "Leads", href: "/admin/leads", icon: "UserPlus" },
  { label: "Mensagens", href: "/admin/mensagens", icon: "MessageSquare" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "Settings" },
] as const

export const PARTNER_NAV = [
  { label: "Meu Perfil", href: "/minha-conta" },
  { label: "Editar Perfil", href: "/minha-conta/editar" },
  { label: "Fotos", href: "/minha-conta/fotos" },
  { label: "Serviços", href: "/minha-conta/servicos" },
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  hotelaria: "bg-blue-100 text-blue-800",
  gastronomia: "bg-orange-100 text-orange-800",
  agencias: "bg-purple-100 text-purple-800",
  transporte: "bg-slate-100 text-slate-800",
  cultura: "bg-pink-100 text-pink-800",
  ecoturismo: "bg-green-100 text-green-800",
  outros: "bg-gray-100 text-gray-800",
}

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  converted: "Convertido",
  rejected: "Rejeitado",
}

export const ASSOCIADO_STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  active: "Ativo",
  inactive: "Inativo",
}

export const UPLOAD_CONFIG = {
  maxSizeMB: 5,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"] as string[],
  maxGalleryPhotos: 20,
}
