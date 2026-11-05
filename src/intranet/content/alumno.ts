/**
 * Alumna de la DEMOSTRACIÓN. El nombre es el de la alumna cuya cuenta se revisó, que es quien lo pidió (2026-11-04),
 * tal como lo escribió (sin tildes). Código y notas son inventados y se marcan como ejemplo en pantalla: la cuenta
 * no tenía simulacros calificados. Documento, pagos y datos del responsable no se usan.
 * Lo real: ciclo, sede, turno, la carrera como meta y su puntaje mínimo, que la intranet guarda por carrera.
 */
import type { AreaUnmsm } from './simulacros'

export interface NotaSimulacro {
  semanaId: string
  /** Puntos por bloque, en el orden de las columnas de la intranet. Suman el total. */
  bloques: { hv: number; hm: number; matematicas: number; letras: number; ciencias: number }
  total: number
  puestoSalon: number
  alumnosSalon: number
  puestoArea: number
  alumnosArea: number
}

export const alumno = {
  nombres: 'Emilly Belen',
  apellidos: 'Espino Davila',
  codigo: '00001234',
  ciclo: 'Intensivo',
  universidad: 'UNMSM',
  modalidad: 'Presencial',
  turno: 'Completo',
  salon: 'Completo R2',
  sedeId: 'brena',
  meta: {
    carrera: 'Ciencia Política',
    area: 'E' as AreaUnmsm,
    /** Puntaje mínimo de ingreso que la intranet guarda para la carrera. */
    puntajeMinimo: 1058.5,
  },
}

/** Primer nombre, para el saludo y la barra lateral. */
export const nombrePila = alumno.nombres.split(' ')[0] ?? alumno.nombres

/** Ejemplo: dos simulacros con avance, para que se vean la tabla y la distancia a la meta. */
export const notasDemo: NotaSimulacro[] = [
  {
    semanaId: 'introductorio-1',
    bloques: { hv: 190, hm: 152.5, matematicas: 118, letras: 268, ciencias: 84 },
    total: 812.5,
    puestoSalon: 19,
    alumnosSalon: 41,
    puestoArea: 63,
    alumnosArea: 187,
  },
  {
    semanaId: 'semana-1',
    bloques: { hv: 214, hm: 171.5, matematicas: 131, letras: 312.5, ciencias: 112 },
    total: 941,
    puestoSalon: 14,
    alumnosSalon: 41,
    puestoArea: 41,
    alumnosArea: 187,
  },
]
