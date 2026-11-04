/**
 * Sedes publicadas en aula20.edu.pe/sedes (2026-11-04): 17 locales.
 * Ojo: /nosotros dice "15 sedes" y un banner menciona Chosica y VES, que no están en /sedes.
 * Pendiente que Aula 20 confirme la lista; aquí se muestra solo lo que lista /sedes.
 */

export type ZonaId = 'norte' | 'este' | 'centro' | 'sur'

export interface Sede {
  name: string
  zona: ZonaId
  address: string
  reference?: string
}

export const zonas: { id: ZonaId; label: string }[] = [
  { id: 'norte', label: 'Zona Norte' },
  { id: 'este', label: 'Zona Este' },
  { id: 'centro', label: 'Zona Centro' },
  { id: 'sur', label: 'Zona Sur' },
]

export const sedes: Sede[] = [
  { zona: 'norte', name: 'Los Olivos', address: 'Av. Angélica Gamarra N° 865 - Los Olivos', reference: 'A 4 cuadras del C.C. Plaza Norte, frente al mercado Conzac' },
  { zona: 'norte', name: 'Comas', address: 'Av. Universitaria 6958 - Comas', reference: 'Cerca a la estación Los Ángeles del Metropolitano' },
  { zona: 'norte', name: 'Carabayllo', address: 'Av. Universitaria N° 301 - Carabayllo', reference: 'Al lado del mercado Nueva Imagen' },
  { zona: 'norte', name: 'Ventanilla', address: 'Av. Néstor Gambetta A.A. Cáceres 18 - Ventanilla', reference: 'Frente al supermercado Plaza Vea, ex zona comercial' },
  { zona: 'norte', name: 'Puente Piedra', address: 'Av. Leoncio Prado N° 15122 - Puente Piedra', reference: 'Cerca al óvalo Zapallal' },
  { zona: 'norte', name: 'Ingeniería', address: 'Enrique la Rosa 188 - San Martín de Porres' },
  { zona: 'este', name: 'Santa Anita', address: 'Av. Nicolás Ayllón N° 2929 - Santa Anita', reference: 'Al costado del puente Santa Anita' },
  { zona: 'este', name: 'Ate', address: 'Carretera Central 887 - Ate', reference: 'A una cuadra del instituto Certus' },
  { zona: 'este', name: 'SJL · Pirámide del Sol', address: 'Av. Próceres de la Independencia N° 1027 - San Juan de Lurigancho', reference: 'Frente a la estación Pirámide del Sol' },
  { zona: 'este', name: 'SJL · San Martín', address: 'Av. Próceres de la Independencia 3470 - San Juan de Lurigancho', reference: 'Altura de la estación San Martín' },
  { zona: 'este', name: 'Manchay', address: 'Av. La Molina Mz. C lote 27 Asoc. La Unión - Pachacámac', reference: 'Paradero Las Dunas, 4 cuadras antes de la curva de Manchay' },
  { zona: 'centro', name: 'San Marcos', address: 'Av. República de Venezuela N° 3278 - Lima', reference: 'Cruce de Av. Universitaria con Av. Venezuela' },
  { zona: 'centro', name: 'Breña', address: 'Av. Venezuela N° 792 - Breña', reference: 'A una cuadra del Metro de Alfonso Ugarte' },
  { zona: 'centro', name: 'San Miguel', address: 'Av. Elmer Faucett 288 - San Miguel', reference: 'Al costado del colegio Pamer' },
  { zona: 'sur', name: 'San Juan de Miraflores', address: 'Calle Algarrobos N° 109 - San Juan de Miraflores', reference: 'Al costado de la estación Atocongo' },
  { zona: 'sur', name: 'Villa María del Triunfo', address: 'Av. Pachacútec 2383 - Villa María del Triunfo', reference: 'Frente a la estación Villa María' },
  { zona: 'sur', name: 'Chorrillos', address: 'Av. Alameda Sur 1085 - Chorrillos', reference: 'Cerca al cruce de Av. Alameda Sur y Los Cedros' },
]

export const virtual = {
  label: 'Virtual',
  body: 'Accede a nuestras clases desde cualquier parte del Perú.',
}

export function sedesPorZona(list: Sede[] = sedes): { zona: ZonaId; label: string; sedes: Sede[] }[] {
  return zonas.map((z) => ({ zona: z.id, label: z.label, sedes: list.filter((s) => s.zona === z.id) }))
}
