"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/admin/DataTable"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { getInitials } from "@/lib/utils"
import type { AssociadoWithRelations } from "@/types"

const STATUS_STYLE: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  inactive: "bg-slate-100 text-slate-600",
}
const STATUS_LABEL: Record<string, string> = {
  active: "Ativo", pending: "Pendente", inactive: "Inativo",
}

export function AssociadosAdminTable({ data }: { data: AssociadoWithRelations[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleStatusChange(id: string, status: "active" | "inactive") {
    const { error } = await supabase.from("associados").update({ status }).eq("id", id)
    if (error) { toast.error("Erro ao atualizar status."); return }
    toast.success(`Status atualizado para ${STATUS_LABEL[status]}`)
    router.refresh()
  }

  async function handleDelete() {
    if (!deleteId) return
    const { error } = await supabase.from("associados").delete().eq("id", deleteId)
    if (error) { toast.error("Erro ao excluir associado."); return }
    toast.success("Associado excluído.")
    setDeleteId(null)
    router.refresh()
  }

  const columns: ColumnDef<AssociadoWithRelations>[] = [
    {
      accessorKey: "name",
      header: "Associado",
      cell: ({ row }) => {
        const a = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
              {a.logo_url ? (
                <Image src={a.logo_url} alt={a.name} width={36} height={36} className="object-contain size-full p-0.5" />
              ) : (
                <span className="text-xs font-bold text-slate-400">{getInitials(a.name)}</span>
              )}
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">{a.name}</p>
              <p className="text-xs text-slate-400">/associados/{a.slug}</p>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => row.original.category?.name ?? "—",
    },
    {
      accessorKey: "city",
      header: "Cidade",
      cell: ({ row }) => row.original.city?.name ?? "—",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[row.original.status]}`}>
          {STATUS_LABEL[row.original.status]}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const a = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/associados/${a.slug}`} target="_blank">
                  <Eye className="size-3.5 mr-2" />Ver no site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/associados/${a.id}`}>
                  <Edit className="size-3.5 mr-2" />Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {a.status !== "active" && (
                <DropdownMenuItem onClick={() => handleStatusChange(a.id, "active")} className="text-green-600">
                  <CheckCircle className="size-3.5 mr-2" />Ativar
                </DropdownMenuItem>
              )}
              {a.status !== "inactive" && (
                <DropdownMenuItem onClick={() => handleStatusChange(a.id, "inactive")} className="text-slate-600">
                  <XCircle className="size-3.5 mr-2" />Desativar
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteId(a.id)} className="text-destructive">
                <Trash2 className="size-3.5 mr-2" />Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Buscar associado..." />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. O associado e todos seus dados serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
