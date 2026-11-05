import { avanceMeta } from '../lib/ciclo'
import { formatPuntaje } from '../lib/fechas'

type Props = {
  puntaje: number
  minimo: number
  /** Texto accesible de la barra ("Semana 1"). */
  label: string
  tone?: 'light' | 'dark'
}

const tones = {
  light: { track: 'bg-aula-50', fill: 'bg-aula', mark: 'border-titulo' },
  dark: { track: 'bg-white/10', fill: 'bg-menta', mark: 'border-white' },
} as const

/** Regla del puntaje: hasta dónde llegaste y la raya del mínimo de tu carrera al final. */
export function MetaBar({ puntaje, minimo, label, tone = 'light' }: Props) {
  const { porcentaje } = avanceMeta(puntaje, minimo)
  const colors = tones[tone]
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={minimo}
      aria-valuenow={puntaje}
      aria-valuetext={`${formatPuntaje(puntaje)} de ${formatPuntaje(minimo)} puntos`}
      className={`relative h-3 rounded-full ${colors.track}`}
    >
      <div className={`h-full rounded-full ${colors.fill}`} style={{ width: `${porcentaje}%` }} />
      <span aria-hidden="true" className={`absolute -top-1 right-0 h-5 border-r-2 border-dashed ${colors.mark}`} />
    </div>
  )
}
