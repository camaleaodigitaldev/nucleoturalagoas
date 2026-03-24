import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NoticiasAdminTable } from "./NoticiasAdminTable"
import { getAllNoticiasAdmin } from "@/lib/queries/noticias"

export const metadata: Metadata = { title: "Notícias — Admin" }

export default async function AdminNoticiasPage() {
  const noticias = await getAllNoticiasAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Notícias</h1>
          <p className="text-slate-500 text-sm mt-0.5">{noticias.length} artigos</p>
        </div>
        <Button asChild className="bg-primary-600 hover:bg-primary-700">
          <Link href="/admin/noticias/nova">
            <Plus className="size-4 mr-2" />
            Nova Notícia
          </Link>
        </Button>
      </div>
      <NoticiasAdminTable data={noticias} />
    </div>
  )
}
