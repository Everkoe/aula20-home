import type { Bloque, Turno } from '../../content/ciclos'
import { cartilla } from '../../content/home'
import { DIAS, diasLabel, formatHora, franjaHoras, horasLabel, minutos } from '../../lib/horario'

/** Bloques de menos de esta duración solo muestran la hora de inicio (no caben dos líneas). */
const MIN_DOS_LINEAS = 75

type Props = {
  turno: Turno
}

/**
 * Semana de lunes a domingo con cada bloque a su altura real (eje de horas a la izquierda).
 * El dibujo es aria-hidden: la lista de debajo dice lo mismo en texto y es la que sirve en celular.
 */
export function HorarioSemana({ turno }: Props) {
  const { desde, hasta } = franjaHoras(turno)
  const total = (hasta - desde) * 60
  const paso = hasta - desde > 8 ? 2 : 1
  const marcas = Array.from({ length: Math.floor((hasta - desde) / paso) + 1 }, (_, i) => desde + i * paso)
  const haySimulacro = turno.bloques.some((b) => b.isSimulacro)
  const posicion = (hora: number) => `${((hora - desde * 60) / total) * 100}%`

  return (
    <div>
      <div aria-hidden="true" className="grid grid-cols-[2.6rem_repeat(7,minmax(0,1fr))] gap-x-1 sm:gap-x-1.5">
        <span />
        {DIAS.map((dia) => (
          <span key={dia.id} className="pb-1.5 text-center text-xs font-bold text-grafito-600">
            {dia.corto}
          </span>
        ))}

        <div className="relative h-48 sm:h-56">
          {marcas.map((hora) => (
            <span key={hora} style={{ top: posicion(hora * 60) }} className="absolute right-1 -translate-y-1/2 text-[10px] leading-none whitespace-nowrap text-grafito-600">
              {hora % 12 === 0 ? 12 : hora % 12} {hora < 12 ? 'a. m.' : 'p. m.'}
            </span>
          ))}
        </div>

        {DIAS.map((dia) => (
          <div key={dia.id} className="relative h-48 overflow-hidden rounded-lg bg-papel sm:h-56">
            {marcas.map((hora) => (
              <span key={hora} style={{ top: posicion(hora * 60) }} className="absolute inset-x-0 border-t border-linea" />
            ))}
            {turno.bloques
              .filter((bloque) => bloque.dias.includes(dia.id))
              .map((bloque) => (
                <BloqueVisual key={`${bloque.inicio}-${bloque.fin}`} bloque={bloque} top={bloque.inicio ? posicion(minutos(bloque.inicio)) : '0%'} bottom={bloque.fin ? posicion(minutos(bloque.fin)) : '100%'} />
              ))}
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-1.5 text-sm">
        {turno.bloques.map((bloque) => (
          <li key={`${bloque.dias.join()}-${bloque.inicio}`} className="flex flex-wrap items-center gap-x-2">
            <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${bloque.isSimulacro ? 'bg-menta' : 'bg-aula'}`} />
            <span className="font-bold text-titulo">{diasLabel(bloque.dias)}</span>
            <span className="text-grafito-600">
              {horasLabel(bloque)}
              {bloque.isSimulacro && ' · simulacro tipo examen de admisión'}
            </span>
          </li>
        ))}
      </ul>

      {haySimulacro && (
        <p aria-hidden="true" className="mt-3 flex gap-4 text-xs font-semibold text-grafito-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-aula" />
            {cartilla.ficha.clases}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-menta" />
            {cartilla.ficha.simulacro}
          </span>
        </p>
      )}
    </div>
  )
}

function BloqueVisual({ bloque, top, bottom }: { bloque: Bloque; top: string; bottom: string }) {
  const color = bloque.isSimulacro ? 'bg-menta text-tinta' : 'bg-aula text-white'
  if (!bloque.inicio || !bloque.fin) {
    return (
      <span className="absolute inset-0.5 grid place-items-center rounded-md border-2 border-dashed border-menta">
        <span className="hidden -rotate-90 text-[10px] font-bold whitespace-nowrap text-grafito sm:block">{cartilla.ficha.simulacro}</span>
      </span>
    )
  }
  const isCorto = minutos(bloque.fin) - minutos(bloque.inicio) < MIN_DOS_LINEAS
  return (
    <span style={{ top, height: `calc(${bottom} - ${top})` }} className={`absolute inset-x-0.5 overflow-hidden rounded-md px-1 py-0.5 ${color}`}>
      <span className="hidden text-[10px] leading-tight font-semibold sm:block">
        {formatHora(bloque.inicio)}
        {!isCorto && (
          <>
            <br />
            {formatHora(bloque.fin)}
          </>
        )}
      </span>
    </span>
  )
}
