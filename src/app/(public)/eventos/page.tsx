import type { Metadata } from "next"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { EmptyState } from "@/components/shared/EmptyState"
import { Badge } from "@/components/ui/badge"
import { getPublishedEventos } from "@/lib/queries/eventos"
import { formatDateLong, formatDate } from "@/lib/utils"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Eventos",
  description: "Confira a agenda de eventos do turismo alagoano — feiras, festivais, encontros e muito mais.",
}

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function EventosPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  const { data: eventos, totalPages } = await getPublishedEventos(page, 9)
  const now = new Date()

  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos"
        description="Fique por dentro da agenda do turismo em Alagoas"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {eventos.length === 0 ? (
          <EmptyState
            title="Nenhum evento cadastrado"
            description="Fique ligado! Em breve teremos novidades na agenda."
          />
        ) : (
          <div className="space-y-6">
            {eventos.map((evento) => {
              const startDate = new Date(evento.start_date)
              const isPast = startDate < now
              const isToday = formatDate(evento.start_date) === formatDate(now.toISOString())

              return (
                <article
                  key={evento.id}
                  id={evento.slug}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                    isPast ? "opacity-70 border-slate-100" : "border-slate-100 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="grid sm:grid-cols-[auto_1fr] gap-0">
                    {/* Date sidebar */}
                    <div className="bg-primary-700 text-white p-6 flex flex-col items-center justify-center min-w-28 text-center">
                      <p className="text-primary-200 text-xs font-bold uppercase tracking-wider">
                        {formatDate(evento.start_date, "MMM")}
                      </p>
                      <p className="font-display font-bold text-4xl leading-none my-1">
                        {formatDate(evento.start_date, "dd")}
                      </p>
                      <p className="text-primary-200 text-xs">
                        {formatDate(evento.start_date, "yyyy")}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6">
                      {/* Cover */}
                      {evento.cover_url && (
                        <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <Image
                            src={evento.cover_url}
                            alt={evento.title}
                            fill
                            className="object-cover"
                            sizes="192px"
                          />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h2 className="font-display font-bold text-lg text-slate-900 leading-snug">
                            {evento.title}
                          </h2>
                          {isToday && (
                            <Badge className="bg-secondary-500 text-white border-0 shrink-0">Hoje</Badge>
                          )}
                          {!isPast && !isToday && (
                            <Badge className="bg-primary-100 text-primary-700 border-0 shrink-0">Em breve</Badge>
                          )}
                          {isPast && (
                            <Badge variant="secondary" className="shrink-0">Encerrado</Badge>
                          )}
                        </div>

                        <div className="space-y-1.5 mb-3">
                          <p className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Clock className="size-3.5 text-primary-500 shrink-0" />
                            {formatDateLong(evento.start_date)}
                            {evento.end_date && ` até ${formatDateLong(evento.end_date)}`}
                          </p>
                          {evento.location && (
                            <p className="flex items-center gap-1.5 text-sm text-slate-500">
                              <MapPin className="size-3.5 text-primary-500 shrink-0" />
                              {evento.location}
                              {evento.city && `, ${evento.city.name}`}
                            </p>
                          )}
                        </div>

                        {evento.excerpt && (
                          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {evento.excerpt}
                          </p>
                        )}

                        {evento.content_html && (
                          <div
                            className="prose prose-sm prose-slate mt-4 max-w-none"
                            dangerouslySetInnerHTML={{ __html: evento.content_html }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?page=${p}`}
                className={`size-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-primary-300"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
