import type { Metadata } from "next"
import { Users, Newspaper, Calendar, Image, UserPlus, MessageSquare, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export const metadata: Metadata = { title: "Dashboard" }

async function getStats() {
  const supabase = await createClient()

  const [
    { count: totalAssociados },
    { count: activeAssociados },
    { count: pendingAssociados },
    { count: totalNoticias },
    { count: totalEventos },
    { count: totalBanners },
    { count: newLeads },
    { count: unreadMessages },
    { data: recentAssociados },
  ] = await Promise.all([
    supabase.from("associados").select("*", { count: "exact", head: true }),
    supabase.from("associados").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("associados").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("noticias").select("*", { count: "exact", head: true }),
    supabase.from("eventos").select("*", { count: "exact", head: true }),
    supabase.from("banners").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("seja_associado_leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
    supabase.from("associados").select("id, name, status, created_at").order("created_at", { ascending: false }).limit(5),
  ])

  return {
    totalAssociados: totalAssociados ?? 0,
    activeAssociados: activeAssociados ?? 0,
    pendingAssociados: pendingAssociados ?? 0,
    totalNoticias: totalNoticias ?? 0,
    totalEventos: totalEventos ?? 0,
    activeBanners: totalBanners ?? 0,
    newLeads: newLeads ?? 0,
    unreadMessages: unreadMessages ?? 0,
    recentAssociados: recentAssociados ?? [],
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: "Associados Ativos",
      value: stats.activeAssociados,
      sub: `${stats.pendingAssociados} pendente${stats.pendingAssociados !== 1 ? "s" : ""}`,
      icon: Users,
      href: "/admin/associados",
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      title: "Notícias",
      value: stats.totalNoticias,
      icon: Newspaper,
      href: "/admin/noticias",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Eventos",
      value: stats.totalEventos,
      icon: Calendar,
      href: "/admin/eventos",
      color: "text-secondary-600",
      bg: "bg-secondary-50",
    },
    {
      title: "Banners Ativos",
      value: stats.activeBanners,
      icon: Image,
      href: "/admin/banners",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Novos Leads",
      value: stats.newLeads,
      sub: "Aguardando contato",
      icon: UserPlus,
      href: "/admin/leads",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Mensagens",
      value: stats.unreadMessages,
      sub: "Não lidas",
      icon: MessageSquare,
      href: "/admin/mensagens",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Visão geral do NúcleoTur Alagoas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-100">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                    <p className={`font-display font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                    {stat.sub && <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>}
                  </div>
                  <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Associados */}
      <Card className="border-slate-100">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center justify-between">
            <span>Associados Recentes</span>
            <Link href="/admin/associados" className="text-xs font-normal text-primary-600 hover:underline">
              Ver todos →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentAssociados.length === 0 ? (
              <p className="text-sm text-slate-400">Nenhum associado cadastrado.</p>
            ) : (
              stats.recentAssociados.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/associados/${a.id}`}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full ${
                      a.status === "active" ? "bg-green-500" :
                      a.status === "pending" ? "bg-amber-500" : "bg-slate-300"
                    }`} />
                    <span className="text-sm font-medium text-slate-800">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.status === "active" ? "bg-green-100 text-green-700" :
                      a.status === "pending" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {a.status === "active" ? "Ativo" : a.status === "pending" ? "Pendente" : "Inativo"}
                    </span>
                    <span className="text-xs text-slate-400">{formatDateTime(a.created_at)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
