import type { Metadata } from "next"
import { NoticiaForm } from "../NoticiaForm"

export const metadata: Metadata = { title: "Nova Notícia" }

export default function NovaNoticiaPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-slate-900 mb-6">Nova Notícia</h1>
      <NoticiaForm />
    </div>
  )
}
