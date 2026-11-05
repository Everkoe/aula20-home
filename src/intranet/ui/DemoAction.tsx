import type { LucideIcon } from 'lucide-react'
import { useDemoNotice } from '../demoNotice'

const variants = {
  chip: 'min-h-9 border border-linea bg-hoja px-3 text-acento hover:border-acento',
  solid: 'min-h-11 bg-aula px-5 text-white hover:bg-aula-700',
} as const

type Props = {
  icon: LucideIcon
  label: string
  /** Completa el nombre para el lector de pantalla: "Separata" → "Separata de Lenguaje". */
  detail: string
  message?: string
  variant?: keyof typeof variants
}

/** Botón de archivo o acción que en la intranet real descarga o guarda; aquí avisa que es una demostración. */
export function DemoAction({ icon: Icon, label, detail, message, variant = 'chip' }: Props) {
  const notify = useDemoNotice()
  return (
    <button
      type="button"
      onClick={() => notify(message)}
      className={`inline-flex items-center gap-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${variants[variant]}`}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {label}
      <span className="sr-only"> {detail}</span>
    </button>
  )
}
