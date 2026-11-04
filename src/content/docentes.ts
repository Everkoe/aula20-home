/** Plana docente publicada en aula20.edu.pe/docentes (2026-11-04), con los nombres tal como aparecen. */

export interface Curso {
  name: string
  docentes: string[]
}

export interface AreaDocente {
  area: 'Matemáticas' | 'Ciencias' | 'Letras'
  cursos: Curso[]
}

export const planaDocente: AreaDocente[] = [
  {
    area: 'Matemáticas',
    cursos: [
      { name: 'Aritmética', docentes: ['André Usaqui', 'Dennis Ayarquispe', 'Jean Paul Barrionuevo'] },
      { name: 'Álgebra', docentes: ['Yhon Figueroa', 'Ronald Mamani', 'Luis Cantos'] },
      { name: 'Geometría', docentes: ['Cesar Ramirez', 'Rothschild Linares', 'Luis Barca', 'Carlos Huyhua'] },
      {
        name: 'Habilidad Matemática',
        docentes: ['Victor Albinagorta', 'Jose Luis Castro', 'Victor Hugo', 'Luis Poma', 'Jose Torres', 'Christian Quequejana'],
      },
      { name: 'Trigonometría', docentes: ['Huber Castro'] },
    ],
  },
  {
    area: 'Ciencias',
    cursos: [
      { name: 'Biología', docentes: ['Willy Mamani', 'Victor Ojeda', 'David Osorio', 'Saul Garrido', 'Ernesto Tadeo'] },
      { name: 'Física', docentes: ['Miguel Garcia', 'Juan Carlos Moreno', 'Roy Jimenez', 'Leoncio Nieto'] },
      { name: 'Química', docentes: ['Rudy Chancafe', 'Alfredo Neira', 'José Martin Lopez'] },
    ],
  },
  {
    area: 'Letras',
    cursos: [
      { name: 'Habilidad Verbal', docentes: ['Luis Garcia', 'Juan Garcia', 'William Rios', 'Pablo Quintana'] },
      { name: 'Lenguaje', docentes: ['Martin Duran', 'Mariel Carrillo'] },
      { name: 'Literatura', docentes: ['Max Palacios', 'Hugo Chavez', 'Jose Luis Baltazar'] },
      { name: 'Historia del Perú', docentes: ['Pedro Nue', 'Cristhiam Saravia', 'Mike Benites'] },
      { name: 'Historia Universal', docentes: ['Luis Ganoza', 'Edson Rosales'] },
      { name: 'Geografía', docentes: ['Hector Sarmiento', 'Oscar Huarancca', 'Diego Alva'] },
      { name: 'Psicología', docentes: ['Norvy Delgado', 'Jose Obregón'] },
      { name: 'Filosofía', docentes: ['Jose Mendoza', 'Xavier Palomino', 'Velasquez', 'Torrico'] },
      { name: 'Economía', docentes: ['Christhian Caballero', 'Juscamayta', 'Carlos Chavarry', 'Frank Barzola'] },
      { name: 'Cívica', docentes: ['Jose Luis Panta', 'Oscar Ochoa'] },
    ],
  },
]

/** Cursos y docentes distintos (un docente que dicta dos cursos cuenta una vez). */
export function resumenPlana(plana: AreaDocente[]): { cursos: number; docentes: number } {
  const cursos = plana.flatMap((a) => a.cursos)
  const docentes = new Set(cursos.flatMap((c) => c.docentes))
  return { cursos: cursos.length, docentes: docentes.size }
}
