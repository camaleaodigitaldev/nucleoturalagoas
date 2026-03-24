import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { AssociadoCard } from "@/components/associados/AssociadoCard"
import { AssociadoFilters } from "@/components/associados/AssociadoFilters"
import { EmptyState } from "@/components/shared/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { getAssociados } from "@/lib/queries/associados"
import { getCategories, getCities } from "@/lib/queries/categories"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Associados",
  description: "Conheça todas as empresas e profissionais associados ao NúcleoTur Alagoas.",
}

interface PageProps {
  searchParams: Promise<{ categoria?: string; cidade?: string; busca?: string; page?: string }>
}

export default async function AssociadosPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  const [{ data: associados, total, totalPages }, categories, cities] = await Promise.all([
    getAssociados({
      category: params.categoria,
      city: params.cidade,
      search: params.busca,
      page,
    }),
    getCategories(),
    getCities(),
  ])

  return (
    <>
      <PageHeader
        eyebrow="NúcleoTur Alagoas"
        title="Nossos Associados"
        description="Empresas e profissionais do turismo alagoano reunidos em um só lugar"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={<Skeleton className="h-20 rounded-2xl" />}>
            <AssociadoFilters
              categories={categories}
              cities={cities}
              currentCategory={params.categoria}
              currentCity={params.cidade}
              currentSearch={params.busca}
            />
          </Suspense>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          {total === 0
            ? "Nenhum associado encontrado"
            : `${total} associado${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`}
        </p>

        {/* Grid */}
        {associados.length === 0 ? (
          <EmptyState
            title="Nenhum associado encontrado"
            description="Tente remover os filtros ou buscar por outro termo."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {associados.map((a) => (
              <AssociadoCard key={a.id} associado={a} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?${new URLSearchParams({
                  ...(params.categoria ? { categoria: params.categoria } : {}),
                  ...(params.cidade ? { cidade: params.cidade } : {}),
                  ...(params.busca ? { busca: params.busca } : {}),
                  page: String(p),
                }).toString()}`}
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
      </div>
    </>
  )
}
