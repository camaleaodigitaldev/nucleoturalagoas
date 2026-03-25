import Image from "next/image"
import Link from "next/link"
import type { AssociadoWithRelations } from "@/types"

interface PartnersMarqueeProps {
  associados: AssociadoWithRelations[]
}

interface MarqueeRowProps {
  items: AssociadoWithRelations[]
  duration?: number
  reverse?: boolean
}

function MarqueeRow({ items, duration = 28, reverse = false }: MarqueeRowProps) {
  // Duplica para loop contínuo
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-6 w-max"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((a, i) => (
          <Link
            key={`${a.id}-${i}`}
            href={`/associados/${a.slug}`}
            className="group flex items-center justify-center shrink-0 w-36 h-20 rounded-xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-md transition-all duration-300"
            title={a.name}
          >
            {a.logo_url ? (
              <Image
                src={a.logo_url}
                alt={a.name}
                width={100}
                height={48}
                className="object-contain max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-[0.65rem] font-semibold text-gray-400 text-center px-2 leading-tight group-hover:text-primary-600 transition-colors">
                {a.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function PartnersMarquee({ associados }: PartnersMarqueeProps) {
  if (associados.length === 0) return null

  // Divide em 3 trilhas com offsets diferentes
  const chunk = Math.ceil(associados.length / 3)
  const row1 = associados.slice(0, chunk)
  const row2 = associados.slice(chunk, chunk * 2)
  const row3 = associados.slice(chunk * 2)

  // Se tiver poucos associados, repete para ter conteúdo suficiente
  const fill = (arr: AssociadoWithRelations[]) => {
    if (arr.length === 0) return associados
    while (arr.length < 6) arr = [...arr, ...associados]
    return arr
  }

  return (
    <section className="py-20 lg:py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #F0F8FF 0%, #EBF5FF 100%)" }}>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-12">
        <div className="text-center">
          <span className="section-label mx-auto justify-center">Associados</span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mt-4">
            Empresas do nosso núcleo
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Conheça as melhores empresas e profissionais do turismo alagoano
          </p>
        </div>
      </div>

      {/* 3 trilhas de marquee */}
      <div className="flex flex-col gap-5">
        <MarqueeRow items={fill(row1)} duration={30} />
        <MarqueeRow items={fill(row2)} duration={38} reverse />
        <MarqueeRow items={fill(row3)} duration={34} />
      </div>
    </section>
  )
}
