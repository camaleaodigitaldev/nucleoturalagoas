import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getCategories, getCities } from "@/lib/queries/categories"
import { AssociadoAdminForm } from "./AssociadoAdminForm"

export const metadata: Metadata = { title: "Editar Associado" }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditAssociadoPage({ params }: PageProps) {
  const { id } = await params

  const supabase = await createClient()
  const [{ data: associado }, categories, cities] = await Promise.all([
    supabase
      .from("associados")
      .select("*, services:associado_services(*), photos:associado_photos(*)")
      .eq("id", id)
      .single(),
    getCategories(),
    getCities(),
  ])

  if (!associado) notFound()

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-slate-900 mb-6">
        Editar: {associado.name}
      </h1>
      <AssociadoAdminForm
        associado={associado as never}
        categories={categories}
        cities={cities}
      />
    </div>
  )
}
