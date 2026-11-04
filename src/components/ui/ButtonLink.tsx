import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const variants = {
  /** Menta de marca: la acción principal (matricularse). */
  primary: 'bg-menta text-tinta hover:bg-white shadow-[0_10px_30px_-12px_rgb(33_223_175/0.6)]',
  /** Azul de marca sobre fondos claros. */
  solid: 'bg-aula text-white hover:bg-aula-700',
  /** Borde claro sobre fondos oscuros. */
  'ghost-dark': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
  /** Enlace con borde sobre fondos claros. */
  'ghost-light': 'border border-linea bg-hoja text-acento hover:border-acento',
} as const

type Props = {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  icon?: LucideIcon
  /** Abre en otra pestaña (WhatsApp, PDF, sitio actual). */
  isExternal?: boolean
  size?: 'md' | 'lg'
  className?: string
}

export function ButtonLink({ href, children, variant = 'solid', icon: Icon, isExternal, size = 'md', className = '' }: Props) {
  const sizing = size === 'lg' ? 'min-h-14 px-7 text-base' : 'min-h-11 px-5 text-sm'
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 ${sizing} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon aria-hidden="true" className="size-[1.15em] shrink-0" strokeWidth={2.2} />}
      {children}
    </a>
  )
}
