const RADIO = 48
const GROSOR = 14
const CIRCUNFERENCIA = 2 * Math.PI * RADIO
/** Separación de 2 px entre los dos tramos (en unidades del viewBox de 120). */
const SEPARACION = 2

type Props = {
  practico: number
}

/**
 * Metodología en un gráfico circular: práctico (azul) y teórico (menta). Los dos porcentajes van
 * escritos en la leyenda, así que el color nunca es la única pista (la menta tiene poco contraste sobre blanco).
 */
export function MetodologiaDonut({ practico }: Props) {
  const teorico = 100 - practico
  const partes = [
    { label: 'Práctico', value: practico, color: 'var(--color-aula)', swatch: 'bg-aula' },
    { label: 'Teórico', value: teorico, color: 'var(--color-menta)', swatch: 'bg-menta' },
  ]
  const hayDosTramos = practico > 0 && teorico > 0
  let acumulado = 0

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 120 120" role="img" aria-label={`${practico} % práctico y ${teorico} % teórico`} className="size-28 shrink-0 -rotate-90">
        {partes.map((parte) => {
          const largo = (parte.value / 100) * CIRCUNFERENCIA
          const visible = Math.max(0, largo - (hayDosTramos ? SEPARACION : 0))
          const offset = -acumulado
          acumulado += largo
          if (parte.value === 0) return null
          return (
            <circle
              key={parte.label}
              cx="60"
              cy="60"
              r={RADIO}
              fill="none"
              stroke={parte.color}
              strokeWidth={GROSOR}
              strokeDasharray={`${visible} ${CIRCUNFERENCIA}`}
              strokeDashoffset={offset}
            />
          )
        })}
        <g transform="rotate(90 60 60)" className="fill-titulo" textAnchor="middle">
          <text x="60" y="60" className="font-display text-[1.45rem] font-extrabold">
            {practico} %
          </text>
          <text x="60" y="76" className="fill-grafito-600 text-[0.7rem] font-semibold">
            práctico
          </text>
        </g>
      </svg>
      <ul className="space-y-2 text-sm">
        {partes.map((parte) => (
          <li key={parte.label} className="flex items-center gap-2.5">
            <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${parte.swatch}`} />
            <span className="font-display text-xl font-extrabold text-titulo tabular-nums">{parte.value} %</span>
            <span className="text-grafito-600">{parte.label.toLowerCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
