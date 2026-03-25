import type { Metadata } from "next"
import { MeetingsCalendar } from "@/components/home/MeetingsCalendar"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Calendário de Encontros 2026 | ${SITE_NAME}`,
  description: "Datas dos encontros presenciais do NúcleoTur Alagoas em 2026. Juntos somos mais fortes!",
}

export default function CalendarioPage() {
  return (
    <div className="pt-20">
      <MeetingsCalendar />
    </div>
  )
}
