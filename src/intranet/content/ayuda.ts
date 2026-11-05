/**
 * Ayuda y buzón. Las preguntas son las del "Centro de Ayuda" de la intranet actual (2026-11-04); las respuestas
 * explican dónde está cada cosa en esta intranet, sin prometer plazos que la academia no publica.
 * Categorías y estados del buzón: los de la intranet actual.
 */

export const preguntas = [
  {
    pregunta: '¿Cuándo y dónde se publican los resultados de los simulacros?',
    respuesta: 'En Simulacros, cuando la academia termina de calificar. Ahí ves tu nota por bloques, tu puesto y cuánto te falta para tu meta.',
  },
  {
    pregunta: '¿Cómo descargo los solucionarios y materiales de clase?',
    respuesta: 'Las separatas y grabaciones están en Clases, semana por semana. Las claves y el solucionario, en Simulacros, junto al examen.',
  },
  {
    pregunta: '¿Qué debo hacer si mis datos personales están desactualizados?',
    respuesta: 'Pide el cambio en tu sede. Los datos de Mi cuenta solo se pueden leer.',
  },
  {
    pregunta: '¿Cómo puedo cambiar mi contraseña de acceso?',
    respuesta: 'En Mi cuenta, en el apartado Contraseña.',
  },
]

export const categoriasBuzon = ['Nueva función', 'Diseño y uso', 'Velocidad', 'Error', 'Otro'] as const

export const estadosBuzon = {
  enviado: 'Enviado',
  en_revision: 'En revisión',
  planificado: 'Planificado',
  implementado: 'Implementado',
  desestimado: 'Desestimado',
} as const
