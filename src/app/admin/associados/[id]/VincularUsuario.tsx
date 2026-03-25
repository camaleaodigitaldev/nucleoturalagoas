"use client"

import { useState } from "react"
import { Search, Link2, Unlink, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchUserByEmail, linkUserToAssociado, unlinkUserFromAssociado } from "./actions"

interface LinkedUser {
  id: string
  email?: string
}

interface VincularUsuarioProps {
  associadoId: string
  linkedUser: LinkedUser | null
}

export function VincularUsuario({ associadoId, linkedUser: initialLinkedUser }: VincularUsuarioProps) {
  const [linkedUser, setLinkedUser] = useState<LinkedUser | null>(initialLinkedUser)
  const [email, setEmail] = useState("")
  const [foundUser, setFoundUser] = useState<{ id: string; email?: string; created_at: string } | null>(null)
  const [searching, setSearching] = useState(false)
  const [linking, setLinking] = useState(false)
  const [unlinking, setUnlinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSearch() {
    if (!email.trim()) return
    setSearching(true)
    setError(null)
    setFoundUser(null)
    setSuccess(null)

    const result = await searchUserByEmail(email)
    if ("error" in result) {
      setError(result.error ?? "Erro desconhecido.")
    } else {
      setFoundUser(result.user)
    }
    setSearching(false)
  }

  async function handleLink() {
    if (!foundUser) return
    setLinking(true)
    setError(null)
    setSuccess(null)

    const result = await linkUserToAssociado(associadoId, foundUser.id)
    if ("error" in result) {
      setError(result.error ?? "Erro desconhecido.")
    } else {
      setLinkedUser({ id: foundUser.id, email: foundUser.email })
      setFoundUser(null)
      setEmail("")
      setSuccess("Usuário vinculado com sucesso!")
    }
    setLinking(false)
  }

  async function handleUnlink() {
    setUnlinking(true)
    setError(null)
    setSuccess(null)

    const result = await unlinkUserFromAssociado(associadoId)
    if ("error" in result) {
      setError(result.error ?? "Erro desconhecido.")
    } else {
      setLinkedUser(null)
      setSuccess("Usuário desvinculado.")
    }
    setUnlinking(false)
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Link2 className="size-4 text-slate-500" />
        <h3 className="font-semibold text-slate-900 text-sm">Conta de Acesso</h3>
      </div>

      {linkedUser ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <User className="size-4 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-green-900 truncate">{linkedUser.email}</p>
              <p className="text-xs text-green-600">Conta vinculada</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUnlink}
            disabled={unlinking}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Unlink className="size-3.5 mr-1.5" />
            {unlinking ? "Desvinculando..." : "Desvincular conta"}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Nenhuma conta vinculada. Busque um usuário pelo e-mail para vincular.</p>
      )}

      {!linkedUser && (
        <div className="space-y-3 pt-1">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="E-mail do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleSearch}
              disabled={searching || !email.trim()}
              className="shrink-0"
            >
              <Search className="size-3.5 mr-1.5" />
              {searching ? "Buscando..." : "Buscar"}
            </Button>
          </div>

          {foundUser && (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <User className="size-4 text-slate-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{foundUser.email}</p>
                  <p className="text-xs text-slate-400">
                    Criado em {new Date(foundUser.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleLink}
                disabled={linking}
                className="shrink-0 ml-3"
              >
                <Link2 className="size-3.5 mr-1.5" />
                {linking ? "Vinculando..." : "Vincular"}
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">{success}</p>
      )}
    </div>
  )
}
