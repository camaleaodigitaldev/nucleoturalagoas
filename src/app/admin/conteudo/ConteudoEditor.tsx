"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { SiteContent } from "@/types"

interface ConteudoEditorProps {
  initialContent: Record<string, SiteContent>
}

export function ConteudoEditor({ initialContent }: ConteudoEditorProps) {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)

  const [values, setValues] = useState({
    home_institucional_title: initialContent["home_institucional_title"]?.value_text ?? "",
    home_institucional_text: initialContent["home_institucional_text"]?.value_text ?? "",
    home_cta_title: initialContent["home_cta_title"]?.value_text ?? "",
    home_cta_text: initialContent["home_cta_text"]?.value_text ?? "",
    quem_somos_html: initialContent["quem_somos_html"]?.value_html ?? "",
    historia_html: initialContent["historia_html"]?.value_html ?? "",
    missao: initialContent["missao"]?.value_text ?? "",
    visao: initialContent["visao"]?.value_text ?? "",
    valores: initialContent["valores"]?.value_text ?? "",
    footer_description: initialContent["footer_description"]?.value_text ?? "",
  })

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function save() {
    setSaving(true)
    const updates = [
      { key: "home_institucional_title", value_text: values.home_institucional_title, value_html: null },
      { key: "home_institucional_text", value_text: values.home_institucional_text, value_html: null },
      { key: "home_cta_title", value_text: values.home_cta_title, value_html: null },
      { key: "home_cta_text", value_text: values.home_cta_text, value_html: null },
      { key: "quem_somos_html", value_text: null, value_html: values.quem_somos_html },
      { key: "historia_html", value_text: null, value_html: values.historia_html },
      { key: "missao", value_text: values.missao, value_html: null },
      { key: "visao", value_text: values.visao, value_html: null },
      { key: "valores", value_text: values.valores, value_html: null },
      { key: "footer_description", value_text: values.footer_description, value_html: null },
    ]

    for (const update of updates) {
      await supabase.from("site_content").upsert({ ...update, updated_at: new Date().toISOString() })
    }

    // Trigger revalidation
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": process.env.NEXT_PUBLIC_REVALIDATE_SECRET ?? "",
      },
      body: JSON.stringify({}),
    }).catch(() => null)

    toast.success("Conteúdo salvo!")
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="quem-somos">Quem Somos</TabsTrigger>
          <TabsTrigger value="outros">Outros</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-5 mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Bloco institucional</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={values.home_institucional_title} onChange={(e) => update("home_institucional_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texto</Label>
                <Textarea value={values.home_institucional_text} onChange={(e) => update("home_institucional_text", e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Chamada para ação (CTA)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título CTA</Label>
                <Input value={values.home_cta_title} onChange={(e) => update("home_cta_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texto CTA</Label>
                <Textarea value={values.home_cta_text} onChange={(e) => update("home_cta_text", e.target.value)} rows={2} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quem-somos" className="space-y-5 mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Quem Somos</CardTitle></CardHeader>
            <CardContent>
              <RichTextEditor value={values.quem_somos_html} onChange={(v) => update("quem_somos_html", v)} minHeight="250px" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Nossa História</CardTitle></CardHeader>
            <CardContent>
              <RichTextEditor value={values.historia_html} onChange={(v) => update("historia_html", v)} minHeight="200px" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Missão, Visão e Valores</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Missão</Label>
                <Textarea value={values.missao} onChange={(e) => update("missao", e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Visão</Label>
                <Textarea value={values.visao} onChange={(e) => update("visao", e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Valores (separados por vírgula)</Label>
                <Input value={values.valores} onChange={(e) => update("valores", e.target.value)} placeholder="Transparência, Cooperação, ..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outros" className="space-y-5 mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Rodapé</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Descrição do rodapé</Label>
                <Textarea value={values.footer_description} onChange={(e) => update("footer_description", e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={save} className="bg-primary-600 hover:bg-primary-700 min-w-28" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
          {saving ? "Salvando..." : "Salvar tudo"}
        </Button>
      </div>
    </div>
  )
}
