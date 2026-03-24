import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstitutionalBlockProps {
  title: string
  text: string
}

const stats = [
  { value: "50+", label: "Empresas Associadas", desc: "agências, hotéis e operadoras" },
  { value: "15+", label: "Cidades Atendidas", desc: "por todo o estado de Alagoas" },
  { value: "5+", label: "Anos de Atuação", desc: "fortalecendo o setor" },
]

export function InstitutionalBlock({ title, text }: InstitutionalBlockProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Top: title + text */}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-gray-100 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 lg:p-10 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-gray-100" : ""}`}
            >
              <p className="font-display font-bold text-5xl text-primary-600 tracking-tight mb-2">
                {s.value}
              </p>
              <p className="font-semibold text-gray-900 text-sm mb-1">{s.label}</p>
              <p className="text-gray-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
