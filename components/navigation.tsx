"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [ticketsUrl, setTicketsUrl] = useState("#entradas")
  const [authUrl, setAuthUrl] = useState("#")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.urlEntradasGeneral) {
          setTicketsUrl(data.urlEntradasGeneral)
        }
        if (data.urlAutorizacionMenores) {
          setAuthUrl(data.urlAutorizacionMenores)
        }
      })
      .catch((error) => console.error("Error loading tickets URL:", error))
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#eventos", label: "Eventos" },
    { href: authUrl, label: "Autorización de Menores", external: true },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center">
            <Image
              src="/images/design-mode/LOGO%20MARIN%CC%83AS%20SOUND%20SIN%20FONDO.png"
              alt="Mariñas Sound Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 shadow-[0_0_20px_rgba(0,102,204,0.5)] hover:shadow-[0_0_30px_rgba(0,102,204,0.7)] transition-all font-display"
            >
              <a href={ticketsUrl} target="_blank" rel="noopener noreferrer">
                Comprar Entradas
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-[0_0_20px_rgba(0,102,204,0.5)] font-display"
              >
                <a
                  href={ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Comprar Entradas
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
