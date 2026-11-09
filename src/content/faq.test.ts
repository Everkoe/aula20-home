import { describe, expect, test } from 'vitest'
import { joinWithY, preguntas } from './faq'
import { sedes } from './sedes'
import { site } from './site'

describe('joinWithY', () => {
  test('une con comas y "y" al final', () => {
    expect(joinWithY(['UNI'])).toBe('UNI')
    expect(joinWithY(['UNI', 'Callao'])).toBe('UNI y Callao')
    expect(joinWithY(['San Marcos', 'UNI', 'Callao'])).toBe('San Marcos, UNI y Callao')
  })
})

describe('preguntas frecuentes', () => {
  test('sin preguntas repetidas ni respuestas vacías', () => {
    expect(new Set(preguntas.map((p) => p.pregunta)).size).toBe(preguntas.length)
    expect(preguntas.every((p) => p.respuesta.length > 20)).toBe(true)
  })

  test('el teléfono, el horario y las sedes coinciden con los datos del sitio', () => {
    const texto = preguntas.map((p) => p.respuesta).join(' ')
    expect(texto).toContain('912 206 403')
    expect(site.contact.schedule).toBe('Lun – Sáb · 8:00 a. m. – 7:00 p. m.')
    expect(texto).toContain(`${sedes.length} sedes`)
  })

  test('no publica precios', () => {
    expect(preguntas.some((p) => /S\/\s?\d/.test(p.respuesta))).toBe(false)
  })
})
