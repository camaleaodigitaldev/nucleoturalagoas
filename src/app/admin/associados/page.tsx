import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssociadosAdminTable } from "./AssociadosAdminTable"
import { getAllAssociadosAdmin } from "@/lib/queries/associados"

export const metadata: Metadata = { title: "Associados — Admin" }

export default async function AdminAssociadosPage() {
  const associados = await getAllAssociadosAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Associados</h1>
          <p className="text-slate-500 text-sm mt-0.5">{associados.length} registros</p>
        </div>
        <Button asChild className="bg-primary-600 hover:bg-primary-700">
          <Link href="/admin/associados/novo">
            <Plus className="size-4 mr-2" />
            Novo Associado
          </Link>
        </Button>
      </div>

      <AssociadosAdminTable data={associados} />
    </div>
  )
}
