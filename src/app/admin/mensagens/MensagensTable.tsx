"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { MailOpen, Mail, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DataTable } from "@/components/admin/DataTable"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { formatDateTime } from "@/lib/utils"
import type { ContactMessage } from "@/types"

export function MensagensTable({ data }: { data: ContactMessage[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  async function markRead(msg: ContactMessage) {
    await supabase.from("contact_messages").update({ read: true }).eq("id", msg.id)
    router.refresh()
  }

  async function handleDelete(id: string) {
    await supabase.from("contact_messages").delete().eq("id", id)
    toast.success("Mensagem excluída.")
    router.refresh()
  }

  const columns: ColumnDef<ContactMessage>[] = [
    {
      accessorKey: "name",
      header: "Remetente",
      cell: ({ row }) => {
        const m = row.original
        return (
          <div className={m.read ? "" : "font-semibold"}>
            <p className="text-sm text-slate-900">{m.name}</p>
            <p className="text-xs text-slate-400">{m.email}</p>
          </div>
        )
      },
    },
    {
      accessorKey: "subject",
      header: "Assunto",
      cell: ({ row }) => (
        <span className={`text-sm ${row.original.read ? "text-slate-500" : "text-slate-900"}`}>
          {row.original.subject ?? "(sem assunto)"}
        </span>
      ),
    },
    {
      accessorKey: "read",
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          row.original.read ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"
        }`}>
          {row.original.read ? "Lida" : "Nova"}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Data",
      cell: ({ row }) => <span className="text-xs text-slate-400">{formatDateTime(row.original.created_at)}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const m = row.original
        return (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => { setSelected(m); markRead(m) }}
              title="Ver"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-slate-400 hover:text-destructive"
              onClick={() => handleDelete(m.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Buscar mensagem..." />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.subject ?? "Mensagem"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-slate-500">Nome:</span> <span className="font-medium">{selected.name}</span></div>
                <div><span className="text-slate-500">E-mail:</span> <a href={`mailto:${selected.email}`} className="font-medium text-primary-600">{selected.email}</a></div>
                {selected.phone && <div><span className="text-slate-500">Telefone:</span> {selected.phone}</div>}
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <p className="text-xs text-slate-400">{formatDateTime(selected.created_at)}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
