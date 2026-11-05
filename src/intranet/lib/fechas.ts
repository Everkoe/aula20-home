/** Fechas del contenido (AAAA-MM-DD) leídas como día local: new Date('2026-11-02') sería medianoche UTC y en Lima caería el día anterior. */
export function parseIsoDate(iso: string): Date {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const dia = new Intl.DateTimeFormat('es-PE', { day: 'numeric' })
const diaMes = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long' })
const diaSemana = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })

/** "2 al 8 de noviembre", o "26 de octubre al 1 de noviembre" si cambia el mes. */
export function formatRango(inicio: string, fin: string): string {
  const desde = parseIsoDate(inicio)
  const hasta = parseIsoDate(fin)
  const isSameMonth = desde.getMonth() === hasta.getMonth()
  return `${isSameMonth ? dia.format(desde) : diaMes.format(desde)} al ${diaMes.format(hasta)}`
}

/** "sábado, 31 de octubre" → "sábado 31 de octubre". */
export function formatFecha(iso: string): string {
  return formatDia(parseIsoDate(iso))
}

export function formatDia(fecha: Date): string {
  return diaSemana.format(fecha).replace(',', '')
}

const puntos = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: false })

/** Puntajes con un decimal y sin separador de miles, como los publica San Marcos: 1058.5. */
export function formatPuntaje(value: number): string {
  return puntos.format(value)
}
