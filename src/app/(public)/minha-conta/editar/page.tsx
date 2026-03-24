import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAssociadoByUserId } from "@/lib/queries/associados"
import { getCategories, getCities } from "@/lib/queries/categories"
import { EditarPerfilForm } from "./EditarPerfilForm"

export const metadata: Metadata = { title: "Editar Perfil — NúcleoTur Alagoas" }

export default async function EditarPerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [associado, categories, cities] = await Promise.all([
    getAssociadoByUserId(user.id),
    getCategories(),
    getCities(),
  ])

  if (!associado) redirect("/minha-conta")

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Editar Perfil</h1>
        <p className="text-slate-500 text-sm mt-0.5">Atualize as informações do seu negócio</p>
      </div>
      <EditarPerfilForm associado={associado} categories={categories} cities={cities} />
    </div>
  )
}
