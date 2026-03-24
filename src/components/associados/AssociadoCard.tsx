import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, AtSign, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { whatsappLink, getInitials } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import type { AssociadoWithRelations } from "@/types"

interface AssociadoCardProps {
  associado: AssociadoWithRelations
}

export function AssociadoCard({ associado }: AssociadoCardProps) {
  const categoryColor = CATEGORY_COLORS[associado.category?.slug ?? "outros"] ?? CATEGORY_COLORS.outros

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      {/* Cover / Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {associado.cover_url ? (
          <Image
            src={associado.cover_url}
            alt={associado.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-5xl text-primary-300 select-none">
              {getInitials(associado.name)}
            </span>
          </div>
        )}

        {/* Category badge */}
        {associado.category && (
          <div className="absolute top-3 right-3">
            <Badge className={`${categoryColor} border-0 text-xs font-semibold shadow-sm`}>
              {associado.category.name}
            </Badge>
          </div>
        )}

        {/* Logo overlay */}
        {associado.logo_url && (
          <div className="absolute -bottom-5 left-4 size-14 rounded-xl border-2 border-white bg-white shadow-md overflow-hidden">
            <Image
              src={associado.logo_url}
              alt={`Logo ${associado.name}`}
              fill
              className="object-contain p-1"
              sizes="56px"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 ${associado.logo_url ? "pt-8" : "pt-4"}`}>
        <Link href={`/associados/${associado.slug}`} className="block group-hover:text-primary-700 transition-colors">
          <h3 className="font-display font-bold text-base text-slate-900 line-clamp-1 mb-1">
            {associado.name}
          </h3>
        </Link>

        {associado.city && (
          <p className="flex items-center gap-1 text-xs text-slate-500 mb-2">
            <MapPin className="size-3 text-primary-500 shrink-0" />
            {associado.city.name}
          </p>
        )}

        {associado.description && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {associado.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 text-xs border-primary-200 text-primary-700 hover:bg-primary-50"
          >
            <Link href={`/associados/${associado.slug}`}>Ver Perfil</Link>
          </Button>

          {associado.whatsapp && (
            <a
              href={whatsappLink(associado.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 flex items-center justify-center rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors shrink-0"
              title="WhatsApp"
            >
              <Phone className="size-3.5" />
            </a>
          )}

          {associado.instagram && (
            <a
              href={associado.instagram.startsWith("http") ? associado.instagram : `https://instagram.com/${associado.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 flex items-center justify-center rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors shrink-0"
              title="AtSign"
            >
              <AtSign className="size-3.5" />
            </a>
          )}

          {associado.external_link && (
            <a
              href={associado.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors shrink-0"
              title="Site / Reservas"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
