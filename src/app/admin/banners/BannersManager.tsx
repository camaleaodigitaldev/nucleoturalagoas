"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Eye, EyeOff, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Banner } from "@/types"

export function BannersManager({ initialBanners }: { initialBanners: Banner[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [banners, setBanners] = useState(initialBanners)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    cta_text: "",
    cta_url: "",
    image_url: "",
  })

  async function handleCreate() {
    if (!form.image_url) { toast.error("Adicione uma imagem."); return }
    setSaving(true)

    const { data, error } = await supabase
      .from("banners")
      .insert({ ...form, sort_order: banners.length })
      .select()
      .single()

    if (error) { toast.error(error.message); setSaving(false); return }

    setBanners((prev) => [...prev, data])
    setForm({ title: "", subtitle: "", cta_text: "", cta_url: "", image_url: "" })
    setOpen(false)
    toast.success("Banner criado!")
    setSaving(false)
  }

  async function toggleActive(banner: Banner) {
    const { error } = await supabase
      .from("banners")
      .update({ active: !banner.active })
      .eq("id", banner.id)

    if (error) { toast.error("Erro."); return }
    setBanners((prev) => prev.map((b) => b.id === banner.id ? { ...b, active: !b.active } : b))
    toast.success(banner.active ? "Banner desativado." : "Banner ativado!")
  }

  async function handleDelete(id: string) {
    await supabase.from("banners").delete().eq("id", id)
    setBanners((prev) => prev.filter((b) => b.id !== id))
    toast.success("Banner removido.")
  }

  return (
    <div className="space-y-5">
      {/* Create button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary-600 hover:bg-primary-700">
            <Plus className="size-4 mr-2" />
            Novo Banner
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ImageUploader
              bucket="banners"
              path={`banner-${Date.now()}`}
              currentUrl={form.image_url}
              onUpload={(url) => setForm((f) => ({ ...f, image_url: url }))}
              aspect="banner"
              label="Imagem do banner"
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Texto principal" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Subtítulo</Label>
                <Input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} placeholder="Texto secundário" />
              </div>
              <div className="space-y-1.5">
                <Label>Texto do botão</Label>
                <Input value={form.cta_text} onChange={(e) => setForm((f) => ({ ...f, cta_text: e.target.value }))} placeholder="Ex: Saiba mais" />
              </div>
              <div className="space-y-1.5">
                <Label>URL do botão</Label>
                <Input value={form.cta_url} onChange={(e) => setForm((f) => ({ ...f, cta_url: e.target.value }))} placeholder="/associados" />
              </div>
            </div>
            <Button onClick={handleCreate} className="w-full bg-primary-600 hover:bg-primary-700" disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
              Criar Banner
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Banners list */}
      {banners.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p>Nenhum banner criado. Crie o primeiro!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => (
            <Card key={banner.id} className={`border-slate-100 ${!banner.active ? "opacity-60" : ""}`}>
              <CardContent className="p-4 flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <Image src={banner.image_url} alt={banner.title ?? "Banner"} fill className="object-cover" sizes="160px" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {banner.title ?? "(sem título)"}
                  </p>
                  {banner.subtitle && (
                    <p className="text-xs text-slate-500 truncate">{banner.subtitle}</p>
                  )}
                  {banner.cta_url && (
                    <p className="text-xs text-primary-600 mt-1 font-mono truncate">{banner.cta_url}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{banner.active ? "Ativo" : "Inativo"}</span>
                    <Switch checked={banner.active} onCheckedChange={() => toggleActive(banner)} />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-slate-400 hover:text-destructive"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
