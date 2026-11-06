import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { admisionCachimbos, cachimbos } from '../../content/cachimbos'
import { cachimbosCopy } from '../../content/home'
import { displayName, ordinalPlace } from '../../lib/format'

/** Tiempo que se queda cada cachimbo antes de pasar al siguiente. */
const AUTOPLAY_MS = 5000
/** Deslizamiento mínimo (px) para cambiar de cachimbo con el dedo. */
const SWIPE_PX = 40

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Carrusel de primeros puestos, uno por vez: la pieza a la izquierda y el puesto, la carrera y el nombre en
 * texto a la derecha. Flechas y puntos (da la vuelta), flechas del teclado y deslizar con el dedo.
 * Avanza solo con botón de pausa (WCAG 2.2.2); se detiene con el cursor, el foco o fuera de pantalla y no
 * arranca con "reducir movimiento". Mientras avanza solo, el cambio no se anuncia (patrón carrusel de la APG).
 */
export function CachimbosCarrusel() {
  const total = cachimbos.length
  const rootRef = useRef<HTMLDivElement>(null)
  const swipeStart = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const [isHeld, setIsHeld] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(false)

  const goTo = (next: number) => setIndex(((next % total) + total) % total)
  const handlePrev = () => goTo(index - 1)
  const handleNext = () => goTo(index + 1)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') handlePrev()
    else if (event.key === 'ArrowRight') handleNext()
    else return
    event.preventDefault()
  }
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX
  }
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) < SWIPE_PX) return
    if (delta < 0) handleNext()
    else handlePrev()
  }

  // Solo avanza mientras el carrusel está en pantalla.
  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(Boolean(entry?.isIntersecting)), { threshold: 0.4 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  // Temporizador del avance automático. Se reinicia con cada cambio, así un clic no deja un salto inmediato.
  useEffect(() => {
    if (!isPlaying || isHeld || !isOnScreen) return
    const id = window.setTimeout(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % total)
    }, AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [isPlaying, isHeld, isOnScreen, index, total])

  const isRotating = isPlaying && !isHeld

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
      className="mt-12"
    >
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
        aria-live={isRotating ? 'off' : 'polite'}
        className="grid touch-pan-y overflow-hidden rounded-3xl border border-linea bg-hoja select-none"
      >
        {cachimbos.map((cachimbo, i) => {
          const isActive = i === index
          return (
            <div
              key={cachimbo.image.src}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`col-start-1 row-start-1 grid items-center gap-6 p-5 transition-opacity duration-500 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10 sm:p-7 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14 lg:p-8 ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <div className="mx-auto aspect-[4/5] w-full max-w-[13rem] overflow-hidden rounded-2xl bg-aula-50 sm:max-w-none">
                <PhotoFrame photo={cachimbo.image} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 80vw" />
              </div>
              <div>
                <p className="inline-flex rounded-full bg-menta px-3 py-1 text-xs font-bold tracking-wider text-tinta uppercase">{ordinalPlace(cachimbo.puesto)}</p>
                <p className="mt-4 font-display text-3xl leading-tight font-extrabold tracking-tight text-titulo sm:text-4xl lg:text-5xl">{cachimbo.carrera}</p>
                <p className="mt-3 text-lg font-semibold text-grafito sm:text-xl">{displayName(cachimbo.nombre)}</p>
                <p className="mt-1 text-sm text-grafito-600">{admisionCachimbos}</p>
                <p aria-hidden="true" className="mt-8 font-display text-sm font-bold text-grafito-600 tabular-nums">
                  {String(i + 1).padStart(2, '0')} <span className="text-linea">/</span> {String(total).padStart(2, '0')}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-4 sm:justify-between">
        {/* En celular bastan las flechas y el deslizamiento: 12 puntos ocuparían dos líneas. */}
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {cachimbos.map((cachimbo, i) => (
            <button
              key={cachimbo.image.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver cachimbo ${i + 1} de ${total}: ${cachimbo.carrera}`}
              aria-current={i === index ? 'true' : undefined}
              className="group grid size-7 place-items-center rounded-full"
            >
              <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-acento' : 'w-2.5 bg-linea group-hover:bg-grafito-600'}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CarruselButton label="Cachimbo anterior" onClick={handlePrev}>
            <ChevronLeft aria-hidden="true" className="size-5" />
          </CarruselButton>
          <CarruselButton label={isPlaying ? cachimbosCopy.pause : cachimbosCopy.play} onClick={() => setIsPlaying((playing) => !playing)}>
            {isPlaying ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </CarruselButton>
          <CarruselButton label="Cachimbo siguiente" onClick={handleNext}>
            <ChevronRight aria-hidden="true" className="size-5" />
          </CarruselButton>
        </div>
      </div>
    </div>
  )
}

function CarruselButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-linea bg-hoja text-titulo transition-colors hover:border-acento hover:text-acento"
    >
      {children}
    </button>
  )
}
