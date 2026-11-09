import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { CountUp } from '../../components/ui/CountUp'
import type { NotaSimulacro } from '../content/alumno'
import type { Bloque } from '../content/cursos'
import { formatPuntaje } from '../lib/fechas'
import { nombreSemana } from '../lib/semanas'
import { colorBloque } from './bloques'

/** Columnas de notas de la intranet, en su orden, con el bloque que da el color. */
const COLUMNAS: { key: keyof NotaSimulacro['bloques']; label: string; bloque: Bloque }[] = [
  { key: 'hv', label: 'HV', bloque: 'habilidades' },
  { key: 'hm', label: 'HM', bloque: 'habilidades' },
  { key: 'matematicas', label: 'Mate', bloque: 'matematicas' },
  { key: 'letras', label: 'Letras', bloque: 'letras' },
  { key: 'ciencias', label: 'Ciencias', bloque: 'ciencias' },
]

type Props = {
  id: string
  notas: NotaSimulacro[]
}

/**
 * Puntaje por bloque de cada simulacro. El selector es una lista de pestañas (flechas para moverse) con una
 * pastilla que se desliza; al cambiar, las barras se transforman y el total vuelve a contar. La barra gris
 * detrás es el otro simulacro, para comparar. Las cifras van en texto debajo de cada barra.
 */
export function BloquesChart({ id, notas }: Props) {
  const [index, setIndex] = useState(Math.max(0, notas.length - 1))
  const tabsRef = useRef<HTMLDivElement>(null)
  const nota = notas[index]
  const comparada = notas[index === notas.length - 1 ? index - 1 : index + 1]
  const max = Math.max(1, ...notas.flatMap((n) => Object.values(n.bloques)))
  if (!nota) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const paso = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!paso) return
    event.preventDefault()
    const next = (index + paso + notas.length) % notas.length
    setIndex(next)
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus()
  }

  return (
    <section aria-labelledby={id} className="entrada min-w-0 rounded-3xl border border-linea bg-hoja p-5 sm:p-7" style={{ '--i': 4 } as CSSProperties}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id={id} className="text-xl font-extrabold tracking-tight text-titulo">
            Tu puntaje por bloque
          </h2>
          <p className="mt-0.5 text-sm text-grafito-600">
            Total{' '}
            <strong className="font-display text-base font-extrabold text-titulo tabular-nums">
              <CountUp key={index} to={nota.total} decimals={1} isGrouped={false} />
            </strong>
            {comparada && <> · en gris, {nombreSemana(comparada.semanaId)}</>}
          </p>
        </div>
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Simulacro"
          onKeyDown={handleKeyDown}
          style={{ '--n': notas.length, '--sel': index } as CSSProperties}
          className="relative grid auto-cols-fr grid-flow-col rounded-full bg-papel p-1"
        >
          <span aria-hidden="true" className="pastilla absolute inset-y-1 left-1 rounded-full bg-aula shadow-sm" />
          {notas.map((n, i) => (
            <button
              key={n.semanaId}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === index}
              aria-controls={`${id}-panel`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className="relative min-h-9 rounded-full px-3.5 text-sm font-semibold whitespace-nowrap text-grafito transition-colors duration-300 aria-selected:text-white"
            >
              {nombreSemana(n.semanaId)}
            </button>
          ))}
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} className="mt-6">
        <dl className="grid grid-cols-5 gap-2 sm:gap-4">
          {COLUMNAS.map((col) => {
            const valor = nota.bloques[col.key]
            const otro = comparada?.bloques[col.key]
            return (
              <div key={col.key} className="flex flex-col">
                <div aria-hidden="true" className="relative h-36 sm:h-44">
                  {otro !== undefined && (
                    <span style={{ transform: `scaleY(${otro / max})` }} className="barra absolute inset-x-0 bottom-0 h-full origin-bottom rounded-t-lg bg-linea" />
                  )}
                  <span
                    style={{ transform: `scaleY(${valor / max})` }}
                    className={`barra absolute inset-x-1.5 bottom-0 h-full origin-bottom rounded-t-lg sm:inset-x-2.5 ${colorBloque[col.bloque].relleno}`}
                  />
                </div>
                <dt className="mt-2 border-t border-linea pt-2 text-xs font-semibold text-grafito-600">{col.label}</dt>
                <dd className="font-display text-base font-extrabold text-titulo tabular-nums sm:text-lg">{formatPuntaje(valor)}</dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
