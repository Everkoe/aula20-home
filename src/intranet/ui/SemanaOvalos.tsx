import type { Semana } from '../content/semanas'
import { diaDeLaSemana } from '../lib/ciclo'

const LETRAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as const
const NOMBRES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'] as const

type Props = {
  semana: Pick<Semana, 'nombre' | 'inicio'>
  hoy: Date
  /** Óvalos grandes de la portada o chicos de la barra lateral. */
  size?: 'dia' | 'mini'
}

/**
 * La semana como una fila de la cartilla: los días que pasaron, marcados; hoy, a medio marcar.
 * Siempre sobre fondo tinta o azul (lápiz menta). El lector de pantalla recibe una sola frase.
 */
export function SemanaOvalos({ semana, hoy, size = 'dia' }: Props) {
  const actual = diaDeLaSemana(semana, hoy)
  const resumen =
    actual >= 0 && actual <= 6 ? `Hoy es ${NOMBRES[actual]}, día ${actual + 1} de 7 de la ${semana.nombre}.` : `${semana.nombre}.`

  return (
    <div>
      <p className="sr-only">{resumen}</p>
      <ol aria-hidden="true" className={`flex ${size === 'dia' ? 'gap-1.5 sm:gap-2' : 'gap-1'}`}>
        {LETRAS.map((letra, index) => {
          const estado = index < actual ? 'ovalo-lleno' : index === actual ? 'ovalo-hoy' : ''
          const isHoy = index === actual
          return (
            <li key={NOMBRES[index]} className="flex flex-col items-center gap-1">
              <span className={`ovalo ovalo-menta ${size === 'dia' ? 'ovalo-dia' : 'ovalo-mini'} ${estado} ${isHoy ? '' : 'text-white/45'}`} />
              <span className={`text-[0.65rem] font-bold ${isHoy ? 'text-menta' : 'text-cielo/80'}`}>{letra}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
