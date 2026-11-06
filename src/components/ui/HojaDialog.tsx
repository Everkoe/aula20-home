import { X } from 'lucide-react'
import type { MouseEvent, ReactNode, RefObject } from 'react'

type Props = {
  ref: RefObject<HTMLDialogElement | null>
  /** id del título (aria-labelledby). */
  titleId: string
  eyebrow: string
  title: string
  closeLabel: string
  /** wide: para listas con muchas tarjetas (cachimbos). */
  size?: 'normal' | 'wide'
  children: ReactNode
}

/**
 * Hoja en un <dialog> nativo (ficha del ciclo, plana docente, cachimbos): atrapa el foco, Escape la cierra y el foco
 * vuelve al botón que la abrió. Cabecera fija con el título y la ✕; el cuerpo se desplaza por dentro.
 * Es papel (hoja-clara): sigue clara en modo oscuro. Estilos en `.ficha-dialog` (index.css).
 */
export function HojaDialog({ ref, titleId, eyebrow, title, closeLabel, size = 'normal', children }: Props) {
  const handleClose = () => ref.current?.close()
  /** Clic en el fondo oscuro (fuera de la hoja): el objetivo es el propio <dialog>. */
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) handleClose()
  }

  return (
    <dialog ref={ref} aria-labelledby={titleId} onClick={handleBackdropClick} className={`ficha-dialog hoja-clara bg-hoja text-grafito ${size === 'wide' ? 'ficha-dialog-ancha' : ''}`}>
      <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-linea bg-hoja/95 px-6 pt-6 pb-4 backdrop-blur sm:px-8 sm:pt-7">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-acento uppercase">{eyebrow}</p>
          <h2 id={titleId} className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-titulo sm:text-3xl">
            {title}
          </h2>
        </div>
        <button type="button" onClick={handleClose} aria-label={closeLabel} className="grid size-11 shrink-0 place-items-center rounded-full border border-linea text-titulo transition-colors hover:border-acento hover:text-acento">
          <X aria-hidden="true" className="size-5" />
        </button>
      </header>
      {children}
    </dialog>
  )
}
