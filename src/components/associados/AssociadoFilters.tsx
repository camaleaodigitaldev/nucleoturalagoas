"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category, City } from "@/types"
import { useCallback, useTransition } from "react"

interface AssociadoFiltersProps {
  categories: Category[]
  cities: City[]
  currentCategory?: string
  currentCity?: string
  currentSearch?: string
}

export function AssociadoFilters({
  categories,
  cities,
  currentCategory,
  currentCity,
  currentSearch,
}: AssociadoFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }

      params.delete("page")

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams]
  )

  const hasFilters = currentCategory || currentCity || currentSearch

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Buscar associado..."
            defaultValue={currentSearch}
            className="pl-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters({ busca: (e.target as HTMLInputElement).value || undefined })
              }
            }}
            onChange={(e) => {
              if (!e.target.value) updateFilters({ busca: undefined })
            }}
          />
        </div>

        {/* Category filter */}
        <Select
          value={currentCategory ?? "all"}
          onValueChange={(v) => updateFilters({ categoria: v === "all" ? undefined : v })}
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City filter */}
        <Select
          value={currentCity ?? "all"}
          onValueChange={(v) => updateFilters({ cidade: v === "all" ? undefined : v })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Cidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as cidades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.slug}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateFilters({ categoria: undefined, cidade: undefined, busca: undefined })}
            className="shrink-0 text-slate-500 hover:text-slate-900"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {isPending && (
        <p className="text-xs text-primary-600 mt-2 animate-pulse">Filtrando...</p>
      )}
    </div>
  )
}
