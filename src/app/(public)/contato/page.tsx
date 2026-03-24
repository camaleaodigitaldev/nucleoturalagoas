import type { Metadata } from "next"
import { Mail, Phone, MapPin, AtSign } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { ContatoForm } from "@/components/forms/ContatoForm"
import { getSiteSettings } from "@/lib/queries/site-content"

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o NúcleoTur Alagoas.",
}

export default async function ContatoPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <PageHeader
        eyebrow="Fale Conosco"
        title="Contato"
        description="Tem alguma dúvida? Entre em contato conosco."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-8">
              Informações de contato
            </h2>
            <div className="space-y-5">
              {settings["contact_email"] && (
                <a
                  href={`mailto:${settings["contact_email"]}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors group"
                >
                  <div className="size-11 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <Mail className="size-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">E-mail</p>
                    <p className="text-slate-800 font-medium group-hover:text-primary-700 transition-colors">
                      {settings["contact_email"]}
                    </p>
                  </div>
                </a>
              )}

              {settings["contact_phone"] && (
                <a
                  href={`tel:${settings["contact_phone"]}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors group"
                >
                  <div className="size-11 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <Phone className="size-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Telefone</p>
                    <p className="text-slate-800 font-medium group-hover:text-primary-700 transition-colors">
                      {settings["contact_phone"]}
                    </p>
                  </div>
                </a>
              )}

              {settings["address"] && (
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="size-11 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <MapPin className="size-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Localização</p>
                    <p className="text-slate-800 font-medium">{settings["address"]}</p>
                  </div>
                </div>
              )}

              {settings["instagram"] && (
                <a
                  href={`https://instagram.com/${settings["instagram"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 hover:bg-pink-50/50 transition-colors group"
                >
                  <div className="size-11 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                    <AtSign className="size-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">AtSign</p>
                    <p className="text-slate-800 font-medium group-hover:text-pink-700 transition-colors">
                      @{settings["instagram"]}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6">
              Envie uma mensagem
            </h2>
            <ContatoForm />
          </div>
        </div>
      </div>
    </>
  )
}
