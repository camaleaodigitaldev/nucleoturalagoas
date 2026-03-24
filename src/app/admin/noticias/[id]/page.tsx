import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { NoticiaForm } from "../NoticiaForm"

export const metadata: Metadata = { title: "Editar Notícia" }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditNoticiaPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("noticias").select("*").eq("id", id).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-slate-900 mb-6">Editar Notícia</h1>
      <NoticiaForm noticia={data} />
    </div>
  )
}
