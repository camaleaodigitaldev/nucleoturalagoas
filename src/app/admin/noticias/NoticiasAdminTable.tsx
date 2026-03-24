"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2, Eye, Globe, GlobeLock } from "lucide-react"
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
import type { Noticia } from "@/types"

export function NoticiasAdminTable({ data }: { data: Noticia[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function togglePublished(id: string, published: boolean) {
    const { error } = await supabase
      .from("noticias")
      .update({ published: !published, published_at: !published ? new Date().toISOString() : null })
      .eq("id", id)
    if (error) { toast.error("Erro."); return }
    toast.success(!published ? "Publicada!" : "Despublicada.")
    router.refresh()
  }

  async function handleDelete() {
    if (!deleteId) return
    await supabase.from("noticias").delete().eq("id", deleteId)
    toast.success("Notícia excluída.")
    setDeleteId(null)
    router.refresh()
  }

  const columns: ColumnDef<Noticia>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm text-slate-900 line-clamp-1">{row.original.title}</p>
          <p className="text-xs text-slate-400">{formatDate(row.original.created_at)}</p>
        </div>
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
        const n = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {n.published && (
                <DropdownMenuItem asChild>
                  <Link href={`/noticias/${n.slug}`} target="_blank">
                    <Eye className="size-3.5 mr-2" />Ver no site
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/admin/noticias/${n.id}`}><Edit className="size-3.5 mr-2" />Editar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => togglePublished(n.id, n.published)}>
                {n.published
                  ? <><GlobeLock className="size-3.5 mr-2" />Despublicar</>
                  : <><Globe className="size-3.5 mr-2" />Publicar</>
                }
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteId(n.id)} className="text-destructive">
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
      <DataTable columns={columns} data={data} searchKey="title" searchPlaceholder="Buscar notícia..." />
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notícia?</AlertDialogTitle>
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
