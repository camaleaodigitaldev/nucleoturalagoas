"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="size-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="size-8 text-red-400" />
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Algo deu errado</h2>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm">
          Ocorreu um erro inesperado. Tente novamente ou entre em contato.
        </p>
        <Button onClick={reset} className="bg-primary-600 hover:bg-primary-700">
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
