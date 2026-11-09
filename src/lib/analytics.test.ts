import { describe, expect, test } from 'vitest'
import { buildWhatsAppLink, telHref } from './whatsapp'
import { contactChannel, parseAnalyticsConfig } from './analytics'

describe('contactChannel', () => {
  test('reconoce los enlaces de WhatsApp que arma buildWhatsAppLink', () => {
    expect(contactChannel(buildWhatsAppLink('912206403', '¡Hola!'))).toBe('whatsapp')
  })

  test('reconoce las llamadas', () => {
    expect(contactChannel(telHref('912206403'))).toBe('telefono')
  })

  test('ignora los demás enlaces', () => {
    expect(contactChannel('#ciclos')).toBeNull()
    expect(contactChannel('https://aula20.edu.pe/ciclos')).toBeNull()
    expect(contactChannel('https://evil.com/wa.me/51912206403')).toBeNull()
  })
})

describe('parseAnalyticsConfig', () => {
  test('sin variables no activa nada', () => {
    expect(parseAnalyticsConfig({})).toEqual({ ga4Id: undefined, metaPixelId: undefined })
  })

  test('acepta IDs con el formato correcto', () => {
    expect(parseAnalyticsConfig({ VITE_GA4_ID: ' g-ab12cd34ef ', VITE_META_PIXEL_ID: '1234567890123456' })).toEqual({
      ga4Id: 'G-AB12CD34EF',
      metaPixelId: '1234567890123456',
    })
  })

  test('descarta IDs mal escritos en vez de meterlos en una URL', () => {
    expect(parseAnalyticsConfig({ VITE_GA4_ID: 'G-1"><script>', VITE_META_PIXEL_ID: 'abc' })).toEqual({
      ga4Id: undefined,
      metaPixelId: undefined,
    })
  })
})
