import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAssociadoByUserId } from "@/lib/queries/associados"
import { ServicosManager } from "./ServicosManager"

export const metadata: Metadata = { title: "Serviços — NúcleoTur Alagoas" }

export default async function ServicosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const associado = await getAssociadoByUserId(user.id)
  if (!associado) redirect("/minha-conta")

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Serviços</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Liste os serviços e produtos que você oferece
        </p>
      </div>
      <ServicosManager associadoId={associado.id} services={associado.services ?? []} />
    </div>
  )
}
