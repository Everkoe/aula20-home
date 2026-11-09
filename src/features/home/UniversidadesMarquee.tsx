import { opciones } from '../../content/ciclos'

type Props = {
  /** Marca la opción en la cartilla; el enlace lleva a #ciclos. */
  onPick: (id: string) => void
}

/**
 * Franja lenta con las universidades y programas: "a dónde ingresar", de un vistazo.
 * Cada nombre lleva a sus ciclos. Se detiene al pasar el cursor o al enfocar con teclado, y no se mueve
 * con "reducir movimiento". Sin botón de pausa (pedido del usuario, 2026-11-09).
 */
export function UniversidadesMarquee({ onPick }: Props) {
  return (
    <section aria-label="Universidades y programas" className="marquee-host relative overflow-hidden bg-menta py-4 text-tinta">
      <div className="marquee">
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
    </section>
  )
}
