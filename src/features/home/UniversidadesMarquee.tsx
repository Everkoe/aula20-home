import { Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { opciones } from '../../content/ciclos'

type Props = {
  /** Marca la opción en la cartilla; el enlace lleva a #ciclos. */
  onPick: (id: string) => void
}

/**
 * Franja lenta con las universidades y programas: "a dónde ingresar", de un vistazo.
 * Cada nombre lleva a sus ciclos. Se pausa con el botón (WCAG 2.2.2), al pasar el cursor o al enfocar con teclado.
 */
export function UniversidadesMarquee({ onPick }: Props) {
  const [isPaused, setIsPaused] = useState(false)
  const handleTogglePause = () => setIsPaused((paused) => !paused)
  const ToggleIcon = isPaused ? Play : Pause

  return (
    <section aria-label="Universidades y programas" className="marquee-host relative overflow-hidden bg-menta py-4 text-tinta">
      <div className="marquee" data-paused={isPaused}>
        {[0, 1].map((copy) => {
          const isCopy = copy === 1
          return (
            <ul key={copy} aria-hidden={isCopy ? 'true' : undefined} className="flex shrink-0 items-center">
              {opciones.map((opcion) => (
                <li key={opcion.id} className="flex items-center gap-6 px-3 font-display text-xl font-bold whitespace-nowrap sm:text-2xl">
                  <a
                    href="#ciclos"
                    onClick={() => onPick(opcion.id)}
                    tabIndex={isCopy ? -1 : undefined}
                    className="rounded-md decoration-2 underline-offset-4 hover:underline"
                  >
                    <span className="sr-only">Ver ciclos de </span>
                    {opcion.label}
                  </a>
                  <span aria-hidden="true" className="inline-block h-4 w-7 rounded-full border-2 border-tinta/40" />
                </li>
              ))}
            </ul>
          )
        })}
      </div>

      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-linear-to-l from-menta from-45% to-transparent motion-reduce:hidden" />
      <button
        type="button"
        onClick={handleTogglePause}
        aria-label={isPaused ? 'Reanudar la franja de universidades' : 'Pausar la franja de universidades'}
        className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-tinta text-menta transition-colors hover:bg-aula-700 hover:text-white motion-reduce:hidden sm:right-5"
      >
        <ToggleIcon aria-hidden="true" className="size-4 fill-current" />
      </button>
    </section>
  )
}
