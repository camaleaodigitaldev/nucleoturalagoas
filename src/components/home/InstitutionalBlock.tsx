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

function AssociadoChip({ a }: { a: AssociadoWithRelations }) {
  return (
    <Link
      href={`/associados/${a.slug}`}
      title={a.name}
      className="group flex items-center gap-3 shrink-0 h-14 px-5 rounded-full border border-gray-200 bg-white hover:border-primary-300 hover:shadow-md transition-all duration-300 whitespace-nowrap"
    >
      {a.logo_url ? (
        <Image
          src={a.logo_url}
          alt={a.name}
          width={28}
          height={28}
          className="rounded-full object-cover size-7 shrink-0"
        />
      ) : (
        <span className="size-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          <span className="text-primary-600 font-bold text-xs">{a.name[0]}</span>
        </span>
      )}
      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
        {a.name}
      </span>
    </Link>
  )
}

export function InstitutionalBlock({ title, text, associados }: InstitutionalBlockProps) {
  // Duplica para loop contínuo
  const doubled = associados.length > 0 ? [...associados, ...associados] : []

  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F8FF 100%)" }}>

      <style>{`
        @keyframes marquee-ltr {
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

      {/* Marquee de associados — full width, fora do max-w */}
      {doubled.length > 0 && (
        <div className="relative w-full">
          {/* Fade esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #F0F8FF, transparent)" }} />
          {/* Fade direita */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #F0F8FF, transparent)" }} />

          <div className="overflow-hidden">
            <div
              className="flex gap-3 w-max py-2"
              style={{ animation: "marquee-ltr 45s linear infinite" }}
            >
              {doubled.map((a, i) => (
                <AssociadoChip key={`${a.id}-${i}`} a={a} />
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
