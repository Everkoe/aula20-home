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
  { id: 'habilidad-verbal', nombre: 'Habilidad verbal', sigla: 'HV', bloque: 'habilidades' },
  { id: 'hm-a', nombre: 'Habilidad matemática A', sigla: 'HM(A)', bloque: 'habilidades' },
  { id: 'hm-b', nombre: 'Habilidad matemática B', sigla: 'HM(B)', bloque: 'habilidades' },
  { id: 'aritmetica', nombre: 'Aritmética', bloque: 'matematicas' },
  { id: 'algebra', nombre: 'Álgebra', bloque: 'matematicas' },
  { id: 'geometria', nombre: 'Geometría', bloque: 'matematicas' },
  { id: 'trigonometria', nombre: 'Trigonometría', bloque: 'matematicas' },
  { id: 'lenguaje', nombre: 'Lenguaje', bloque: 'letras' },
  { id: 'literatura', nombre: 'Literatura', bloque: 'letras' },
  { id: 'hp', nombre: 'Historia del Perú', sigla: 'HP', bloque: 'letras' },
  { id: 'hu', nombre: 'Historia Universal', sigla: 'HU', bloque: 'letras' },
  { id: 'geografia', nombre: 'Geografía', bloque: 'letras' },
  { id: 'economia', nombre: 'Economía', bloque: 'letras' },
  { id: 'civica', nombre: 'Cívica', bloque: 'letras' },
  { id: 'psicologia', nombre: 'Psicología', bloque: 'letras' },
  { id: 'filosofia', nombre: 'Filosofía', bloque: 'letras' },
  { id: 'biologia', nombre: 'Biología', bloque: 'ciencias' },
  { id: 'anatomia', nombre: 'Anatomía', bloque: 'ciencias' },
  { id: 'fisica', nombre: 'Física', bloque: 'ciencias' },
  { id: 'fisica-abc-1', nombre: 'Física ABC 1', bloque: 'ciencias' },
  { id: 'fisica-abc-2', nombre: 'Física ABC 2', bloque: 'ciencias' },
  { id: 'fisica-de', nombre: 'Física DE', bloque: 'ciencias' },
  { id: 'quimica', nombre: 'Química', bloque: 'ciencias' },
  { id: 'quimica-abc-1', nombre: 'Química ABC 1', bloque: 'ciencias' },
  { id: 'quimica-abc-2', nombre: 'Química ABC 2', bloque: 'ciencias' },
  { id: 'quimica-de', nombre: 'Química DE', bloque: 'ciencias' },
]
