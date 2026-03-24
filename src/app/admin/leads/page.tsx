import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { LeadsTable } from "./LeadsTable"

export const metadata: Metadata = { title: "Leads — Admin" }

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: leads } = await (supabase as any)
    .from("seja_associado_leads")
    .select("*, category:categories(name), city:cities(name)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Leads — Seja Associado</h1>
        <p className="text-slate-500 text-sm mt-0.5">{leads?.length ?? 0} solicitações</p>
      </div>
      <LeadsTable data={leads ?? []} />
    </div>
  )
}
