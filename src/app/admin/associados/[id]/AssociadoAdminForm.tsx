"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Loader2, Plus, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { SlugInput } from "@/components/admin/SlugInput"
import { GalleryManager } from "@/components/admin/GalleryManager"
import { associadoAdminSchema, type AssociadoAdminValues } from "@/lib/validations/associado"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Category, City, AssociadoWithRelations } from "@/types"
import Link from "next/link"

interface AssociadoAdminFormProps {
  associado?: AssociadoWithRelations
  categories: Category[]
  cities: City[]
}

export function AssociadoAdminForm({ associado, categories, cities }: AssociadoAdminFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const isEditing = !!associado
  const [logoUrl, setLogoUrl] = useState(associado?.logo_url ?? "")
  const [coverUrl, setCoverUrl] = useState(associado?.cover_url ?? "")
  const [services, setServices] = useState<{ id?: string; name: string }[]>(
    associado?.services ?? []
  )
  const [newService, setNewService] = useState("")

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AssociadoAdminValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(associadoAdminSchema) as any,
    defaultValues: {
      name: associado?.name ?? "",
      slug: associado?.slug ?? "",
      description: associado?.description ?? "",
      description_html: associado?.description_html ?? "",
      phone: associado?.phone ?? "",
      whatsapp: associado?.whatsapp ?? "",
      instagram: associado?.instagram ?? "",
      website: associado?.website ?? "",
      external_link: associado?.external_link ?? "",
      category_id: associado?.category_id ?? undefined,
      city_id: associado?.city_id ?? undefined,
      status: associado?.status ?? "pending",
      featured: associado?.featured ?? false,
      sort_order: associado?.sort_order ?? 0,
    },
  })

  const watchName = watch("name")

  async function onSubmit(values: AssociadoAdminValues) {
    const payload = {
      ...values,
      logo_url: logoUrl || null,
      cover_url: coverUrl || null,
      updated_at: new Date().toISOString(),
    }

    if (isEditing) {
      const { error } = await supabase.from("associados").update(payload).eq("id", associado.id)
      if (error) { toast.error("Erro ao salvar: " + error.message); return }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("associado_services") as any).delete().eq("associado_id", associado.id)
      if (services.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("associado_services") as any).insert(
          services.map((s, i) => ({ associado_id: associado.id, name: s.name, sort_order: i }))
        )
      }

      toast.success("Associado salvo com sucesso!")
      router.refresh()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newAssociado, error } = await (supabase.from("associados") as any)
        .insert(payload)
        .select()
        .single()
      if (error) { toast.error("Erro ao criar: " + error.message); return }

      if (services.length > 0 && newAssociado) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("associado_services") as any).insert(
          services.map((s, i) => ({ associado_id: newAssociado.id, name: s.name, sort_order: i }))
        )
      }

      toast.success("Associado criado com sucesso!")
      router.push("/admin/associados")
      router.refresh()
    }
  }

  function addService() {
    if (!newService.trim()) return
    setServices((prev) => [...prev, { name: newService.trim() }])
    setNewService("")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="media">Mídia</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* ── Info Tab ── */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Dados básicos</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input {...register("name")} placeholder="Nome da empresa" />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <SlugInput
                      value={field.value}
                      onChange={field.onChange}
                      watchValue={watchName}
                      error={errors.slug?.message}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Resumo (exibido na listagem)</Label>
                <Textarea {...register("description")} rows={2} placeholder="Breve descrição, até 300 caracteres" />
              </div>

              <div className="space-y-2">
                <Label>Descrição completa</Label>
                <Controller
                  control={control}
                  name="description_html"
                  render={({ field }) => (
                    <RichTextEditor value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Contato & Redes</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input {...register("phone")} placeholder="(82) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input {...register("whatsapp")} placeholder="(82) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input {...register("instagram")} placeholder="@handle ou URL" />
              </div>
              <div className="space-y-2">
                <Label>Site</Label>
                <Input {...register("website")} placeholder="https://..." />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Link externo principal (reservas, booking, etc.)</Label>
                <Input {...register("external_link")} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Classificação</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Controller
                  control={control}
                  name="city_id"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Media Tab ── */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-8">
              <ImageUploader
                bucket="logos"
                path={associado?.id ?? "new"}
                currentUrl={logoUrl}
                onUpload={setLogoUrl}
                onRemove={() => setLogoUrl("")}
                aspect="square"
                label="Logo"
              />
              <ImageUploader
                bucket="covers"
                path={associado?.id ?? "new"}
                currentUrl={coverUrl}
                onUpload={setCoverUrl}
                onRemove={() => setCoverUrl("")}
                aspect="video"
                label="Imagem de capa"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Galeria de fotos</CardTitle></CardHeader>
            <CardContent>
              {associado ? (
                <GalleryManager associadoId={associado.id} initialPhotos={associado.photos ?? []} />
              ) : (
                <p className="text-sm text-slate-400">Salve o associado primeiro para adicionar fotos.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Services Tab ── */}
        <TabsContent value="services">
          <Card>
            <CardHeader><CardTitle className="text-base">Serviços oferecidos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Nome do serviço"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService() } }}
                />
                <Button type="button" onClick={addService} variant="outline">
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {services.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="flex-1 text-sm text-slate-700">{s.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-slate-400 hover:text-destructive"
                      onClick={() => setServices((prev) => prev.filter((_, j) => j !== i))}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ))}
                {services.length === 0 && (
                  <p className="text-sm text-slate-400">Nenhum serviço adicionado.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Settings Tab ── */}
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-medium text-sm text-slate-800">Em destaque na home</p>
                  <p className="text-xs text-slate-500">Exibir na seção de associados em destaque</p>
                </div>
                <Controller
                  control={control}
                  name="featured"
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Ordem de exibição</Label>
                <Input
                  type="number"
                  min={0}
                  {...register("sort_order", { valueAsNumber: true })}
                  className="w-32"
                />
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-slate-600"
                >
                  <Link href={`/associados/${associado?.slug ?? ""}`} target="_blank">
                    <ExternalLink className="size-3.5 mr-2" />
                    Ver página pública
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save button */}
      <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
        <Button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 min-w-32"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
          {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar Associado"}
        </Button>
      </div>
    </form>
  )
}
