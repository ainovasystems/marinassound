"use client"

import Image from "next/image"
import { EventHeader } from "@/components/event-header"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/countdown"
import { Clock, MapPin } from "lucide-react"

interface EventoXXLProps {
  evento: any
}

export function EventoXXL({ evento }: EventoXXLProps) {
  const artistasDia1 = evento.artistasPorDia?.dia1 || []
  const artistasDia2 = evento.artistasPorDia?.dia2 || []

  return (
    <>
      <EventHeader 
        eventoId="lugo-xxl" 
        urlEntradas={evento.urlEntradas}
        mostrarBotonEntradas={evento.mostrarBotonEntradas}
      />

      <div className="min-h-screen w-full relative" style={{
        backgroundImage: 'linear-gradient(rgba(7, 24, 45, 0.9), rgba(4, 15, 30, 0.95)), url(/@antonioaguiin-95.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        
        {/* Contenido */}
        <div className="pt-40 pb-16 flex flex-col items-center justify-start px-4 w-full relative">
        <div className="max-w-4xl w-full space-y-12 relative">
          {/* Cartel grande */}
          {evento.cartel && (
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-600/50">
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
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white tracking-wider">
              {evento.nombre}
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg font-medium">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-blue-400" />
                {evento.localizacion}
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" />
                {evento.hora}
              </div>
              </div>
              
              {/* Countdown */}
              <div className="pt-4">
                <Countdown fecha={evento.fecha} />
              </div>
            </div>

            {/* Título LINE UP */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white text-center tracking-wider mb-8">
              LINE UP
            </h2>

            {/* Viernes */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider text-center">
                Viernes 30
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 px-2">
                {artistasDia1.map((artista: any, index: number) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:bg-white/10 hover:backdrop-brightness-75 backdrop-blur-sm group-hover:shadow-blue-500/20">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={artista.imagen || "/placeholder.svg"}
                          alt={artista.nombre || 'Artista'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="text-white font-semibold text-base md:text-lg">
                          ???????
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sábado */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider text-center">
                Sábado 31
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 px-2">
                {artistasDia2.map((artista: any, index: number) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:bg-white/10 hover:backdrop-brightness-75 backdrop-blur-sm group-hover:shadow-blue-500/20">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={artista.imagen || "/placeholder.svg"}
                          alt={artista.nombre || 'Artista'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="text-white font-semibold text-base md:text-lg">
                          ???????
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 justify-center items-center pt-8 w-full">
              <div className="w-full md:w-auto bg-gray-600/50 text-white font-bold py-6 px-8 rounded-full text-lg text-center cursor-default">
                Próximamente entradas
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                {evento.urlAutorizacionMenores && evento.enableAutorizacion && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:bg-blue-900/30 hover:border-blue-400 hover:text-white font-medium px-4 py-5 text-sm font-display w-1/2 md:w-auto bg-navy-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  >
                    <a href={evento.urlAutorizacionMenores} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Autorización</span>
                    </a>
                  </Button>
                )}

                {evento.urlBuses && evento.enableBuses && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:bg-blue-900/30 hover:border-blue-400 hover:text-white font-medium px-4 py-5 text-sm font-display w-1/2 md:w-auto bg-navy-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  >
                    <a href={evento.urlBuses} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10v6a1 1 0 001 1h2a1 1 0 001-1v-1.05a2.5 2.5 0 014.9 0H21a1 1 0 001-1v-2.67a1 1 0 00-.2-.6l-3.2-4.26a1 1 0 00-.8-.4H14V5a1 1 0 00-1-1H8v-.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V4H13v1h-3v1h4a1 1 0 01.8.4l3.2 4.26a1 1 0 01.2.6V14h-3v-1h-2v2h1.8a2.5 2.5 0 00-4.6 0H9.1a2.5 2.5 0 00-4.6 0H3V5h2v9.5z" />
                      </svg>
                      <span>Buses</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}
