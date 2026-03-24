"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sejaAssociadoSchema, type SejaAssociadoValues } from "@/lib/validations/seja-associado"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Category, City } from "@/types"

interface SejaAssociadoFormProps {
  categories: Category[]
  cities: City[]
}

export function SejaAssociadoForm({ categories, cities }: SejaAssociadoFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SejaAssociadoValues>({
    resolver: zodResolver(sejaAssociadoSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  async function onSubmit(values: SejaAssociadoValues) {
    const { error } = await supabase.from("seja_associado_leads").insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      category_id: values.category_id || null,
      city_id: values.city_id || null,
      message: values.message,
    })

    if (error) {
      toast.error("Erro ao enviar. Tente novamente.")
      return
    }

    setSubmitted(true)
    toast.success("Solicitação enviada com sucesso!")
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="size-8 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
          Solicitação enviada!
        </h3>
        <p className="text-slate-600">
          Obrigado pelo interesse! Entraremos em contato em breve.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input id="name" placeholder="Seu nome ou empresa" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input id="phone" placeholder="(82) 99999-9999" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select onValueChange={(v) => setValue("category_id", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cidade</Label>
        <Select onValueChange={(v) => setValue("city_id", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma cidade" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem (opcional)</Label>
        <Textarea
          id="message"
          placeholder="Conte um pouco sobre sua empresa ou como podemos ajudar..."
          rows={4}
          {...register("message")}
        />
      </div>

      <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin mr-2" />
        ) : (
          <Send className="size-4 mr-2" />
        )}
        {isSubmitting ? "Enviando..." : "Enviar solicitação"}
      </Button>
    </form>
  )
}
