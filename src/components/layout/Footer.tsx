import Link from "next/link"
import { MapPin, AtSign, Mail, Phone, Heart } from "lucide-react"
import { NAV_LINKS, SITE_INSTAGRAM } from "@/lib/constants"
import { createClient } from "@/lib/supabase/server"

const SERVICES_LINKS = [
  { label: "Hotelaria", href: "/associados?categoria=hotelaria" },
  { label: "Gastronomia", href: "/associados?categoria=gastronomia" },
  { label: "Agências de Turismo", href: "/associados?categoria=agencias" },
  { label: "Ecoturismo", href: "/associados?categoria=ecoturismo" },
  { label: "Cultura & Lazer", href: "/associados?categoria=cultura" },
]

export async function Footer() {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")

  const getSetting = (key: string) =>
    settings?.find((s) => s.key === key)?.value ?? ""

  const { data: content } = await supabase
    .from("site_content")
    .select("key, value_text")
    .eq("key", "footer_description")
    .single()

  const footerDesc =
    content?.value_text ??
    "Núcleo de empresas e profissionais do turismo de Alagoas."

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <MapPin className="size-5 text-secondary-400" />
              <span className="font-display font-bold text-xl text-white">
                Núcleo<span className="text-secondary-400">Tur</span>
                <span className="text-sm font-medium text-primary-400 ml-1.5">Alagoas</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">{footerDesc}</p>
            <div className="flex items-center gap-3">
              {getSetting("instagram") && (
                <a
                  href={`https://instagram.com/${getSetting("instagram")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-primary-700 hover:text-white transition-colors"
                >
                  <AtSign className="size-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Segmentos</h3>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              {getSetting("contact_email") && (
                <li className="flex items-start gap-2.5">
                  <Mail className="size-4 text-primary-400 mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${getSetting("contact_email")}`}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors break-all"
                  >
                    {getSetting("contact_email")}
                  </a>
                </li>
              )}
              {getSetting("contact_phone") && (
                <li className="flex items-start gap-2.5">
                  <Phone className="size-4 text-primary-400 mt-0.5 shrink-0" />
                  <a
                    href={`tel:${getSetting("contact_phone")}`}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {getSetting("contact_phone")}
                  </a>
                </li>
              )}
              {getSetting("address") && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400">{getSetting("address")}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NúcleoTur Alagoas. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            Feito com <Heart className="size-3 text-primary-500 fill-primary-500" /> pela
            <a
              href="https://camaleaodigital.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors ml-0.5"
            >
              Camaleão Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
