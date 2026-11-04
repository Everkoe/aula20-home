import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Tone = 'light' | 'dark'

type HighlightProps = {
  children: ReactNode
  tone?: Tone
  /** Dibuja el trazo al cargar la página (para el H1, que no pasa por <Reveal>). */
  isDrawnOnLoad?: boolean
}

/**
 * Palabra clave del título: resaltador menta sobre fondos claros, trazo de plumón sobre azul o tinta.
 * El trazo va siempre en el HTML: en modo oscuro el CSS cambia el resaltador por el trazo.
 */
export function Highlight({ children, tone = 'light', isDrawnOnLoad = false }: HighlightProps) {
  const style = tone === 'light' ? 'resaltado' : 'trazo'
  return (
    <span className={`${style} ${isDrawnOnLoad ? 'animate-trazo' : ''}`}>
      {children}
      <svg aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path
          d="M2 7 C 25 3, 55 2, 98 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  const color = tone === 'light' ? 'text-acento' : 'text-cielo'
  return <p className={`text-xs font-bold tracking-[0.2em] uppercase ${color}`}>{children}</p>
}

type SectionHeadingProps = {
  eyebrow: string
  title: { lead: string; highlight: string }
  body?: string
  tone?: Tone
  /** id del h2, para aria-labelledby de la sección. */
  id: string
  className?: string
}

/** Encabezado de capítulo: antetítulo, h2 con palabra resaltada y bajada. */
export function SectionHeading({ eyebrow, title, body, tone = 'light', id, className = '' }: SectionHeadingProps) {
  const titleColor = tone === 'light' ? 'text-titulo' : 'text-white'
  const bodyColor = tone === 'light' ? 'text-grafito-600' : 'text-cielo'
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className={`mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl ${titleColor}`}>
        {title.lead} <Highlight tone={tone}>{title.highlight}</Highlight>
      </h2>
      {body && <p className={`mt-5 text-lg leading-relaxed ${bodyColor}`}>{body}</p>}
    </Reveal>
  )
}
