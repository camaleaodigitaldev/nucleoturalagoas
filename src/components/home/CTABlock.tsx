import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTABlockProps {
  title: string
  text: string
}

const benefits = [
  "Visibilidade no portal NúcleoTur",
  "Perfil próprio com fotos e serviços",
  "Rede de conexões com outros associados",
  "Representação institucional do setor",
]

export function CTABlock({ title, text }: CTABlockProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 size-96 bg-primary-600/30 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-64 bg-secondary-500/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="text-white">
            <p className="text-secondary-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Associe-se
            </p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl leading-tight mb-5">
              {title}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">{text}</p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg"
              >
                <Link href="/seja-associado">
                  Quero ser associado
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="font-display font-semibold text-white text-lg mb-6">
              Benefícios de ser associado
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-secondary-400 shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
