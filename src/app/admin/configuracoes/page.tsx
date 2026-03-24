import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/queries/site-content"
import { ConfiguracoesForm } from "./ConfiguracoesForm"

export const metadata: Metadata = { title: "Configurações — Admin" }

export default async function AdminConfiguracoesPage() {
  const settings = await getSiteSettings()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Configurações</h1>
        <p className="text-slate-500 text-sm mt-0.5">Informações gerais do site</p>
      </div>
      <ConfiguracoesForm initialSettings={settings} />
    </div>
  )
}
