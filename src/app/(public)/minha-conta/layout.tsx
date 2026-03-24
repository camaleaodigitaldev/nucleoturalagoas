import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { User, Building2, Images, List, Settings, LogOut } from "lucide-react"

const NAV = [
  { href: "/minha-conta", label: "Minha Conta", icon: User, exact: true },
  { href: "/minha-conta/editar", label: "Editar Perfil", icon: Settings },
  { href: "/minha-conta/fotos", label: "Galeria de Fotos", icon: Images },
  { href: "/minha-conta/servicos", label: "Serviços", icon: List },
]

export default async function MinhaContaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) redirect("/login")

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            {/* Profile summary */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Building2 className="size-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">{user.email}</p>
                  <p className="text-xs text-slate-500">Associado</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border-b border-slate-50 last:border-0"
                >
                  <item.icon className="size-4 text-slate-400" />
                  {item.label}
                </Link>
              ))}
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="size-4" />
                  Sair
                </button>
              </form>
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
