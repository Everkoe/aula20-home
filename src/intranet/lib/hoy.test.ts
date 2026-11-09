import { describe, expect, test } from 'vitest'
import type { Turno } from '../../content/ciclos'
import { estadoDeHoy, turnoDeAlumna } from './hoy'

const completo: Turno = {
  nombre: 'Completo',
  bloques: [
    { dias: ['lun', 'mar', 'mie', 'jue', 'vie'], inicio: '07:30', fin: '16:00' },
    { dias: ['sab'], inicio: '07:40', fin: '11:35', isSimulacro: true },
  ],
}

/** 9 nov 2026 es lunes. */
const lunes = (h: number, m = 0) => new Date(2026, 10, 9, h, m)

describe('estadoDeHoy', () => {
  test('en clase dentro del bloque y más tarde antes de empezar', () => {
    expect(estadoDeHoy(completo, lunes(10)).tipo).toBe('en-clase')
    expect(estadoDeHoy(completo, lunes(6, 50))).toMatchObject({ tipo: 'mas-tarde', bloque: { inicio: '07:30' } })
  })

  test('al terminar dice cuál es el próximo día con clases', () => {
    expect(estadoDeHoy(completo, lunes(16))).toMatchObject({ tipo: 'termino', proximo: { cuando: 'mañana' } })
    // Viernes en la tarde: lo siguiente es el simulacro del sábado.
    expect(estadoDeHoy(completo, new Date(2026, 10, 13, 18))).toMatchObject({ tipo: 'termino', proximo: { cuando: 'mañana', bloque: { isSimulacro: true } } })
  })

  test('el domingo es libre y el próximo es el lunes', () => {
    expect(estadoDeHoy(completo, new Date(2026, 10, 8, 12))).toMatchObject({ tipo: 'libre', proximo: { cuando: 'mañana' } })
    expect(estadoDeHoy({ nombre: 'Sab', bloques: [{ dias: ['sab'], inicio: '08:00', fin: '12:00' }] }, lunes(9))).toMatchObject({
      tipo: 'libre',
      proximo: { cuando: 'sábado' },
    })
  })

  test('un bloque sin hora publicada queda pendiente, nunca en curso', () => {
    const noche: Turno = { nombre: 'Noche', bloques: [{ dias: ['dom'], isSimulacro: true }] }
    expect(estadoDeHoy(noche, new Date(2026, 10, 8, 12))).toMatchObject({ tipo: 'mas-tarde', bloque: { isSimulacro: true } })
  })
})

test('encuentra el turno de la alumna en la ficha pública del Intensivo', () => {
  expect(turnoDeAlumna('Intensivo', 'Completo')?.bloques[0]).toMatchObject({ inicio: '07:30', fin: '16:00' })
  expect(turnoDeAlumna('Intensivo', 'Inexistente')).toBeUndefined()
})
