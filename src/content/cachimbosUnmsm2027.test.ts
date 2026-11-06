import { describe, expect, test } from 'vitest'
import { formatCarrera } from '../lib/format'
import { ingresantesUnmsm2027I } from './cachimbosUnmsm2027'

describe('formatCarrera', () => {
  test('pone tildes, conectores en minúscula y la filial entre paréntesis', () => {
    expect(formatCarrera('Ingenieria De Inteligencia Artificial')).toBe('Ingeniería de Inteligencia Artificial')
    expect(formatCarrera('Auditoria Empresarial Y Del Sector Publico - S.J.L')).toBe('Auditoría Empresarial y del Sector Público (SJL)')
    expect(formatCarrera('Contabilidad - Huaral')).toBe('Contabilidad (Huaral)')
    expect(formatCarrera('Tec. Med. Lab. Clinico Y Anatomia Patologica')).toBe('Tec. Méd. Lab. Clínico y Anatomía Patológica')
    expect(formatCarrera('Ingenieria Logistica Y Cadena De Sumistro Digital')).toBe('Ingeniería Logística y Cadena de Suministro Digital')
    expect(formatCarrera('Ingenieria De Seguridad Y Salud En El Trabajo')).toBe('Ingeniería de Seguridad y Salud en el Trabajo')
    expect(formatCarrera('Farmacia Y Bioquimica')).toBe('Farmacia y Bioquímica')
    expect(formatCarrera(null)).toBe('Carrera no publicada')
  })
})

describe('cachimbos UNMSM 2027-I', () => {
  test('lista los 403 publicados, cada uno con sede, zona y foto', () => {
    expect(ingresantesUnmsm2027I).toHaveLength(403)
    for (const i of ingresantesUnmsm2027I) {
      expect(i.nombre.trim()).not.toBe('')
      expect(['norte', 'este', 'centro', 'sur', 'virtual']).toContain(i.zona)
      expect(i.foto).toMatch(/^https:\/\/cdn\.aula20\.edu\.pe\/prod\/cachimbos\/Ingresante-\w+\.webp$/)
    }
  })

  test('las fotos no se repiten (son la key de la lista)', () => {
    expect(new Set(ingresantesUnmsm2027I.map((i) => i.foto)).size).toBe(403)
  })
})
