"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contatoSchema, type ContatoValues } from "@/lib/validations/contato"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export function ContatoForm() {
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContatoValues>({
    resolver: zodResolver(contatoSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  async function onSubmit(values: ContatoValues) {
    const { error } = await supabase.from("contact_messages").insert(values)

    if (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.")
      return
    }

    setSubmitted(true)
    toast.success("Mensagem enviada com sucesso!")
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="size-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="size-7 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Mensagem enviada!</h3>
        <p className="text-slate-500 text-sm">Responderemos em breve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Nome *</Label>
          <Input id="contact-name" placeholder="Seu nome" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">E-mail *</Label>
          <Input id="contact-email" type="email" placeholder="seu@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Telefone</Label>
          <Input id="contact-phone" placeholder="(82) 99999-9999" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject">Assunto</Label>
          <Input id="contact-subject" placeholder="Qual o assunto?" {...register("subject")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Mensagem *</Label>
        <Textarea
          id="contact-message"
          placeholder="Sua mensagem..."
          rows={5}
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Send className="size-4 mr-2" />}
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  )
}
