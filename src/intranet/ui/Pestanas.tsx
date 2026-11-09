import { useRef, type CSSProperties, type KeyboardEvent } from 'react'

type Props = {
  /** Prefijo de los id de cada pestaña (`${id}-tab-${i}`), para aria-labelledby del panel. */
  id: string
  label: string
  options: string[]
  selected: number
  onSelect: (index: number) => void
  /** id del panel que controlan. */
  controls: string
}

/**
 * Selector segmentado: lista de pestañas de igual ancho con una pastilla azul que se desliza a la elegida.
 * Flechas, Inicio y Fin se mueven entre pestañas (patrón de la APG). Estilo de la pastilla: `.pastilla` en intranet.css.
 */
export function Pestanas({ id, label, options, selected, onSelect, controls }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = options.length - 1
    const keys: Record<string, number> = { ArrowRight: selected + 1, ArrowLeft: selected - 1, Home: 0, End: last }
    const target = keys[event.key]
    if (target === undefined) return
    event.preventDefault()
    const next = (target + options.length) % options.length
    onSelect(next)
    ref.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus()
  }

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      style={{ '--n': options.length, '--sel': selected } as CSSProperties}
      className="relative grid auto-cols-fr grid-flow-col rounded-full bg-papel p-1"
    >
      <span aria-hidden="true" className="pastilla absolute inset-y-1 left-1 rounded-full bg-aula shadow-sm" />
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          role="tab"
          id={`${id}-tab-${i}`}
          aria-selected={i === selected}
          aria-controls={controls}
          tabIndex={i === selected ? 0 : -1}
          onClick={() => onSelect(i)}
          className="relative min-h-9 rounded-full px-3.5 text-sm font-semibold whitespace-nowrap text-grafito transition-colors duration-300 aria-selected:text-white"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
