"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHome = pathname === "/"
  const transparent = isHome && !scrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        transparent
          ? "bg-transparent"
          : "bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className={cn(
              "size-8 rounded-lg flex items-center justify-center transition-colors duration-300",
              transparent ? "bg-white/15" : "bg-primary-600"
            )}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="3" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                <rect x="10" y="3" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                <rect x="3" y="10" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                <rect x="10" y="10" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span className={cn(
                "font-display font-bold text-[1.05rem] tracking-tight leading-none transition-colors duration-300",
                transparent ? "text-white" : "text-gray-900"
              )}>
                Núcleo<span className="text-secondary-500">Tur</span>
              </span>
              <span className={cn(
                "text-[0.58rem] font-semibold tracking-[0.15em] uppercase leading-none transition-colors duration-300",
                transparent ? "text-white/50" : "text-primary-600"
              )}>
                Alagoas
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-all duration-200",
                  pathname === link.href
                    ? transparent
                      ? "text-white bg-white/15"
                      : "text-primary-700 bg-primary-50"
                    : transparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="hidden lg:inline-flex text-[0.8125rem] font-semibold bg-secondary-500 hover:bg-secondary-600 text-white shadow-none"
            >
              <Link href="/seja-associado">Seja Associado</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "lg:hidden size-9 flex items-center justify-center rounded-lg transition-colors",
                    transparent
                      ? "text-white hover:bg-white/15"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0 bg-white">
                <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <SheetTitle className="flex items-center gap-2 font-display font-bold text-[0.95rem] text-gray-900">
                    <div className="size-7 rounded-md bg-primary-600 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                        <rect x="3" y="3" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                        <rect x="10" y="3" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                        <rect x="3" y="10" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                        <rect x="10" y="10" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                      </svg>
                    </div>
                    Núcleo<span className="text-secondary-500">Tur</span>
                    <span className="text-[0.7rem] font-medium text-primary-600 ml-0.5">Alagoas</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-3 py-4 gap-0.5">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "text-primary-700 bg-primary-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="px-4 pb-6">
                  <Button
                    asChild
                    className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold"
                  >
                    <Link href="/seja-associado" onClick={() => setOpen(false)}>
                      Seja Associado
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
