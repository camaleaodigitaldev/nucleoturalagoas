import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AssociadoWithRelations } from "@/types"

interface InstitutionalBlockProps {
  title: string
  text: string
  associados: AssociadoWithRelations[]
}

const stats = [
  { value: "50+", label: "Empresas Associadas", desc: "agências, hotéis e operadoras" },
  { value: "15+", label: "Cidades Atendidas", desc: "por todo o estado de Alagoas" },
  { value: "5+", label: "Anos de Atuação", desc: "fortalecendo o setor" },
]

function LogoCard({ a }: { a: AssociadoWithRelations }) {
  return (
    <Link
      href={`/associados/${a.slug}`}
      title={a.name}
      className="group shrink-0 flex items-center justify-center w-28 h-20 rounded-xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-lg transition-all duration-300"
    >
      {a.logo_url ? (
        <Image
          src={a.logo_url}
          alt={a.name}
          width={88}
          height={56}
          className="object-contain max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      ) : (
        <div className="flex flex-col items-center gap-1">
          <span className="size-10 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
            <span className="text-primary-600 font-bold text-base">{a.name[0]}</span>
          </span>
        </div>
      )}
    </Link>
  )
}

interface MarqueeRowProps {
  items: AssociadoWithRelations[]
  duration: number
  reverse?: boolean
}

function MarqueeRow({ items, duration, reverse = false }: MarqueeRowProps) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-slide ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((a, i) => (
          <LogoCard key={`${a.id}-${i}`} a={a} />
        ))}
      </div>
    </div>
  )
}

export function InstitutionalBlock({ title, text, associados }: InstitutionalBlockProps) {
  if (associados.length === 0) return null

  // Divide em 3 trilhas
  const third = Math.ceil(associados.length / 3)
  const fill = (arr: AssociadoWithRelations[]) => {
    let r = [...arr]
    while (r.length < 8) r = [...r, ...associados]
    return r
  }
  const row1 = fill(associados.slice(0, third))
  const row2 = fill(associados.slice(third, third * 2))
  const row3 = fill(associados.slice(third * 2))

  return (
    <section
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F8FF 100%)" }}
    >
      <style>{`
        @keyframes marquee-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Título + texto */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 lg:mb-20">
          <div>
            <div className="section-label mb-5">Sobre o NúcleoTur</div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 leading-[1.1] tracking-tight">
              {title}
            </h2>
          </div>
          <div>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-sm font-semibold">
                <Link href="/quem-somos">
                  Nossa história
                  <ArrowRight className="size-3.5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="text-sm">
                <Link href="/associados">Ver Associados</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 bg-white border border-primary-100 rounded-2xl overflow-hidden shadow-sm shadow-primary-50 mb-16 lg:mb-20">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 lg:p-10 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-gray-100" : ""}`}
            >
              <p className="font-display font-bold text-5xl text-primary-600 tracking-tight mb-2">{s.value}</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">{s.label}</p>
              <p className="text-gray-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* 3 trilhas de logos — full width */}
      <div className="relative w-full flex flex-col gap-4">
        {/* Fade esquerda */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #EBF5FF, transparent)" }}
        />
        {/* Fade direita */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #EBF5FF, transparent)" }}
        />

        <MarqueeRow items={row1} duration={32} />
        <MarqueeRow items={row2} duration={44} reverse />
        <MarqueeRow items={row3} duration={28} />
      </div>

    </section>
  )
}
