import { useLayoutEffect, useRef } from 'react'

const DURATION_MS = 700

type Props = {
  value: number
  decimals?: number
  /** Separador de miles (los puntajes de San Marcos van sin él). */
  isGrouped?: boolean
}

/**
 * Cifra que recuenta desde la que se veía hasta la nueva cuando cambia (al cambiar de simulacro o de filtro).
 * La cifra visible la escribe la animación directamente en su <span> (sin estado: no re-renderiza 60 veces por
 * segundo). El lector de pantalla lee solo el valor final; con "reducir movimiento" cambia sin animar.
 */
export function Recuento({ value, decimals = 0, isGrouped = true }: Props) {
  const visibleRef = useRef<HTMLSpanElement>(null)
  const shownRef = useRef<number | null>(null)
  const format = new Intl.NumberFormat('es-PE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: isGrouped })

  // Sincroniza la cifra del DOM con el tiempo (requestAnimationFrame); antes de pintar, para que no parpadee.
  useLayoutEffect(() => {
    const node = visibleRef.current
    if (!node) return
    const write = (n: number) => {
      shownRef.current = n
      node.textContent = format.format(n)
    }
    const from = shownRef.current
    if (from === null || from === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      write(value)
      return
    }
    const factor = 10 ** decimals
    const start = performance.now()
    const animation = { frame: 0 }
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS)
      write(Math.round((from + (value - from) * (1 - (1 - t) ** 3)) * factor) / factor)
      if (t < 1) animation.frame = requestAnimationFrame(tick)
    }
    write(from)
    animation.frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animation.frame)
    // format depende solo de decimals e isGrouped
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, isGrouped])

  return (
    <span className="tabular-nums">
      <span className="sr-only">{format.format(value)}</span>
      <span ref={visibleRef} aria-hidden="true" />
    </span>
  )
}
