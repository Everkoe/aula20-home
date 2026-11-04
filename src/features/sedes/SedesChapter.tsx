import { MapPin, MonitorPlay } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { Reveal } from '../../components/ui/Reveal'
import { sedesCopy } from '../../content/home'
import { photos } from '../../content/images'
import { sedesPorZona, virtual, type Sede, type ZonaId } from '../../content/sedes'
import { mapsSearchHref } from '../../lib/format'

const grupos = sedesPorZona()

/** Capítulo 7 · sedes: pestañas por zona (patrón WAI-ARIA, con flechas) y direcciones en texto. */
export function SedesChapter() {
  const [activeZona, setActiveZona] = useState<ZonaId>('norte')
  const tabRefs = useRef<Map<ZonaId, HTMLButtonElement>>(new Map())
  const activeGroup = grupos.find((g) => g.zona === activeZona) ?? grupos[0]

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = grupos.findIndex((g) => g.zona === activeZona)
    const nextIndex = {
      ArrowRight: (current + 1) % grupos.length,
      ArrowLeft: (current - 1 + grupos.length) % grupos.length,
      Home: 0,
      End: grupos.length - 1,
    }[event.key]
    const next = nextIndex === undefined ? undefined : grupos[nextIndex]
    if (!next) return
    event.preventDefault()
    setActiveZona(next.zona)
    tabRefs.current.get(next.zona)?.focus()
  }

  return (
    <section id="sedes" aria-labelledby="titulo-sedes" className="bg-hoja py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="titulo-sedes" eyebrow={sedesCopy.eyebrow} title={sedesCopy.title} body={sedesCopy.body} />
          <Reveal index={1} className="mt-8 overflow-hidden rounded-3xl border border-linea">
            <div className="aspect-[5/3] bg-aula-50">
              <PhotoFrame photo={photos.sede} sizes="(min-width: 1024px) 30vw, 92vw" />
            </div>
            <div className="flex items-start gap-3 bg-papel p-5">
              <MonitorPlay aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-acento" />
              <p className="text-sm text-grafito">
                <span className="font-bold text-titulo">{virtual.label}.</span> {virtual.body}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div role="tablist" aria-label="Zonas de Lima y Callao" onKeyDown={handleKeyDown} className="flex flex-wrap gap-2">
            {grupos.map((grupo) => {
              const isActive = grupo.zona === activeZona
              return (
                <button
                  key={grupo.zona}
                  ref={(node) => {
                    if (node) tabRefs.current.set(grupo.zona, node)
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${grupo.zona}`}
                  aria-selected={isActive}
                  aria-controls="panel-sedes"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveZona(grupo.zona)}
                  className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${
                    isActive ? 'bg-tinta text-white dark:bg-menta dark:text-tinta' : 'border border-linea bg-hoja text-grafito hover:border-acento hover:text-acento'
                  }`}
                >
                  {grupo.label} <span className={isActive ? 'text-menta dark:text-aula-700' : 'text-grafito-600'}>{grupo.sedes.length}</span>
                </button>
              )
            })}
          </div>

          {activeGroup && (
            <div id="panel-sedes" role="tabpanel" aria-labelledby={`tab-${activeGroup.zona}`} className="mt-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {activeGroup.sedes.map((sede) => (
                  <SedeCard key={sede.name} sede={sede} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

function SedeCard({ sede }: { sede: Sede }) {
  return (
    <li className="animate-rise rounded-2xl border border-linea bg-papel p-5">
      <p className="font-display text-lg font-bold text-titulo">{sede.name}</p>
      <p className="mt-1 text-sm text-grafito">{sede.address}</p>
      {sede.reference && <p className="mt-1 text-sm text-grafito-600">{sede.reference}</p>}
      <a
        href={mapsSearchHref(sede.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-acento hover:underline"
      >
        <MapPin aria-hidden="true" className="size-4" />
        {sedesCopy.mapsCta}
        <span className="sr-only"> a la sede {sede.name}</span>
      </a>
    </li>
  )
}
