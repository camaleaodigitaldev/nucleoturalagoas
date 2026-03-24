import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getCities } from "@/lib/queries/categories"
import { EventoForm } from "../EventoForm"
import type { EventoWithCity } from "@/types"

export const metadata: Metadata = { title: "Editar Evento — Admin" }

export default async function EditarEventoPage({ params }: { params: { id: string } }) {
  const [supabase, cities] = await Promise.all([
    createClient(),
    getCities(),
  ])

  const { data: evento } = await supabase
    .from("eventos")
    .select("*, city:cities(id, name, slug)")
    .eq("id", params.id)
    .single()

  if (!evento) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/eventos" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Editar Evento</h1>
          <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">{evento.title}</p>
        </div>
      </div>
      <EventoForm evento={evento as unknown as EventoWithCity} cities={cities} />
    </div>
  )
}
