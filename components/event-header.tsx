"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface EventHeaderProps {
  eventoId: string
  urlEntradas: string
  mostrarBotonEntradas?: boolean
}

export function EventHeader({ eventoId, urlEntradas, mostrarBotonEntradas = true }: EventHeaderProps) {
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
      </div>
    </header>
  )
}
