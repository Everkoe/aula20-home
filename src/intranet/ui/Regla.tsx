import { finDeRegla } from '../lib/ciclo'
import { formatPuntaje } from '../lib/fechas'

const CADA_RAYITA = 50
const CADA_NUMERO = 200

export type Marca = { label: string; puntaje: number }

type Props = {
  /** Simulacros en orden; el último es el que se pinta. */
  marcas: Marca[]
  minimo: number
  tone?: 'light' | 'dark'
}

const tones = {
  light: { pista: 'bg-aula-50', relleno: 'bg-aula', anterior: 'border-aula bg-hoja', rayas: 'bg-grafito-600/50', texto: 'text-grafito-600', meta: 'border-titulo text-titulo' },
  dark: { pista: 'bg-white/10', relleno: 'bg-menta', anterior: 'border-menta bg-tinta', rayas: 'bg-cielo/40', texto: 'text-cielo', meta: 'border-white text-white' },
} as const

/**
 * Regla de cuaderno del puntaje: rayitas cada 50, números cada 200, tu último puntaje pintado,
 * los anteriores como puntos y el mínimo de tu carrera como una bandera.
 */
export function Regla({ marcas, minimo, tone = 'light' }: Props) {
  const ultima = marcas.at(-1)
  if (!ultima) return null

  const fin = finDeRegla([minimo, ...marcas.map((m) => m.puntaje)])
  const pos = (valor: number) => `${(Math.min(valor, fin) / fin) * 100}%`
  const rayitas = Array.from({ length: fin / CADA_RAYITA + 1 }, (_, i) => i * CADA_RAYITA)
  const c = tones[tone]

  return (
    <div className="relative pt-9 pb-6">
      <p className={`absolute top-0 -translate-x-full border-r-2 border-dashed pr-2 text-right text-xs leading-tight font-bold ${c.meta}`} style={{ left: pos(minimo) }}>
        <span className="block font-semibold opacity-80">Mínimo</span>
        {formatPuntaje(minimo)}
      </p>

      <div
        role="meter"
        aria-label={`Tu puntaje de la ${ultima.label} frente al mínimo de tu carrera`}
        aria-valuemin={0}
        aria-valuemax={minimo}
        aria-valuenow={ultima.puntaje}
        aria-valuetext={`${formatPuntaje(ultima.puntaje)} de ${formatPuntaje(minimo)} puntos`}
        className={`relative h-3.5 rounded-full ${c.pista}`}
      >
        <div className={`h-full rounded-full ${c.relleno}`} style={{ width: pos(ultima.puntaje) }} />
        {marcas.slice(0, -1).map((m) => (
          <span
            key={m.label}
            title={`${m.label}: ${formatPuntaje(m.puntaje)}`}
            className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${c.anterior}`}
            style={{ left: pos(m.puntaje) }}
          />
        ))}
        <span aria-hidden="true" className={`absolute -top-2 h-7.5 -translate-x-px border-l-2 border-dashed ${c.meta}`} style={{ left: pos(minimo) }} />
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-6">
        {rayitas.map((valor) => {
          const isNumero = valor % CADA_NUMERO === 0
          const extremo = valor === 0 ? 'translate-x-0' : valor === fin ? '-translate-x-full' : '-translate-x-1/2'
          return (
            <span key={valor} className="absolute top-0" style={{ left: pos(valor) }}>
              <span className={`block w-px ${c.rayas} ${isNumero ? 'h-2' : 'h-1'}`} />
              {isNumero && <span className={`absolute top-2.5 ${extremo} text-[0.65rem] tabular-nums ${c.texto}`}>{valor}</span>}
            </span>
          )
        })}
      </div>
    </div>
  )
}
