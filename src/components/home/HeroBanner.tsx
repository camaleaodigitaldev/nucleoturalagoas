"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HERO_YOUTUBE_ID } from "@/lib/constants"
import type { Banner } from "@/types"

const stats = [
  { value: "50+", label: "Associados" },
  { value: "15+", label: "Cidades" },
  { value: "5+", label: "Anos" },
]

function YoutubeEmbed({ videoId }: { videoId: string }) {
  if (!videoId) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center">
        <p className="text-primary-300 text-sm">Vídeo em breve</p>
      </div>
    )
  }
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-primary-900/10 ring-1 ring-primary-100">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title="NúcleoTur Alagoas"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

function HeroFallback() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EBF5FF 0%, #F5F9FF 45%, #FFFDF7 100%)",
      }}
    >
      {/* Decoração: círculo azul grande desfocado no canto superior direito */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"
        style={{ background: "radial-gradient(circle, #BFDBFE 0%, transparent 70%)" }}
      />
      {/* Círculo creme quente no canto inferior esquerdo */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FEF3C7 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Esquerda: texto */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-7 bg-primary-400" />
              <span className="text-primary-500 text-xs font-semibold tracking-[0.16em] uppercase">
                Portal do Turismo Alagoano
              </span>
            </div>

            <h1 className="font-display font-bold leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl xl:text-[5.25rem] tracking-tight text-gray-900">
                Conectando
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-[5.25rem] tracking-tight text-primary-600">
                o turismo
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-[5.25rem] tracking-tight text-gray-900">
                alagoano
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-[420px]">
              Reunimos as melhores empresas e profissionais do turismo de Alagoas em um único portal.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Button
                size="lg"
                asChild
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg shadow-primary-200 text-sm"
              >
                <Link href="/associados">
                  Conheça os Associados
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-200 text-primary-700 hover:bg-primary-50 text-sm"
              >
                <Link href="/seja-associado">Seja Associado</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <p className="font-display font-bold text-2xl text-primary-600">{s.value}</p>
                    <p className="text-gray-400 text-xs tracking-wide mt-0.5">{s.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direita: vídeo */}
          <div className="hidden lg:block">
            <YoutubeEmbed videoId={HERO_YOUTUBE_ID} />
          </div>

        </div>
      </div>

      {/* Linha de onda teal na base (referência marca) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 38 1440 30 L1440 60 L0 60 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

interface HeroBannerProps {
  banners: Banner[]
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (banners.length === 0) return <HeroFallback />

  return (
    <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 560 }}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {banners.map((banner) => (
            <div key={banner.id} className="relative flex-[0_0_100%] h-full">
              <Image src={banner.image_url} alt={banner.title ?? "Banner NúcleoTur"} fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px w-7 bg-primary-500" />
                      <span className="text-primary-600 text-xs font-semibold tracking-[0.16em] uppercase">NúcleoTur Alagoas</span>
                    </div>
                    {banner.title && (
                      <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-gray-900 mb-4">{banner.title}</h1>
                    )}
                    {banner.subtitle && (
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">{banner.subtitle}</p>
                    )}
                    {banner.cta_text && banner.cta_url && (
                      <Button size="lg" asChild className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200 font-semibold">
                        <Link href={banner.cta_url}>{banner.cta_text}<ArrowRight className="size-4 ml-2" /></Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button onClick={scrollPrev} className="absolute left-5 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-md transition-all backdrop-blur-sm">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={scrollNext} className="absolute right-5 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-md transition-all backdrop-blur-sm">
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </section>
  )
}
