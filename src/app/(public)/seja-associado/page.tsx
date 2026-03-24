import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { SejaAssociadoForm } from "@/components/forms/SejaAssociadoForm"
import { getCategories, getCities } from "@/lib/queries/categories"

export const metadata: Metadata = {
  title: "Seja Associado",
  description: "Faça parte do NúcleoTur Alagoas e ganhe visibilidade no turismo alagoano.",
}

const benefits = [
  "Perfil completo no portal NúcleoTur",
  "Visibilidade para turistas e agentes do setor",
  "Rede de conexões com empresas do turismo",
  "Representação institucional do setor",
  "Divulgação em eventos e ações do núcleo",
]

export default async function SejaAssociadoPage() {
  const [categories, cities] = await Promise.all([getCategories(), getCities()])

  return (
    <>
      <PageHeader
        eyebrow="Associe-se"
        title="Seja Associado"
        description="Faça parte da rede que está transformando o turismo alagoano"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-6">
              Por que se associar?
            </h2>
            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <p className="text-sm text-slate-600 leading-relaxed">
                Após o envio do formulário, nossa equipe entrará em contato para apresentar
                os planos de associação e orientar sobre os próximos passos.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6">
              Formulário de interesse
            </h2>
            <SejaAssociadoForm categories={categories} cities={cities} />
          </div>
        </div>
      </div>
    </>
  )
}
