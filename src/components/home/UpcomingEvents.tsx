import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventoCard } from "@/components/eventos/EventoCard"
import type { EventoWithCity } from "@/types"

interface UpcomingEventsProps {
  eventos: EventoWithCity[]
}

export function UpcomingEvents({ eventos }: UpcomingEventsProps) {
  if (eventos.length === 0) return null

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-label mb-4">Agenda</div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 tracking-tight">
              Próximos eventos
            </h2>
          </div>
          <Button variant="outline" asChild className="shrink-0 text-sm">
            <Link href="/eventos">
              Ver agenda completa
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventos.map((e) => (
            <EventoCard key={e.id} evento={e} />
          ))}
        </div>

      </div>
    </section>
  )
}
