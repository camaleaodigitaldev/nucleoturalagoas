import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAssociadoByUserId } from "@/lib/queries/associados"
import { formatDate } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Phone, Globe, AtSign, Edit, Images, List } from "lucide-react"

export const metadata: Metadata = { title: "Minha Conta — NúcleoTur Alagoas" }

export default async function MinhaContaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const associado = await getAssociadoByUserId(user.id)

  if (!associado) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <Building2 className="size-12 text-slate-300 mx-auto mb-4" />
        <h2 className="font-semibold text-slate-700 mb-2">Seu perfil ainda não está configurado</h2>
        <p className="text-sm text-slate-500">
          Entre em contato com o administrador para ativar seu perfil de associado.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card className="overflow-hidden">
        {associado.cover_url && (
          <div className="relative h-40 bg-slate-100">
            <Image
              src={associado.cover_url}
              alt="Capa"
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {associado.logo_url ? (
              <Image
                src={associado.logo_url}
                alt={associado.name}
                width={80}
                height={80}
                className="rounded-xl object-contain border border-slate-100 bg-white p-1 shrink-0"
              />
            ) : (
              <div className="size-20 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <Building2 className="size-8 text-primary-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display font-bold text-xl text-slate-900">{associado.name}</h1>
                  {associado.category && (
                    <p className="text-sm text-primary-600 font-medium">{associado.category.name}</p>
                  )}
                  {associado.city && (
                    <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="size-3.5" />{associado.city.name}
                    </p>
                  )}
                </div>
                <Button asChild size="sm" className="bg-primary-600 hover:bg-primary-700 shrink-0">
                  <Link href="/minha-conta/editar">
                    <Edit className="size-3.5 mr-1.5" />Editar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/minha-conta/fotos">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Images className="size-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Galeria de Fotos</p>
                <p className="text-xs text-slate-500">
                  {associado.photos?.length ?? 0} foto(s)
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/minha-conta/servicos">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-secondary-50 flex items-center justify-center">
                <List className="size-5 text-secondary-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Serviços</p>
                <p className="text-xs text-slate-500">
                  {associado.services?.length ?? 0} serviço(s)
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Contact info */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Informações de Contato</h3>
          {associado.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="size-4 text-slate-400" />{associado.phone}
            </div>
          )}
          {associado.website && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="size-4 text-slate-400" />
              <a href={associado.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                {associado.website}
              </a>
            </div>
          )}
          {associado.instagram && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <AtSign className="size-4 text-slate-400" />
              <a href={`https://instagram.com/${associado.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                @{associado.instagram.replace("@", "")}
              </a>
            </div>
          )}
          {!associado.phone && !associado.website && !associado.instagram && (
            <p className="text-sm text-slate-400 italic">Nenhuma informação de contato cadastrada.</p>
          )}
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Status do perfil</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              associado.status === "active"
                ? "bg-green-100 text-green-700"
                : associado.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-slate-100 text-slate-500"
            }`}>
              {associado.status === "active" ? "Ativo" : associado.status === "pending" ? "Pendente" : "Inativo"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Associado desde {formatDate(associado.created_at)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
