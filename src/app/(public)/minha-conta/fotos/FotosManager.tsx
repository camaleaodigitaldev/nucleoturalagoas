"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { UPLOAD_CONFIG } from "@/lib/constants"
import type { AssociadoPhoto } from "@/types"

interface FotosManagerProps {
  associadoId: string
  photos: AssociadoPhoto[]
}

export function FotosManager({ associadoId, photos: initialPhotos }: FotosManagerProps) {
  const router = useRouter()
  const supabase = createClient()
  const [photos, setPhotos] = useState(initialPhotos)
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    if (photos.length + files.length > UPLOAD_CONFIG.maxGalleryPhotos) {
      toast.error(`Máximo de ${UPLOAD_CONFIG.maxGalleryPhotos} fotos permitidas.`)
      return
    }

    setUploading(true)

    for (const file of files) {
      if (!UPLOAD_CONFIG.acceptedTypes.includes(file.type)) {
        toast.error(`Tipo inválido: ${file.name}`)
        continue
      }
      if (file.size > UPLOAD_CONFIG.maxSizeMB * 1024 * 1024) {
        toast.error(`${file.name} é muito grande (máx ${UPLOAD_CONFIG.maxSizeMB}MB)`)
        continue
      }

      const ext = file.name.split(".").pop()
      const fileName = `${associadoId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600" })

      if (error) { toast.error(`Erro ao enviar ${file.name}`); continue }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(data.path)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: photo, error: dbError } = await (supabase.from("associado_photos") as any)
        .insert({ associado_id: associadoId, url: urlData.publicUrl, sort_order: photos.length })
        .select()
        .single()

      if (!dbError && photo) {
        setPhotos((prev) => [...prev, photo])
      }
    }

    setUploading(false)
    e.target.value = ""
    toast.success("Fotos enviadas!")
    router.refresh()
  }

  async function handleDelete(photo: AssociadoPhoto) {
    const pathPart = photo.url.split("/storage/v1/object/public/gallery/")[1]
    if (pathPart) await supabase.storage.from("gallery").remove([pathPart])

    await supabase.from("associado_photos").delete().eq("id", photo.id)
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
    toast.success("Foto removida.")
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        {/* Upload area */}
        <label className="flex items-center gap-4 cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-5 hover:border-primary-300 hover:bg-primary-50/30 transition-colors">
          {uploading ? (
            <Loader2 className="size-6 text-primary-500 animate-spin shrink-0" />
          ) : (
            <Upload className="size-6 text-slate-400 shrink-0" />
          )}
          <div>
            <p className="font-medium text-sm text-slate-700">
              {uploading ? "Enviando fotos..." : "Adicionar fotos"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              JPEG, PNG ou WebP · máx {UPLOAD_CONFIG.maxSizeMB}MB cada · até {UPLOAD_CONFIG.maxGalleryPhotos} fotos
            </p>
          </div>
          <input
            type="file"
            multiple
            accept={UPLOAD_CONFIG.acceptedTypes.join(",")}
            className="sr-only"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        {/* Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group">
                <Image
                  src={photo.url}
                  alt={photo.caption ?? "Foto"}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="size-9"
                    onClick={() => handleDelete(photo)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !uploading && (
            <p className="text-center text-sm text-slate-400 py-6">
              Nenhuma foto adicionada ainda.
            </p>
          )
        )}

        <p className="text-xs text-slate-400">
          {photos.length}/{UPLOAD_CONFIG.maxGalleryPhotos} fotos
        </p>
      </CardContent>
    </Card>
  )
}
