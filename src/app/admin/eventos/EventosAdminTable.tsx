"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2, Eye, Globe, GlobeLock, MapPin, Calendar } from "lucide-react"
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
import { formatDate } from "@/lib/utils"
import type { EventoWithCity } from "@/types"

export function EventosAdminTable({ data }: { data: EventoWithCity[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function togglePublished(id: string, published: boolean) {
    const { error } = await supabase
      .from("eventos")
      .update({ published: !published })
      .eq("id", id)
    if (error) { toast.error("Erro."); return }
    toast.success(!published ? "Publicado!" : "Despublicado.")
    router.refresh()
  }

  async function handleDelete() {
    if (!deleteId) return
    await supabase.from("eventos").delete().eq("id", deleteId)
    toast.success("Evento excluído.")
    setDeleteId(null)
    router.refresh()
  }

  const columns: ColumnDef<EventoWithCity>[] = [
    {
      accessorKey: "title",
      header: "Evento",
      cell: ({ row }) => {
        const e = row.original
        return (
          <div>
            <p className="font-medium text-sm text-slate-900 line-clamp-1">{e.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="size-3" />
                {formatDate(e.start_date)}
              </span>
              {e.city && (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="size-3" />
                  {e.city.name}
                </span>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Local",
      cell: ({ row }) => (
        <span className="text-sm text-slate-500 line-clamp-1">
          {row.original.location ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          row.original.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
        }`}>
          {row.original.published ? "Publicado" : "Rascunho"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const e = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {e.published && (
                <DropdownMenuItem asChild>
                  <Link href={`/eventos`} target="_blank">
                    <Eye className="size-3.5 mr-2" />Ver no site
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/admin/eventos/${e.id}`}><Edit className="size-3.5 mr-2" />Editar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => togglePublished(e.id, e.published)}>
                {e.published
                  ? <><GlobeLock className="size-3.5 mr-2" />Despublicar</>
                  : <><Globe className="size-3.5 mr-2" />Publicar</>
                }
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteId(e.id)} className="text-destructive">
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
      <DataTable columns={columns} data={data} searchKey="title" searchPlaceholder="Buscar evento..." />
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir evento?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação é irreversível.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
