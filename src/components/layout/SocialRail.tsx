import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { site } from '../../content/site'
import { brandIconPaths } from '../ui/brandIcons'

const RAIL_ID = 'barra-redes'

/**
 * Barra de redes al borde derecho, como la del sitio actual, pero escondida: solo asoma una pestaña.
 * Sale al pasar el cursor por la pestaña (solo en pantallas con cursor), al llegar con el teclado
 * (foco dentro) o al tocar la pestaña en pantallas táctiles. Así no tapa el contenido (auditoría, punto 8).
 */
export function SocialRail() {
  const [isOpen, setIsOpen] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)

  // Abierta con un toque: se cierra al tocar fuera.
  useEffect(() => {
    if (!isOpen) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!railRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return
    setIsOpen(false)
    // Sacar el foco de la barra la esconde; queda en la pestaña para seguir desde ahí.
    handleRef.current?.blur()
  }

  return (
    <div
      ref={railRef}
      onKeyDown={handleKeyDown}
      data-open={isOpen}
      className="group/barra fixed top-1/2 right-0 z-40 flex -translate-y-1/2 translate-x-[calc(100%-1rem)] items-center transition-transform duration-500 ease-[var(--ease-suave)] hover:translate-x-0 focus-within:translate-x-0 data-[open=true]:translate-x-0 motion-reduce:transition-none print:hidden"
    >
      <button
        ref={handleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={RAIL_ID}
        aria-label="Redes sociales de Aula 20"
        className="grid h-16 w-4 place-items-center rounded-l-full border border-r-0 border-linea bg-hoja/90 text-grafito-600 shadow-[0_10px_30px_-12px_rgb(0_10_59/0.35)] backdrop-blur-md transition-colors hover:text-acento"
      >
        <ChevronLeft aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover/barra:rotate-180 group-focus-within/barra:rotate-180 group-data-[open=true]/barra:rotate-180 motion-reduce:transition-none" strokeWidth={2.6} />
      </button>

      <nav id={RAIL_ID} aria-label="Redes sociales" className="mr-3">
        <ul className="flex flex-col gap-2 rounded-full border border-linea bg-hoja/90 p-2 shadow-[0_20px_45px_-20px_rgb(0_10_59/0.45)] backdrop-blur-md dark:shadow-[0_20px_45px_-20px_rgb(0_0_0/0.7)]">
          {site.social.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} de Aula 20 (abre en otra pestaña)`}
                title={social.label}
                className="grid size-11 place-items-center rounded-full bg-papel text-grafito-600 transition-colors hover:bg-aula-50 hover:text-acento"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d={brandIconPaths[social.label]} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
