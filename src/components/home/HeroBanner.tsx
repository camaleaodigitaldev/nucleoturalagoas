"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/types"

const stats = [
  { value: "50+", label: "Associados" },
  { value: "15+", label: "Cidades" },
  { value: "5+", label: "Anos" },
]

function HeroFallback() {
  return (
    <section className="relative min-h-screen bg-[#050E1A] flex flex-col justify-center overflow-hidden">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #1B72C8 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blue glow right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary-600/12 blur-[130px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      {/* Teal glow bottom-left */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-teal-500/8 blur-[100px] pointer-events-none" />
      {/* Gold subtle top-left */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-secondary-500/6 blur-[80px] -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-teal-500" />
              <span className="text-teal-400 text-xs font-semibold tracking-[0.18em] uppercase">
                Portal do Turismo Alagoano
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight">
                Conectando
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight text-primary-400">
                o turismo
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-6xl xl:text-[5rem] tracking-tight">
                alagoano
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/45 text-lg leading-relaxed mb-10 max-w-md">
              O NúcleoTur Alagoas reúne as melhores empresas e profissionais do setor turístico do estado em um único portal.
            </p>

            {/* Buttons */}
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
                className="border border-white/12 text-white/70 hover:text-white hover:bg-white/8 font-medium text-sm"
              >
                <Link href="/seja-associado">Seja Associado</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <p className="font-display font-bold text-2xl text-white">{s.value}</p>
                    <p className="text-white/35 text-xs tracking-wide mt-0.5">{s.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-white/8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: logo */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Glow behind logo */}
              <div className="absolute inset-0 rounded-full bg-primary-600/15 blur-3xl scale-110" />
              <Image
                src="/logo.jpg"
                alt="NúcleoTur Alagoas"
                width={340}
                height={340}
                className="relative rounded-2xl object-cover opacity-90"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z" fill="white"/>
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
              <Image
                src={banner.image_url}
                alt={banner.title ?? "Banner NúcleoTur"}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050E1A]/88 via-[#050E1A]/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
                  <div className="max-w-2xl text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-teal-400" />
                      <span className="text-teal-400 text-xs font-semibold tracking-[0.18em] uppercase">NúcleoTur Alagoas</span>
                    </div>
                    {banner.title && (
                      <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight mb-4">
                        {banner.title}
                      </h1>
                    )}
                    {banner.subtitle && (
                      <p className="text-white/65 text-lg leading-relaxed mb-8">{banner.subtitle}</p>
                    )}
                    {banner.cta_text && banner.cta_url && (
                      <Button
                        size="lg"
                        asChild
                        className="bg-secondary-500 hover:bg-secondary-400 text-white font-semibold shadow-none"
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
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
