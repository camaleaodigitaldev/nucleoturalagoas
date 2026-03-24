import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAssociadoByUserId } from "@/lib/queries/associados"
import { FotosManager } from "./FotosManager"

export const metadata: Metadata = { title: "Galeria de Fotos — NúcleoTur Alagoas" }

export default async function FotosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const associado = await getAssociadoByUserId(user.id)
  if (!associado) redirect("/minha-conta")

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Galeria de Fotos</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Adicione fotos do seu negócio para atrair mais clientes
        </p>
      </div>
      <FotosManager associadoId={associado.id} photos={associado.photos ?? []} />
    </div>
  )
}
