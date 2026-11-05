import { cursos as todosLosCursos, type Curso } from '../content/cursos'
import type { Grabacion, Semana } from '../content/semanas'
import { parseIsoDate } from './fechas'

/**
 * Semana que contiene `hoy`. Antes del ciclo, la primera; después de la última publicada, la última
 * (así el prototipo sigue mostrando algo si se abre semanas después).
 */
export function semanaActual<T extends Pick<Semana, 'inicio' | 'fin'>>(semanas: readonly T[], hoy: Date): T | undefined {
  const dia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  const enCurso = semanas.find((s) => parseIsoDate(s.inicio) <= dia && dia <= parseIsoDate(s.fin))
  if (enCurso) return enCurso
  const primera = semanas[0]
  if (primera && dia < parseIsoDate(primera.inicio)) return primera
  return semanas.at(-1)
}

const cursosPorId = new Map(todosLosCursos.map((curso) => [curso.id, curso]))

/** Nombre legible del curso; si el id no está en la lista (no debería: lo cubre un test), el id tal cual. */
export function nombreCurso(id: string): string {
  return cursosPorId.get(id)?.nombre ?? id
}

export interface FilaClase {
  curso: Curso
  hasSeparata: boolean
  grabaciones: Grabacion[]
}

/**
 * Une Materiales y Grabaciones en una fila por curso (la intranet actual las muestra en dos páginas).
 * Incluye los cursos que tienen separata, grabación o ambas, en el orden de `cursos`.
 */
export function clasesDeSemana(semana: Pick<Semana, 'separatas' | 'grabaciones'>, cursos: readonly Curso[] = todosLosCursos): FilaClase[] {
  return cursos
    .map((curso) => ({
      curso,
      hasSeparata: semana.separatas.includes(curso.id),
      grabaciones: semana.grabaciones.filter((g) => g.cursoId === curso.id),
    }))
    .filter((fila) => fila.hasSeparata || fila.grabaciones.length > 0)
}

export interface AvanceMeta {
  /** Puntos que faltan para el mínimo; 0 si ya lo pasó. */
  faltan: number
  /** 0–100, para la barra. */
  porcentaje: number
  isAlcanzada: boolean
}

export function avanceMeta(puntaje: number, minimo: number): AvanceMeta {
  const faltan = Math.max(0, Math.round((minimo - puntaje) * 10) / 10)
  const porcentaje = minimo > 0 ? Math.min(100, Math.max(0, (puntaje / minimo) * 100)) : 0
  return { faltan, porcentaje, isAlcanzada: faltan === 0 }
}
