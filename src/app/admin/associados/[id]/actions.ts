"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function searchUserByEmail(email: string) {
  const supabase = createAdminClient()

  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) return { error: "Erro ao buscar usuários." }

  const user = data.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase().trim()
  )

  if (!user) return { error: "Nenhum usuário encontrado com esse e-mail." }

  return {
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
  }
}

export async function linkUserToAssociado(associadoId: string, userId: string) {
  const supabase = createAdminClient()

  // Verifica se o userId já está vinculado a outro associado
  const { data: existing } = await supabase
    .from("associados")
    .select("id, name")
    .eq("user_id", userId)
    .neq("id", associadoId)
    .single()

  if (existing) {
    return { error: `Este usuário já está vinculado ao associado "${existing.name}".` }
  }

  const { error } = await supabase
    .from("associados")
    .update({ user_id: userId })
    .eq("id", associadoId)

  if (error) return { error: "Erro ao vincular usuário." }

  revalidatePath(`/admin/associados/${associadoId}`)
  return { success: true }
}

export async function unlinkUserFromAssociado(associadoId: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from("associados")
    .update({ user_id: null })
    .eq("id", associadoId)

  if (error) return { error: "Erro ao desvincular usuário." }

  revalidatePath(`/admin/associados/${associadoId}`)
  return { success: true }
}
