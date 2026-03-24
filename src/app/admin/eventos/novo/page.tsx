import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCities } from "@/lib/queries/categories"
import { EventoForm } from "../EventoForm"

export const metadata: Metadata = { title: "Novo Evento — Admin" }

export default async function NovoEventoPage() {
  const cities = await getCities()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/eventos" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Novo Evento</h1>
          <p className="text-slate-500 text-sm mt-0.5">Preencha os dados do evento</p>
        </div>
      </div>
      <EventoForm cities={cities} />
    </div>
  )
}
