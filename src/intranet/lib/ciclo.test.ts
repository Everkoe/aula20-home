import { describe, expect, test } from 'vitest'
import { cursos } from '../content/cursos'
import { semanas } from '../content/semanas'
import { avanceMeta, cambioEntre, clasesDeSemana, diaDeLaSemana, finDeRegla, nombreCurso, semanaActual } from './ciclo'
import { formatPuntaje, formatRango, parseIsoDate } from './fechas'

const tresSemanas = [
  { id: 'a', inicio: '2026-10-19', fin: '2026-10-25' },
  { id: 'b', inicio: '2026-10-26', fin: '2026-11-01' },
  { id: 'c', inicio: '2026-11-02', fin: '2026-11-08' },
]

describe('contenido', () => {
  test('cada separata y grabación apunta a un curso de la lista', () => {
    const ids = new Set(cursos.map((c) => c.id))
    const usados = semanas.flatMap((s) => [...s.separatas, ...s.grabaciones.map((g) => g.cursoId)])
    expect(usados.filter((id) => !ids.has(id))).toEqual([])
  })

  test('nombreCurso da el nombre legible', () => {
    expect(nombreCurso('hp')).toBe('Historia del Perú')
  })
})

describe('semanaActual', () => {
  test('devuelve la semana que contiene el día, aunque sea de noche', () => {
    expect(semanaActual(tresSemanas, new Date(2026, 10, 4, 23, 30))?.id).toBe('c')
  })

  test('el domingo todavía es parte de la semana', () => {
    expect(semanaActual(tresSemanas, new Date(2026, 10, 1))?.id).toBe('b')
  })

  test('antes del ciclo, la primera; después, la última', () => {
    expect(semanaActual(tresSemanas, new Date(2026, 9, 1))?.id).toBe('a')
    expect(semanaActual(tresSemanas, new Date(2026, 11, 20))?.id).toBe('c')
  })

  test('sin semanas no inventa ninguna', () => {
    expect(semanaActual([], new Date())).toBeUndefined()
  })
})

describe('clasesDeSemana', () => {
  const semana2 = semanas.find((s) => s.id === 'semana-2')

  test('una fila por curso con separata o grabación', () => {
    const filas = clasesDeSemana(semana2 ?? { separatas: [], grabaciones: [] })
    expect(filas).toHaveLength(24)
    expect(filas.find((f) => f.curso.id === 'lenguaje')?.grabaciones).toHaveLength(2)
    expect(filas.find((f) => f.curso.id === 'civica')?.grabaciones).toHaveLength(0)
  })

  test('incluye un curso con grabación aunque no tenga separata', () => {
    const filas = clasesDeSemana({ separatas: [], grabaciones: [{ cursoId: 'fisica', tema: 'Cinemática 1' }] })
    expect(filas.map((f) => [f.curso.id, f.hasSeparata])).toEqual([['fisica', false]])
  })

  test('cada curso del contenido existe en la lista de cursos', () => {
    const ids = new Set(cursos.map((c) => c.id))
    const usados = semanas.flatMap((s) => [...s.separatas, ...s.grabaciones.map((g) => g.cursoId)])
    expect(usados.filter((id) => !ids.has(id))).toEqual([])
  })
})

describe('avanceMeta', () => {
  test('calcula lo que falta y el porcentaje', () => {
    expect(avanceMeta(941, 1058.5)).toEqual({ faltan: 117.5, porcentaje: (941 / 1058.5) * 100, isAlcanzada: false })
  })

  test('pasar la meta no da números negativos ni más de 100 %', () => {
    expect(avanceMeta(1200, 1058.5)).toMatchObject({ faltan: 0, porcentaje: 100, isAlcanzada: true })
  })
})

describe('fechas', () => {
  test('lee AAAA-MM-DD como día local', () => {
    expect(parseIsoDate('2026-11-02').getDate()).toBe(2)
  })

  test('el rango nombra el mes una vez si no cambia', () => {
    expect(formatRango('2026-11-02', '2026-11-08')).toBe('2 al 8 de noviembre')
    expect(formatRango('2026-10-26', '2026-11-01')).toBe('26 de octubre al 1 de noviembre')
  })

  test('el puntaje lleva un decimal y no separa miles', () => {
    expect(formatPuntaje(1058.5)).toBe('1058.5')
    expect(formatPuntaje(941)).toBe('941.0')
  })
})

describe('diaDeLaSemana', () => {
  const semana = { inicio: '2026-11-02' }

  test('lunes es 0 y el miércoles 4 es 2, a cualquier hora', () => {
    expect(diaDeLaSemana(semana, new Date(2026, 10, 2, 0, 5))).toBe(0)
    expect(diaDeLaSemana(semana, new Date(2026, 10, 4, 23, 50))).toBe(2)
  })

  test('fuera de la semana se queda en -1 o 7', () => {
    expect(diaDeLaSemana(semana, new Date(2026, 9, 20))).toBe(-1)
    expect(diaDeLaSemana(semana, new Date(2026, 10, 30))).toBe(7)
  })
})

describe('cambioEntre', () => {
  test('cuenta puntos ganados y puestos subidos', () => {
    expect(cambioEntre({ total: 812.5, puestoSalon: 19 }, { total: 941, puestoSalon: 14 })).toEqual({ puntos: 128.5, puestosSalon: 5 })
  })

  test('si baja, los dos salen negativos', () => {
    expect(cambioEntre({ total: 900, puestoSalon: 10 }, { total: 880.4, puestoSalon: 12 })).toEqual({ puntos: -19.6, puestosSalon: -2 })
  })
})

describe('finDeRegla', () => {
  test('sube al siguiente múltiplo de 200', () => {
    expect(finDeRegla([941, 1058.5])).toBe(1200)
    expect(finDeRegla([1200])).toBe(1400)
    expect(finDeRegla([])).toBe(200)
  })
})
