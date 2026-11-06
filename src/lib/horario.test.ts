import { describe, expect, test } from 'vitest'
import { diasLabel, formatFecha, formatHora, franjaHoras, horasLabel, minutos } from './horario'

describe('horas', () => {
  test('pasa de 24 h al formato del sitio', () => {
    expect(formatHora('07:30')).toBe('7:30 a. m.')
    expect(formatHora('16:00')).toBe('4:00 p. m.')
    expect(formatHora('12:30')).toBe('12:30 p. m.')
    expect(formatHora('00:15')).toBe('12:15 a. m.')
  })

  test('cuenta minutos desde la medianoche', () => {
    expect(minutos('07:30')).toBe(450)
    expect(minutos('22:10')).toBe(1330)
  })

  test('un bloque sin horas lo dice en texto', () => {
    expect(horasLabel({ dias: ['dom'], isSimulacro: true })).toBe('Sin hora publicada')
    expect(horasLabel({ dias: ['lun'], inicio: '15:00', fin: '19:00' })).toBe('3:00 p. m. – 7:00 p. m.')
  })
})

describe('días', () => {
  test('agrupa tramos seguidos y lista los sueltos', () => {
    expect(diasLabel(['lun', 'mar', 'mie', 'jue', 'vie'])).toBe('Lun a vie')
    expect(diasLabel(['lun', 'mie', 'vie'])).toBe('Lun, mié y vie')
    expect(diasLabel(['mar', 'jue'])).toBe('Mar y jue')
    expect(diasLabel(['sab'])).toBe('Sáb')
    expect(diasLabel(['sab', 'lun', 'mar', 'mie'])).toBe('Lun a mié y sáb')
  })
})

describe('franja del calendario', () => {
  test('redondea a horas enteras alrededor de los bloques', () => {
    expect(
      franjaHoras({
        nombre: 'Completo',
        bloques: [
          { dias: ['lun'], inicio: '07:30', fin: '16:00' },
          { dias: ['sab'], inicio: '07:40', fin: '11:35' },
        ],
      }),
    ).toEqual({ desde: 7, hasta: 16 })
  })

  test('deja al menos dos horas y tiene un valor por defecto sin horas', () => {
    expect(franjaHoras({ nombre: 'T', bloques: [{ dias: ['lun'], inicio: '16:00', fin: '17:00' }] })).toEqual({ desde: 16, hasta: 18 })
    expect(franjaHoras({ nombre: 'T', bloques: [{ dias: ['dom'] }] })).toEqual({ desde: 7, hasta: 22 })
  })
})

test('formatea fechas ISO sin zona horaria', () => {
  expect(formatFecha('2026-10-19')).toBe('19 oct 2026')
  expect(formatFecha('2027-03-09')).toBe('9 mar 2027')
})
