import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="size-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
          <MapPin className="size-10 text-primary-400" />
        </div>
        <h1 className="font-display font-bold text-5xl text-slate-900 mb-2">404</h1>
        <h2 className="font-semibold text-xl text-slate-700 mb-3">Página não encontrada</h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          Parece que essa página se perdeu pelo caminho. Vamos te levar de volta ao início?
        </p>
        <Button asChild className="bg-primary-600 hover:bg-primary-700">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  )
}
