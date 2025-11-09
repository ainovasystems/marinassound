"use client"

import { useState, useEffect, useMemo } from "react"

interface CountdownProps {
  fecha: string
}

export function Countdown({ fecha }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Calcular la fecha objetivo
  const targetDate = useMemo(() => {
    // Para el evento XXL, usar el 31 de enero a la 1:00 AM
    if (fecha === '2026-01-30') {
      const date = new Date('2026-01-31')
      date.setHours(1, 0, 0, 0) // 1:00 AM
      return date
    }
    
    // Para otros eventos, usar la fecha proporcionada a la 1:00 AM
    const date = new Date(fecha)
    date.setHours(1, 0, 0, 0) // 1:00 AM
    return date
  }, [fecha])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Ejecutar inmediatamente para evitar el retraso inicial
    calculateTimeLeft()
    
    // Configurar el intervalo para actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000)
    
    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(timer)
  }, [targetDate]) // Solo se vuelve a ejecutar si targetDate cambia

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 px-4">
      {[
        { label: "Días", value: timeLeft.days },
        { label: "Horas", value: timeLeft.hours },
        { label: "Minutos", value: timeLeft.minutes },
        { label: "Segundos", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="bg-navy-800/80 backdrop-blur-sm border border-dorado/20 rounded-xl p-3 md:p-4 text-center shadow-lg">
          <div className="text-3xl md:text-5xl font-bold text-dorado font-display drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-dorado/90 mt-1 font-medium tracking-wide">
            {item.label.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )
}
