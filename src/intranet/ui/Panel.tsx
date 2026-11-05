import type { ReactNode } from 'react'

type Props = {
  /** id del h2, para aria-labelledby. */
  id: string
  title: string
  /** Enlace o dato al lado del título ("Ver todas"). */
  aside?: ReactNode
  className?: string
  children: ReactNode
}

/** Hoja blanca sobre la cuadrícula: el mismo papel de las fichas de la landing. */
export function Panel({ id, title, aside, className = '', children }: Props) {
  return (
    // min-w-0: dentro de un grid, una tabla ancha no debe estirar la columna (se desplaza dentro de su marco).
    <section aria-labelledby={id} className={`min-w-0 rounded-3xl border border-linea bg-hoja p-5 sm:p-7 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={id} className="text-xl font-extrabold tracking-tight text-titulo">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
