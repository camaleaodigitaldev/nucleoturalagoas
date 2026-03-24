import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNoticiaBySlug, getLatestNoticias } from "@/lib/queries/noticias"
import { NoticiaCard } from "@/components/noticias/NoticiaCard"
import { formatDateLong } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const noticia = await getNoticiaBySlug(slug)
  if (!noticia) return { title: "Notícia não encontrada" }

  return {
    title: noticia.title,
    description: noticia.excerpt ?? undefined,
    openGraph: {
      title: noticia.title,
      description: noticia.excerpt ?? undefined,
      images: noticia.cover_url ? [{ url: noticia.cover_url }] : [],
      url: `${SITE_URL}/noticias/${noticia.slug}`,
      type: "article",
      publishedTime: noticia.published_at ?? undefined,
    },
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params
  const [noticia, related] = await Promise.all([
    getNoticiaBySlug(slug),
    getLatestNoticias(3),
  ])

  if (!noticia) notFound()

  const relatedNoticias = related.filter((n) => n.id !== noticia.id).slice(0, 3)

  return (
    <div className="pt-20 lg:pt-24">
      {/* Cover */}
      {noticia.cover_url && (
        <div className="relative h-64 sm:h-80 lg:h-96 bg-slate-200 overflow-hidden">
          <Image
            src={noticia.cover_url}
            alt={noticia.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="mb-6 text-slate-500 hover:text-slate-900 -ml-2">
          <Link href="/noticias">
            <ArrowLeft className="size-4 mr-1" />
            Voltar às Notícias
          </Link>
        </Button>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
          <Calendar className="size-4 text-primary-500" />
          {noticia.published_at
            ? formatDateLong(noticia.published_at)
            : formatDateLong(noticia.created_at)}
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-slate-900 leading-tight mb-6">
          {noticia.title}
        </h1>

        {/* Excerpt */}
        {noticia.excerpt && (
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-primary-500 pl-4 mb-8">
            {noticia.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-8" />

        {/* Content */}
        <div
          className="prose prose-lg prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: noticia.content_html }}
        />
      </div>

      {/* Related news */}
      {relatedNoticias.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-8">
              Outras notícias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNoticias.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
