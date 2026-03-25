import Link from "next/link"
import Image from "next/image"
import { AtSign, Mail, Phone, MapPin, Heart } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants"
import { createClient } from "@/lib/supabase/server"

const SEGMENTS = [
  { label: "Hotelaria", href: "/associados?categoria=hotelaria" },
  { label: "Gastronomia", href: "/associados?categoria=gastronomia" },
  { label: "Agências de Turismo", href: "/associados?categoria=agencias" },
  { label: "Ecoturismo", href: "/associados?categoria=ecoturismo" },
  { label: "Cultura & Lazer", href: "/associados?categoria=cultura" },
]

export async function Footer() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from("site_settings").select("key, value")
  const get = (key: string) => settings?.find((s) => s.key === key)?.value ?? ""

  const { data: content } = await supabase
    .from("site_content")
    .select("key, value_text")
    .eq("key", "footer_description")
    .single()

  const footerDesc =
    content?.value_text ?? "Conectando agentes, fortalecendo destinos."

  return (
    <footer
      style={{
        background: "linear-gradient(160deg, #062152 0%, #0C3D82 40%, #1558A0 75%, #1B72C8 100%)",
      }}
    >
      {/* Linha de separação sutil do conteúdo acima */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="NúcleoTur Alagoas"
                width={44}
                height={44}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="flex flex-col leading-none gap-1">
                <span className="font-display font-bold text-base text-white tracking-tight">
                  Núcleo<span className="text-secondary-300">Tur</span>
                </span>
                <span className="text-[0.58rem] font-semibold tracking-[0.15em] uppercase text-white/50">
                  Alagoas
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 mb-5">{footerDesc}</p>
            {get("instagram") && (
              <a
                href={`https://instagram.com/${get("instagram")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-9 rounded-lg bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-colors"
              >
                <AtSign className="size-4" />
              </a>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">Navegação</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.8125rem] text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments */}
          <div>
            <h3 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">Segmentos</h3>
            <ul className="space-y-2.5">
              {SEGMENTS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.8125rem] text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">Contato</h3>
            <ul className="space-y-3">
              {get("contact_email") && (
                <li className="flex items-start gap-2.5">
                  <Mail className="size-3.5 text-secondary-300 mt-0.5 shrink-0" />
                  <a href={`mailto:${get("contact_email")}`} className="text-[0.8125rem] text-white/50 hover:text-white transition-colors break-all">
                    {get("contact_email")}
                  </a>
                </li>
              )}
              {get("contact_phone") && (
                <li className="flex items-start gap-2.5">
                  <Phone className="size-3.5 text-secondary-300 mt-0.5 shrink-0" />
                  <a href={`tel:${get("contact_phone")}`} className="text-[0.8125rem] text-white/50 hover:text-white transition-colors">
                    {get("contact_phone")}
                  </a>
                </li>
              )}
              {get("address") && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="size-3.5 text-secondary-300 mt-0.5 shrink-0" />
                  <span className="text-[0.8125rem] text-white/50">{get("address")}</span>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} NúcleoTur Alagoas. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/35 flex items-center gap-1">
            Feito com <Heart className="size-2.5 text-secondary-300 fill-secondary-300 mx-0.5" /> pela
            <a href="https://camaleaodigital.dev" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-secondary-200 transition-colors ml-0.5">
              Camaleão Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
