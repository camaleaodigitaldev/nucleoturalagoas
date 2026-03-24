import Link from "next/link"
import { Hotel, UtensilsCrossed, Briefcase, Bus, Palette, Leaf, Grid } from "lucide-react"
import type { Category } from "@/types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Hotel,
  UtensilsCrossed,
  Briefcase,
  Bus,
  Palette,
  Leaf,
  Grid,
}

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-label mb-4">Segmentos</div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 tracking-tight">
              Explore por categoria
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs sm:text-right">
            Serviços turísticos de Alagoas organizados por segmento
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon ?? "Grid"] ?? Grid
            return (
              <Link
                key={cat.id}
                href={`/associados?categoria=${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="size-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                  <Icon className="size-5 text-primary-600" />
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 text-center leading-tight transition-colors">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
