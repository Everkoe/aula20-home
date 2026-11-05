/**
 * Simulacros semanales del Intensivo UNMSM, leídos de la intranet actual el 2026-11-04.
 * Cada área rinde dos exámenes (habilidades y conocimientos); claves y solucionario son comunes.
 * - Semana 1: los cinco pares están publicados (31 oct). En la intranet, los del área E figuran como "General".
 * - Introductorio I: se publicaron 12 archivos (5 áreas × 2 exámenes + claves + solucionario); solo se leyó
 *   el detalle de claves y solucionario. La fecha no está publicada.
 * - Semana 2: aún sin simulacro al leerla.
 */

export type AreaUnmsm = 'A' | 'B' | 'C' | 'D' | 'E'

/** Nombres de área como los usa la intranet (el de E, de la carrera objetivo). */
export const areasUnmsm: Record<AreaUnmsm, string> = {
  A: 'Ciencias de la Salud',
  B: 'Ciencias Básicas',
  C: 'Ingenierías',
  D: 'Ciencias Económicas y de la Gestión',
  E: 'Humanidades y Ciencias Sociales',
}

export const partesExamen = ['Habilidades', 'Conocimientos'] as const

export interface Simulacro {
  semanaId: string
  /** Fecha ISO del examen, si está publicada. */
  fecha: string | null
  hasClaves: boolean
  hasSolucionario: boolean
}

export const simulacros: Simulacro[] = [
  { semanaId: 'introductorio-1', fecha: null, hasClaves: true, hasSolucionario: true },
  { semanaId: 'semana-1', fecha: '2026-10-31', hasClaves: true, hasSolucionario: true },
]
