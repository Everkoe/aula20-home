/**
 * Cursos del ciclo Intensivo UNMSM tal como los lista la intranet actual (2026-11-04), con nombre legible.
 * Fuente cruda: docs/intranet/datos-intranet-2026-11-04.json.
 * Las lecturas de HP, HU y HM son nuestras (son las habituales en la preparación para San Marcos);
 * ABC 1, ABC 2 y DE se dejan como los escribe la academia hasta que confirme qué significan.
 */

/** Bloques del examen de San Marcos, los mismos de las columnas de notas (HV, HM, Matemáticas, Letras, Ciencias). */
export type Bloque = 'habilidades' | 'matematicas' | 'letras' | 'ciencias'

export interface Curso {
  id: string
  nombre: string
  /** Sigla que usa la academia, si el nombre la reemplaza. */
  sigla?: string
  /** Rótulo corto del sello de color del curso (nuestro, no de la academia). */
  abrev: string
  bloque: Bloque
}

export const bloques: Record<Bloque, string> = {
  habilidades: 'Habilidades',
  matematicas: 'Matemáticas',
  letras: 'Letras',
  ciencias: 'Ciencias',
}

/** En el orden en que se muestran: habilidades primero, como en el examen. */
export const cursos: Curso[] = [
  { id: 'habilidad-verbal', abrev: 'HV', nombre: 'Habilidad verbal', sigla: 'HV', bloque: 'habilidades' },
  { id: 'hm-a', abrev: 'HM·A', nombre: 'Habilidad matemática A', sigla: 'HM(A)', bloque: 'habilidades' },
  { id: 'hm-b', abrev: 'HM·B', nombre: 'Habilidad matemática B', sigla: 'HM(B)', bloque: 'habilidades' },
  { id: 'aritmetica', abrev: 'ARI', nombre: 'Aritmética', bloque: 'matematicas' },
  { id: 'algebra', abrev: 'ÁLG', nombre: 'Álgebra', bloque: 'matematicas' },
  { id: 'geometria', abrev: 'GEOM', nombre: 'Geometría', bloque: 'matematicas' },
  { id: 'trigonometria', abrev: 'TRIG', nombre: 'Trigonometría', bloque: 'matematicas' },
  { id: 'lenguaje', abrev: 'LEN', nombre: 'Lenguaje', bloque: 'letras' },
  { id: 'literatura', abrev: 'LIT', nombre: 'Literatura', bloque: 'letras' },
  { id: 'hp', abrev: 'HP', nombre: 'Historia del Perú', sigla: 'HP', bloque: 'letras' },
  { id: 'hu', abrev: 'HU', nombre: 'Historia Universal', sigla: 'HU', bloque: 'letras' },
  { id: 'geografia', abrev: 'GEOG', nombre: 'Geografía', bloque: 'letras' },
  { id: 'economia', abrev: 'ECO', nombre: 'Economía', bloque: 'letras' },
  { id: 'civica', abrev: 'CÍV', nombre: 'Cívica', bloque: 'letras' },
  { id: 'psicologia', abrev: 'PSI', nombre: 'Psicología', bloque: 'letras' },
  { id: 'filosofia', abrev: 'FIL', nombre: 'Filosofía', bloque: 'letras' },
  { id: 'biologia', abrev: 'BIO', nombre: 'Biología', bloque: 'ciencias' },
  { id: 'anatomia', abrev: 'ANA', nombre: 'Anatomía', bloque: 'ciencias' },
  { id: 'fisica', abrev: 'FÍS', nombre: 'Física', bloque: 'ciencias' },
  { id: 'fisica-abc-1', abrev: 'F·A1', nombre: 'Física ABC 1', bloque: 'ciencias' },
  { id: 'fisica-abc-2', abrev: 'F·A2', nombre: 'Física ABC 2', bloque: 'ciencias' },
  { id: 'fisica-de', abrev: 'F·DE', nombre: 'Física DE', bloque: 'ciencias' },
  { id: 'quimica', abrev: 'QUÍ', nombre: 'Química', bloque: 'ciencias' },
  { id: 'quimica-abc-1', abrev: 'Q·A1', nombre: 'Química ABC 1', bloque: 'ciencias' },
  { id: 'quimica-abc-2', abrev: 'Q·A2', nombre: 'Química ABC 2', bloque: 'ciencias' },
  { id: 'quimica-de', abrev: 'Q·DE', nombre: 'Química DE', bloque: 'ciencias' },
]
