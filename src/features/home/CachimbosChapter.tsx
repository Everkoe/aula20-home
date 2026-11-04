import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { admisionCachimbos, cachimbos } from '../../content/cachimbos'
import { cachimbosCopy } from '../../content/home'
import { site } from '../../content/site'
import { displayName, ordinalPlace } from '../../lib/format'

const SCROLL_RATIO = 0.85
/** Margen en px para dar por llegado un extremo (el snap puede dejar el scroll a 1–2 px del borde). */
const EDGE_TOLERANCE = 4

/** Capítulo 6 · cachimbos: recorrido lateral con scroll nativo; puesto, carrera y nombre en texto. */
export function CachimbosChapter() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const handleScroll = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * SCROLL_RATIO, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const handleTrackScroll = () => {
    const track = trackRef.current
    if (!track) return
    setIsAtStart(track.scrollLeft <= EDGE_TOLERANCE)
    setIsAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_TOLERANCE)
  }

  return (
    <section id="cachimbos" aria-labelledby="titulo-cachimbos" className="overflow-hidden bg-papel py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="titulo-cachimbos"
            eyebrow={`${cachimbosCopy.eyebrow} · ${admisionCachimbos}`}
            title={cachimbosCopy.title}
            body={cachimbosCopy.body}
          />
          <div className="flex items-center gap-2">
            <ScrollButton direction={-1} isDisabled={isAtStart} onScroll={handleScroll} />
            <ScrollButton direction={1} isDisabled={isAtEnd} onScroll={handleScroll} />
            <a href={site.links.cachimbos} target="_blank" rel="noopener noreferrer" className="ml-3 inline-flex items-center gap-1 text-sm font-semibold text-acento hover:underline">
              {cachimbosCopy.cta}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        {/* tabIndex: sin enlaces adentro, el carrusel necesita foco propio para moverse con las flechas del teclado. */}
        <ul
          ref={trackRef}
          id="cachimbos-track"
          tabIndex={0}
          aria-label={`Cachimbos ${admisionCachimbos}`}
          onScroll={handleTrackScroll}
          className="snap-row mt-12 -mx-4 flex gap-4 overflow-x-auto rounded-2xl px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {cachimbos.map((cachimbo) => (
            <li key={cachimbo.image.src} className="w-[72%] shrink-0 sm:w-[44%] md:w-[31%] lg:w-[23.5%]">
              <figure className="lift h-full overflow-hidden rounded-2xl border border-linea bg-hoja">
                <div className="aspect-[4/5] bg-aula-50">
                  <PhotoFrame photo={cachimbo.image} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 44vw, 72vw" />
                </div>
                <figcaption className="p-4">
                  <p className="text-xs font-bold tracking-wider text-acento uppercase">{ordinalPlace(cachimbo.puesto)}</p>
                  <p className="mt-1 font-display text-lg leading-snug font-bold text-titulo">{cachimbo.carrera}</p>
                  <p className="mt-1 text-sm text-grafito-600">{displayName(cachimbo.nombre)}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

type ScrollButtonProps = {
  direction: -1 | 1
  /** Llegó al extremo. Se usa aria-disabled (no disabled) para que el foco no se pierda al llegar. */
  isDisabled: boolean
  onScroll: (direction: -1 | 1) => void
}

function ScrollButton({ direction, isDisabled, onScroll }: ScrollButtonProps) {
  const Icon = direction === -1 ? ChevronLeft : ChevronRight
  const handleClick = () => {
    if (!isDisabled) onScroll(direction)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-controls="cachimbos-track"
      aria-disabled={isDisabled}
      aria-label={direction === -1 ? 'Ver cachimbos anteriores' : 'Ver más cachimbos'}
      className="grid size-11 place-items-center rounded-full border border-linea bg-hoja text-titulo transition-colors hover:border-acento hover:text-acento aria-disabled:cursor-default aria-disabled:opacity-40 aria-disabled:hover:border-linea aria-disabled:hover:text-titulo"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  )
}
