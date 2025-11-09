"use client"

import Image from "next/image"
import { EventHeader } from "@/components/event-header"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/countdown"
import { Clock, MapPin } from "lucide-react"

interface EventoFDAProps {
  evento: any
}

export function EventoFDA({ evento }: EventoFDAProps) {
  return (
    <div className="relative min-h-screen bg-navy-950">
      <EventHeader 
        eventoId="fda" 
        urlEntradas={evento.urlEntradas}
      />

      {/* Fondo con imagen */}
      <div className="fixed inset-0 -z-10">
        {evento.cartel && (
          <Image 
            src={evento.cartel} 
            alt="" 
            fill
            className="object-cover object-center opacity-20"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/80 to-navy-950/90"></div>
      </div>

      <div className="pt-32 pb-16 min-h-screen flex flex-col items-center justify-start px-4">
        <div className="max-w-4xl w-full space-y-12 relative">
          {/* Cartel grande */}
          {evento.cartel && (
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-dorado/50">
              <Image 
                src={evento.cartel} 
                alt={evento.nombre} 
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Título y detalles */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-wider">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-dorado via-yellow-300 to-yellow-200 bg-size-200 animate-shine">
                Blue New Year
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg font-medium">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-dorado" />
                {evento.localizacion}
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-dorado" />
                {evento.hora}
              </div>
            </div>
          </div>

          {/* Countdown */}
          <Countdown fecha={evento.fecha} />

          {/* Botón de compra */}
          <div className="flex justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-dorado to-yellow-400 hover:from-dorado/90 hover:to-yellow-400/90 text-navy-900 font-bold px-12 py-6 text-xl md:text-2xl shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:shadow-[0_0_60px_rgba(212,175,55,0.9)] transition-all font-display transform hover:scale-105 duration-300"
            >
              <a href={evento.urlEntradas} target="_blank" rel="noopener noreferrer" className="px-8">
                Comprar Entradas
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
