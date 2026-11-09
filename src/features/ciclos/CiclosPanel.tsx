import { ChevronRight, MessageCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Eyebrow } from '../../components/ui/Heading'
import type { Ciclo, Opcion } from '../../content/ciclos'
import { cartilla } from '../../content/home'
import { site } from '../../content/site'
import { formatFecha } from '../../lib/horario'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { CicloFicha } from './CicloFicha'

/**
 * Resultado de la cartilla: ciclos reales de la opción marcada. Cada uno abre su ficha completa
 * (fechas, metodología, horario, beneficios y logros) sin salir de la página.
 * Se vuelve a montar con cada opción, así que el aviso al lector de pantalla lo da la cartilla (role="status").
 */
export function CiclosPanel({ opcion, id }: { opcion: Opcion; id: string }) {
  const askHref = buildWhatsAppLink(site.contact.phone, cartilla.askMessage(opcion.label))
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [cicloAbierto, setCicloAbierto] = useState<Ciclo | null>(null)

  /** El contenido se pinta antes de abrir para que el foco caiga en el botón de cerrar. */
  const handleOpen = (ciclo: Ciclo) => {
    flushSync(() => setCicloAbierto(ciclo))
    dialogRef.current?.showModal()
  }

  return (
    // Sigue el tema (2026-11-09): hoja blanca con borde en claro, azul noche en oscuro (antes era tinta fija).
    <div
      id={id}
      className="animate-rise rounded-3xl border border-linea bg-hoja p-6 shadow-[0_30px_60px_-40px_rgb(0_10_59/0.45)] sm:p-8 lg:p-10 dark:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)]"
    >
      <Eyebrow>{cartilla.resultLabel}</Eyebrow>
      <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-titulo sm:text-4xl">{opcion.label}</h3>
      <p className="mt-1 text-grafito-600">{opcion.detail}</p>

      <ul className="mt-6 space-y-2.5">
        {opcion.ciclos.map((ciclo) => (
          <li key={ciclo.href}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => handleOpen(ciclo)}
              className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-linea bg-papel p-4 text-left transition-colors hover:border-acento sm:px-5"
            >
              <span className="min-w-0">
                <span className="block font-display text-xl font-bold text-titulo">{ciclo.name}</span>
                <span className="mt-0.5 block text-sm text-grafito-600">
                  {formatFecha(ciclo.inicio)} – {formatFecha(ciclo.fin)} · {ciclo.semanas} semanas · {ciclo.modalidad}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-acento">
                <span className="hidden sm:inline">{cartilla.detailsCta}</span>
                <span className="sr-only sm:hidden">{cartilla.detailsCta}</span>
                <span className="sr-only"> del ciclo {ciclo.name}</span>
                <ChevronRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ButtonLink href={askHref} variant="primary-hoja" icon={MessageCircle} isExternal className="mt-8">
        {cartilla.askCta}
      </ButtonLink>

      <CicloFicha ref={dialogRef} ciclo={cicloAbierto} opcion={opcion} />
    </div>
  )
}
