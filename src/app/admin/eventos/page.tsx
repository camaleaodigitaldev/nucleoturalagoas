import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllEventosAdmin } from "@/lib/queries/eventos"
import { EventosAdminTable } from "./EventosAdminTable"

export const metadata: Metadata = { title: "Eventos — Admin" }

export default async function AdminEventosPage() {
  const eventos = await getAllEventosAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Eventos</h1>
          <p className="text-slate-500 text-sm mt-0.5">{eventos.length} eventos</p>
        </div>
        <Button asChild className="bg-primary-600 hover:bg-primary-700">
          <Link href="/admin/eventos/novo">
            <Plus className="size-4 mr-2" />
            Novo Evento
          </Link>
        </Button>
      </div>
      <EventosAdminTable data={eventos} />
    </div>
  )
}
