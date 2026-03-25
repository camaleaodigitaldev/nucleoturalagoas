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
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1558A0 0%, #1B72C8 50%, #2B85D8 100%)" }}
    >
      {/* Decoração: círculos de luz */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-white/5 pointer-events-none blur-2xl" />

      {/* Dot grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Esquerda */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-7 bg-secondary-400" />
              <span className="text-secondary-300 text-xs font-semibold tracking-[0.15em] uppercase">
                Associe-se
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight mb-5">
              {title}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="bg-secondary-500 hover:bg-secondary-400 text-white font-semibold shadow-lg shadow-black/20 text-sm"
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
                className="border border-white/25 text-white/80 hover:text-white hover:bg-white/10 text-sm"
              >
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* Direita: benefícios */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-6">
              Benefícios
            </p>
            <ul className="space-y-0">
              {benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  className={`flex items-start gap-4 py-4 ${i < benefits.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <span className="flex-shrink-0 size-5 rounded-full bg-secondary-400/30 border border-secondary-300/40 flex items-center justify-center mt-0.5">
                    <span className="size-1.5 rounded-full bg-secondary-300" />
                  </span>
                  <span className="text-white/80 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
