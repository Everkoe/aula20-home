/**
 * Textos del home. Salen de lo que Aula 20 publica en aula20.edu.pe (home, /nosotros, /ciclos,
 * /cachimbos y la ficha del Intensivo San Marcos), revisado el 2026-11-04. Cada bloque indica su
 * origen. Sin cifras, precios ni testimonios que la academia no haya publicado.
 */

/** Banner "Cantidad de ingresantes" del home actual. */
const ingresantes2027 = { value: 659, label: 'ingresantes' }
const primerosPuestos2027 = { value: 46, label: 'primeros puestos en las cuatro fechas de admisión' }

export const hero = {
  eyebrow: 'Matrículas abiertas · Presencial y virtual',
  /** Lema del home actual. La última palabra va resaltada. */
  title: { lead: 'Tú decides a dónde', highlight: 'ingresar.' },
  /** /nosotros: "Transformamos tu esfuerzo, disciplina y talento en una vacante universitaria." */
  body: 'Transformamos tu esfuerzo, disciplina y talento en una vacante universitaria.',
  primaryCta: 'Quiero matricularme',
  secondaryCta: 'Marca tu universidad',
  photoCaption: 'Tutores Aula 20 · un tutor asignado por salón',
  notes: {
    main: { value: ingresantes2027.value, label: ingresantes2027.label, detail: 'Admisión UNMSM 2027-I' },
    side: { value: primerosPuestos2027.value, label: 'primeros puestos', detail: 'UNMSM 2027-I' },
  },
}

/** Resultados publicados. 2027-I: banner "Cantidad de ingresantes" del home. 2026-II: ficha del Intensivo San Marcos. */
export const resultados = {
  eyebrow: 'Resultados',
  title: { lead: 'Los números que', highlight: 'respaldan.' },
  source: 'Cifras publicadas por Aula 20 en su web y en sus piezas de admisión.',
  procesos: [
    {
      name: 'Admisión UNMSM 2027-I',
      note: 'Áreas A, B, C, D y E',
      stats: [ingresantes2027, primerosPuestos2027, { value: 33, suffix: ' %', label: 'de cachimbos de Medicina Humana' }],
    },
    {
      name: 'Admisión UNMSM 2026-II',
      note: 'Publicado en la ficha del Ciclo Intensivo',
      stats: [
        { value: 1311, label: 'cachimbos' },
        { value: 130, label: 'primeros puestos' },
      ],
    },
  ],
}

export const cartilla = {
  eyebrow: 'Ciclos',
  title: { lead: 'Marca tu', highlight: 'universidad.' },
  body: 'Como en la cartilla del examen: rellena el óvalo y te mostramos los ciclos que tenemos para ti.',
  sheetTitle: 'Hoja de respuestas',
  questions: {
    universidad: '01 · ¿A qué universidad postulas?',
    programa: '02 · ¿O buscas otro programa?',
  },
  resultLabel: 'Tus ciclos',
  pickedLabel: 'Marcaste',
  ciclosCount: (count: number) => `${count} ${count === 1 ? 'ciclo' : 'ciclos'}`,
  jumpCta: 'Ver ciclos',
  detailsCta: 'Ver ficha',
  askCta: 'Consultar por WhatsApp',
  askMessage: (label: string) => `¡Hola! Quiero información de los ciclos ${label} de Aula 20. Vengo desde la web.`,
  ficha: {
    label: 'Ficha del ciclo',
    close: 'Cerrar ficha',
    facts: { inicio: 'Inicio', fin: 'Fin', duracion: 'Duración', modalidad: 'Modalidad' },
    metodologia: 'Metodología',
    horario: 'Horario semanal',
    turno: 'Turno',
    simulacro: 'Simulacro',
    clases: 'Clases',
    beneficios: 'Beneficios',
    logros: 'Logros',
    ask: 'Consultar este ciclo',
    precios: 'Precios (PDF)',
    horarioPdf: 'Horario (PDF)',
    pagina: 'Ficha en aula20.edu.pe',
    askMessage: (ciclo: string, opcion: string) =>
      `¡Hola! Quiero información del ciclo ${ciclo} (${opcion}) de Aula 20. Vengo desde la web.`,
  },
}

/** /nosotros (misión, visión, "¿Por qué elegirnos?") y beneficios de la ficha del Intensivo San Marcos. */
export const metodo = {
  eyebrow: 'Cómo te preparamos',
  title: { lead: 'Metodología', highlight: 'Integral 20.' },
  body: 'Potenciamos tus capacidades académicas y emocionales con exigencia, planificación y acompañamiento constante.',
  niveles: { label: 'Preparación por niveles', items: ['Cero', 'Regular', 'Repaso'] },
  areas: { label: 'Segmentación por áreas', items: ['A', 'BC', 'DE'] },
  tutor: {
    title: 'Un tutor por salón',
    body: 'Te acompaña y orienta durante todo tu proceso académico.',
  },
  docentes: {
    title: 'Plana docente especializada',
    body: 'Más de 20 años de experiencia formando ingresantes.',
    cta: 'Conoce a la plana docente',
    dialog: {
      eyebrow: 'Cómo te preparamos',
      title: 'Plana docente',
      close: 'Cerrar plana docente',
      ramas: 'Ramas',
      cursos: 'Ir al curso',
      docentesCount: (count: number) => `${count} ${count === 1 ? 'docente' : 'docentes'}`,
      fuente: 'Plana en aula20.edu.pe',
    },
  },
  simulacros: {
    title: 'Simulacros tipo examen de admisión',
    body: 'Estructurados para medir tu progreso real.',
    parts: [
      { label: 'Aptitudes', value: '1 hora' },
      { label: 'Conocimientos', value: '2 horas' },
    ],
  },
  extras: [
    'Orientación vocacional',
    'Material exclusivo por ciclo',
    'Biblioteca virtual',
    'Grabaciones de clases virtuales',
    'Sala de estudio exclusiva',
    'Boletín gratuito',
  ],
}

/** /cachimbos: "Los alumnos de nuestras sedes que alcanzaron una vacante. ¡Encuentra a tu compañero y celebra con él!" */
export const cachimbosCopy = {
  eyebrow: 'Cachimbos Aula 20',
  title: { lead: 'Ellos ya', highlight: 'ingresaron.' },
  body: 'Los alumnos de nuestras sedes que alcanzaron una vacante. ¡Encuentra a tu compañero y celebra con él!',
  cta: 'Ver todos los cachimbos',
  pause: 'Pausar el carrusel',
  play: 'Reanudar el carrusel',
  directorio: {
    eyebrow: 'Cachimbos Aula 20',
    title: 'Admisión UNMSM 2027-I',
    close: 'Cerrar cachimbos',
    loading: 'Cargando cachimbos…',
    search: 'Busca por nombre o carrera',
    zona: 'Zona',
    sede: 'Sede',
    carrera: 'Carrera',
    todas: 'Todas',
    todasSedes: 'Todas las sedes',
    todasCarreras: 'Todas las carreras',
    limpiar: 'Quitar filtros',
    count: (n: number) => `${n} ${n === 1 ? 'cachimbo' : 'cachimbos'}`,
    more: (n: number) => `Ver ${n} más`,
    empty: 'No hay cachimbos con esos filtros.',
    fuente: 'Lista en aula20.edu.pe',
  },
}

export const sedesCopy = {
  eyebrow: 'Sedes',
  title: { lead: 'Elige la sede más', highlight: 'cercana.' },
  body: 'Locales en Lima y Callao, y clases virtuales para todo el Perú.',
  mapsCta: 'Cómo llegar',
}

/** /nosotros: "Tu futuro comienza con una decisión." */
export const cierre = {
  title: { lead: 'Tu futuro comienza con una', highlight: 'decisión.' },
  body: 'Escríbenos y un asesor te ayuda a elegir tu ciclo, tu horario y tu sede.',
  cta: 'Matricularme por WhatsApp',
  assurances: ['Matrícula segura', 'Soporte rápido vía WhatsApp', 'Material actualizado'],
}

export const nav = [
  { label: 'Ciclos', href: '#ciclos' },
  { label: 'Cómo te preparamos', href: '#metodo' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Cachimbos', href: '#cachimbos' },
  { label: 'Sedes', href: '#sedes' },
]
