/** "Alanya Porta, Joaquin" → "Joaquin Alanya Porta" (así publica Aula 20 los nombres de sus cachimbos). */
export function displayName(published: string): string {
  const [surnames, names] = published.split(',').map((part) => part.trim())
  return names ? `${names} ${surnames}` : published.trim()
}

/** Abreviaturas de ordinales según la RAE: 1.er, 2.º, 3.er, 4.º… */
export function ordinalPlace(place: number): string {
  const suffix = place === 1 || place === 3 ? '.er' : '.º'
  return `${place}${suffix} puesto`
}

/** Búsqueda de la dirección en Google Maps (no inventa coordenadas: busca el texto publicado). */
export function mapsSearchHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, Lima, Perú`)}`
}
