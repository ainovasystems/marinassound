"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar } from "lucide-react"

interface Artist {
  nombre: string
  confirmado: boolean
  imagen: string
  fechaRevelacion?: string
}

export function LineupSection() {
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.artistas) {
          setArtists(data.artistas)
        }
      })
      .catch((error) => console.error("[v0] Error loading artists:", error))
  }, [])

  return (
    <section id="lineup" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary mb-4 text-balance font-display tracking-wider drop-shadow-[0_0_30px_rgba(0,102,204,0.5)]">
            LINE UP
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
              style={{ animationDelay: `${index * 0.05}s` }}
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

                {!artist.confirmado && artist.fechaRevelacion && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Calendar className="w-3.5 h-3.5" />
                    {artist.fechaRevelacion}
                  </div>
                )}

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
    </section>
  )
}
