/**
 * Datos generales de Aula 20 tal como los publica aula20.edu.pe (revisado el 2026-11-04).
 * Las imágenes se sirven, de forma provisional, desde el sitio y el CDN de Aula 20.
 */

const SITE = 'https://aula20.edu.pe'

export const site = {
  name: 'Aula 20',
  legalName: 'Academia Aula 20',
  /** Lema del home actual ("TÚ DECIDES A DÓNDE INGRESAR"). */
  tagline: 'Tú decides a dónde ingresar.',
  url: SITE,
  logo: {
    /** Versión blanca, para fondos oscuros. 582 × 200. */
    light: `${SITE}/build/assets/logo-xeVVxgm4.svg`,
    /** Versión azul (#002cff), para fondos claros. Mismas proporciones que la blanca. */
    blue: `${SITE}/build/assets/logoSecond-C-VtVEB5.svg`,
    width: 582,
    height: 200,
  },
  contact: {
    /** Pie del sitio actual. Se muestra como "912 206 403" y se enlaza siempre con +51. */
    phone: '912206403',
    schedule: 'Lun – Sáb · 8:00 a. m. – 7:00 p. m.',
    modality: 'Presencial y virtual',
  },
  whatsappMessages: {
    /** Texto que ya usa el botón "Matrícula" del sitio actual (con mayúscula en "Aula 20"). */
    enroll: '¡Hola, quiero matricularme en Aula 20! Vengo desde la web.',
    info: '¡Hola! Quiero más información. Vengo desde la web.',
  },
  links: {
    /** Nuestra intranet de demostración (src/intranet/). La real es https://intranet.aula20.edu.pe/. */
    intranet: '/intranet/',
    ciclos: `${SITE}/ciclos`,
    cachimbos: `${SITE}/cachimbos`,
    docentes: `${SITE}/docentes`,
    nosotros: `${SITE}/nosotros`,
    sedes: `${SITE}/sedes`,
    terms: `${SITE}/legales/terminos_y_condiciones.pdf`,
    privacy: `${SITE}/legales/reglamento_politica.pdf`,
    complaints: `${SITE}/libroReclamaciones`,
  },
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/AulaveintePeru' },
    { label: 'Instagram', href: 'https://www.instagram.com/aula20academia' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@aula20_academia' },
    { label: 'YouTube', href: 'https://www.youtube.com/@aulaveinte20' },
  ],
} as const
