import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { HojaDialog } from '../../components/ui/HojaDialog'
import { docentesDelArea, planaDocente, presentacionPlana, type Curso } from '../../content/docentes'
import { metodo } from '../../content/home'
import { site } from '../../content/site'

const copy = metodo.docentes.dialog

/** Baja al curso dentro de la hoja sin cambiar el # de la página (que quedaría al cerrar). */
function handleJump(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  const target = document.getElementById(event.currentTarget.hash.slice(1))
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

/** "Historia del Perú" → "curso-historia-del-peru" (ancla dentro de la hoja). */
const cursoId = (name: string) =>
  `curso-${name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')}`

/**
 * Botón "Conoce a la plana docente" y la hoja con los 58 docentes por rama (Matemáticas, Ciencias, Letras)
 * y curso. Solo se pinta la rama elegida y las fotos cargan en diferido: cada una pesa ~300 KB en el CDN.
 */
export function PlanaDocente() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [areaIndex, setAreaIndex] = useState(0)
  const area = planaDocente[areaIndex] ?? planaDocente[0]
  const handleOpen = () => dialogRef.current?.showModal()
  /** Al cambiar de rama la hoja vuelve arriba para que se vea el primer curso. */
  const handlePickArea = (index: number) => {
    setAreaIndex(index)
    dialogRef.current?.scrollTo({ top: 0 })
  }

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={handleOpen} className="group inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-acento hover:underline">
        {metodo.docentes.cta}
        <ChevronRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <HojaDialog ref={dialogRef} titleId="plana-titulo" eyebrow={copy.eyebrow} title={copy.title} closeLabel={copy.close}>
        <div className="px-6 pt-5 pb-8 sm:px-8">
          <p className="text-grafito-600">{presentacionPlana}</p>

          <div role="group" aria-label={copy.ramas} className="mt-6 grid grid-cols-[1.3fr_1fr_1fr] gap-2 sm:grid-cols-3">
            {planaDocente.map((rama, index) => (
              <button
                key={rama.area}
                type="button"
                aria-pressed={index === areaIndex}
                onClick={() => handlePickArea(index)}
                className="min-w-0 rounded-2xl border border-linea px-2.5 py-2.5 text-left sm:px-3 transition-colors hover:border-acento aria-pressed:border-aula aria-pressed:bg-aula aria-pressed:text-white"
              >
                <span className="block font-display text-[0.95rem] font-bold sm:text-lg">{rama.area}</span>
                <span className="block text-xs opacity-80">{copy.docentesCount(docentesDelArea(rama))}</span>
              </button>
            ))}
          </div>

          {area && (
            <>
              <nav aria-label={copy.cursos} className="mt-5">
                <ul className="flex flex-wrap gap-2">
                  {area.cursos.map((curso) => (
                    <li key={curso.name}>
                      <a href={`#${cursoId(curso.name)}`} onClick={handleJump} className="inline-flex min-h-9 items-center rounded-full bg-papel px-3.5 text-sm font-semibold text-grafito transition-colors hover:bg-aula-50 hover:text-acento">
                        {curso.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 space-y-10">
                {area.cursos.map((curso) => (
                  <CursoDocentes key={`${area.area}-${curso.name}`} curso={curso} />
                ))}
              </div>
            </>
          )}

          <a href={site.links.docentes} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-acento hover:underline">
            {copy.fuente}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </HojaDialog>
    </>
  )
}

function CursoDocentes({ curso }: { curso: Curso }) {
  const id = cursoId(curso.name)
  return (
    <section aria-labelledby={id} className="scroll-mt-32">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-linea pb-2">
        <h3 id={id} className="font-display text-xl font-bold text-titulo">
          {curso.name}
        </h3>
        <p className="text-sm font-semibold text-grafito-600">{copy.docentesCount(curso.docentes.length)}</p>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {curso.docentes.map((docente) => (
          <li key={docente.foto}>
            <figure>
              <img src={docente.foto} alt="" width={500} height={500} loading="lazy" decoding="async" className="aspect-square w-full rounded-2xl bg-aula-50 object-cover" />
              <figcaption className="mt-2 text-sm leading-snug font-bold text-titulo">{docente.nombre}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
