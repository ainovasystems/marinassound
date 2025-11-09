"use client"

import { EventoFDA } from "@/components/eventos/evento-fda"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

interface EventoData {
  id: string
  nombre: string
  fecha: string
  imagen?: string
  cartel?: string
  urlEntradas?: string
  localizacion?: string
  hora?: string
}

export default function FDAPage() {
  const [evento, setEvento] = useState<EventoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundEvento = data.eventos.find((e: any) => e.id === 'fda')
        if (foundEvento) {
          setEvento({
            ...foundEvento,
            urlEntradas: foundEvento.urlEntradas || data.urlEntradasGeneral,
            urlBuses: foundEvento.urlBuses || data.urlBuses,
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Error loading evento:", error)
        setLoading(false)
      })
  }, [])

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

  return (
    <main className="min-h-screen bg-background">
      <EventoFDA evento={evento} />
      <Footer />
    </main>
  )
}
