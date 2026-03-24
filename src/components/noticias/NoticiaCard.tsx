import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDateLong, truncate } from "@/lib/utils"
import type { Noticia } from "@/types"

interface NoticiaCardProps {
  noticia: Noticia
  featured?: boolean
}

export function NoticiaCard({ noticia, featured = false }: NoticiaCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        featured ? "hover:-translate-y-1" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 ${featured ? "aspect-video" : "aspect-video"}`}>
        {noticia.cover_url ? (
          <Image
            src={noticia.cover_url}
            alt={noticia.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
        {noticia.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-secondary-500 text-white border-0 text-xs">Destaque</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <Calendar className="size-3.5" />
          {noticia.published_at
            ? formatDateLong(noticia.published_at)
            : formatDateLong(noticia.created_at)}
        </div>
        <Link href={`/noticias/${noticia.slug}`} className="block mb-2">
          <h3 className="font-display font-semibold text-slate-900 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
            {noticia.title}
          </h3>
        </Link>
        {noticia.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {noticia.excerpt}
          </p>
        )}
        <Link
          href={`/noticias/${noticia.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Ler mais <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  )
}
