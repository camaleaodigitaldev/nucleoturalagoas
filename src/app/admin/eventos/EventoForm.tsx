"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { SlugInput } from "@/components/admin/SlugInput"
import { eventoSchema, type EventoValues } from "@/lib/validations/evento"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { EventoWithCity } from "@/types"
import type { Database } from "@/types/database.types"

type City = Database["public"]["Tables"]["cities"]["Row"]

interface EventoFormProps {
  evento?: EventoWithCity
  cities: City[]
}

export function EventoForm({ evento, cities }: EventoFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [coverUrl, setCoverUrl] = useState(evento?.cover_url ?? "")
  const isEditing = !!evento

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventoValues>({
    resolver: zodResolver(eventoSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      title: evento?.title ?? "",
      slug: evento?.slug ?? "",
      excerpt: evento?.excerpt ?? "",
      content_html: evento?.content_html ?? "",
      location: evento?.location ?? "",
      city_id: evento?.city_id ?? null,
      start_date: evento?.start_date ? evento.start_date.slice(0, 10) : "",
      end_date: evento?.end_date ? evento.end_date.slice(0, 10) : null,
      published: evento?.published ?? false,
      featured: evento?.featured ?? false,
    },
  })

  const watchTitle = watch("title")
  const watchPublished = watch("published")

  async function onSubmit(values: EventoValues) {
    const payload = {
      ...values,
      cover_url: coverUrl || null,
    }

    if (isEditing) {
      const { error } = await supabase.from("eventos").update(payload).eq("id", evento.id)
      if (error) { toast.error(error.message); return }
    } else {
      const { error } = await supabase.from("eventos").insert(payload)
      if (error) { toast.error(error.message); return }
    }

    toast.success(isEditing ? "Evento salvo!" : "Evento criado!")
    router.push("/admin/eventos")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Título *</Label>
                <Input {...register("title")} placeholder="Título do evento" className="text-lg" />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>

              <Controller
                control={control}
                name="slug"
                render={({ field }) => (
                  <SlugInput
                    value={field.value}
                    onChange={field.onChange}
                    watchValue={watchTitle}
                    prefix="/eventos/"
                    error={errors.slug?.message}
                  />
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de início *</Label>
                  <Input type="date" {...register("start_date")} />
                  {errors.start_date && <p className="text-xs text-destructive">{errors.start_date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Data de fim</Label>
                  <Input type="date" {...register("end_date")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Local / Endereço</Label>
                  <Input {...register("location")} placeholder="Ex: Centro de Convenções" />
                </div>
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Controller
                    control={control}
                    name="city_id"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={(v) => field.onChange(v || null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
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
                <Label>Resumo</Label>
                <Textarea {...register("excerpt")} rows={2} placeholder="Breve resumo (máx. 300 caracteres)" />
              </div>

              <div className="space-y-2">
                <Label>Descrição completa</Label>
                <Controller
                  control={control}
                  name="content_html"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Descreva o evento em detalhes..."
                      minHeight="250px"
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-slate-800">Publicar</p>
                  <p className="text-xs text-slate-500">
                    {watchPublished ? "Visível no site" : "Rascunho privado"}
                  </p>
                </div>
                <Controller
                  control={control}
                  name="published"
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-slate-800">Destaque</p>
                  <p className="text-xs text-slate-500">Exibir em destaque</p>
                </div>
                <Controller
                  control={control}
                  name="featured"
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <ImageUploader
                bucket="covers"
                path={`eventos/${evento?.id ?? "new"}`}
                currentUrl={coverUrl}
                onUpload={setCoverUrl}
                onRemove={() => setCoverUrl("")}
                label="Imagem de capa"
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
            {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar Evento"}
          </Button>
        </div>
      </div>
    </form>
  )
}
