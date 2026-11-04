import { describe, expect, test } from 'vitest'
import { buildWhatsAppLink, formatPhone, telHref } from './whatsapp'

describe('buildWhatsAppLink', () => {
  test('agrega el código de Perú (51) a un celular de 9 dígitos', () => {
    expect(buildWhatsAppLink('912206403')).toBe('https://wa.me/51912206403')
  })

  test('acepta el número con espacios, guiones o con +51 ya puesto', () => {
    expect(buildWhatsAppLink('912 206 403')).toBe('https://wa.me/51912206403')
    expect(buildWhatsAppLink('+51 912-206-403')).toBe('https://wa.me/51912206403')
    expect(buildWhatsAppLink('51912206403')).toBe('https://wa.me/51912206403')
  })

  test('codifica el mensaje en el parámetro text', () => {
    const link = buildWhatsAppLink('912206403', '¡Hola! Quiero matricularme en Aula 20.')
    expect(link).toBe('https://wa.me/51912206403?text=%C2%A1Hola!%20Quiero%20matricularme%20en%20Aula%2020.')
  })

  test('rechaza números que no son celulares peruanos', () => {
    expect(() => buildWhatsAppLink('12345')).toThrow(/celular/)
    expect(() => buildWhatsAppLink('812206403')).toThrow(/celular/)
    expect(() => buildWhatsAppLink('')).toThrow(/celular/)
  })
})

describe('formatPhone y telHref', () => {
  test('muestra el celular en grupos de tres', () => {
    expect(formatPhone('912206403')).toBe('912 206 403')
  })

  test('el enlace tel: lleva el código de país', () => {
    expect(telHref('912 206 403')).toBe('tel:+51912206403')
  })
})
