/**
 * Opciones de la cartilla y sus ciclos. Fuente: aula20.edu.pe/ciclos (2026-11-04).
 * Todos los ciclos se publican como "Presencial y Virtual". La etiqueta "Nuevo" sale de las
 * tarjetas del home actual. Los nombres completos de las universidades son los oficiales.
 */

export interface Ciclo {
  name: string
  href: string
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

const ciclo = (path: string, name: string): Ciclo => ({ name, href: `https://aula20.edu.pe/ciclos/${path}` })

/** Opción marcada en la cartilla al cargar la página. */
export const DEFAULT_OPCION_ID = 'san-marcos'

export const opciones: Opcion[] = [
  {
    id: 'san-marcos',
    label: 'San Marcos',
    detail: 'Universidad Nacional Mayor de San Marcos',
    group: 'universidad',
    ciclos: [
      ciclo('San%20Marcos/26', 'Semianual'),
      ciclo('San%20Marcos/27', 'CEPRE'),
      ciclo('San%20Marcos/28', 'Escolar'),
      ciclo('San%20Marcos/43', 'Intensivo'),
    ],
  },
  {
    id: 'uni',
    label: 'UNI',
    detail: 'Universidad Nacional de Ingeniería',
    group: 'universidad',
    isNew: true,
    ciclos: [ciclo('UNI/29', 'Semestral'), ciclo('UNI/30', 'IEN')],
  },
  {
    id: 'catolica',
    label: 'Católica',
    detail: 'Pontificia Universidad Católica del Perú',
    group: 'universidad',
    isNew: true,
    ciclos: [ciclo('Cat%C3%B3lica/31', 'Talento'), ciclo('Cat%C3%B3lica/32', 'Primera Opción (POP)')],
  },
  {
    id: 'agraria',
    label: 'Agraria',
    detail: 'Universidad Nacional Agraria La Molina',
    group: 'universidad',
    isNew: true,
    ciclos: [ciclo('Agraria/33', 'Semestral'), ciclo('Agraria/44', 'Repaso Intensivo Escolar')],
  },
  {
    id: 'villarreal',
    label: 'Villarreal',
    detail: 'Universidad Nacional Federico Villarreal',
    group: 'universidad',
    ciclos: [ciclo('Villarreal/36', 'Semianual Villarreal')],
  },
  {
    id: 'callao',
    label: 'Callao',
    detail: 'Universidad Nacional del Callao',
    group: 'universidad',
    ciclos: [ciclo('Callao/45', 'Repaso Callao')],
  },
  {
    id: 'beca-18',
    label: 'Beca 18',
    detail: 'Preparación para el concurso Beca 18',
    group: 'programa',
    ciclos: [ciclo('Beca%2018/37', 'Intensivo Beca 18')],
  },
  {
    id: 'integral',
    label: 'Integral',
    detail: 'Ciclo semianual',
    group: 'programa',
    ciclos: [ciclo('INTEGRAL/35', 'Semianual')],
  },
  {
    id: 'cero-formativo',
    label: 'Cero Formativo',
    detail: 'Ciclo semianual desde la base',
    group: 'programa',
    ciclos: [ciclo('CERO%20FORMATIVO/34', 'Semianual')],
  },
  {
    id: 'mate-y-ciencia',
    label: 'Mate y Ciencia desde 0',
    detail: 'Ciclo semianual',
    group: 'programa',
    ciclos: [ciclo('Mate%20y%20Ciencia%20Desde%200/39', 'Semianual')],
  },
  {
    id: 'escolar-kids',
    label: 'Escolar Kids',
    detail: 'Primaria y primeros años de secundaria',
    group: 'programa',
    ciclos: [
      ciclo('ESCOLAR%20KIDS/42', '1.º y 2.º de primaria · 3.º y 4.º de primaria'),
      ciclo('ESCOLAR%20KIDS/41', '5.º y 6.º de primaria'),
      ciclo('ESCOLAR%20KIDS/40', '1.º y 2.º de secundaria'),
    ],
  },
]

/**
 * Ciclo con ficha completa en el sitio (aula20.edu.pe/ciclos/San%20Marcos/43).
 * Es el único que publica fechas, duración y horario en texto.
 */
export const cicloDestacado = {
  opcionId: 'san-marcos',
  name: 'Ciclo Intensivo San Marcos',
  audience: 'Para estudiantes con preparación previa que postulan en marzo del 2027.',
  facts: [
    { label: 'Inicio y fin', value: '19/10/2026 – 19/03/2027' },
    { label: 'Duración', value: '21 semanas' },
    { label: 'Metodología', value: '50 % práctico · 50 % teórico' },
    { label: 'Modalidad', value: 'Presencial y virtual' },
  ],
  schedules: [
    { label: 'Completo', value: 'Lun – vie 7:30 a. m. – 4:00 p. m. · Sáb 7:40 – 11:35 a. m. (simulacro)' },
    { label: 'Noche', value: 'Lun – sáb 5:00 – 10:10 p. m. · Dom: simulacro' },
  ],
  href: 'https://aula20.edu.pe/ciclos/San%20Marcos/43',
} as const

export const modalidadCiclos = 'Presencial y virtual'
