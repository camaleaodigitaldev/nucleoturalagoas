import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin, Phone, AtSign, Globe, ExternalLink,
  CheckCircle2, ArrowLeft, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AssociadoGallery } from "@/components/associados/AssociadoGallery"
import { getAssociadoBySlug } from "@/lib/queries/associados"
import { whatsappLink, formatPhone, getInitials, instagramUrl } from "@/lib/utils"
import { CATEGORY_COLORS, SITE_URL } from "@/lib/constants"

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const associado = await getAssociadoBySlug(slug)
  if (!associado) return { title: "Associado não encontrado" }

  return {
    title: associado.name,
    description: associado.description ?? `Conheça ${associado.name} — associado ao NúcleoTur Alagoas`,
    openGraph: {
      title: associado.name,
      description: associado.description ?? undefined,
      images: associado.cover_url ? [{ url: associado.cover_url }] : [],
      url: `${SITE_URL}/associados/${associado.slug}`,
    },
  }
}

export default async function AssociadoPage({ params }: PageProps) {
  const { slug } = await params
  const associado = await getAssociadoBySlug(slug)

  if (!associado) notFound()

  const categoryColor = CATEGORY_COLORS[associado.category?.slug ?? "outros"] ?? CATEGORY_COLORS.outros
  const sortedPhotos = [...(associado.photos ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  const sortedServices = [...(associado.services ?? [])].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <>
      {/* Cover */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
        {associado.cover_url ? (
          <Image
            src={associado.cover_url}
            alt={`Capa de ${associado.name}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          >
            <Link href="/associados">
              <ArrowLeft className="size-4 mr-1" />
              Associados
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Profile info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              {/* Logo */}
              <div className="flex items-start gap-4 mb-5">
                <div className="size-20 rounded-xl border-2 border-white shadow-md overflow-hidden bg-slate-50 shrink-0">
                  {associado.logo_url ? (
                    <Image
                      src={associado.logo_url}
                      alt={`Logo ${associado.name}`}
                      width={80}
                      height={80}
                      className="object-contain size-full p-1"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-primary-50">
                      <span className="font-display font-bold text-xl text-primary-400">
                        {getInitials(associado.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  {associado.category && (
                    <Badge className={`${categoryColor} border-0 text-xs mb-2`}>
                      {associado.category.name}
                    </Badge>
                  )}
                  <h1 className="font-display font-bold text-xl text-slate-900 leading-tight">
                    {associado.name}
                  </h1>
                  {associado.city && (
                    <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="size-3.5 text-primary-500" />
                      {associado.city.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 my-5" />

              {/* Contact actions */}
              <div className="space-y-3">
                {associado.whatsapp && (
                  <a
                    href={whatsappLink(associado.whatsapp, `Olá, vim pelo NúcleoTur Alagoas!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="size-4 shrink-0" />
                    WhatsApp
                    <span className="ml-auto text-xs text-green-600">
                      {formatPhone(associado.whatsapp)}
                    </span>
                  </a>
                )}

                {associado.phone && !associado.whatsapp && (
                  <a
                    href={`tel:${associado.phone}`}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-medium"
                  >
                    <Phone className="size-4 shrink-0" />
                    {formatPhone(associado.phone)}
                  </a>
                )}

                {associado.instagram && (
                  <a
                    href={instagramUrl(associado.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors text-sm font-medium"
                  >
                    <AtSign className="size-4 shrink-0" />
                    @{associado.instagram.replace("@", "")}
                  </a>
                )}

                {associado.website && (
                  <a
                    href={associado.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors text-sm font-medium"
                  >
                    <Globe className="size-4 shrink-0" />
                    Site oficial
                  </a>
                )}

                {associado.external_link && (
                  <Button asChild className="w-full bg-primary-600 hover:bg-primary-700 mt-2">
                    <a href={associado.external_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4 mr-2" />
                      Acessar / Reservar
                    </a>
                  </Button>
                )}
              </div>

              {/* Services list */}
              {sortedServices.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 my-5" />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-slate-700 mb-3">
                      Serviços oferecidos
                    </h3>
                    <ul className="space-y-2">
                      {sortedServices.map((s) => (
                        <li key={s.id} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="size-4 text-primary-500 shrink-0" />
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Description + Gallery */}
          <div className="lg:col-span-2 space-y-8 mt-4 lg:mt-0">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl text-slate-900 mb-4">
                Sobre {associado.name}
              </h2>
              {associado.description_html ? (
                <div
                  className="prose prose-slate"
                  dangerouslySetInnerHTML={{ __html: associado.description_html }}
                />
              ) : associado.description ? (
                <p className="text-slate-600 leading-relaxed">{associado.description}</p>
              ) : (
                <p className="text-slate-400 italic">Descrição não disponível.</p>
              )}
            </div>

            {/* Gallery */}
            {sortedPhotos.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
                <AssociadoGallery photos={sortedPhotos} associadoName={associado.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
