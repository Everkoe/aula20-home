import { opciones, type Bloque, type Dia, type Turno } from '../../content/ciclos'
import { DIAS, minutos } from '../../lib/horario'

/**
 * Horario del turno de la alumna, tomado de la ficha pública del ciclo (aula20.edu.pe/ciclos/San%20Marcos/43,
 * en src/content/ciclos.ts). Si no se encuentra, undefined: Inicio no muestra el widget de hoy.
 */
export function turnoDeAlumna(cicloNombre: string, turnoNombre: string): Turno | undefined {
  const ciclo = opciones.find((o) => o.id === 'san-marcos')?.ciclos.find((c) => c.name === cicloNombre)
  return ciclo?.turnos.find((t) => t.nombre.toLowerCase() === turnoNombre.toLowerCase())
}

export type EstadoHoy =
  | { tipo: 'en-clase'; bloque: Bloque; hoy: Bloque[] }
  | { tipo: 'mas-tarde'; bloque: Bloque; hoy: Bloque[] }
  | { tipo: 'termino'; hoy: Bloque[]; proximo?: Proximo }
  | { tipo: 'libre'; proximo?: Proximo }

export interface Proximo {
  /** "mañana" o el día de la semana ("miércoles"). */
  cuando: string
  bloque: Bloque
}

/** 0 = lunes … 6 = domingo. */
const indiceDia = (fecha: Date) => (fecha.getDay() + 6) % 7
const diaId = (indice: number): Dia => DIAS[indice % 7]?.id ?? 'lun'

function bloquesDelDia(turno: Turno, dia: Dia): Bloque[] {
  return turno.bloques
    .filter((b) => b.dias.includes(dia))
    .sort((a, b) => (a.inicio && b.inicio ? minutos(a.inicio) - minutos(b.inicio) : a.inicio ? -1 : 1))
}

function proximoDia(turno: Turno, desde: number): Proximo | undefined {
  for (let salto = 1; salto <= 7; salto++) {
    const indice = (desde + salto) % 7
    const [bloque] = bloquesDelDia(turno, diaId(indice))
    if (bloque) return { cuando: salto === 1 ? 'mañana' : (DIAS[indice]?.largo ?? ''), bloque }
  }
  return undefined
}

/**
 * Qué toca ahora según el horario del turno. Un bloque sin horas publicadas (el simulacro del domingo
 * del turno noche) no puede estar "en curso": cuenta como pendiente del día.
 */
export function estadoDeHoy(turno: Turno, ahora: Date): EstadoHoy {
  const indice = indiceDia(ahora)
  const hoy = bloquesDelDia(turno, diaId(indice))
  if (hoy.length === 0) return { tipo: 'libre', proximo: proximoDia(turno, indice) }

  const ya = ahora.getHours() * 60 + ahora.getMinutes()
  const enCurso = hoy.find((b) => b.inicio && b.fin && minutos(b.inicio) <= ya && ya < minutos(b.fin))
  if (enCurso) return { tipo: 'en-clase', bloque: enCurso, hoy }
  const siguiente = hoy.find((b) => !b.inicio || minutos(b.inicio) > ya)
  if (siguiente) return { tipo: 'mas-tarde', bloque: siguiente, hoy }
  return { tipo: 'termino', hoy, proximo: proximoDia(turno, indice) }
}
