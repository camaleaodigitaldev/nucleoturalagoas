import Link from "next/link"
import { MapPin } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <MapPin className="size-6 text-secondary-400" />
            <span className="font-display font-bold text-2xl text-white">
              Núcleo<span className="text-secondary-400">Tur</span>
            </span>
            <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-white/20 text-white ml-1">
              Alagoas
            </span>
          </Link>
        </div>
        {children}
        <p className="text-center mt-6 text-primary-300 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  )
}
