import type { ReactNode } from 'react'

type Props = {
  name: string
  value: string
  isChecked: boolean
  onSelect: (value: string) => void
  children: ReactNode
  /** Segunda línea, más chica (un rango de fechas). */
  detail?: string
}

/** Opción con el óvalo de la cartilla de la landing: radio nativo, el óvalo es solo el dibujo. */
export function OvaloRadio({ name, value, isChecked, onSelect, children, detail }: Props) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-grafito transition-colors hover:bg-aula-50">
      <input type="radio" name={name} value={value} checked={isChecked} onChange={() => onSelect(value)} className="sr-only" />
      <span aria-hidden="true" className="ovalo shrink-0 text-grafito-600" />
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-titulo">{children}</span>
        {detail && <span className="block text-xs text-grafito-600">{detail}</span>}
      </span>
    </label>
  )
}
