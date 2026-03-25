"use client"

import { useMemo } from "react"
import { CalendarDays } from "lucide-react"

const MEETINGS_2026 = [
  { month: "Janeiro",   abbr: "JAN", num: 1,  meeting: "30/01" },
  { month: "Fevereiro", abbr: "FEV", num: 2,  meeting: "11/02" },
  { month: "Março",     abbr: "MAR", num: 3,  meeting: "11/03" },
  { month: "Abril",     abbr: "ABR", num: 4,  meeting: "08/04" },
  { month: "Maio",      abbr: "MAI", num: 5,  meeting: "13/05" },
  { month: "Junho",     abbr: "JUN", num: 6,  meeting: "10/06" },
  { month: "Julho",     abbr: "JUL", num: 7,  meeting: "08/07" },
  { month: "Agosto",    abbr: "AGO", num: 8,  meeting: "12/08" },
  { month: "Setembro",  abbr: "SET", num: 9,  meeting: "09/09" },
  { month: "Outubro",   abbr: "OUT", num: 10, meeting: "14/10" },
  { month: "Novembro",  abbr: "NOV", num: 11, meeting: "11/11" },
  { month: "Dezembro",  abbr: "DEZ", num: 12, meeting: "09/12" },
]

export function MeetingsCalendar() {
  const today = useMemo(() => new Date(), [])
  const currentMonth = today.getMonth() + 1 // 1-12
  const currentYear = today.getFullYear()

  // Próximo mês com reunião futura
  const nextMeetingMonth = useMemo(() => {
    if (currentYear > 2026) return null
    if (currentYear < 2026) return MEETINGS_2026[0].num
    return MEETINGS_2026.find((m) => {
      const day = parseInt(m.meeting.split("/")[0])
      return m.num > currentMonth || (m.num === currentMonth && day >= today.getDate())
    })?.num ?? null
  }, [today, currentMonth, currentYear])

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-label mb-4">Agenda 2026</div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight">
              Calendário de Encontros
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs lg:text-right leading-relaxed">
            Datas dos encontros presenciais e reuniões de diretoria.{" "}
            <span className="font-semibold text-primary-600">Juntos somos mais fortes!</span>
          </p>
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary-600" />
            <span className="text-xs text-gray-500 font-medium">Encontro Geral</span>
          </div>
          {nextMeetingMonth && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">Próximo encontro</span>
            </div>
          )}
        </div>

        {/* Grid de meses */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEETINGS_2026.map((m) => {
            const isPast = currentYear > 2026 ||
              (currentYear === 2026 && m.num < currentMonth) ||
              (currentYear === 2026 && m.num === currentMonth &&
                parseInt(m.meeting.split("/")[0]) < today.getDate())
            const isNext = m.num === nextMeetingMonth
            const isCurrent = currentYear === 2026 && m.num === currentMonth

            return (
              <div
                key={m.num}
                className={[
                  "relative rounded-2xl p-5 border transition-all duration-200",
                  isPast
                    ? "bg-gray-50 border-gray-100 opacity-50"
                    : isNext
                    ? "bg-primary-600 border-primary-600 shadow-lg shadow-primary-200 scale-[1.02]"
                    : "bg-white border-gray-100 hover:border-primary-200 hover:shadow-md",
                ].join(" ")}
              >
                {/* Badge mês */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={[
                      "text-[0.65rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-lg",
                      isNext
                        ? "bg-white/15 text-white"
                        : "bg-primary-50 text-primary-700",
                    ].join(" ")}
                  >
                    {m.abbr}
                  </span>
                  {isNext && (
                    <span className="text-[0.6rem] font-semibold text-white/70 uppercase tracking-wider">
                      Próximo
                    </span>
                  )}
                  {isCurrent && !isNext && (
                    <span className="size-2 rounded-full bg-green-400" />
                  )}
                </div>

                {/* Nome do mês */}
                <p
                  className={[
                    "font-display font-semibold text-sm mb-4",
                    isNext ? "text-white" : isPast ? "text-gray-400" : "text-gray-800",
                  ].join(" ")}
                >
                  {m.month}
                </p>

                {/* Encontro Geral */}
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays
                    className={[
                      "size-3.5 shrink-0",
                      isNext ? "text-white/70" : "text-primary-500",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "font-display font-bold text-lg tracking-tight",
                      isNext ? "text-white" : isPast ? "text-gray-400" : "text-primary-700",
                    ].join(" ")}
                  >
                    {m.meeting}
                  </span>
                </div>

                {/* Linha inferior colorida no card normal */}
                {!isNext && !isPast && (
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-primary-200 to-transparent rounded-full" />
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
