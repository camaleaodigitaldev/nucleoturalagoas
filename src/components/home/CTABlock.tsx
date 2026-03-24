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
    <section className="bg-[#071420] relative overflow-hidden">
      {/* Teal accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary-600/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text + CTA */}
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
            <p className="text-white/50 text-lg leading-relaxed mb-8">{text}</p>
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
                className="border border-white/15 text-white/70 hover:text-white hover:bg-white/8 text-sm"
              >
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* Right: benefits */}
          <div className="border border-white/8 rounded-2xl p-8 bg-white/[0.03]">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-6">
              Benefícios
            </p>
            <ul className="space-y-0">
              {benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  className={`flex items-start gap-4 py-4 ${i < benefits.length - 1 ? "border-b border-white/8" : ""}`}
                >
                  <span className="flex-shrink-0 size-6 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mt-0.5">
                    <span className="size-2 rounded-full bg-primary-400" />
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
