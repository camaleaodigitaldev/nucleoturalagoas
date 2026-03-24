import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { MensagensTable } from "./MensagensTable"

export const metadata: Metadata = { title: "Mensagens — Admin" }

export default async function AdminMensagensPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Mensagens de Contato</h1>
        <p className="text-slate-500 text-sm mt-0.5">{messages?.filter(m => !m.read).length ?? 0} não lidas</p>
      </div>
      <MensagensTable data={messages ?? []} />
    </div>
  )
}
