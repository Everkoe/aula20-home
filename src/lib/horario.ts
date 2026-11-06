import type { Bloque, Dia, Turno } from '../content/ciclos'

export const DIAS: { id: Dia; corto: string; largo: string }[] = [
  { id: 'lun', corto: 'Lun', largo: 'lunes' },
  { id: 'mar', corto: 'Mar', largo: 'martes' },
  { id: 'mie', corto: 'Mié', largo: 'miércoles' },
  { id: 'jue', corto: 'Jue', largo: 'jueves' },
  { id: 'vie', corto: 'Vie', largo: 'viernes' },
  { id: 'sab', corto: 'Sáb', largo: 'sábado' },
  { id: 'dom', corto: 'Dom', largo: 'domingo' },
]

const ORDEN = DIAS.map((d) => d.id)
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic']

/** "07:30" → [7, 30]. */
function partes(texto: string, separador: string): [number, number, number] {
  const [a = 0, b = 0, c = 0] = texto.split(separador).map(Number)
  return [a, b, c]
}

/** "07:30" → 450 (minutos desde la medianoche). */
export function minutos(hora: string): number {
  const [h, m] = partes(hora, ':')
  return h * 60 + m
}

/** "07:30" → "7:30 a. m." · "16:00" → "4:00 p. m." · "12:30" → "12:30 p. m." (formato que usa el sitio). */
export function formatHora(hora: string): string {
  const [h, m] = partes(hora, ':')
  const sufijo = h < 12 ? 'a. m.' : 'p. m.'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${sufijo}`
}

/** Días en orden, agrupando tramos seguidos de 3 o más: "Lun a vie", "Lun, mié y vie", "Sáb". */
export function diasLabel(dias: readonly Dia[]): string {
  const indices = [...new Set(dias.map((d) => ORDEN.indexOf(d)))].sort((a, b) => a - b)
  const grupos: string[] = []
  let desde = 0
  for (let i = 1; i <= indices.length; i++) {
    if (i < indices.length && indices[i] === (indices[i - 1] ?? -2) + 1) continue
    const tramo = indices.slice(desde, i).map((index) => DIAS[index]?.corto ?? '')
    grupos.push(...(tramo.length >= 3 ? [`${tramo[0]} a ${tramo.at(-1)}`] : tramo))
    desde = i
  }
  const texto = grupos.length > 1 ? `${grupos.slice(0, -1).join(', ')} y ${grupos.at(-1)}` : (grupos[0] ?? '')
  return texto.charAt(0) + texto.slice(1).toLowerCase()
}

/** Texto de un bloque para leer: "7:30 a. m. – 4:00 p. m." o "Sin hora publicada". */
export function horasLabel(bloque: Bloque): string {
  return bloque.inicio && bloque.fin ? `${formatHora(bloque.inicio)} – ${formatHora(bloque.fin)}` : 'Sin hora publicada'
}

/** Horas enteras que abarca el turno (para el eje del calendario). Sin horas publicadas: 7 a 22. */
export function franjaHoras(turno: Turno): { desde: number; hasta: number } {
  const conHora = turno.bloques.filter((b): b is Required<Bloque> => Boolean(b.inicio && b.fin))
  if (conHora.length === 0) return { desde: 7, hasta: 22 }
  const desde = Math.floor(Math.min(...conHora.map((b) => minutos(b.inicio))) / 60)
  const hasta = Math.ceil(Math.max(...conHora.map((b) => minutos(b.fin))) / 60)
  return { desde, hasta: Math.max(hasta, desde + 2) }
}

/** "2026-10-19" → "19 oct 2026". Sin Date: no depende de la zona horaria del navegador. */
export function formatFecha(iso: string): string {
  const [y, m, d] = partes(iso, '-')
  return `${d} ${MESES[m - 1]} ${y}`
}
