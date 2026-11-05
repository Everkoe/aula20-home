import type { ReactNode } from 'react'

/** Marca corta junto a un texto ("Especializado", "Ejemplo"). */
export function Etiqueta({ children }: { children: ReactNode }) {
  return <span className="ml-2 inline-block rounded-full bg-aula-50 px-2 py-0.5 align-middle text-xs font-bold text-acento">{children}</span>
}
