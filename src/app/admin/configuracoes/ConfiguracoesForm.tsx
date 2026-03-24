"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const FIELDS = [
  { key: "contact_email", label: "E-mail de contato", type: "email" },
  { key: "contact_phone", label: "Telefone principal", type: "tel" },
  { key: "whatsapp", label: "WhatsApp (número com DDD e DDI, ex: 5582...)", type: "text" },
  { key: "instagram", label: "AtSign (apenas o @handle)", type: "text" },
  { key: "facebook", label: "Facebook (URL completa)", type: "url" },
  { key: "linkedin", label: "LinkedIn (URL completa)", type: "url" },
  { key: "address", label: "Endereço / Localização", type: "text" },
  { key: "cnpj", label: "CNPJ", type: "text" },
]

export function ConfiguracoesForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const router = useRouter()
  const supabase = createClient()
  const [values, setValues] = useState(initialSettings)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    for (const [key, value] of Object.entries(values)) {
      await supabase.from("site_settings").upsert({ key, value })
    }
    toast.success("Configurações salvas!")
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader><CardTitle className="text-base">Informações de Contato</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                value={values[field.key] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} className="bg-primary-600 hover:bg-primary-700" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
          {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  )
}
