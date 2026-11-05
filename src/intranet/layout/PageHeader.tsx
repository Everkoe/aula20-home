import type { ReactNode } from 'react'
import { Highlight } from '../../components/ui/Heading'

type Props = {
  title: string
  /** Palabra final del título con el resaltador de la landing. */
  highlight?: string
  /** Línea de contexto sobre el título (semana, fecha). */
  eyebrow?: string
  /** Una sola frase, si hace falta. */
  children?: ReactNode
}

/** Título de cada sección. tabIndex -1: el marco le pasa el foco al cambiar de sección. */
export function PageHeader({ title, highlight, eyebrow, children }: Props) {
  // Sin el punto final del titular: "Clases de la Semana 2 · Intranet Aula 20".
  const fullTitle = (highlight ? `${title} ${highlight}` : title).replace(/[.,]$/, '')
  return (
    <div className="max-w-3xl">
      <title>{`${fullTitle} · Intranet Aula 20`}</title>
      {eyebrow && <p className="text-xs font-bold tracking-[0.2em] text-acento uppercase">{eyebrow}</p>}
      <h1 tabIndex={-1} className="mt-3 animate-settle text-4xl leading-[1.02] font-extrabold tracking-tight text-titulo outline-none sm:text-5xl">
        {title} {highlight && <Highlight isDrawnOnLoad>{highlight}</Highlight>}
      </h1>
      {children && <p className="mt-4 text-lg text-grafito-600">{children}</p>}
    </div>
  )
}
