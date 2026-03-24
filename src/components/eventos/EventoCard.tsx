import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatDateLong } from "@/lib/utils"
import type { EventoWithCity } from "@/types"

interface EventoCardProps {
  evento: EventoWithCity
}

export function EventoCard({ evento }: EventoCardProps) {
  const startDate = new Date(evento.start_date)
  const isUpcoming = startDate > new Date()

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-video bg-gradient-to-br from-accent-100 to-primary-100 overflow-hidden">
        {evento.cover_url ? (
          <Image
            src={evento.cover_url}
            alt={evento.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
        )}

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-3 py-2 text-center shadow-sm min-w-14">
          <p className="text-xs font-bold text-primary-600 uppercase leading-none">
            {formatDate(evento.start_date, "MMM")}
          </p>
          <p className="font-display font-bold text-xl text-slate-900 leading-tight">
            {formatDate(evento.start_date, "dd")}
          </p>
        </div>

        {isUpcoming && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-secondary-500 text-white border-0 text-xs">Em breve</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Link href={`/eventos#${evento.slug}`} className="block mb-2">
          <h3 className="font-display font-semibold text-slate-900 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
            {evento.title}
          </h3>
        </Link>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="size-3.5 text-primary-500 shrink-0" />
            {formatDateLong(evento.start_date)}
            {evento.end_date && ` — ${formatDateLong(evento.end_date)}`}
          </div>
          {evento.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="size-3.5 text-primary-500 shrink-0" />
              {evento.location}
              {evento.city && `, ${evento.city.name}`}
            </div>
          )}
        </div>

        {evento.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {evento.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}
