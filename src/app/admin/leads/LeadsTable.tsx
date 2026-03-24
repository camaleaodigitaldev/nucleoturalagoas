"use client"

import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/admin/DataTable"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { formatDateTime } from "@/lib/utils"
import { LEAD_STATUS_LABELS } from "@/lib/constants"

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  converted: "bg-green-100 text-green-700",
  rejected: "bg-slate-100 text-slate-600",
}

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  status: string
  created_at: string
  category: { name: string } | null
  city: { name: string } | null
}

export function LeadsTable({ data }: { data: Lead[] }) {
  const router = useRouter()
  const supabase = createClient()

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("seja_associado_leads")
      .update({ status: status as "new" | "contacted" | "converted" | "rejected" })
      .eq("id", id)
    if (error) { toast.error("Erro."); return }
    toast.success(`Status: ${LEAD_STATUS_LABELS[status]}`)
    router.refresh()
  }

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.name}</p>
          <p className="text-xs text-slate-400">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => row.original.phone ?? "—",
    },
    {
      id: "category",
      header: "Categoria",
      cell: ({ row }) => row.original.category?.name ?? "—",
    },
    {
      id: "city",
      header: "Cidade",
      cell: ({ row }) => row.original.city?.name ?? "—",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[row.original.status]}`}>
          {LEAD_STATUS_LABELS[row.original.status]}
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
        const lead = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => updateStatus(lead.id, "contacted")}>Marcar como Contatado</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus(lead.id, "converted")}>Marcar como Convertido</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus(lead.id, "rejected")} className="text-slate-500">Rejeitar</DropdownMenuItem>
              {lead.email && (
                <DropdownMenuItem asChild>
                  <a href={`mailto:${lead.email}`}>Enviar e-mail</a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Buscar lead..." />
}
