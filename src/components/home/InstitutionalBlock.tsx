import Link from "next/link"
import { ArrowRight, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstitutionalBlockProps {
  title: string
  text: string
}

const stats = [
  { icon: Users, label: "Empresas Associadas", value: "50+" },
  { icon: Globe, label: "Cidades Atendidas", value: "15+" },
  { icon: Award, label: "Anos de Atuação", value: "5+" },
]

export function InstitutionalBlock({ title, text }: InstitutionalBlockProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Sobre o NúcleoTur
            </p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-slate-900 leading-tight mb-6">
              {title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{text}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary-600 hover:bg-primary-700">
                <Link href="/quem-somos">
                  Conheça nossa história
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/associados">Ver Associados</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors"
              >
                <div className="size-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <stat.icon className="size-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
