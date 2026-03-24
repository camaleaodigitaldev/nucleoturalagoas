"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-xl tracking-tight"
          >
            <span
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                scrolled || !isHome ? "text-primary-700" : "text-white"
              )}
            >
              <MapPin className="size-5 text-secondary-500" />
              <span>
                Núcleo<span className="text-secondary-500">Tur</span>
              </span>
              <span
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded-full ml-1",
                  scrolled || !isHome
                    ? "bg-primary-50 text-primary-700"
                    : "bg-white/20 text-white"
                )}
              >
                Alagoas
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? scrolled || !isHome
                      ? "text-primary-700 bg-primary-50"
                      : "text-white bg-white/20"
                    : scrolled || !isHome
                    ? "text-slate-600 hover:text-primary-700 hover:bg-slate-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="hidden lg:inline-flex bg-secondary-500 hover:bg-secondary-600 text-white border-none"
            >
              <Link href="/seja-associado">Seja Associado</Link>
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "lg:hidden",
                    scrolled || !isHome
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="px-6 py-5 border-b border-slate-100">
                  <SheetTitle className="flex items-center gap-2 font-display font-bold text-lg text-primary-700">
                    <MapPin className="size-4 text-secondary-500" />
                    <span>
                      Núcleo<span className="text-secondary-500">Tur</span> Alagoas
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col py-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-6 py-3 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "text-primary-700 bg-primary-50 border-r-2 border-primary-600"
                          : "text-slate-600 hover:text-primary-700 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="px-6 pt-4 mt-2 border-t border-slate-100">
                    <Button asChild className="w-full bg-secondary-500 hover:bg-secondary-600 text-white">
                      <Link href="/seja-associado" onClick={() => setOpen(false)}>
                        Seja Associado
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
