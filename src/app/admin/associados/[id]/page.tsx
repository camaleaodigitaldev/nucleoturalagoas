import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getCategories, getCities } from "@/lib/queries/categories"
import { AssociadoAdminForm } from "./AssociadoAdminForm"
import { VincularUsuario } from "./VincularUsuario"

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

  // Resolve linked user email if user_id is set
  let linkedUser: { id: string; email?: string } | null = null
  if (associado.user_id) {
    const adminClient = createAdminClient()
    const { data } = await adminClient.auth.admin.getUserById(associado.user_id)
    if (data?.user) {
      linkedUser = { id: data.user.id, email: data.user.email }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-slate-900">
        Editar: {associado.name}
      </h1>
      <VincularUsuario associadoId={id} linkedUser={linkedUser} />
      <AssociadoAdminForm
        associado={associado as never}
        categories={categories}
        cities={cities}
      />
    </div>
  )
}
