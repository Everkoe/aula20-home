import { describe, expect, test } from 'vitest'
import { cachimbos } from './cachimbos'
import { opciones } from './ciclos'
import { planaDocente, resumenPlana } from './docentes'
import { sedes, sedesPorZona, zonas } from './sedes'

describe('ciclos', () => {
  test('cada opción de la cartilla tiene al menos un ciclo con enlace al sitio de Aula 20', () => {
    for (const opcion of opciones) {
      expect(opcion.ciclos.length).toBeGreaterThan(0)
      for (const ciclo of opcion.ciclos) {
        expect(ciclo.href).toMatch(/^https:\/\/aula20\.edu\.pe\/ciclos\//)
      }
    }
  })

  test('los identificadores no se repiten (son el value del radio)', () => {
    const ids = opciones.map((o) => o.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('sedes', () => {
  test('lista las 17 sedes publicadas en /sedes', () => {
    expect(sedes).toHaveLength(17)
  })

  test('agrupa por zona con los conteos de /sedes', () => {
    const grupos = sedesPorZona()
    expect(grupos.map((g) => [g.zona, g.sedes.length])).toEqual([
      ['norte', 6],
      ['este', 5],
      ['centro', 3],
      ['sur', 3],
    ])
    expect(grupos.map((g) => g.zona)).toEqual(zonas.map((z) => z.id))
  })
})

describe('plana docente', () => {
  test('cuenta docentes y cursos publicados en /docentes', () => {
    const resumen = resumenPlana(planaDocente)
    expect(resumen.cursos).toBe(18)
    expect(resumen.docentes).toBe(58)
  })
})

describe('cachimbos', () => {
  test('cada pieza tiene nombre, carrera y puesto en texto', () => {
    expect(cachimbos).toHaveLength(12)
    for (const c of cachimbos) {
      expect(c.nombre).not.toBe('')
      expect(c.carrera).not.toBe('')
      expect([1, 2]).toContain(c.puesto)
      expect(c.image.alt).toContain(c.carrera)
    }
  })
})
