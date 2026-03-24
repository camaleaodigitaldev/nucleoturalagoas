"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Database } from "@/types/database.types"

type Service = Database["public"]["Tables"]["associado_services"]["Row"]

interface ServicosManagerProps {
  associadoId: string
  services: Service[]
}

export function ServicosManager({ associadoId, services: initialServices }: ServicosManagerProps) {
  const supabase = createClient()
  const [services, setServices] = useState(initialServices)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)

  async function handleAdd() {
    const name = newName.trim()
    if (!name) return

    setAdding(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("associado_services") as any)
      .insert({ associado_id: associadoId, name, sort_order: services.length })
      .select()
      .single()

    if (error) { toast.error(error.message); setAdding(false); return }

    setServices((prev) => [...prev, data])
    setNewName("")
    setAdding(false)
    toast.success("Serviço adicionado!")
  }

  async function handleDelete(id: string) {
    await supabase.from("associado_services").delete().eq("id", id)
    setServices((prev) => prev.filter((s) => s.id !== id))
    toast.success("Serviço removido.")
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      await handleAdd()
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        {/* Add service */}
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nome do serviço (ex: Pacotes de viagem, Transfer...)"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="bg-primary-600 hover:bg-primary-700 shrink-0"
          >
            <Plus className="size-4 mr-1.5" />
            Adicionar
          </Button>
        </div>

        {/* Services list */}
        {services.length > 0 ? (
          <ul className="space-y-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <GripVertical className="size-4 text-slate-300 shrink-0" />
                <span className="flex-1 text-sm text-slate-700">{service.name}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                  className="size-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-destructive hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-slate-400 py-6">
            Nenhum serviço cadastrado ainda. Adicione acima.
          </p>
        )}

        <p className="text-xs text-slate-400">{services.length} serviço(s)</p>
      </CardContent>
    </Card>
  )
}
