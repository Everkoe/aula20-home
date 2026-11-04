/**
 * Cachimbos destacados en el home actual: piezas "Admisión UNMSM 2027-I" del CDN de Aula 20.
 * Nombre: atributo alt publicado. Puesto y carrera: leídos de cada pieza (2026-11-04).
 * Corrección: la pieza de Marco Pio Paredes dice "TRANPORTE"; aquí va "Transporte".
 */
import type { Photo } from './images'

export interface Cachimbo {
  /** Como lo publica Aula 20: "Apellidos, Nombres". */
  nombre: string
  carrera: string
  puesto: 1 | 2
  image: Photo
}

export const admisionCachimbos = 'Admisión UNMSM 2027-I'

const piece = (id: string, nombre: string, carrera: string, puesto: 1 | 2): Cachimbo => ({
  nombre,
  carrera,
  puesto,
  image: {
    src: `https://cdn.aula20.edu.pe/prod/cachimbos/Ingresante-${id}.webp`,
    alt: `Pieza de Aula 20: ${nombre.split(',')[1]?.trim() ?? nombre}, ${puesto === 1 ? 'primer' : 'segundo'} puesto en ${carrera}, ${admisionCachimbos}`,
    width: 600,
    height: 750,
  },
})

export const cachimbos: Cachimbo[] = [
  piece('UXvm4NcB9y2gL5N', 'Alanya Porta, Joaquin', 'Economía', 1),
  piece('5SrpRbyaR2uswOa', 'Arenas Paez, Camila Alejandra', 'Arquitectura y Urbanismo', 1),
  piece('7PTulGICBVSBkMz', 'Bueno Quispe, Alessandra Belén', 'Microbiología y Parasitología', 1),
  piece('xfPSHOu61NS2Njr', 'Canchari Cerazo, Leonard Stiven', 'Ingeniería Geológica', 1),
  piece('V2lU31SGLZlKK0w', 'García Bolívar, Asahel Oswaldo', 'Ingeniería Agroindustrial', 1),
  piece('DKa1A7UhwCOOPpB', 'Toro Llanca, Daniel Alexander', 'Adm. de Negocios Internacionales (SJL)', 1),
  piece('xchkEhJ9s6brrgO', 'Paredes Blas, Marco Pio José', 'Ing. de Transporte y Sistemas', 1),
  piece('3Y2rG83uVDEmTEZ', 'Zavala Mejia, Adrián Fernando', 'Ingeniería Ambiental', 1),
  piece('b1xCde3efHucIVw', 'Fabian Mautino, Jean Franco Tayler', 'Ingeniería Biomédica', 1),
  piece('R2FUNmDlevNQVcp', 'Ureta Quispe, Alexander Giampier', 'Ing. de Telecomunicaciones', 2),
  piece('fi2KfRj13Ym5yFs', 'Zea Vallejo, Rolando Jefferson', 'Química', 2),
  piece('F95tntkcAgyL76c', 'Ramirez Tribeño, Camille', 'Administración de la Gastronomía', 2),
]
