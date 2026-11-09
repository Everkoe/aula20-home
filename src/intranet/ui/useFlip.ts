import { useLayoutEffect, useRef, type RefObject } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/**
 * FLIP para listas que cambian (filtros, otra semana): cada hijo con `data-flip="<id>"` que ya estaba se desliza
 * desde donde estaba hasta su nuevo lugar, y los que aparecen entran con un fundido corto. Las posiciones se miden
 * relativas al contenedor, así que el scroll de la página no cuenta como movimiento. Con "reducir movimiento", nada.
 *
 * `key` resume lo que cambia la lista (por ejemplo, "semana-1|letras"): solo se anima cuando cambia. Las
 * posiciones se vuelven a medir en cada render, así un cambio de tamaño entre filtros no produce saltos falsos.
 */
export function useFlip(containerRef: RefObject<HTMLElement | null>, key: string) {
  const previous = useRef<Map<string, DOMRect>>(new Map())
  const previousKey = useRef<string | null>(null)

  // Medir el DOM después de cada render es un efecto de diseño (no estado derivado): por eso useLayoutEffect sin deps.
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const base = container.getBoundingClientRect()
    const items = [...container.querySelectorAll<HTMLElement>('[data-flip]')]
    const now = new Map(
      items.map((el) => {
        const r = el.getBoundingClientRect()
        return [el.dataset.flip ?? '', new DOMRect(r.left - base.left, r.top - base.top, r.width, r.height)]
      }),
    )
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (previousKey.current !== null && previousKey.current !== key && !reduceMotion) {
      for (const el of items) {
        const before = previous.current.get(el.dataset.flip ?? '')
        const after = now.get(el.dataset.flip ?? '')
        if (!after) continue
        if (!before) {
          el.animate([{ opacity: 0, transform: 'translateY(12px) scale(0.98)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE, delay: 120 })
          continue
        }
        const dx = before.left - after.left
        const dy = before.top - after.top
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 480, easing: EASE })
      }
    }
    previousKey.current = key
    previous.current = now
  })
}
