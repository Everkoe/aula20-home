import { describe, expect, test } from 'vitest'
import { displayName, mapsSearchHref, ordinalPlace } from './format'

describe('displayName', () => {
  test('pasa "Apellidos, Nombres" a "Nombres Apellidos"', () => {
    expect(displayName('Alanya Porta, Joaquin')).toBe('Joaquin Alanya Porta')
  })

  test('deja igual un nombre sin coma', () => {
    expect(displayName('Camille Ramirez')).toBe('Camille Ramirez')
  })
})

describe('ordinalPlace', () => {
  test('usa la abreviatura de la RAE para los puestos', () => {
    expect(ordinalPlace(1)).toBe('1.er puesto')
    expect(ordinalPlace(2)).toBe('2.º puesto')
    expect(ordinalPlace(3)).toBe('3.er puesto')
    expect(ordinalPlace(4)).toBe('4.º puesto')
  })
})

describe('mapsSearchHref', () => {
  test('arma una búsqueda de Google Maps con la dirección codificada', () => {
    expect(mapsSearchHref('Av. Venezuela N° 792 - Breña')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Av.%20Venezuela%20N%C2%B0%20792%20-%20Bre%C3%B1a%2C%20Lima%2C%20Per%C3%BA',
    )
  })
})
