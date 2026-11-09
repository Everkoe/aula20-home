import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

type KpiProps = {
  icon: LucideIcon
  label: string
  /** La cifra grande (texto o <CountUp>). */
  value: ReactNode
  /** Lo que acompaña a la cifra ("de 41", "puntos"). */
  unit?: string
  delta?: ReactNode
  /** Una línea de contexto debajo. */
  detail?: string
  /** Mini gráfico decorativo (aria-hidden); lo que dice ya está en el texto. */
  chart?: ReactNode
  /** Orden en la entrada en cascada. */
  index?: number
}

/** Tarjeta de una sola idea: etiqueta, cifra grande, variación y un mini gráfico. */
export function Kpi({ icon: Icon, label, value, unit, delta, detail, chart, index = 0 }: KpiProps) {
  return (
    <article style={{ '--i': index } as CSSProperties} className="entrada flex min-w-0 flex-col rounded-3xl border border-linea bg-hoja p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-grafito-600">
        <span aria-hidden="true" className="grid size-7 place-items-center rounded-lg bg-aula-50 text-acento">
          <Icon className="size-4" />
        </span>
        {label}
      </h3>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-4xl leading-none font-extrabold tracking-tight text-titulo tabular-nums">{value}</span>
        {unit && <span className="text-sm font-semibold text-grafito-600">{unit}</span>}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-grafito-600">
        {delta}
        {detail && <span>{detail}</span>}
      </div>
      {chart && (
        <div aria-hidden="true" className="mt-auto pt-4">
          {chart}
        </div>
      )}
    </article>
  )
}

type DeltaProps = {
  value: number
  /** Texto después de la cifra ("puntos", "puestos"). */
  unit: string
  format?: (n: number) => string
}

/** Píldora de variación: menta si mejoró, neutra si empeoró. La flecha y el signo dicen lo mismo que el color. */
export function Delta({ value, unit, format = String }: DeltaProps) {
  const isUp = value >= 0
  const Icon = isUp ? ArrowUpRight : ArrowDownRight
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-bold ${isUp ? 'bg-menta text-tinta' : 'border border-linea bg-papel text-grafito'}`}>
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.6} />
      {isUp ? '+' : '−'}
      {format(Math.abs(value))} {unit}
    </span>
  )
}

/** Línea con área bajo la curva; el último punto, marcado. Con un solo valor, solo el punto. */
export function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const x = (i: number) => (values.length === 1 ? 50 : (i / (values.length - 1)) * 100)
  const y = (v: number) => 28 - ((v - min) / span) * 22
  const puntos = values.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const last = values.length - 1
  // El SVG se estira a lo ancho (preserveAspectRatio="none"); el punto final va aparte para que siga redondo.
  return (
    <div className="relative h-10">
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="size-full overflow-visible">
        <polygon points={`0,32 ${puntos} 100,32`} className="fill-aula/10 dark:fill-menta/10" />
        <polyline points={puntos} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" className="stroke-aula dark:stroke-menta" />
      </svg>
      <span
        style={{ left: `${x(last)}%`, top: `${(y(values[last] ?? 0) / 32) * 100}%` }}
        className="absolute size-2.5 -translate-1/2 rounded-full bg-aula ring-2 ring-hoja dark:bg-menta"
      />
    </div>
  )
}

/** Barra de "a cuántos superaste": se llena desde la izquierda al entrar. */
export function Superados({ superados, total }: { superados: number; total: number }) {
  const ratio = total > 0 ? superados / total : 0
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-papel">
      <div style={{ transform: `scaleX(${ratio})` }} className="crece-x h-full origin-left rounded-full bg-aula dark:bg-menta" />
    </div>
  )
}
