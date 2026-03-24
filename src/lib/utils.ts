import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import SlugifyLib from "slugify"
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from "date-fns"
import { ptBR } from "date-fns/locale"

// ── Tailwind class merger ──────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Slug generation ────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return SlugifyLib(text, {
    lower: true,
    strict: true,
    locale: "pt",
    trim: true,
  })
}

// ── Date formatting ────────────────────────────────────────────────────────
export function formatDate(date: string | Date, pattern = "dd/MM/yyyy"): string {
  return format(new Date(date), pattern, { locale: ptBR })
}

export function formatDateLong(date: string | Date): string {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}

export function formatRelative(date: string | Date): string {
  const d = new Date(date)
  if (isToday(d)) return "Hoje"
  if (isTomorrow(d)) return "Amanhã"
  if (isYesterday(d)) return "Ontem"
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR })
}

// ── Text utilities ─────────────────────────────────────────────────────────
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + "…"
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "")
}

// ── Phone formatting ───────────────────────────────────────────────────────
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return phone
}

export function whatsappLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "")
  const number = digits.startsWith("55") ? digits : `55${digits}`
  const encoded = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${number}${encoded}`
}

// ── URL utilities ──────────────────────────────────────────────────────────
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  return `${base}${path}`
}

// ── Instagram handle ───────────────────────────────────────────────────────
export function instagramUrl(handle: string): string {
  const clean = handle.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
  return `https://instagram.com/${clean}`
}

// ── Currency ───────────────────────────────────────────────────────────────
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// ── Initials for avatar ────────────────────────────────────────────────────
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")
}
