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
    // placeholder enquanto o vídeo não está configurado
    return (
      <div className="w-full aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <p className="text-white/30 text-sm">Vídeo em breve</p>
      </div>
    )
  }
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
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
      style={{ background: "linear-gradient(145deg, #071E4A 0%, #0D2E6E 55%, #0A2356 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #93C5FD 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-400/10 blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-teal-500/8 blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: texto */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-teal-400/70" />
              <span className="text-teal-300 text-xs font-semibold tracking-[0.18em] uppercase">
                Portal do Turismo Alagoano
              </span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight">
                Conectando
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight text-primary-300">
                o turismo
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight">
                alagoano
              </span>
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              O NúcleoTur Alagoas reúne as melhores empresas e profissionais do setor turístico do estado em um único portal.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Button
                size="lg"
                asChild
                className="bg-secondary-500 hover:bg-secondary-400 text-white font-semibold shadow-none text-sm"
              >
                <Link href="/associados">
                  Conheça os Associados
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="border border-white/15 text-white/65 hover:text-white hover:bg-white/8 text-sm"
              >
                <Link href="/seja-associado">Seja Associado</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <p className="font-display font-bold text-2xl text-white">{s.value}</p>
                    <p className="text-white/30 text-xs tracking-wide mt-0.5">{s.label}</p>
                  </div>
                  {i < stats.length - 1 && <div className="h-8 w-px bg-white/10" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: vídeo YouTube */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary-500/10 blur-2xl" />
              <div className="relative">
                <YoutubeEmbed videoId={HERO_YOUTUBE_ID} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave de transição */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 45 C360 90 720 0 1080 45 C1260 68 1380 55 1440 45 L1440 90 L0 90 Z" fill="white"/>
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
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,30,74,0.88) 0%, rgba(7,30,74,0.50) 55%, transparent 100%)" }} />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
                  <div className="max-w-2xl text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-teal-400/70" />
                      <span className="text-teal-300 text-xs font-semibold tracking-[0.18em] uppercase">NúcleoTur Alagoas</span>
                    </div>
                    {banner.title && (
                      <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight mb-4">{banner.title}</h1>
                    )}
                    {banner.subtitle && (
                      <p className="text-white/60 text-lg leading-relaxed mb-8">{banner.subtitle}</p>
                    )}
                    {banner.cta_text && banner.cta_url && (
                      <Button size="lg" asChild className="bg-secondary-500 hover:bg-secondary-400 text-white font-semibold shadow-none">
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
          <button onClick={scrollPrev} className="absolute left-5 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={scrollNext} className="absolute right-5 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm">
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 45 C360 90 720 0 1080 45 C1260 68 1380 55 1440 45 L1440 90 L0 90 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
