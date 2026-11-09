import { describe, expect, test } from 'vitest'
import { photos } from '../content/images'
import { sedes } from '../content/sedes'
import { preguntas } from '../content/faq'
import { buildFaqStructuredData, buildHeadTags, buildStructuredData, serializeJsonLd, splitAddress } from './headTags'

describe('splitAddress', () => {
  test('separa la calle del distrito', () => {
    expect(splitAddress('Av. Universitaria 6958 - Comas')).toEqual({ streetAddress: 'Av. Universitaria 6958', addressLocality: 'Comas' })
  })

  test('sin " - " deja todo como calle', () => {
    expect(splitAddress('Av. Universitaria 6958')).toEqual({ streetAddress: 'Av. Universitaria 6958' })
  })
})

describe('buildStructuredData', () => {
  test('lista una ubicación por sede, con su distrito', () => {
    const data = buildStructuredData()
    expect(data.location).toHaveLength(sedes.length)
    expect(data.location.every((place) => place.address.addressLocality)).toBe(true)
  })

  test('el teléfono lleva el código de Perú', () => {
    expect(buildStructuredData().telephone).toBe('+51912206403')
  })
})

describe('serializeJsonLd', () => {
  test('escapa "<" para no cerrar el <script>', () => {
    expect(serializeJsonLd({ text: '</script><b>' })).not.toContain('<')
  })
})

describe('buildHeadTags', () => {
  test('la vista previa y la precarga usan la foto del hero', () => {
    const tags = buildHeadTags()
    const ogImage = tags.find((t) => t.attrs?.property === 'og:image')
    const preload = tags.find((t) => t.attrs?.rel === 'preload')
    expect(ogImage?.attrs?.content).toBe(photos.tutores.src)
    expect(preload?.attrs?.href).toBe(photos.tutores.src)
  })
})

describe('buildFaqStructuredData', () => {
  test('lleva cada pregunta del home con su respuesta', () => {
    const data = buildFaqStructuredData()
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toHaveLength(preguntas.length)
    expect(data.mainEntity.every((q) => q.name && q.acceptedAnswer.text)).toBe(true)
  })

  test('va en el <head> junto al de la organización', () => {
    const scripts = buildHeadTags().filter((t) => t.attrs?.type === 'application/ld+json')
    expect(scripts).toHaveLength(2)
  })
})
