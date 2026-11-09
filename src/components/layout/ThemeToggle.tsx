import { Moon, Sun } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'
import { applyThemeAnimated, nextTheme, readTheme, subscribeTheme } from '../../lib/theme'

type Props = {
  /** Muestra el texto junto al ícono (versión del menú móvil). */
  isLabelVisible?: boolean
  className?: string
}

/** Botón de modo claro / oscuro. Todas sus copias leen el mismo atributo de <html>, así que nunca se desfasan. */
export function ThemeToggle({ isLabelVisible = false, className = '' }: Props) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme)
  // El ícono gira cuando se usa el botón, no al cargar la página.
  const [hasToggled, setHasToggled] = useState(false)
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon
  const hint = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  const handleToggle = () => {
    setHasToggled(true)
    applyThemeAnimated(nextTheme(theme))
  }

  const shape = isLabelVisible
    ? 'inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cielo hover:text-white'
    : 'grid size-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10'

  return (
    <button type="button" onClick={handleToggle} aria-pressed={isDark} title={hint} className={`transition-colors ${shape} ${className}`}>
      {/* key: el ícono nuevo entra girando (icono-tema en index.css). */}
      <Icon key={theme} aria-hidden="true" className={`${hasToggled ? 'icono-tema' : ''} ${isLabelVisible ? 'size-4' : 'size-5'}`} />
      {isLabelVisible ? 'Modo oscuro' : <span className="sr-only">Modo oscuro</span>}
    </button>
  )
}
