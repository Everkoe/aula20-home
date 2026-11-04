import { useEffect, useState } from 'react'

/** Franja delgada en el centro de la ventana: la sección que la cruza es la que se está leyendo. */
const READING_BAND = '-45% 0px -50% 0px'

/**
 * id de la sección del menú que está en pantalla (o null en la portada, la franja y el cierre).
 * `ids` debe ser estable (constante de módulo) para no volver a crear el observer en cada render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          setActiveId((current) => (isIntersecting ? target.id : current === target.id ? null : current))
        }
      },
      { rootMargin: READING_BAND },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
