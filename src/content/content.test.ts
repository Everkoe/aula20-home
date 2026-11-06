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

  test('cada ficha es coherente: fechas, semanas, porcentajes y horario', () => {
    const hora = /^([01]\d|2[0-3]):[0-5]\d$/
    for (const ciclo of opciones.flatMap((o) => o.ciclos)) {
      expect(ciclo.inicio < ciclo.fin, ciclo.name).toBe(true)
      expect(ciclo.semanas).toBeGreaterThan(0)
      expect(ciclo.practico).toBeGreaterThanOrEqual(0)
      expect(ciclo.practico).toBeLessThanOrEqual(100)
      expect(ciclo.beneficios.length).toBeGreaterThan(0)
      expect(ciclo.turnos.length).toBeGreaterThan(0)
      expect(ciclo.preciosPdf).toMatch(/^https:\/\/cdn\.aula20\.edu\.pe\/prod\/precios\/.+\.pdf$/)
      for (const bloque of ciclo.turnos.flatMap((t) => t.bloques)) {
        expect(bloque.dias.length).toBeGreaterThan(0)
        if (!bloque.inicio || !bloque.fin) continue
        expect(bloque.inicio).toMatch(hora)
        expect(bloque.fin).toMatch(hora)
        expect(bloque.inicio < bloque.fin, `${ciclo.name} ${bloque.inicio}`).toBe(true)
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

  test('cada docente tiene nombre y foto en el CDN de Aula 20', () => {
    for (const docente of planaDocente.flatMap((a) => a.cursos).flatMap((c) => c.docentes)) {
      expect(docente.nombre.trim()).not.toBe('')
      expect(docente.foto).toMatch(/^https:\/\/cdn\.aula20\.edu\.pe\/prod\/docentes\/Docente-\w+\.png$/)
    }
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
