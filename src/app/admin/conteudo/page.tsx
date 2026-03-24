import type { Metadata } from "next"
import { getAllSiteContent } from "@/lib/queries/site-content"
import { ConteudoEditor } from "./ConteudoEditor"

export const metadata: Metadata = { title: "Conteúdo do Site — Admin" }

export default async function AdminConteudoPage() {
  const content = await getAllSiteContent()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Conteúdo do Site</h1>
        <p className="text-slate-500 text-sm mt-0.5">Edite os textos que aparecem no site</p>
      </div>
      <ConteudoEditor initialContent={content} />
    </div>
  )
}
