"use client"

import { useEffect, useState } from "react"
import { Instagram, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

interface ContactData {
  email: string
  instagram: string
}

interface FooterData {
  contacto: ContactData
  urlEntradasGeneral: string
  urlAutorizacionMenores: string
}

export function Footer() {
  const [data, setData] = useState<FooterData | null>(null)
  const pathname = usePathname()
  const isFDAEvent = pathname.includes("lugo-fda")

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData({
          contacto: jsonData.contacto,
          urlEntradasGeneral: jsonData.urlEntradasGeneral,
          urlAutorizacionMenores: jsonData.urlAutorizacionMenores,
        })
      })
      .catch((error) => console.error("[v0] Error loading footer data:", error))
  }, [])

  return (
    <footer
      id="contacto"
      className="bg-secondary/80 backdrop-blur-md text-secondary-foreground py-4 md:py-5 border-t border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h4 className="font-bold text-lg mb-2 font-display tracking-wide text-white">
            Contacto
          </h4>
          {data?.contacto && (
            <div className="space-y-2 flex flex-col items-center">
              <a
                href={`mailto:${data.contacto.email}`}
                className="flex items-center gap-1 text-foreground/80 hover:text-blue-400 transition-colors font-medium text-base"
              >
                <Mail className="w-4 h-4" />
                {data.contacto.email}
              </a>
              <a
                href={data.contacto.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground/80 hover:text-pink-500 transition-colors font-medium text-base"
              >
                <Instagram className="w-4 h-4" />
                @marinas.sound
              </a>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/10 pt-8 mt-8 text-center text-foreground/50 text-sm">
          <p className="font-medium">&copy; {new Date().getFullYear()} Mariñas Sound. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
