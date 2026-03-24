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

const CATEGORY_BG: Record<string, string> = {
  hotelaria: "from-blue-500 to-blue-600",
  gastronomia: "from-orange-500 to-amber-500",
  agencias: "from-purple-500 to-purple-600",
  transporte: "from-slate-500 to-slate-600",
  cultura: "from-pink-500 to-rose-500",
  ecoturismo: "from-green-500 to-emerald-500",
  outros: "from-gray-500 to-gray-600",
}

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Segmentos
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900">
            Explore por categoria
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Encontre exatamente o tipo de serviço turístico que você procura
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon ?? "Grid"] ?? Grid
            const gradient = CATEGORY_BG[cat.slug] ?? "from-gray-500 to-gray-600"

            return (
              <Link
                key={cat.id}
                href={`/associados?categoria=${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div
                  className={`size-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <Icon className="size-7 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
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
