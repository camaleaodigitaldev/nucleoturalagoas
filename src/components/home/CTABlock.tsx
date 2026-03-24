import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTABlockProps {
  title: string
  text: string
}

const benefits = [
  "Perfil completo com fotos, serviços e contatos",
  "Visibilidade para turistas e agências parceiras",
  "Rede de conexões com todo o setor alagoano",
  "Representação institucional do turismo",
]

export function CTABlock({ title, text }: CTABlockProps) {
  return (
    <section className="bg-[#050E1A] relative overflow-hidden">
      {/* Blue accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-600/60 to-transparent" />

      {/* Blue glow center */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary-600/8 blur-[100px] pointer-events-none" />
      {/* Teal glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-teal-500/6 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-secondary-500" />
              <span className="text-secondary-400 text-xs font-semibold tracking-[0.15em] uppercase">
                Associe-se
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight mb-5">
              {title}
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-8">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="bg-secondary-500 hover:bg-secondary-400 text-white font-semibold shadow-none text-sm"
              >
                <Link href="/seja-associado">
                  Quero ser associado
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="border border-white/12 text-white/60 hover:text-white hover:bg-white/8 text-sm"
              >
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* Right: benefits */}
          <div className="border border-white/7 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-white/35 text-xs font-semibold tracking-widest uppercase mb-6">
              Benefícios
            </p>
            <ul className="space-y-0">
              {benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  className={`flex items-start gap-4 py-4 ${i < benefits.length - 1 ? "border-b border-white/6" : ""}`}
                >
                  <span className="flex-shrink-0 size-5 rounded-full bg-primary-600/25 border border-primary-500/30 flex items-center justify-center mt-0.5">
                    <span className="size-1.5 rounded-full bg-primary-400" />
                  </span>
                  <span className="text-white/60 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
