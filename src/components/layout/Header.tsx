"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, LogIn } from "lucide-react"
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
          : "bg-white/97 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* Logo — branca no topo, colorida ao rolar */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo.png"
              alt="NúcleoTur Alagoas"
              width={48}
              height={48}
              className="object-contain transition-all duration-500"
              style={{ filter: transparent ? "brightness(0) invert(1)" : "none" }}
              priority
            />
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
                    ? "text-white/75 hover:text-white hover:bg-white/10"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className={cn(
                "hidden lg:inline-flex text-[0.8125rem] font-medium gap-1.5",
                transparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Link href="/login">
                <LogIn className="size-3.5" />
                Entrar
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden lg:inline-flex text-[0.8125rem] font-semibold bg-secondary-500 hover:bg-secondary-400 text-white shadow-none"
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
                  <SheetTitle className="flex items-center gap-2.5">
                    <Image src="/logo.png" alt="NúcleoTur Alagoas" width={36} height={36} className="object-contain" />
                    <span className="font-display font-bold text-[0.95rem] text-gray-900">
                      Núcleo<span className="text-secondary-500">Tur</span>{" "}
                      <span className="text-primary-600">Alagoas</span>
                    </span>
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
                <div className="px-4 pb-6 flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full font-medium gap-2">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <LogIn className="size-4" />
                      Entrar
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-secondary-500 hover:bg-secondary-400 text-white font-semibold">
                    <Link href="/seja-associado" onClick={() => setOpen(false)}>Seja Associado</Link>
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
