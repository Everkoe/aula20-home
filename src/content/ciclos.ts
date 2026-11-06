/**
 * Opciones de la cartilla y la ficha completa de cada ciclo.
 *
 * Fuente: la ficha de cada ciclo en aula20.edu.pe/ciclos/<entidad>/<id>, leída el 2026-11-05 de los datos
 * que la propia página manda al navegador (fechas, duración, modalidad, % práctico/teórico, horario,
 * beneficios y logros). Los textos se pasaron a minúscula de oración y sin emojis; nada se agregó.
 * La etiqueta "Nuevo" sale de las tarjetas del home actual. Los nombres de las universidades son los oficiales.
 *
 * Por confirmar con Aula 20 (ver docs/CONTINUAR.md):
 * - Beca 18, turno virtual mañana: la web dice "Viernes: (9:00 pm - 10:45 am)"; se muestra 9:00 a. m.
 * - "Lunes - Miércoles" (Beca 18) se lee como lunes y miércoles, igual que "Martes - Jueves" en Escolar Kids.
 * - Los logros publicados son los mismos en todas las fichas (UNMSM 2026-II), también en UNI o Católica.
 */

export type Dia = 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom'

/** Clases o simulacro en ciertos días. Horas en 24 h ("07:30"); sin horas si la web no las publica. */
export interface Bloque {
  dias: Dia[]
  inicio?: string
  fin?: string
  isSimulacro?: boolean
}

export interface Turno {
  nombre: string
  bloques: Bloque[]
}

export type Modalidad = 'Presencial' | 'Virtual' | 'Presencial y virtual'

export interface Logro {
  proceso: string
  cifras: { value: number; label: string }[]
}

export interface Ciclo {
  name: string
  href: string
  /** A quién va dirigido (campo "descripción" de la ficha). */
  para: string
  /** Fechas ISO (aaaa-mm-dd). */
  inicio: string
  fin: string
  semanas: number
  modalidad: Modalidad
  /** Porcentaje práctico; el teórico es el resto. */
  practico: number
  turnos: Turno[]
  beneficios: string[]
  logro?: Logro
  preciosPdf: string
  horarioPdf: string
}

export interface Opcion {
  /** value del radio en la cartilla. */
  id: string
  label: string
  /** Universidad o descripción corta del programa. */
  detail: string
  group: 'universidad' | 'programa'
  isNew?: boolean
  ciclos: Ciclo[]
}

const SITE = 'https://aula20.edu.pe/ciclos/'
const CDN = 'https://cdn.aula20.edu.pe/prod/'

type CicloData = Omit<Ciclo, 'href' | 'preciosPdf' | 'horarioPdf'> & { path: string; precios: string; horario: string }

const ciclo = ({ path, precios, horario, ...data }: CicloData): Ciclo => ({
  ...data,
  href: `${SITE}${path}`,
  preciosPdf: `${CDN}precios/Precios-${precios}.pdf`,
  horarioPdf: `${CDN}horarios/Horario-${horario}.pdf`,
})

const LUN_VIE: Dia[] = ['lun', 'mar', 'mie', 'jue', 'vie']
const LUN_SAB: Dia[] = [...LUN_VIE, 'sab']

/** Publicado igual en las fichas (menos Repaso Intensivo Escolar y Repaso Callao, que no traen logros). */
const logroUnmsm2026II: Logro = {
  proceso: 'Admisión UNMSM 2026-II',
  cifras: [
    { value: 130, label: 'primeros puestos' },
    { value: 1311, label: 'cachimbos' },
  ],
}

const beneficiosBasicos = ['Material exclusivo', 'Tutores por salón', 'Docentes especialistas', 'Acceso a grabaciones']

const beneficiosAdmision = (universidad: string, simulacros: string, profesores: string) => [
  'Material práctico gratis',
  `Enfoque directo al examen de admisión ${universidad}`,
  'Desarrollo completo del temario oficial',
  profesores,
  'Clases prácticas con preguntas tipo admisión',
  simulacros,
  'Tutoría personalizada y seguimiento constante',
  'Mayor rapidez y seguridad al resolver preguntas',
  'Preparación estratégica para lograr tu ingreso',
]

const beneficiosKids = [
  'Docentes 100 % dinámicos',
  'Tutoría personalizada',
  'Preparación desde lo básico',
  'Acceso a las grabaciones',
  'Evaluación semanal para medir el avance del estudiante',
  'Reunión de padres',
  'Reporte de notas semanal',
]

/** Opción marcada en la cartilla al cargar la página. */
export const DEFAULT_OPCION_ID = 'san-marcos'

export const opciones: Opcion[] = [
  {
    id: 'san-marcos',
    label: 'San Marcos',
    detail: 'Universidad Nacional Mayor de San Marcos',
    group: 'universidad',
    ciclos: [
      ciclo({
        path: 'San%20Marcos/26',
        name: 'Semianual',
        para: 'Egresados sin experiencia previa que desean afianzar sus conocimientos para el examen de admisión de marzo.',
        inicio: '2026-10-19',
        fin: '2027-03-19',
        semanas: 21,
        modalidad: 'Presencial y virtual',
        practico: 60,
        turnos: [
          {
            nombre: 'Horario',
            bloques: [
              { dias: LUN_VIE, inicio: '07:30', fin: '16:00' },
              { dias: ['sab'], inicio: '07:40', fin: '11:35', isSimulacro: true },
            ],
          },
        ],
        beneficios: [
          '2 libros mensuales gratis',
          'Enfoque por áreas: ABC – DE',
          'Tutor asignado por cada salón, que te acompaña durante todo el proceso',
          'Simulacros tipo examen de admisión: Aptitudes (1 h) y Conocimientos (2 h)',
          'Solucionario completo de cada simulacro',
          'Docentes especialistas con más de 20 años de experiencia formando ingresantes',
          'Acceso a las grabaciones de tus clases virtuales cuando lo necesites',
          'Desarrollo de 19 cursos integrales, reforzando cada bloque de aprendizaje',
          'Sala de estudio exclusiva para repaso y trabajo en grupo',
        ],
        logro: logroUnmsm2026II,
        precios: 'U05Lhrr61gSS',
        horario: 'mVuWzEWHdF1d',
      }),
      ciclo({
        path: 'San%20Marcos/27',
        name: 'CEPRE',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-11-09',
        fin: '2027-03-12',
        semanas: 16,
        modalidad: 'Presencial',
        practico: 60,
        turnos: [{ nombre: 'Tarde', bloques: [{ dias: LUN_VIE, inicio: '15:00', fin: '19:00' }] }],
        beneficios: [
          'Material exclusivo',
          'Tutores por salón',
          'Docentes especialistas',
          'Preparación estratégica para la UNMSM',
          'Refuerzo en cursos clave de admisión',
          'Metodología enfocada en resultados',
        ],
        logro: logroUnmsm2026II,
        precios: 'vNoGraHzCx7T',
        horario: 'Ee7mM0adhkE5',
      }),
      ciclo({
        path: 'San%20Marcos/28',
        name: 'Escolar',
        para: 'Alumnos sin experiencia previa que desean afianzar sus conocimientos desde lo básico.',
        inicio: '2026-08-03',
        fin: '2026-12-18',
        semanas: 20,
        modalidad: 'Presencial y virtual',
        practico: 50,
        turnos: [
          { nombre: 'Presencial · mañana', bloques: [{ dias: LUN_SAB, inicio: '07:40', fin: '11:35' }] },
          {
            nombre: 'Presencial · tarde',
            bloques: [
              { dias: LUN_VIE, inicio: '16:45', fin: '19:30' },
              { dias: ['sab'], inicio: '13:45', fin: '17:00' },
            ],
          },
          { nombre: 'Virtual · mañana', bloques: [{ dias: LUN_SAB, inicio: '07:40', fin: '11:35' }] },
          {
            nombre: 'Virtual · noche',
            bloques: [
              { dias: LUN_VIE, inicio: '19:00', fin: '22:30' },
              { dias: ['sab'], inicio: '13:45', fin: '17:00' },
            ],
          },
        ],
        beneficios: [
          'Material exclusivo',
          'Profesores especialistas en admisión',
          'Horario ideal para complementar tu preparación',
          'Simulacros y evaluaciones constantes',
          'Más rapidez, seguridad y nivel para lograr tu ingreso',
        ],
        logro: logroUnmsm2026II,
        precios: '7S97vFUa6LQj',
        horario: 'w17yd06qZtfD',
      }),
      ciclo({
        path: 'San%20Marcos/43',
        name: 'Intensivo',
        para: 'Estudiantes con preparación previa que postulan en marzo del 2027.',
        inicio: '2026-10-19',
        fin: '2027-03-19',
        semanas: 21,
        modalidad: 'Presencial y virtual',
        practico: 50,
        turnos: [
          {
            nombre: 'Completo',
            bloques: [
              { dias: LUN_VIE, inicio: '07:30', fin: '16:00' },
              { dias: ['sab'], inicio: '07:40', fin: '11:35', isSimulacro: true },
            ],
          },
          {
            nombre: 'Noche',
            bloques: [
              { dias: LUN_SAB, inicio: '17:00', fin: '22:10' },
              { dias: ['dom'], isSimulacro: true },
            ],
          },
        ],
        beneficios: [
          'Boletín gratuito',
          'Enfoque académico por áreas (ABC – DE) para un aprendizaje estratégico',
          'Tutor asignado por salón, que te acompaña y orienta durante todo tu proceso académico',
          'Simulacros tipo examen de admisión: Aptitudes (1 hora) y Conocimientos (2 horas)',
          'Plana docente especializada, con más de 20 años de experiencia formando ingresantes',
          'Acceso a grabaciones de clases virtuales, disponibles para repaso en cualquier momento',
          'Desarrollo de 19 cursos integrales, fortaleciendo cada bloque de aprendizaje',
          'Sala de estudio exclusiva, ideal para el repaso académico y el trabajo en equipo',
        ],
        logro: logroUnmsm2026II,
        precios: 'YrLToRlYBiVw',
        horario: 'xHlbxBWDua9h',
      }),
    ],
  },
  {
    id: 'uni',
    label: 'UNI',
    detail: 'Universidad Nacional de Ingeniería',
    group: 'universidad',
    isNew: true,
    ciclos: [
      ciclo({
        path: 'UNI/29',
        name: 'Semestral',
        para: 'Egresados que ya cuentan con preparación previa y desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-10-19',
        fin: '2027-02-05',
        semanas: 15,
        modalidad: 'Presencial y virtual',
        practico: 70,
        turnos: [
          {
            nombre: 'Presencial · completo',
            bloques: [
              { dias: LUN_VIE, inicio: '07:40', fin: '18:00' },
              { dias: ['sab'], inicio: '07:40', fin: '13:30' },
            ],
          },
        ],
        beneficios: beneficiosAdmision('UNI', '3 simulacros semanales', 'Profesores especialistas UNI'),
        logro: logroUnmsm2026II,
        precios: 'mfe9UTi2fwfA',
        horario: 'fa0quqEVgrmU',
      }),
      ciclo({
        path: 'UNI/30',
        name: 'IEN',
        para: 'Escolares sin experiencia previa que desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-08-03',
        fin: '2026-11-20',
        semanas: 16,
        modalidad: 'Presencial y virtual',
        practico: 70,
        turnos: [
          {
            nombre: 'Tarde',
            bloques: [
              { dias: LUN_VIE, inicio: '16:20', fin: '20:30' },
              { dias: ['sab'], inicio: '07:40', fin: '16:00' },
            ],
          },
        ],
        beneficios: beneficiosAdmision('UNI', 'Simulacro tipo examen de admisión', 'Profesores especialistas UNI'),
        logro: logroUnmsm2026II,
        precios: 'xH3qaUqN1pIx',
        horario: 'DHvvUrPJOjSH',
      }),
    ],
  },
  {
    id: 'catolica',
    label: 'Católica',
    detail: 'Pontificia Universidad Católica del Perú',
    group: 'universidad',
    isNew: true,
    ciclos: [
      ciclo({
        path: 'Cat%C3%B3lica/31',
        name: 'Talento',
        para: 'Egresados que desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-10-19',
        fin: '2027-02-12',
        semanas: 15,
        modalidad: 'Presencial y virtual',
        practico: 50,
        turnos: [{ nombre: 'Completo', bloques: [{ dias: LUN_VIE, inicio: '07:40', fin: '16:00' }] }],
        beneficios: beneficiosAdmision('Católica', 'Evaluaciones diarias y simulacros semanales', 'Profesores preuniversitarios especializados'),
        logro: logroUnmsm2026II,
        precios: 'KnygGbii3hWD',
        horario: 'wj2f6yQKsOAh',
      }),
      ciclo({
        path: 'Cat%C3%B3lica/32',
        name: 'Primera Opción (POP)',
        para: 'Estudiantes escolares que desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-10-19',
        fin: '2026-11-20',
        semanas: 5,
        modalidad: 'Presencial y virtual',
        practico: 50,
        turnos: [
          {
            nombre: 'Tarde',
            bloques: [
              { dias: LUN_VIE, inicio: '16:45', fin: '20:30' },
              { dias: ['sab'], inicio: '13:45', fin: '17:00' },
            ],
          },
        ],
        beneficios: beneficiosAdmision('Católica', 'Evaluaciones diarias y simulacros semanales', 'Profesores preuniversitarios especializados'),
        logro: logroUnmsm2026II,
        precios: '0cdQhzfidgGT',
        horario: 'GtuVb44EmMUk',
      }),
    ],
  },
  {
    id: 'agraria',
    label: 'Agraria',
    detail: 'Universidad Nacional Agraria La Molina',
    group: 'universidad',
    isNew: true,
    ciclos: [
      ciclo({
        path: 'Agraria/33',
        name: 'Semestral',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-10-19',
        fin: '2027-02-12',
        semanas: 16,
        modalidad: 'Presencial y virtual',
        practico: 70,
        turnos: [
          {
            nombre: 'Horario',
            bloques: [
              { dias: LUN_VIE, inicio: '07:40', fin: '16:00' },
              { dias: ['sab'], inicio: '07:30', fin: '11:35', isSimulacro: true },
            ],
          },
        ],
        beneficios: beneficiosAdmision('Agraria', 'Evaluaciones diarias y simulacros semanales', 'Profesores preuniversitarios especializados'),
        logro: logroUnmsm2026II,
        precios: 'PjIwUFVIAs0C',
        horario: 'xwElpBHtvucn',
      }),
      ciclo({
        path: 'Agraria/44',
        name: 'Repaso Intensivo Escolar',
        para: 'Alumnos de 5.º de secundaria que ya cuentan con experiencia previa y desean afianzar sus conocimientos para el examen de admisión.',
        inicio: '2026-11-09',
        fin: '2026-12-04',
        semanas: 4,
        modalidad: 'Presencial y virtual',
        practico: 80,
        turnos: [
          {
            nombre: 'Horario',
            bloques: [
              { dias: LUN_VIE, inicio: '16:30', fin: '20:30' },
              { dias: ['sab'], inicio: '07:30', fin: '12:00' },
              { dias: ['sab'], inicio: '13:00', fin: '16:00', isSimulacro: true },
            ],
          },
        ],
        beneficios: beneficiosAdmision('Agraria', 'Simulacros semanales', 'Profesores preuniversitarios especializados'),
        precios: 'D3YEjb1UmJ5a',
        horario: 'iiaWUVDRI2f0',
      }),
    ],
  },
  {
    id: 'villarreal',
    label: 'Villarreal',
    detail: 'Universidad Nacional Federico Villarreal',
    group: 'universidad',
    ciclos: [
      ciclo({
        path: 'Villarreal/36',
        name: 'Semianual Villarreal',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos.',
        inicio: '2026-10-19',
        fin: '2027-03-19',
        semanas: 21,
        modalidad: 'Presencial',
        practico: 60,
        turnos: [{ nombre: 'Horario', bloques: [{ dias: LUN_VIE, inicio: '07:30', fin: '16:00' }] }],
        beneficios: beneficiosBasicos,
        logro: logroUnmsm2026II,
        precios: 'h7UX8hy7nccC',
        horario: 'qGOeLYervTyz',
      }),
    ],
  },
  {
    id: 'callao',
    label: 'Callao',
    detail: 'Universidad Nacional del Callao',
    group: 'universidad',
    ciclos: [
      ciclo({
        path: 'Callao/45',
        name: 'Repaso Callao',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos.',
        inicio: '2026-11-02',
        fin: '2026-12-18',
        semanas: 7,
        modalidad: 'Presencial y virtual',
        practico: 80,
        turnos: [
          {
            nombre: 'Presencial · mañana',
            bloques: [
              { dias: LUN_VIE, inicio: '07:40', fin: '13:30' },
              { dias: ['sab'], inicio: '07:40', fin: '11:35' },
            ],
          },
          {
            nombre: 'Virtual · noche',
            bloques: [
              { dias: LUN_VIE, inicio: '17:00', fin: '22:00' },
              { dias: ['sab'], inicio: '17:00', fin: '20:00' },
            ],
          },
        ],
        beneficios: beneficiosBasicos,
        precios: 'uokpiYhVrXJ4',
        horario: '4ZxsmFw2Tcmv',
      }),
    ],
  },
  {
    id: 'beca-18',
    label: 'Beca 18',
    detail: 'Preparación para el concurso Beca 18',
    group: 'programa',
    ciclos: [
      ciclo({
        path: 'Beca%2018/37',
        name: 'Intensivo Beca 18',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos.',
        inicio: '2026-08-03',
        fin: '2026-11-13',
        semanas: 15,
        modalidad: 'Presencial y virtual',
        practico: 70,
        turnos: [
          { nombre: 'Presencial · tarde', bloques: [{ dias: ['lun', 'mie', 'vie'], inicio: '16:00', fin: '19:30' }] },
          {
            nombre: 'Virtual · mañana',
            bloques: [
              { dias: ['lun', 'mie'], inicio: '09:00', fin: '12:30' },
              { dias: ['vie'], inicio: '09:00', fin: '10:45' },
            ],
          },
          {
            nombre: 'Virtual · tarde',
            bloques: [
              { dias: ['lun', 'mie'], inicio: '16:00', fin: '19:30' },
              { dias: ['vie'], inicio: '16:00', fin: '17:45' },
            ],
          },
          {
            nombre: 'Virtual · noche',
            bloques: [
              { dias: ['lun', 'mie'], inicio: '19:00', fin: '22:30' },
              { dias: ['vie'], inicio: '19:00', fin: '20:45' },
            ],
          },
        ],
        beneficios: beneficiosBasicos,
        logro: logroUnmsm2026II,
        precios: '2dvW4uZzCO7q',
        horario: 'TVRHgiOL6Yre',
      }),
    ],
  },
  {
    id: 'integral',
    label: 'Integral',
    detail: 'Ciclo semianual',
    group: 'programa',
    ciclos: [
      ciclo({
        path: 'INTEGRAL/35',
        name: 'Semianual',
        para: 'Egresados que ya cuentan con experiencia previa y desean afianzar sus conocimientos.',
        inicio: '2026-10-19',
        fin: '2026-12-18',
        semanas: 9,
        modalidad: 'Presencial y virtual',
        practico: 60,
        turnos: [{ nombre: 'Horario', bloques: [{ dias: LUN_VIE, inicio: '07:30', fin: '13:30' }] }],
        beneficios: beneficiosBasicos,
        logro: logroUnmsm2026II,
        precios: 'FEOJGLUxH1z2',
        horario: '7aYAH3GRA61b',
      }),
    ],
  },
  {
    id: 'cero-formativo',
    label: 'Cero Formativo',
    detail: 'Ciclo semianual desde la base',
    group: 'programa',
    ciclos: [
      ciclo({
        path: 'CERO%20FORMATIVO/34',
        name: 'Semianual',
        para: 'Egresados sin experiencia previa que desean afianzar sus conocimientos.',
        inicio: '2026-10-19',
        fin: '2026-12-18',
        semanas: 9,
        modalidad: 'Presencial y virtual',
        practico: 60,
        turnos: [{ nombre: 'Horario', bloques: [{ dias: LUN_VIE, inicio: '07:30', fin: '13:30' }] }],
        beneficios: [
          'Material práctico gratis',
          'Refuerzo intensivo de temas clave',
          'Profesores especialistas en admisión',
          'Preguntas tipo examen y clases prácticas',
          'Evaluaciones y simulacros constantes',
          'Tutoría personalizada y seguimiento académico',
          'Preparación estratégica para asegurar tu ingreso',
        ],
        logro: logroUnmsm2026II,
        precios: 'm4fVQUH2Zff3',
        horario: 'jqKIRikUDnkE',
      }),
    ],
  },
  {
    id: 'mate-y-ciencia',
    label: 'Mate y Ciencia desde 0',
    detail: 'Ciclo semianual',
    group: 'programa',
    ciclos: [
      ciclo({
        path: 'Mate%20y%20Ciencia%20Desde%200/39',
        name: 'Semianual',
        para: 'Egresados sin experiencia previa que desean afianzar sus conocimientos.',
        inicio: '2026-10-24',
        fin: '2026-12-19',
        semanas: 9,
        modalidad: 'Presencial y virtual',
        practico: 50,
        turnos: [{ nombre: 'Sabatino', bloques: [{ dias: ['sab'], inicio: '07:50', fin: '16:00' }] }],
        beneficios: beneficiosBasicos,
        logro: logroUnmsm2026II,
        precios: 'JUtnUkEaLOLU',
        horario: 'ZBaq9THmNfZv',
      }),
    ],
  },
  {
    id: 'escolar-kids',
    label: 'Escolar Kids',
    detail: 'Primaria y primeros años de secundaria',
    group: 'programa',
    ciclos: [
      ciclo({
        path: 'ESCOLAR%20KIDS/42',
        name: '1.º y 2.º de primaria · 3.º y 4.º de primaria',
        para: 'Preparación desde lo básico para un mejor nivel de aprendizaje, paso a paso.',
        inicio: '2026-10-19',
        fin: '2026-12-18',
        semanas: 9,
        modalidad: 'Virtual',
        practico: 50,
        turnos: [
          { nombre: '1.º y 2.º de primaria', bloques: [{ dias: ['mar', 'jue'], inicio: '16:00', fin: '17:00' }] },
          { nombre: '3.º y 4.º de primaria', bloques: [{ dias: ['lun', 'mie', 'vie'], inicio: '16:00', fin: '17:00' }] },
        ],
        beneficios: beneficiosKids,
        logro: logroUnmsm2026II,
        precios: 'kz1UUcdnNvN0',
        horario: 'gUoQHyINNScB',
      }),
      ciclo({
        path: 'ESCOLAR%20KIDS/41',
        name: '5.º y 6.º de primaria',
        para: 'Preparación desde lo básico para un mejor nivel de aprendizaje, paso a paso.',
        inicio: '2026-10-19',
        fin: '2026-12-18',
        semanas: 9,
        modalidad: 'Virtual',
        practico: 50,
        turnos: [
          { nombre: 'Turno 1', bloques: [{ dias: LUN_VIE, inicio: '16:20', fin: '17:20' }] },
          { nombre: 'Turno 2', bloques: [{ dias: LUN_VIE, inicio: '17:30', fin: '18:30' }] },
          { nombre: 'Sabatino', bloques: [{ dias: ['sab'], inicio: '07:40', fin: '11:30' }] },
        ],
        beneficios: beneficiosKids,
        logro: logroUnmsm2026II,
        precios: 'MbvfbtzhTA8t',
        horario: 'MAL7s5iyyyB9',
      }),
      ciclo({
        path: 'ESCOLAR%20KIDS/40',
        name: '1.º y 2.º de secundaria',
        para: 'Preparación desde lo básico para un mejor nivel de aprendizaje, paso a paso.',
        inicio: '2026-10-19',
        fin: '2026-12-18',
        semanas: 9,
        modalidad: 'Virtual',
        practico: 50,
        turnos: [
          { nombre: 'Turno 1', bloques: [{ dias: LUN_VIE, inicio: '16:00', fin: '17:30' }] },
          { nombre: 'Turno 2', bloques: [{ dias: LUN_VIE, inicio: '17:45', fin: '19:15' }] },
          { nombre: 'Sabatino', bloques: [{ dias: ['sab'], inicio: '07:40', fin: '13:30' }] },
        ],
        beneficios: beneficiosKids,
        logro: logroUnmsm2026II,
        precios: 'gfk1s7s2Zi89',
        horario: 'yvFoBm1NQUp3',
      }),
    ],
  },
]
