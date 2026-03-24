import type { Metadata } from "next"
import { getAllBanners } from "@/lib/queries/banners"
import { BannersManager } from "./BannersManager"

export const metadata: Metadata = { title: "Banners — Admin" }

export default async function AdminBannersPage() {
  const banners = await getAllBanners()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Banners</h1>
        <p className="text-slate-500 text-sm mt-0.5">Gerencie os banners da página inicial</p>
      </div>
      <BannersManager initialBanners={banners} />
    </div>
  )
}
