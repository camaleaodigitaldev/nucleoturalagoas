"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, Users, Newspaper, Calendar, Image,
  FileText, UserPlus, MessageSquare, Settings, LogOut,
  MapPin, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const ICON_MAP = {
  LayoutDashboard, Users, Newspaper, Calendar, Image,
  FileText, UserPlus, MessageSquare, Settings,
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" as const, exact: true },
  { label: "Associados", href: "/admin/associados", icon: "Users" as const },
  { label: "Notícias", href: "/admin/noticias", icon: "Newspaper" as const },
  { label: "Eventos", href: "/admin/eventos", icon: "Calendar" as const },
  { label: "Banners", href: "/admin/banners", icon: "Image" as const },
  { label: "Conteúdo", href: "/admin/conteudo", icon: "FileText" as const },
  { label: "Leads", href: "/admin/leads", icon: "UserPlus" as const },
  { label: "Mensagens", href: "/admin/mensagens", icon: "MessageSquare" as const },
  { label: "Configurações", href: "/admin/configuracoes", icon: "Settings" as const },
]

interface AdminSidebarProps {
  userEmail?: string
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    toast.success("Sessão encerrada")
    router.push("/login")
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-slate-900 text-white flex flex-col z-40 sidebar-transition">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2">
          <MapPin className="size-5 text-secondary-400" />
          <span className="font-display font-bold text-base">
            Núcleo<span className="text-secondary-400">Tur</span>
          </span>
          <span className="text-xs bg-primary-600/50 text-primary-300 px-1.5 py-0.5 rounded-full ml-0.5">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
              {isActive && <ChevronRight className="size-3 ml-auto opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800">
        <Separator className="bg-slate-800 mb-3" />
        <div className="flex items-center gap-3 px-2 mb-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary-700 text-white text-xs">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Super Admin</p>
            {userEmail && <p className="text-xs text-slate-500 truncate">{userEmail}</p>}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
          onClick={handleLogout}
        >
          <LogOut className="size-3.5 mr-2" />
          Sair
        </Button>

        <div className="mt-2 px-2">
          <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Ver site público
          </Link>
        </div>
      </div>
    </aside>
  )
}
