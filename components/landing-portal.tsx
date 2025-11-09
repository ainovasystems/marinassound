"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Evento {
  id: string
  nombre: string
  imagen: string
  fecha: string
}

export function LandingPortal() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [imagenFondo, setImagenFondo] = useState("")

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setEventos(
          data.eventos.map((e: any) => ({
            id: e.id,
            nombre: e.nombre,
            imagen: e.imagen,
            fecha: e.fecha,
          })),
        )
        setImagenFondo(data.imagenFondoFestival || "")
        setLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Error loading landing data:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative bg-navy-900">
      {imagenFondo && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${imagenFondo})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="relative w-full -mt-12 md:-mt-16">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-6xl h-96 md:h-[32rem] lg:h-[40rem] animate-float">
            <Image
              src="/images/logo.png"
              alt="Mariñas Sound Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
              sizes="(max-width: 1536px) 80vw, 1200px"
            />
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-display font-bold text-white mb-12 tracking-wider">
            EVENTOS
          </h2>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {loading ? (
              <div className="col-span-full text-center text-foreground/60">Cargando eventos...</div>
            ) : (
              eventos.map((evento) => (
                <Link
                  key={evento.id}
                  href={`/evento/${evento.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={evento.imagen || "/placeholder.svg"}
                    alt={evento.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center font-display tracking-wider drop-shadow-lg group-hover:drop-shadow-lg transition-all mb-3">
                      {evento.nombre}
                    </h3>
                    <p className="text-base md:text-lg text-white drop-shadow-md">
                      {evento.id === 'lugo-xxl' 
                        ? '30 y 31 de enero de 2026' 
                        : new Date(evento.fecha).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
