"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Loader2, Globe, GlobeLock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { SlugInput } from "@/components/admin/SlugInput"
import { noticiaSchema, type NoticiaValues } from "@/lib/validations/noticia"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Noticia } from "@/types"

interface NoticiaFormProps {
  noticia?: Noticia
}

export function NoticiaForm({ noticia }: NoticiaFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [coverUrl, setCoverUrl] = useState(noticia?.cover_url ?? "")
  const isEditing = !!noticia

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NoticiaValues>({
    resolver: zodResolver(noticiaSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      title: noticia?.title ?? "",
      slug: noticia?.slug ?? "",
      excerpt: noticia?.excerpt ?? "",
      content_html: noticia?.content_html ?? "",
      published: noticia?.published ?? false,
      featured: noticia?.featured ?? false,
    },
  })

  const watchTitle = watch("title")
  const watchPublished = watch("published")

  async function onSubmit(values: NoticiaValues) {
    const payload = {
      ...values,
      cover_url: coverUrl || null,
      published_at: values.published && !noticia?.published_at
        ? new Date().toISOString()
        : noticia?.published_at,
    }

    if (isEditing) {
      const { error } = await supabase.from("noticias").update(payload).eq("id", noticia.id)
      if (error) { toast.error(error.message); return }
    } else {
      const { error } = await supabase.from("noticias").insert(payload)
      if (error) { toast.error(error.message); return }
    }

    toast.success(isEditing ? "Notícia salva!" : "Notícia criada!")
    router.push("/admin/noticias")
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
                <Input {...register("title")} placeholder="Título da notícia" className="text-lg" />
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
                    prefix="/noticias/"
                    error={errors.slug?.message}
                  />
                )}
              />

              <div className="space-y-2">
                <Label>Resumo</Label>
                <Textarea {...register("excerpt")} rows={2} placeholder="Breve resumo (máx. 300 caracteres)" />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo *</Label>
                <Controller
                  control={control}
                  name="content_html"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Escreva o conteúdo da notícia..."
                      minHeight="300px"
                    />
                  )}
                />
                {errors.content_html && <p className="text-xs text-destructive">{errors.content_html.message}</p>}
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
                path={`noticias/${noticia?.id ?? "new"}`}
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
            {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar Notícia"}
          </Button>
        </div>
      </div>
    </form>
  )
}
