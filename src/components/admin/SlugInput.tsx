"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/lib/utils"

interface SlugInputProps {
  value: string
  onChange: (value: string) => void
  watchValue?: string
  prefix?: string
  error?: string
}

export function SlugInput({ value, onChange, watchValue, prefix = "/associados/", error }: SlugInputProps) {
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (!manual && watchValue) {
      onChange(slugify(watchValue))
    }
  }, [watchValue, manual, onChange])

  return (
    <div className="space-y-2">
      <Label>Slug (URL)</Label>
      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <span className="px-3 text-sm text-slate-400 whitespace-nowrap border-r border-slate-200 bg-white py-2.5">
          {prefix}
        </span>
        <Input
          value={value}
          onChange={(e) => {
            setManual(true)
            onChange(slugify(e.target.value) || e.target.value.toLowerCase())
          }}
          className="border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-mono"
          placeholder="meu-slug-aqui"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-slate-400">
        URL pública:{" "}
        <span className="font-mono">
          {prefix}{value || "meu-slug"}
        </span>
      </p>
    </div>
  )
}
