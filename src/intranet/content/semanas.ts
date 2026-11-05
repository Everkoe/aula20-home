/**
 * Semanas del ciclo Intensivo UNMSM (salón T) leídas de la intranet actual el 2026-11-04.
 * - separatas: cursos con PDF en Materiales.
 * - grabaciones: temas de las clases grabadas en Grabaciones. Se pasaron de MAYÚSCULAS a texto normal con tildes,
 *   y el prefijo "ESPECIALIZADO -" quedó como marca aparte. El contenido de cada tema no cambia.
 * - Rango: el de Materiales (lunes a domingo). La intranet usa otros rangos en otras secciones.
 * - La semana 1 de Introductorio se llama "INTRODUCTORIO I" en Materiales e "INTRODUCCIÓN 1" en Grabaciones: aquí, un solo nombre.
 * Sin enlaces: los PDF y las grabaciones son contenido pagado.
 */

export interface Grabacion {
  cursoId: string
  tema: string
  /** Clase de refuerzo marcada "ESPECIALIZADO" en la intranet. */
  isEspecializado?: boolean
}

export interface Semana {
  id: string
  nombre: string
  /** Fechas ISO (AAAA-MM-DD), lunes y domingo. */
  inicio: string
  fin: string
  separatas: string[]
  grabaciones: Grabacion[]
}

const SEPARATAS_INTRO = [
  'habilidad-verbal', 'hm-a', 'hm-b', 'aritmetica', 'algebra', 'geometria', 'trigonometria',
  'lenguaje', 'literatura', 'hp', 'hu', 'geografia', 'economia', 'civica', 'psicologia', 'filosofia',
  'biologia', 'anatomia', 'fisica', 'fisica-de', 'quimica', 'quimica-de',
]

/** Desde la semana 1, Física y Química se dividen en ABC 1, ABC 2 y DE. */
const SEPARATAS_CICLO = [
  'habilidad-verbal', 'hm-a', 'hm-b', 'aritmetica', 'algebra', 'geometria', 'trigonometria',
  'lenguaje', 'literatura', 'hp', 'hu', 'geografia', 'economia', 'civica', 'psicologia', 'filosofia',
  'biologia', 'anatomia', 'fisica-abc-1', 'fisica-abc-2', 'fisica-de', 'quimica-abc-1', 'quimica-abc-2', 'quimica-de',
]

export const semanas: Semana[] = [
  {
    id: 'introductorio-1',
    nombre: 'Introductorio I',
    inicio: '2026-10-19',
    fin: '2026-10-25',
    separatas: SEPARATAS_INTRO,
    grabaciones: [
      { cursoId: 'psicologia', tema: 'Definición de psicología. Métodos de la psicología' },
      { cursoId: 'filosofia', tema: 'Introducción a la filosofía' },
      { cursoId: 'hm-b', tema: 'Situaciones deportivas: traslados' },
      { cursoId: 'hm-a', tema: 'Elementos recreativos' },
      { cursoId: 'trigonometria', tema: 'Razones trigonométricas de ángulos notables' },
      { cursoId: 'economia', tema: 'Necesidades humanas, bienes y servicios' },
      { cursoId: 'habilidad-verbal', tema: 'Resumen' },
      { cursoId: 'civica', tema: 'Norma jurídica' },
      { cursoId: 'anatomia', tema: 'Sistema linfático y sistema inmunitario' },
      { cursoId: 'biologia', tema: 'Introducción a la biología: método científico' },
      { cursoId: 'lenguaje', tema: 'Comunicación y lenguaje' },
      { cursoId: 'algebra', tema: 'División de polinomios' },
      { cursoId: 'hp', tema: 'El poblamiento americano: teorías de la cultura andina' },
      { cursoId: 'hu', tema: 'Culturas orientales: China e India' },
      { cursoId: 'fisica', tema: 'Dinámica y rozamiento' },
      { cursoId: 'aritmetica', tema: 'Progresión aritmética y geométrica' },
      { cursoId: 'geografia', tema: 'Geografía matemática' },
      { cursoId: 'literatura', tema: 'Estudios literarios: literatura universal' },
      { cursoId: 'quimica', tema: 'Sistema Internacional de Medidas (SI)' },
      { cursoId: 'geometria', tema: 'Triángulos I' },
    ],
  },
  {
    id: 'semana-1',
    nombre: 'Semana 1',
    inicio: '2026-10-26',
    fin: '2026-11-01',
    separatas: SEPARATAS_CICLO,
    grabaciones: [
      { cursoId: 'algebra', tema: 'Ecuaciones I' },
      { cursoId: 'hm-a', tema: 'Elementos recreativos' },
      { cursoId: 'hm-b', tema: 'Situaciones deportivas: traslados' },
      { cursoId: 'filosofia', tema: 'Filosofía antigua I' },
      { cursoId: 'psicologia', tema: 'Bases biológicas del psiquismo I' },
      { cursoId: 'fisica', tema: 'Cinemática 1' },
      { cursoId: 'economia', tema: 'Nociones básicas y división de la economía', isEspecializado: true },
      { cursoId: 'economia', tema: 'Nociones básicas y división de la economía' },
      { cursoId: 'trigonometria', tema: 'Razones trigonométricas de ángulos agudos' },
      { cursoId: 'civica', tema: 'Derechos humanos y garantías constitucionales' },
      { cursoId: 'habilidad-verbal', tema: 'Tema central' },
      { cursoId: 'lenguaje', tema: 'Sonidos del lenguaje' },
      { cursoId: 'biologia', tema: 'Biomoléculas orgánicas: glúcidos, lípidos, proteínas y ácidos nucleicos' },
      { cursoId: 'anatomia', tema: 'Histología humana' },
      { cursoId: 'fisica', tema: 'Cinemática 2', isEspecializado: true },
      { cursoId: 'aritmetica', tema: 'Progresión aritmética y geométrica' },
      { cursoId: 'hu', tema: 'Culturas orientales: China e India' },
      { cursoId: 'hp', tema: 'El poblamiento americano: teorías de la cultura andina' },
      { cursoId: 'quimica-abc-2', tema: 'Tabla periódica moderna II' },
      { cursoId: 'geometria', tema: 'Clasificación de los triángulos y líneas notables asociadas al triángulo' },
      { cursoId: 'quimica-abc-1', tema: 'Tabla periódica moderna I' },
      { cursoId: 'literatura', tema: 'Clasicismo griego: épica y tragedia' },
      { cursoId: 'geografia', tema: 'Geografía como ciencia, geodesia y husos horarios' },
    ],
  },
  {
    id: 'semana-2',
    nombre: 'Semana 2',
    inicio: '2026-11-02',
    fin: '2026-11-08',
    separatas: SEPARATAS_CICLO,
    // Semana en curso al leerla (miércoles 4): faltan las clases de jueves a sábado.
    grabaciones: [
      { cursoId: 'lenguaje', tema: 'Morfología', isEspecializado: true },
      { cursoId: 'lenguaje', tema: 'Morfología' },
      { cursoId: 'biologia', tema: 'Citología: célula procariota y virus' },
      { cursoId: 'anatomia', tema: 'Sistema circulatorio animal' },
      { cursoId: 'fisica-abc-2', tema: 'Cinemática 4' },
      { cursoId: 'aritmetica', tema: 'Operaciones entre conjuntos' },
      { cursoId: 'fisica-abc-1', tema: 'Cinemática 3' },
      { cursoId: 'hu', tema: 'Hominización y prehistoria' },
      { cursoId: 'hp', tema: 'Los primeros pobladores del Perú: culturas preincas' },
      { cursoId: 'quimica-abc-2', tema: 'Enlace químico II', isEspecializado: true },
      { cursoId: 'geometria', tema: 'Congruencia de triángulos y sus aplicaciones' },
      { cursoId: 'quimica-abc-1', tema: 'Enlace químico I' },
      { cursoId: 'literatura', tema: 'Clasicismo griego: épica y tragedia' },
      { cursoId: 'geografia', tema: 'Geografía como ciencia, geodesia y husos horarios' },
    ],
  },
]
