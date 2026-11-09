/**
 * Preguntas frecuentes del home. Cada respuesta sale de lo que Aula 20 publica (revisado el 2026-11-04/09):
 * /nosotros (niveles, áreas, orientación vocacional), las fichas de /ciclos (modalidad, grabaciones, precios en PDF),
 * /sedes y el pie del sitio (teléfono y horario). Lo de la intranet (notas y puesto) sale de la auditoría de
 * intranet.aula20.edu.pe (docs/intranet/auditoria-intranet-2026-11-04.md). Nada de precios ni promesas propias.
 *
 * Los imports llevan .ts porque headTags.ts (cargado también por vite.config.ts) usa estas preguntas para schema.org.
 */
import { opciones } from './ciclos.ts'
import { sedes } from './sedes.ts'
import { site } from './site.ts'
import { formatPhone } from '../lib/whatsapp.ts'

export type Pregunta = { pregunta: string; respuesta: string }

/** "A, B y C". */
export function joinWithY(items: string[]): string {
  return items.length < 2 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} y ${items.at(-1)}`
}

const universidades = joinWithY(opciones.filter((o) => o.group === 'universidad').map((o) => o.label))
const programas = joinWithY(opciones.filter((o) => o.group === 'programa').map((o) => o.label))

export const faqCopy = {
  eyebrow: 'Preguntas frecuentes',
  title: { lead: 'Lo que más nos', highlight: 'preguntan.' },
  body: 'Si tu duda no está aquí, escríbenos y te responde un asesor.',
  cta: 'Preguntar por WhatsApp',
  askMessage: '¡Hola! Tengo una consulta sobre los ciclos de Aula 20. Vengo desde la web.',
}

export const preguntas: Pregunta[] = [
  {
    pregunta: '¿Cómo me matriculo?',
    respuesta: `Escríbenos por WhatsApp al ${formatPhone(site.contact.phone)} y un asesor te ayuda a elegir tu ciclo, tu horario y tu sede. Atendemos de lunes a sábado, de 8:00 a. m. a 7:00 p. m.`,
  },
  {
    pregunta: '¿Cuánto cuesta un ciclo?',
    respuesta:
      'Depende del ciclo y de la modalidad. Cada ciclo tiene su lista de precios: marca tu universidad en la cartilla, abre la ficha del ciclo y descarga el PDF de precios, o pregúntanos por WhatsApp.',
  },
  {
    pregunta: '¿Para qué universidades preparan?',
    respuesta: `Para ${universidades}. También tenemos ${programas}. Marca tu opción en la cartilla para ver sus ciclos.`,
  },
  {
    pregunta: '¿Hay clases virtuales?',
    respuesta:
      'Sí. Hay ciclos presenciales y virtuales, y las clases virtuales quedan grabadas para que las repases. La modalidad de cada ciclo está en su ficha.',
  },
  {
    pregunta: '¿Puedo empezar si estoy desde cero?',
    respuesta: 'Sí. La preparación va por niveles (Cero, Regular y Repaso) y los salones se separan por áreas: A, BC y DE.',
  },
  {
    pregunta: '¿Cómo son los simulacros?',
    respuesta:
      'Tienen la estructura del examen de admisión: una hora de aptitudes y dos de conocimientos. Con su cuenta de la intranet, el alumno ve sus notas y su puesto en el salón y en su área.',
  },
  {
    pregunta: '¿Dónde están las sedes?',
    respuesta: `Tenemos ${sedes.length} sedes en Lima y Callao, con dirección y referencia en la sección Sedes. Si vives lejos, puedes llevar el ciclo virtual desde cualquier parte del Perú.`,
  },
  {
    pregunta: '¿Tienen orientación vocacional?',
    respuesta: 'Sí. Te guiamos en la elección de tu carrera considerando tus aptitudes y tu proyección personal.',
  },
]
