import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { admisionCachimbos, cachimbos, type Cachimbo } from '../../content/cachimbos'
import { displayName, ordinalPlace } from '../../lib/format'

/** Cada cuánto avanza una tarjeta. */
const PASO_MS = 4000
/** Lo más que se ve a la vez (escritorio). Se clonan tantas al final para que la vuelta no tenga corte. */
const MAX_POR_VISTA = 3
/** Deslizamiento mínimo (px) para avanzar o retroceder con el dedo. */
const SWIPE_PX = 40

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Primeros puestos en tarjetas: 3 por fila en escritorio, 2 en tableta y 1 en celular (pedido del usuario,
 * 2026-11-09). Avanzan solas de a una cada 4 s, sin flechas, puntos ni pausa; se detienen con el cursor, el foco
 * o fuera de pantalla, y en celular se pueden pasar con el dedo. Con "reducir movimiento" no avanzan solas.
 */
export function CachimbosFila() {
  const total = cachimbos.length
  const rootRef = useRef<HTMLDivElement>(null)
  const swipeStart = useRef<number | null>(null)
  /** Posición de la primera tarjeta visible; llega a `total` sobre los clones y vuelve a 0 sin animación. */
  const [paso, setPaso] = useState(0)
  const [isAnimated, setIsAnimated] = useState(true)
  const [isAuto] = useState(() => !prefersReducedMotion())
  const [isHeld, setIsHeld] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(false)

  const isRunning = isAuto && !isHeld && isOnScreen

  const avanzar = () => {
    setIsAnimated(true)
    setPaso((current) => Math.min(current + 1, total))
  }
  const retroceder = () => {
    if (paso > 0) {
      setIsAnimated(true)
      setPaso(paso - 1)
      return
    }
    // Desde la primera: salta a los clones del final (se ven igual) y desde ahí retrocede animado.
    setIsAnimated(false)
    setPaso(total)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setIsAnimated(true)
        setPaso(total - 1)
      }),
    )
  }

  /** Al terminar sobre los clones (que repiten las primeras), salta al inicio real sin que se note. */
  const handleTransitionEnd = () => {
    if (paso < total) return
    setIsAnimated(false)
    setPaso(0)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(Boolean(entry?.isIntersecting)), { threshold: 0.3 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const id = window.setTimeout(() => {
      if (document.hidden) return
      setIsAnimated(true)
      setPaso((current) => Math.min(current + 1, total))
    }, PASO_MS)
    return () => window.clearTimeout(id)
  }, [isRunning, paso, total])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX
  }
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) < SWIPE_PX) return
    if (delta < 0) avanzar()
    else retroceder()
  }

  const tarjetas = [...cachimbos, ...cachimbos.slice(0, MAX_POR_VISTA)]

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Primeros puestos · ${admisionCachimbos}`}
      onPointerEnter={() => setIsHeld(true)}
      onPointerLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsHeld(false)
      }}
      className="-mx-2 mt-12 touch-pan-y overflow-hidden select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      // Arrastrar una imagen con el mouse dispararía el arrastre nativo y cancelaría el gesto.
      onDragStart={(event) => event.preventDefault()}
    >
      <ul
        onTransitionEnd={handleTransitionEnd}
        className={`flex [--por-vista:1] sm:[--por-vista:2] lg:[--por-vista:3] ${isAnimated ? 'transition-transform duration-700 ease-[var(--ease-suave)] motion-reduce:transition-none' : ''}`}
        style={{ transform: 'translateX(calc(var(--paso) * -100% / var(--por-vista)))', '--paso': paso } as CSSProperties}
      >
        {tarjetas.map((cachimbo, i) => {
          const isClone = i >= total
          return (
            <li
              key={`${cachimbo.image.src}-${isClone ? 'copia' : 'original'}`}
              aria-hidden={isClone ? 'true' : undefined}
              inert={isClone}
              className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
            >
              <TarjetaCachimbo cachimbo={cachimbo} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TarjetaCachimbo({ cachimbo }: { cachimbo: Cachimbo }) {
  return (
    <article className="h-full rounded-3xl border border-linea bg-hoja p-4 sm:p-5">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-aula-50">
        <PhotoFrame photo={cachimbo.image} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw" />
      </div>
      <div className="px-1 pt-5 pb-1">
        <p className="inline-flex rounded-full bg-menta px-3 py-1 text-xs font-bold tracking-wider text-tinta uppercase">{ordinalPlace(cachimbo.puesto)}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight font-extrabold tracking-tight text-titulo">{cachimbo.carrera}</h3>
        <p className="mt-2 font-semibold text-grafito">{displayName(cachimbo.nombre)}</p>
        <p className="mt-0.5 text-sm text-grafito-600">{admisionCachimbos}</p>
      </div>
    </article>
  )
}
