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

/** Palabras que el listado de cachimbos publica sin tilde (aula20.edu.pe/cachimbos), con su forma correcta. */
const TILDES: Record<string, string> = {
  administracion: 'Administración', anatomia: 'Anatomía', antropologia: 'Antropología', arqueologia: 'Arqueología',
  auditoria: 'Auditoría', bibliotecologia: 'Bibliotecología', biologicas: 'Biológicas', biomedica: 'Biomédica',
  bioquimica: 'Bioquímica', biotecnologia: 'Biotecnología', cientifica: 'Científica', clinico: 'Clínico', comunicacion: 'Comunicación',
  computacion: 'Computación', conservacion: 'Conservación', criminalistica: 'Criminalística', economia: 'Economía',
  educacion: 'Educación', enfermeria: 'Enfermería', electrica: 'Eléctrica', electronica: 'Electrónica', estadistica: 'Estadística',
  filosofia: 'Filosofía', fisica: 'Física', gastronomia: 'Gastronomía', genetica: 'Genética', geofisica: 'Geofísica',
  geografia: 'Geografía', geografica: 'Geográfica', geologica: 'Geológica', gestion: 'Gestión', informacion: 'Información',
  ingenieria: 'Ingeniería', interpretacion: 'Interpretación', investigacion: 'Investigación', linguistica: 'Lingüística',
  logistica: 'Logística', maritima: 'Marítima', matematica: 'Matemática', mecanica: 'Mecánica', mecatronica: 'Mecatrónica',
  med: 'Méd.', metalurgica: 'Metalúrgica', microbiologia: 'Microbiología', nutricion: 'Nutrición', odontologia: 'Odontología',
  parasitologia: 'Parasitología', patologica: 'Patológica', politica: 'Política', psicologia: 'Psicología', publica: 'Pública',
  publicas: 'Públicas', publico: 'Público', quimica: 'Química', rehabilitacion: 'Rehabilitación', restauracion: 'Restauración',
  sociologia: 'Sociología', sumistro: 'Suministro', toxicologia: 'Toxicología', traduccion: 'Traducción',
}
const MINUSCULAS = new Set(['de', 'del', 'el', 'la', 'las', 'los', 'y', 'e', 'en'])

/**
 * "Ingenieria De Sistemas - S.J.L" → "Ingeniería de Sistemas (SJL)". Solo pone tildes, minúsculas en los
 * conectores y la filial entre paréntesis; corrige "Sumistro" → "Suministro". Sin carrera: "Carrera no publicada".
 */
export function formatCarrera(published: string | null): string {
  if (!published?.trim()) return 'Carrera no publicada'
  const [base = '', filial] = published.split(/\s+-\s+/)
  const words = base
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const key = word.toLowerCase().replace(/\.$/, '')
      if (index > 0 && MINUSCULAS.has(key)) return key
      return TILDES[key] ?? word.charAt(0).toUpperCase() + word.slice(1)
    })
  const sufijo = filial ? ` (${filial.replace(/\./g, '').toUpperCase() === 'SJL' ? 'SJL' : filial.trim()})` : ''
  return `${words.join(' ')}${sufijo}`
}
