import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginForm } from "@/components/forms/LoginForm"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center"><Loader2 className="size-6 animate-spin text-primary-500" /></div>}>
      <LoginForm />
    </Suspense>
  )
}
