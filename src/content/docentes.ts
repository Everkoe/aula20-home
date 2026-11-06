/**
 * Plana docente publicada en aula20.edu.pe/docentes (leída el 2026-11-05 de los datos que manda la página):
 * área, curso, nombre tal como aparece y foto (PNG de 500 × 500 en su CDN, se carga en caliente y en diferido).
 */

const CDN_DOCENTES = 'https://cdn.aula20.edu.pe/prod/docentes/'

export interface Docente {
  nombre: string
  foto: string
}

export interface Curso {
  name: string
  docentes: Docente[]
}

export interface AreaDocente {
  area: 'Matemáticas' | 'Ciencias' | 'Letras'
  cursos: Curso[]
}

/** Texto de presentación de /docentes. */
export const presentacionPlana =
  'Nuestros docentes, expertos en preparación preuniversitaria, guían a los alumnos en la construcción de su conocimiento. Su experiencia nos permite ofrecer un programa innovador y diferenciarnos por nuestros resultados.'

const d = (nombre: string, id: string): Docente => ({ nombre, foto: `${CDN_DOCENTES}Docente-${id}.png` })

export const planaDocente: AreaDocente[] = [
  {
    area: 'Matemáticas',
    cursos: [
      {
        name: 'Aritmética',
        docentes: [d('André Usaqui', 'iWttzHOd9r'), d('Dennis Ayarquispe', 'g2DyDp2jzk'), d('Jean Paul Barrionuevo', 'T4weu3zak5')],
      },
      {
        name: 'Álgebra',
        docentes: [d('Yhon Figueroa', '9zVrsMfhjx'), d('Ronald Mamani', 'FKq2cCo2T7'), d('Luis Cantos', 'f8Gaj0RZVR')],
      },
      {
        name: 'Geometría',
        docentes: [d('Cesar Ramirez', 'nTLB1DXEnY'), d('Rothschild Linares', 'MbTtFa1o7U'), d('Luis Barca', '9k7y20Aq1n'), d('Carlos Huyhua', 'XLpqlM2eIj')],
      },
      {
        name: 'Habilidad Matemática',
        docentes: [d('Victor Albinagorta', 'Btw4XpiSUW'), d('Jose Luis Castro', 'jSSaWX2Wa2'), d('Victor Hugo', 'hHFBHmUg65'), d('Luis Poma', 'mxqkq3cfOI'), d('Jose Torres', 'XR37SVZPmy'), d('Christian Quequejana', 'CLgkjH9AuA')],
      },
      {
        name: 'Trigonometría',
        docentes: [d('Huber Castro', 'qDJhT2xUq0')],
      },
    ],
  },
  {
    area: 'Ciencias',
    cursos: [
      {
        name: 'Biología',
        docentes: [d('Willy Mamani', 'bLs0NzRym0'), d('Victor Ojeda', 'TylWFFELDS'), d('David Osorio', '50jSmWviUi'), d('Saul Garrido', 'r0MUsjf60I'), d('Ernesto Tadeo', 'SVtC53Mw0h')],
      },
      {
        name: 'Física',
        docentes: [d('Miguel Garcia', 'faSYqyMUFY'), d('Juan Carlos Moreno', 'lrFabphKmx'), d('Roy Jimenez', 'cRSSyFB67L'), d('Leoncio Nieto', 'H8xldGB0RQ')],
      },
      {
        name: 'Química',
        docentes: [d('Rudy Chancafe', 'JhHcMPIjyo'), d('Alfredo Neira', 'J3HXF6devY'), d('José Martin Lopez', 'q8ARGIyF7S')],
      },
    ],
  },
  {
    area: 'Letras',
    cursos: [
      {
        name: 'Habilidad Verbal',
        docentes: [d('Luis Garcia', 'ouoydBKs0a'), d('Juan Garcia', 'OILhml23Mk'), d('William Rios', '1LHUrthHMP'), d('Pablo Quintana', 'r715AdeMk3')],
      },
      {
        name: 'Lenguaje',
        docentes: [d('Martin Duran', 'AgEXE2n7sc'), d('Mariel Carrillo', 'Aojkf3OKwD')],
      },
      {
        name: 'Literatura',
        docentes: [d('Max Palacios', 'XOmA7Pc1rU'), d('Hugo Chavez', '14mmypsre4'), d('Jose Luis Baltazar', '2Yy5weVWmC')],
      },
      {
        name: 'Historia del Perú',
        docentes: [d('Pedro Nue', 'UkY2dmWdLZ'), d('Cristhiam Saravia', 'CgP8tsUP2k'), d('Mike Benites', 'YtxnfQin7R')],
      },
      {
        name: 'Historia Universal',
        docentes: [d('Luis Ganoza', 'J0RPL89wUJ'), d('Edson Rosales', 'q9bCXVc7MR')],
      },
      {
        name: 'Geografía',
        docentes: [d('Hector Sarmiento', 'MUbX6w1HTx'), d('Oscar Huarancca', 'UIN9MuIitW'), d('Diego Alva', 'D7iaOZtCIZ')],
      },
      {
        name: 'Psicología',
        docentes: [d('Norvy Delgado', 'M3Rxh3KQCR'), d('Jose Obregón', 'OFUv3xBvqi')],
      },
      {
        name: 'Filosofía',
        docentes: [d('Jose Mendoza', '6wnBWOQUej'), d('Xavier Palomino', 'tanqjW7uf6'), d('Velasquez', 'EPikivAkMA'), d('Torrico', '1YAEPTglYS')],
      },
      {
        name: 'Economía',
        docentes: [d('Christhian Caballero', 'KV6K7FvMXi'), d('Juscamayta', '3xa1BywMT0'), d('Carlos Chavarry', 'lCDYG1uXOm'), d('Frank Barzola', 'gbkHXNukN2')],
      },
      {
        name: 'Cívica',
        docentes: [d('Jose Luis Panta', 'R0x1geWzuP'), d('Oscar Ochoa', 'x3U76eednE')],
      },
    ],
  },
]

/** Cursos y docentes distintos (un docente que dicta dos cursos cuenta una vez). */
export function resumenPlana(plana: AreaDocente[]): { cursos: number; docentes: number } {
  const cursos = plana.flatMap((a) => a.cursos)
  const docentes = new Set(cursos.flatMap((c) => c.docentes.map((docente) => docente.nombre)))
  return { cursos: cursos.length, docentes: docentes.size }
}

/** Docentes distintos de un área. */
export function docentesDelArea(area: AreaDocente): number {
  return new Set(area.cursos.flatMap((c) => c.docentes.map((docente) => docente.nombre))).size
}
