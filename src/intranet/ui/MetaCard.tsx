import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { alumno, notasDemo } from '../content/alumno'
import { areasUnmsm } from '../content/simulacros'
import { avanceMeta, cambioEntre } from '../lib/ciclo'
import { formatPuntaje } from '../lib/fechas'
import { nombreSemana } from '../lib/semanas'
import { Regla } from './Regla'

type Props = {
  /** id del título, para aria-labelledby. */
  id: string
  /** En Simulacros no hace falta el enlace a Simulacros. */
  hasLink?: boolean
  className?: string
}

function signo(n: number): string {
  return n > 0 ? `+${formatPuntaje(n)}` : formatPuntaje(n)
}

/** La pieza oscura: tu carrera, tu último puntaje y la regla hasta el mínimo. */
export function MetaCard({ id, hasLink = true, className = '' }: Props) {
  const { meta } = alumno
  const ultima = notasDemo.at(-1)
  const anterior = notasDemo.at(-2)
  const cambio = ultima && anterior ? cambioEntre(anterior, ultima) : null
  const avance = ultima ? avanceMeta(ultima.total, meta.puntajeMinimo) : null

  return (
    <section aria-labelledby={id} className={`cuadricula-oscura relative flex flex-col rounded-3xl p-6 text-cielo ring-1 ring-white/10 sm:p-7 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase">Tu meta</p>
          <h2 id={id} className="mt-2 text-2xl leading-tight font-extrabold text-white">
            {meta.carrera}
          </h2>
          <p className="mt-0.5 text-sm">{areasUnmsm[meta.area]}</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-menta font-display text-xl font-extrabold text-menta">
          <span className="sr-only">Área </span>
          {meta.area}
        </span>
      </div>

      {ultima && avance ? (
        <>
          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="font-display text-6xl leading-[0.85] font-extrabold tracking-tight text-menta">{formatPuntaje(ultima.total)}</p>
            {cambio && (
              <p className="pb-1 text-sm font-bold text-white">
                {signo(cambio.puntos)} <span className="font-medium text-cielo">desde {nombreSemana(anterior?.semanaId ?? '')}</span>
              </p>
            )}
          </div>
          <p className="mt-2 text-sm">Simulacro de la {nombreSemana(ultima.semanaId)}</p>
          <div className="mt-5">
            <Regla tone="dark" minimo={meta.puntajeMinimo} marcas={notasDemo.map((n) => ({ label: nombreSemana(n.semanaId), puntaje: n.total }))} />
          </div>
          <p className="mt-3 text-white">
            {avance.isAlcanzada ? 'Pasaste el mínimo de tu carrera.' : <>Te faltan <strong className="font-extrabold text-menta">{formatPuntaje(avance.faltan)}</strong> puntos.</>}
          </p>
        </>
      ) : (
        <p className="mt-6 text-white">Cuando se califique tu primer simulacro, aquí verás cuánto te falta.</p>
      )}

      {hasLink && (
        <Link to="/simulacros" className="mt-auto inline-flex min-h-11 items-center gap-1 pt-4 text-sm font-bold text-menta hover:underline">
          Ver tus notas
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </section>
  )
}
