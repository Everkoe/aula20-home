import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1100

type Props = {
  to: number
  suffix?: string
  /** Decimales fijos (puntajes de simulacro: 1). */
  decimals?: number
  /** Separador de miles (los puntajes de San Marcos se escriben sin él: 1058.5). */
  isGrouped?: boolean
}

/** Número que sube de 0 hasta `to` al entrar en pantalla. Con «reducir movimiento» o sin observer muestra el valor final. */
export function CountUp({ to, suffix = '', decimals = 0, isGrouped = true }: Props) {
  const formatter = new Intl.NumberFormat('es-PE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: isGrouped })
  const factor = 10 ** decimals
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = { frame: 0 }
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS)
        setValue(Math.round((1 - (1 - t) ** 3) * to * factor) / factor)
        if (t < 1) animation.frame = requestAnimationFrame(tick)
      }
      animation.frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        setValue(0)
        run()
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animation.frame)
    }
  }, [to, factor])

  // El lector de pantalla lee el valor final una vez; el número que sube es solo visual.
  // (aria-label en un <span> no sirve: no tiene rol y se ignora.)
  const label = `${formatter.format(to)}${suffix}`
  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {formatter.format(value)}
        {suffix}
      </span>
    </span>
  )
}
