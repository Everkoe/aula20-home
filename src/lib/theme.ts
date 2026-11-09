export type Theme = 'light' | 'dark'

/** Misma clave y misma regla que el script de index.html, que aplica el tema antes del primer pintado. */
export const THEME_STORAGE_KEY = 'aula20-tema'

/** Color de la barra del navegador: el del encabezado en cada tema (aula y tinta). */
export const THEME_BAR_COLORS: Record<Theme, string> = { light: '#002cff', dark: '#000a3b' }

/** Tema elegido por la persona; si no eligió (o el valor guardado no sirve), el del sistema. */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersDark ? 'dark' : 'light'
}

export function nextTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Cambia el tema de la página y lo recuerda en este navegador (si el almacenamiento está bloqueado, solo dura la visita). */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  // data-fixed: la intranet deja la barra del navegador en tinta en los dos temas.
  document.querySelector('meta[name="theme-color"]:not([data-fixed])')?.setAttribute('content', THEME_BAR_COLORS[theme])
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Navegación privada o almacenamiento desactivado: el tema se aplica igual.
  }
}

/** Lo que dura el fundido de colores al cambiar de tema (igual que en index.css, .cambio-tema). */
export const THEME_FADE_MS = 400

let fadeTimer: number | undefined

/**
 * Cambia el tema fundiendo los colores en vivo (2026-11-09). El usuario descartó el círculo con transición de vista
 * ("brusca", "se queda congelado": esa API anima una foto de la página). Aquí solo se activan, por un momento,
 * transiciones de color en todo (.cambio-tema en index.css); la página sigue viva. Con "reducir movimiento" es inmediato.
 */
export function applyThemeAnimated(theme: Theme) {
  const root = document.documentElement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme(theme)
    return
  }
  window.clearTimeout(fadeTimer)
  root.classList.add('cambio-tema')
  applyTheme(theme)
  fadeTimer = window.setTimeout(() => root.classList.remove('cambio-tema'), THEME_FADE_MS + 100)
}

/** Avisa cuando cambia el atributo data-theme de <html>, para useSyncExternalStore. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
