import type { Bloque } from '../content/cursos'

/**
 * Un color de la marca por bloque del examen, el mismo en sellos, filtros y barras:
 * habilidades menta, matemáticas azul, letras tinta (blanco en modo oscuro) y ciencias cielo.
 * `enHojaClara`: dentro de una hoja que sigue clara en modo oscuro, letras se queda en tinta.
 */
export const colorBloque: Record<Bloque, { sello: string; relleno: string; enHojaClara: string }> = {
  habilidades: { sello: 'bg-menta text-tinta', relleno: 'bg-menta', enHojaClara: 'bg-menta' },
  matematicas: { sello: 'bg-aula text-white', relleno: 'bg-aula', enHojaClara: 'bg-aula' },
  letras: { sello: 'bg-tinta text-white dark:bg-white dark:text-tinta', relleno: 'bg-tinta dark:bg-white', enHojaClara: 'bg-tinta' },
  ciencias: { sello: 'bg-cielo text-tinta', relleno: 'bg-cielo', enHojaClara: 'bg-cielo' },
}
