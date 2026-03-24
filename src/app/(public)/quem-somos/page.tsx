import type { Metadata } from "next"
import Image from "next/image"
import { Target, Eye, Heart } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { getAllSiteContent } from "@/lib/queries/site-content"
import { SITE_NAME } from "@/lib/constants"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Quem Somos",
  description: `Conheça a história, missão e valores do ${SITE_NAME}, o núcleo de empresas e profissionais do turismo de Alagoas.`,
}

export default async function QuemSomosPage() {
  const content = await getAllSiteContent()

  const quemSomosHtml = content["quem_somos_html"]?.value_html ?? ""
  const historiaHtml = content["historia_html"]?.value_html ?? ""
  const missao = content["missao"]?.value_text ?? ""
  const visao = content["visao"]?.value_text ?? ""
  const valores = content["valores"]?.value_text ?? ""

  const valoresList = valores.split(",").map((v) => v.trim()).filter(Boolean)

  return (
    <>
      <PageHeader
        eyebrow="NúcleoTur Alagoas"
        title="Quem Somos"
        description="Conheça a organização que conecta e fortalece o turismo alagoano"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Main content */}
        {quemSomosHtml && (
          <div
            className="prose prose-lg prose-slate max-w-3xl mx-auto mb-16"
            dangerouslySetInnerHTML={{ __html: quemSomosHtml }}
          />
        )}

        {/* MVV */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {missao && (
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <div className="size-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <Target className="size-6 text-primary-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">Missão</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{missao}</p>
            </div>
          )}

          {visao && (
            <div className="bg-secondary-50 rounded-2xl p-8 border border-secondary-100">
              <div className="size-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
                <Eye className="size-6 text-secondary-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">Visão</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{visao}</p>
            </div>
          )}

          {valoresList.length > 0 && (
            <div className="bg-accent-50 rounded-2xl p-8 border border-accent-100">
              <div className="size-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                <Heart className="size-6 text-accent-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">Valores</h3>
              <ul className="space-y-1.5">
                {valoresList.map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="size-1.5 rounded-full bg-accent-500 shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* History */}
        {historiaHtml && (
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-6">Nossa História</h2>
            <div
              className="prose prose-slate"
              dangerouslySetInnerHTML={{ __html: historiaHtml }}
            />
          </div>
        )}
      </div>
    </>
  )
}
