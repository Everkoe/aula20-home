/**
 * Fotografías del home. PROVISIONALES: son las que Aula 20 ya publica en su CDN.
 * Reemplazar por originales sin texto encima (ver "Material que debe aportar Aula 20" en el brief).
 */

export interface Photo {
  src: string
  /** Descripción real de la foto. Obligatoria por accesibilidad. */
  alt: string
  width: number
  height: number
  /** Punto que debe quedar a la vista al recortar (object-position). */
  focus?: string
}

const CDN = 'https://cdn.aula20.edu.pe/prod'

export const photos = {
  tutores: {
    src: `${CDN}/web/home/tutores_web_new.webp`,
    alt: 'Tres tutores de Aula 20 con el polo azul de la academia; el del centro señala a la cámara',
    width: 1500,
    height: 900,
    focus: '50% 40%',
  },
  docentes: {
    src: `${CDN}/web/home/docentes_web_new.webp`,
    alt: 'Tres docentes de Aula 20 con polo azul oscuro; la docente del centro señala a la cámara',
    width: 1500,
    height: 900,
    focus: '50% 40%',
  },
  sede: {
    src: `${CDN}/web/home/sedes_web_new.webp`,
    alt: 'Fachada de un local de Aula 20 de varios pisos, con letreros de San Marcos, Escolar, Beca 18 y Villarreal',
    width: 1500,
    height: 900,
    focus: '55% 50%',
  },
} satisfies Record<string, Photo>
