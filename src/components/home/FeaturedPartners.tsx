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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-label mb-4">Destaques</div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 tracking-tight">
              Associados em destaque
            </h2>
          </div>
          <Button variant="outline" asChild className="shrink-0 text-sm">
            <Link href="/associados">
              Ver todos
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {associados.map((a) => (
            <AssociadoCard key={a.id} associado={a} />
          ))}
        </div>

      </div>
    </section>
  )
}
