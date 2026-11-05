import { semanas } from '../content/semanas'
import { semanaActual } from './ciclo'

/**
 * Semana en curso al abrir la intranet. Se calcula una vez al cargar: el render queda puro y todas las
 * pantallas hablan de la misma semana (si la pestaña sigue abierta el lunes, basta con recargar).
 */
export const semanaEnCurso = semanaActual(semanas, new Date())

export function nombreSemana(id: string): string {
  return semanas.find((s) => s.id === id)?.nombre ?? id
}
