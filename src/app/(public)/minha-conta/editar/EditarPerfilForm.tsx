"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Loader2 } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { AssociadoWithRelations } from "@/types"
import type { Database } from "@/types/database.types"

type Category = Database["public"]["Tables"]["categories"]["Row"]
type City = Database["public"]["Tables"]["cities"]["Row"]

const schema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  website: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  external_link: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  description_html: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  city_id: z.string().uuid().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

interface EditarPerfilFormProps {
  associado: AssociadoWithRelations
  categories: Category[]
  cities: City[]
}

export function EditarPerfilForm({ associado, categories, cities }: EditarPerfilFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [logoUrl, setLogoUrl] = useState(associado.logo_url ?? "")
  const [coverUrl, setCoverUrl] = useState(associado.cover_url ?? "")

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      name: associado.name,
      phone: associado.phone ?? "",
      whatsapp: associado.whatsapp ?? "",
      instagram: associado.instagram ?? "",
      website: associado.website ?? "",
      external_link: associado.external_link ?? "",
      description_html: associado.description_html ?? "",
      category_id: associado.category_id ?? null,
      city_id: associado.city_id ?? null,
    },
  })

  async function onSubmit(values: FormValues) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("associados") as any)
      .update({
        name: values.name,
        phone: values.phone ?? null,
        whatsapp: values.whatsapp ?? null,
        instagram: values.instagram ?? null,
        description_html: values.description_html ?? null,
        category_id: values.category_id ?? null,
        city_id: values.city_id ?? null,
        logo_url: logoUrl || null,
        cover_url: coverUrl || null,
        website: values.website || null,
        external_link: values.external_link || null,
      })
      .eq("id", associado.id)

    if (error) { toast.error(error.message); return }
    toast.success("Perfil atualizado!")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          <Card>
            <CardHeader><CardTitle className="text-base">Informações Básicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome *</Label>
                <Input {...register("name")} placeholder="Nome do seu negócio" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Controller
                    control={control}
                    name="category_id"
                    render={({ field }) => (
                      <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v || null)}>
                        <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Sem categoria</SelectItem>
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
                      <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v || null)}>
                        <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Sem cidade</SelectItem>
                          {cities.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Controller
                  control={control}
                  name="description_html"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Descreva seu negócio..."
                      minHeight="200px"
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader><CardTitle className="text-base">Contato</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input {...register("phone")} type="tel" placeholder="(82) 9 9999-9999" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp (com DDI, ex: 5582...)</Label>
                  <Input {...register("whatsapp")} type="tel" placeholder="5582999999999" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instagram (@handle)</Label>
                  <Input {...register("instagram")} placeholder="@seuperfil" />
                </div>
                <div className="space-y-2">
                  <Label>Site</Label>
                  <Input {...register("website")} type="url" placeholder="https://..." />
                  {errors.website && <p className="text-xs text-destructive">{errors.website.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link externo (reservas, cardápio etc.)</Label>
                <Input {...register("external_link")} type="url" placeholder="https://..." />
                {errors.external_link && <p className="text-xs text-destructive">{errors.external_link.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card>
            <CardContent className="p-5">
              <ImageUploader
                bucket="logos"
                path={`associados/${associado.id}/logo`}
                currentUrl={logoUrl}
                onUpload={setLogoUrl}
                onRemove={() => setLogoUrl("")}
                label="Logo"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <ImageUploader
                bucket="covers"
                path={`associados/${associado.id}/cover`}
                currentUrl={coverUrl}
                onUpload={setCoverUrl}
                onRemove={() => setCoverUrl("")}
                label="Foto de capa"
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </div>
    </form>
  )
}
