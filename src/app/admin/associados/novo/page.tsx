import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCategories, getCities } from "@/lib/queries/categories"
import { AssociadoAdminForm } from "../[id]/AssociadoAdminForm"

export const metadata: Metadata = { title: "Novo Associado — Admin" }

export default async function NovoAssociadoPage() {
  const [categories, cities] = await Promise.all([
    getCategories(),
    getCities(),
  ])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/associados" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Novo Associado</h1>
          <p className="text-slate-500 text-sm mt-0.5">Cadastre um novo associado</p>
        </div>
      </div>
      <AssociadoAdminForm categories={categories} cities={cities} />
    </div>
  )
}
