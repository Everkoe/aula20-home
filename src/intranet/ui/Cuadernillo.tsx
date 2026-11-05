import type { ReactNode } from 'react'

type Props = {
  /** id del título, para aria-labelledby. */
  id: string
  eyebrow: string
  title: string
  /** Dato a la derecha de la cabecera (la fecha). */
  meta?: string
  headingLevel?: 'h2' | 'h3'
  className?: string
  children: ReactNode
}

/** Cuadernillo de examen: cabecera tinta con cuadrícula y la hoja debajo. */
export function Cuadernillo({ id, eyebrow, title, meta, headingLevel: Heading = 'h3', className = '', children }: Props) {
  return (
    <article aria-labelledby={id} className={`min-w-0 overflow-hidden rounded-3xl border border-linea bg-hoja ${className}`}>
      <div className="cuadricula-oscura flex flex-wrap items-end justify-between gap-x-4 gap-y-1 px-5 pt-4 pb-3.5 text-white sm:px-6">
        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.2em] text-cielo uppercase">{eyebrow}</p>
          <Heading id={id} className="mt-0.5 text-2xl font-extrabold">
            {title}
          </Heading>
        </div>
        {meta && <p className="pb-0.5 text-sm text-cielo">{meta}</p>}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </article>
  )
}
