import { describe, expect, it } from 'vitest'
import { nextTheme, resolveTheme, THEME_BAR_COLORS } from './theme'

describe('resolveTheme', () => {
  it('usa el tema guardado aunque el sistema prefiera otro', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('sigue al sistema cuando no hay nada guardado', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })

  it('ignora valores guardados que no son un tema', () => {
    expect(resolveTheme('sepia', true)).toBe('dark')
    expect(resolveTheme('', false)).toBe('light')
  })
})

describe('nextTheme', () => {
  it('alterna entre claro y oscuro', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})

describe('THEME_BAR_COLORS', () => {
  it('pinta la barra del navegador con el color del encabezado de cada tema', () => {
    expect(THEME_BAR_COLORS).toEqual({ light: '#002cff', dark: '#000a3b' })
  })
})
