"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { UPLOAD_CONFIG } from "@/lib/constants"

interface ImageUploaderProps {
  bucket: "logos" | "covers" | "gallery" | "banners" | "assets"
  path: string
  currentUrl?: string | null
  onUpload: (url: string) => void
  onRemove?: () => void
  aspect?: "square" | "video" | "banner"
  label?: string
}

export function ImageUploader({
  bucket,
  path,
  currentUrl,
  onUpload,
  onRemove,
  aspect = "video",
  label = "Imagem",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[21/9]",
  }[aspect]

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!UPLOAD_CONFIG.acceptedTypes.includes(file.type)) {
      toast.error("Formato inválido. Use JPEG, PNG ou WebP.")
      return
    }

    if (file.size > UPLOAD_CONFIG.maxSizeMB * 1024 * 1024) {
      toast.error(`Arquivo muito grande. Máximo: ${UPLOAD_CONFIG.maxSizeMB}MB`)
      return
    }

    setUploading(true)

    try {
      const ext = file.name.split(".").pop()
      const fileName = `${path}/${Date.now()}.${ext}`

      // Remove old file if exists
      if (currentUrl) {
        const oldPath = currentUrl.split(`/storage/v1/object/public/${bucket}/`)[1]
        if (oldPath) {
          await supabase.storage.from(bucket).remove([oldPath])
        }
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: "3600", upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
      onUpload(urlData.publicUrl)
      toast.success("Imagem enviada com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao enviar imagem.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  async function handleRemove() {
    if (!currentUrl || !onRemove) return

    const oldPath = currentUrl.split(`/storage/v1/object/public/${bucket}/`)[1]
    if (oldPath) {
      await supabase.storage.from(bucket).remove([oldPath])
    }
    onRemove()
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">{label}</p>

      <div
        className={`relative ${aspectClass} rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden`}
      >
        {currentUrl ? (
          <>
            <Image src={currentUrl} alt={label} fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                Trocar
              </Button>
              {onRemove && (
                <Button type="button" size="sm" variant="destructive" onClick={handleRemove}>
                  <Trash2 className="size-3.5" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
          >
            {uploading ? (
              <Loader2 className="size-8 text-slate-400 animate-spin" />
            ) : (
              <ImageIcon className="size-8 text-slate-300" />
            )}
            <span className="text-xs text-slate-400">
              {uploading ? "Enviando..." : "Clique para enviar"}
            </span>
            <span className="text-xs text-slate-300">JPEG, PNG ou WebP · max 5MB</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={UPLOAD_CONFIG.acceptedTypes.join(",")}
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  )
}
