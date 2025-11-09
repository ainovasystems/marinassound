"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface HeroData {
  targetDate: string
  location: string
  backgroundImage?: string
  ticketsUrl?: string
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.eventos && data.eventos[0]) {
          setHeroData({
            targetDate: data.eventos[0].fecha,
            location: data.eventos[0].localizacion,
            backgroundImage:
              data.imagenFondoFestival ||
              "/images/design-mode/482662551_1818679245587385_2736885943389462158_n%20%281%29.jpg",
            ticketsUrl: data.urlEntradasGeneral || "#entradas",
          })
        }
      })
      .catch((error) => console.error("[v0] Error loading hero data:", error))
  }, [])

  useEffect(() => {
    if (!heroData?.targetDate) return

    const targetDate = new Date(heroData.targetDate)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [heroData])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroData?.backgroundImage && (
          <Image
            src={heroData.backgroundImage || "/placeholder.svg"}
            alt="Mariñas Sound Festival"
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="mb-12 animate-float">
          <Image
            src="/images/design-mode/LOGO%20MARIN%CC%83AS%20SOUND%20SIN%20FONDO.png"
            alt="Mariñas Sound Logo"
            width={700}
            height={350}
            className="mx-auto w-full max-w-3xl h-auto drop-shadow-[0_0_40px_rgba(0,102,204,0.6)]"
            priority
          />
        </div>

        {heroData && (
          <p className="text-lg md:text-xl text-foreground/80 mb-12 flex items-center justify-center gap-2 font-medium">
            <Calendar className="w-5 h-5 text-primary" />
            {new Date(heroData.targetDate).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {heroData.location}
          </p>
        )}

        {/* Countdown */}
        <div className="mb-16">
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-card/60 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-4 md:p-8 shadow-2xl hover:border-primary/60 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-6xl font-bold text-primary mb-2 font-display">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm text-foreground/70 font-semibold uppercase tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-7 shadow-2xl hover:shadow-[0_0_40px_rgba(0,102,204,0.8)] transition-all font-display tracking-wider"
          >
            <a href={heroData?.ticketsUrl || "#entradas"} target="_blank" rel="noopener noreferrer">
              COMPRAR ENTRADAS
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xl px-12 py-7 bg-transparent font-display tracking-wider"
          >
            <a href="#lineup">VER LINE-UP</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
