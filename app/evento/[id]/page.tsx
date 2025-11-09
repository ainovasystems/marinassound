"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { EventoAsturias } from "@/components/eventos/evento-asturias"
import { EventoHermo } from "@/components/eventos/evento-hermo"
import { EventoFDA } from "@/components/eventos/evento-fda"
import { EventoXXL } from "@/components/eventos/evento-xxl"
import { Footer } from "@/components/footer"

interface EventoData {
  id: string
  nombre: string
  fecha: string
  imagen?: string
  cartel?: string
  urlEntradas?: string
  urlAutorizacionMenores?: string
  urlBuses?: string
  artistas?: any[]
  artistasPorDia?: any
}

export default function EventoPage() {
  const params = useParams()
  const eventoId = params.id as string
  const [evento, setEvento] = useState<EventoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundEvento = data.eventos.find((e: any) => e.id === eventoId)
        if (foundEvento) {
          setEvento({
            ...foundEvento,
            urlEntradas: foundEvento.urlEntradas || data.urlEntradasGeneral,
            urlAutorizacionMenores: data.urlAutorizacionMenores,
            urlBuses: foundEvento.urlBuses || data.urlBuses,
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Error loading evento:", error)
        setLoading(false)
      })
  }, [eventoId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-2xl text-foreground">Cargando...</div>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-2xl text-foreground">Evento no encontrado</div>
      </div>
    )
  }

  // Pasar la fecha del evento al EventHeader a través de cada componente
  return (
    <main className="min-h-screen bg-background">
      {eventoId === 'asturias' && <EventoAsturias evento={evento} />}
      {eventoId === 'hermo' && <EventoHermo evento={evento} />}
      {eventoId === 'fda' && <EventoFDA evento={evento} />}
      {eventoId === 'lugo-xxl' && <EventoXXL evento={evento} />}
      <Footer />
    </main>
  )
}
