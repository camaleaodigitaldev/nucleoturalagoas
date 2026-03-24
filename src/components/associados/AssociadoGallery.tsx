"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import type { AssociadoPhoto } from "@/types"

interface AssociadoGalleryProps {
  photos: AssociadoPhoto[]
  associadoName: string
}

export function AssociadoGallery({ photos, associadoName }: AssociadoGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (photos.length === 0) return null

  const slides = photos.map((p) => ({ src: p.url, alt: p.caption ?? associadoName }))

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-slate-900 mb-4">Galeria de Fotos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => { setIndex(i); setOpen(true) }}
            className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? `Foto ${i + 1} — ${associadoName}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </div>
  )
}
