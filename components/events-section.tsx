"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Ticket, Clock } from "lucide-react"
import Image from "next/image"

interface Artist {
  nombre: string
  confirmado: boolean
  imagen: string
  fechaRevelacion?: string
}

interface EventoTab {
  id: string
  nombre: string
  fecha: string
  estado: string
  entradas: string
  localizacion: string
  hora?: string
  imagen?: string
  artistas?: Artist[]
  artistasPorDia?: {
    dia1: Artist[]
    dia2: Artist[]
  }
}

// Función para formatear fechas
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    timeZone: 'Europe/Madrid'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función para calcular la cuenta atrás
function formatCountdown(targetDate: string) {
  try {
    const now = new Date();
    const target = new Date(targetDate);
    
    // Verificar si la fecha es válida
    if (isNaN(target.getTime())) {
      return 'Fecha no disponible';
    }
    
    const diffTime = target.getTime() - now.getTime();
    
    if (diffTime < 0) return '¡El evento ya ha comenzado!';
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `Faltan ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else if (diffDays > 1) {
      return `Faltan ${diffDays} días`;
    } else if (diffDays === 1) {
      return '¡Mañana es el gran día!';
    } else {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return `¡Hoy en ${diffHours} horas!`;
    }
  } catch (error) {
    console.error('Error al formatear la cuenta atrás:', error);
    return 'Próximamente';
  }
}

export function EventsSection() {
  const [eventos, setEventos] = useState<EventoTab[]>([])
  const [eventoActivo, setEventoActivo] = useState<string>("asturias")
  
  // Mapear los datos para asegurar la compatibilidad
  const mapearDatosEvento = (evento: any): EventoTab => ({
    ...evento,
    entradas: evento.urlEntradas || "#" // Usar urlEntradas como entradas
  })

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.eventos) {
          const eventosMapeados = data.eventos.map(mapearDatosEvento)
          setEventos(eventosMapeados)
          setEventoActivo(eventosMapeados[0]?.id || "asturias")
        }
      })
      .catch((error) => console.error("[v0] Error loading events:", error))
  }, [])

  const eventoSeleccionado = eventos.find((e) => e.id === eventoActivo)

  return (
    <section id="eventos" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 to-navy-800/80 -z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-10 -z-20"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary mb-4 text-balance font-display tracking-wider 
                      [text-shadow:_0_0_30px_rgba(212,175,55,0.7)]
                      hover:[text-shadow:_0_0_40px_rgba(212,175,55,0.9)]
                      transition-all duration-500">
            EVENTOS
          </h2>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {eventos.map((evento) => (
              <div key={evento.id} className="flex flex-col items-center">
                <button
                  onClick={() => setEventoActivo(evento.id)}
                  className={`px-8 py-3.5 rounded-full font-bold transition-all text-base md:text-lg font-sans tracking-wide ${
                    eventoActivo === evento.id
                      ? "bg-primary text-white shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                      : "bg-navy-800 text-gray-200 hover:bg-navy-700 border border-navy-600/50 hover:border-navy-400/50"
                  }`}
                >
                  {evento.id === 'lugo-xxl' ? 'XXL' : 
                   evento.id === 'fda' ? 'Blue New Year' : 
                   evento.id === 'hermo' ? 'Hermo' : 
                   'Asturias'}
                </button>
                <div className="text-center mt-3 space-y-1.5">
                  <p className="text-sm font-semibold text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                    {evento.localizacion}
                  </p>
                  <p className="text-sm text-gray-100 font-medium drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]">
                    30 y 31 de enero de 2026
                  </p>
                  <p className="text-sm font-bold text-dorado-light mt-1.5 tracking-wide 
                            [text-shadow:_0_0_10px_rgba(212,175,55,0.7)]
                            hover:[text-shadow:_0_0_15px_rgba(212,175,55,0.9)]
                            transition-all duration-300">
                    {evento.id === 'lugo-xxl' ? formatCountdown('2026-01-30') : 
                     formatCountdown(evento.fecha)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Nombre del evento seleccionado */}
          {eventoSeleccionado && (
            <div className="text-center mt-10 mb-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white font-sans tracking-normal mb-3
                          [text-shadow:_0_0_15px_rgba(255,255,255,0.3)]
                          hover:[text-shadow:_0_0_20px_rgba(255,255,255,0.4)]
                          transition-all duration-300">
                {eventoSeleccionado.nombre}
              </h3>
              <p className="text-lg text-gray-100 font-medium drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                {eventoSeleccionado.localizacion}
                {eventoSeleccionado.hora && ` • ${eventoSeleccionado.hora}`}
              </p>
            </div>
          )}
        </div>

        {/* Event Details Card */}
        {eventoSeleccionado && (
          <>
            <Card className="overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,204,0.4)] group bg-card/60 backdrop-blur-sm max-w-4xl mx-auto mb-12">
              {/* Event Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-primary/30">
                {eventoSeleccionado.imagen ? (
                  <Image
                    src={eventoSeleccionado.imagen || "/placeholder.svg"}
                    alt={eventoSeleccionado.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {eventoSeleccionado.estado === "entradas disponibles" ? (
                    <span className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold font-display shadow-lg">
                      Entradas Disponibles
                    </span>
                  ) : (
                    <span className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full text-sm font-bold font-display shadow-lg">
                      Próximamente
                    </span>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display tracking-wide">
                  {eventoSeleccionado.nombre}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-foreground/80">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{eventoSeleccionado.localizacion}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">
                      {eventoSeleccionado.fecha
                        ? new Date(eventoSeleccionado.fecha).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Próximamente"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{eventoSeleccionado.hora || "Por confirmar"}</span>
                  </div>
                </div>

                {eventoSeleccionado.entradas ? (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all font-display tracking-wide"
                  >
                    <a
                      href={eventoSeleccionado.entradas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-5 h-5" />
                      Comprar Entradas
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    disabled
                    className="w-full border-2 border-muted text-muted-foreground font-bold text-lg bg-transparent font-display tracking-wide"
                  >
                    Próximamente
                  </Button>
                )}
              </div>
            </Card>

            {(eventoSeleccionado.artistas || eventoSeleccionado.artistasPorDia) && (
              <div className="max-w-6xl mx-auto">
                {eventoSeleccionado.artistas ? (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-display tracking-wide">
                      Line-up
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                      {eventoSeleccionado.artistas.map((artist, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                        >
                          <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/20">
                            <Image
                              src={artist.imagen || "/placeholder.svg"}
                              alt={artist.confirmado ? artist.nombre : "Artista por revelar"}
                              fill
                              className={`object-cover transition-all duration-300 group-hover:scale-110 ${
                                !artist.confirmado ? "opacity-60" : ""
                              }`}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                              <h3
                                className={`font-bold text-base md:text-lg lg:text-xl font-display tracking-wide text-center ${
                                  artist.confirmado ? "text-white" : "text-white/60"
                                }`}
                              >
                                {artist.nombre}
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : eventoSeleccionado.artistasPorDia ? (
                  <div className="space-y-12">
                    {/* Día 1 */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-display tracking-wide">
                        Día 1 - 30 de Enero
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                        {eventoSeleccionado.artistasPorDia.dia1.map((artist, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                          >
                            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/20">
                              <Image
                                src={artist.imagen || "/placeholder.svg"}
                                alt={artist.confirmado ? artist.nombre : "Artista por revelar"}
                                fill
                                className={`object-cover transition-all duration-300 group-hover:scale-110 ${
                                  !artist.confirmado ? "opacity-60" : ""
                                }`}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                                <h3
                                  className={`font-bold text-base md:text-lg lg:text-xl font-display tracking-wide text-center ${
                                    artist.confirmado ? "text-white" : "text-white/60"
                                  }`}
                                >
                                  {artist.nombre}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Día 2 */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-display tracking-wide">
                        Día 2 - 31 de Enero
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                        {eventoSeleccionado.artistasPorDia.dia2.map((artist, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                          >
                            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/20">
                              <Image
                                src={artist.imagen || "/placeholder.svg"}
                                alt={artist.confirmado ? artist.nombre : "Artista por revelar"}
                                fill
                                className={`object-cover transition-all duration-300 group-hover:scale-110 ${
                                  !artist.confirmado ? "opacity-60" : ""
                                }`}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                                <h3
                                  className={`font-bold text-base md:text-lg lg:text-xl font-display tracking-wide text-center ${
                                    artist.confirmado ? "text-white" : "text-white/60"
                                  }`}
                                >
                                  {artist.nombre}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
