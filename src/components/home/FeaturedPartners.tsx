import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssociadoCard } from "@/components/associados/AssociadoCard"
import type { AssociadoWithRelations } from "@/types"

interface FeaturedPartnersProps {
  associados: AssociadoWithRelations[]
}

export function FeaturedPartners({ associados }: FeaturedPartnersProps) {
  if (associados.length === 0) return null

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Destaques
            </p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900">
              Associados em destaque
            </h2>
          </div>
          <Button variant="outline" asChild className="shrink-0">
            <Link href="/associados">
              Ver todos
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {associados.map((a) => (
            <AssociadoCard key={a.id} associado={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
