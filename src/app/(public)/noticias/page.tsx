import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/PageHeader"
import { NoticiaCard } from "@/components/noticias/NoticiaCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { getPublishedNoticias } from "@/lib/queries/noticias"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Notícias",
  description: "Acompanhe as últimas notícias do setor turístico de Alagoas e do NúcleoTur.",
}

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  const { data: noticias, total, totalPages } = await getPublishedNoticias(page, 9)

  return (
    <>
      <PageHeader
        eyebrow="Comunicação"
        title="Notícias"
        description="Fique por dentro das últimas novidades do turismo alagoano"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {noticias.length === 0 ? (
          <EmptyState title="Nenhuma notícia publicada" description="Em breve teremos novidades." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {noticias.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`?page=${p}`}
                    className={`size-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-700"
                    }`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
