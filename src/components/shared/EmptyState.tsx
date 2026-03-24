import { SearchX } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = "Nenhum resultado encontrado",
  description = "Tente ajustar os filtros ou volte mais tarde.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="size-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        {icon ?? <SearchX className="size-8 text-slate-400" />}
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm">{description}</p>
    </div>
  )
}
