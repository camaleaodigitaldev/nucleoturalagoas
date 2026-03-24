"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/types"

interface HeroBannerProps {
  banners: Banner[]
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (banners.length === 0) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-700 to-accent-900 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
          <div className="max-w-2xl">
            <p className="text-secondary-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Turismo de Alagoas
            </p>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-tight mb-6">
              Conectando o turismo{" "}
              <span className="text-secondary-400">alagoano</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              O NúcleoTur Alagoas reúne as melhores empresas e profissionais do turismo do estado.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-secondary-500 hover:bg-secondary-600 text-white">
                <Link href="/associados">Conheça os Associados</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                <Link href="/seja-associado">Seja Associado</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 500 }}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {banners.map((banner) => (
            <div key={banner.id} className="relative flex-[0_0_100%] h-full">
              {/* Background image */}
              <Image
                src={banner.image_url}
                alt={banner.title ?? "Banner NúcleoTur"}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 banner-overlay" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-white">
                    <p className="text-secondary-400 font-semibold text-sm uppercase tracking-wider mb-4 animate-in slide-in-from-left-4 duration-700">
                      NúcleoTur Alagoas
                    </p>
                    {banner.title && (
                      <h1 className="font-display font-bold text-4xl lg:text-6xl xl:text-7xl leading-tight mb-4 animate-in slide-in-from-left-4 duration-700 delay-100">
                        {banner.title}
                      </h1>
                    )}
                    {banner.subtitle && (
                      <p className="text-xl text-white/80 mb-8 leading-relaxed animate-in slide-in-from-left-4 duration-700 delay-200">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.cta_text && banner.cta_url && (
                      <Button
                        size="lg"
                        asChild
                        className="bg-secondary-500 hover:bg-secondary-600 text-white animate-in slide-in-from-left-4 duration-700 delay-300"
                      >
                        <Link href={banner.cta_url}>
                          {banner.cta_text}
                          <ArrowRight className="size-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 animate-bounce">
        <div className="size-6 border-2 border-white/40 rounded-full flex items-center justify-center">
          <div className="size-1.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
