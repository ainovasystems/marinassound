"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface EventHeaderProps {
  eventoId: string
  urlEntradas: string
  mostrarBotonEntradas?: boolean
  mostrarBotonAutorizacion?: boolean
  urlAutorizacionMenores?: string
  enableAutorizacion?: boolean
}

export function EventHeader({ 
  eventoId, 
  urlEntradas, 
  mostrarBotonEntradas = true, 
  mostrarBotonAutorizacion = true,
  urlAutorizacionMenores, 
  enableAutorizacion 
}: EventHeaderProps) {
  const pathname = usePathname()
  const isFDAEvent = pathname.includes("lugo-fda")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent h-24 flex items-center">
      <div className="container mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo - volver a landing */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="relative h-16 w-auto">
            <Image
              src="/images/logo-white.png"
              alt="Mariñas Sound"
              width={200}
              height={80}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <div className="flex gap-4">
          {/* Comprar Entradas button - Solo se muestra si mostrarBotonEntradas es true */}
          {mostrarBotonEntradas && urlEntradas && (
            <Button
              asChild
              className="font-bold px-8 transition-all font-display text-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
            >
              <a href={urlEntradas} target="_blank" rel="noopener noreferrer">
                Comprar Entradas
              </a>
            </Button>
          )}

          {/* Botón de autorización de menores */}
          {mostrarBotonAutorizacion && enableAutorizacion && urlAutorizacionMenores && (
            <Button
              asChild
              variant="outline"
              className="border-gray-400 text-white hover:bg-gray-800/50 hover:border-blue-400 hover:text-white font-medium px-6 font-display bg-navy-800/50 backdrop-blur-sm transition-all duration-300"
            >
              <a href={urlAutorizacionMenores} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Autorización</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
