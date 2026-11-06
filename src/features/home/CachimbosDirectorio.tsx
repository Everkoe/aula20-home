import { ArrowUpRight, Search, X } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { ingresantesUnmsm2027I, type Ingresante, type ZonaCachimbo } from '../../content/cachimbosUnmsm2027'
import { cachimbosCopy } from '../../content/home'
import { zonas } from '../../content/sedes'
import { site } from '../../content/site'
import { displayName } from '../../lib/format'

const copy = cachimbosCopy.directorio
/** Tarjetas por tanda: cada pieza pesa ~70 KB y se carga en diferido. */
const PAGE = 24

const ZONAS: { id: ZonaCachimbo; label: string }[] = [...zonas.map((z) => ({ id: z.id, label: z.label.replace('Zona ', '') })), { id: 'virtual', label: 'Virtual' }]

/** "Economía Pública" → "economia publica": buscar sin importar tildes ni mayúsculas. */
const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

/** Índice de búsqueda por cachimbo (se arma una vez al cargar este módulo). */
const indice = new Map(ingresantesUnmsm2027I.map((i) => [i, normalizar(`${i.nombre} ${displayName(i.nombre)} ${i.carrera}`)]))

function contar(lista: Ingresante[], campo: 'sede' | 'carrera'): [string, number][] {
  const conteo = new Map<string, number>()
  for (const i of lista) conteo.set(i[campo], (conteo.get(i[campo]) ?? 0) + 1)
  return [...conteo].sort((a, b) => a[0].localeCompare(b[0], 'es'))
}

/**
 * Los 403 cachimbos de la UNMSM 2027-I por zona, sede y carrera, con buscador. Los filtros se encadenan:
 * la zona acota las sedes y las dos acotan las carreras. Se carga con import dinámico al abrir la hoja.
 */
export default function CachimbosDirectorio() {
  const [query, setQuery] = useState('')
  const [zona, setZona] = useState<ZonaCachimbo | null>(null)
  const [sede, setSede] = useState('')
  const [carrera, setCarrera] = useState('')
  const [visibles, setVisibles] = useState(PAGE)

  const porZona = zona ? ingresantesUnmsm2027I.filter((i) => i.zona === zona) : ingresantesUnmsm2027I
  const porSede = sede ? porZona.filter((i) => i.sede === sede) : porZona
  const porCarrera = carrera ? porSede.filter((i) => i.carrera === carrera) : porSede
  const termino = normalizar(query.trim())
  const resultado = termino ? porCarrera.filter((i) => indice.get(i)?.includes(termino)) : porCarrera
  const hayFiltros = Boolean(query || zona || sede || carrera)

  /** Todo cambio de filtro vuelve a la primera tanda. */
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setVisibles(PAGE)
  }
  const handleZona = (id: ZonaCachimbo | null) => {
    setZona(id)
    setSede('')
    setCarrera('')
    setVisibles(PAGE)
  }
  const handleSede = (event: ChangeEvent<HTMLSelectElement>) => {
    setSede(event.target.value)
    setCarrera('')
    setVisibles(PAGE)
  }
  const handleCarrera = (event: ChangeEvent<HTMLSelectElement>) => {
    setCarrera(event.target.value)
    setVisibles(PAGE)
  }
  const handleReset = () => {
    setQuery('')
    handleZona(null)
  }

  const chip = 'inline-flex min-h-9 items-center gap-1.5 rounded-full border border-linea px-3.5 text-sm font-semibold transition-colors hover:border-acento aria-pressed:border-aula aria-pressed:bg-aula aria-pressed:text-white'
  const field = 'min-h-11 w-full rounded-xl border border-linea bg-hoja px-3 text-sm text-grafito focus:border-acento'

  return (
    <div className="px-6 pt-5 pb-8 sm:px-8">
      <label className="relative block">
        <span className="sr-only">{copy.search}</span>
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-grafito-600" />
        <input type="search" value={query} onChange={handleQuery} placeholder={copy.search} className={`${field} pl-10`} />
      </label>

      <div role="group" aria-label={copy.zona} className="mt-4 flex flex-wrap gap-2">
        <button type="button" aria-pressed={zona === null} onClick={() => handleZona(null)} className={chip}>
          {copy.todas} <span className="opacity-70">{ingresantesUnmsm2027I.length}</span>
        </button>
        {ZONAS.map((z) => (
          <button key={z.id} type="button" aria-pressed={zona === z.id} onClick={() => handleZona(z.id)} className={chip}>
            {z.label} <span className="opacity-70">{ingresantesUnmsm2027I.filter((i) => i.zona === z.id).length}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-grafito-600">{copy.sede}</span>
          <select value={sede} onChange={handleSede} className={`${field} mt-1`}>
            <option value="">{copy.todasSedes}</option>
            {contar(porZona, 'sede').map(([nombre, n]) => (
              <option key={nombre} value={nombre}>
                {nombre} ({n})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-grafito-600">{copy.carrera}</span>
          <select value={carrera} onChange={handleCarrera} className={`${field} mt-1`}>
            <option value="">{copy.todasCarreras}</option>
            {contar(porSede, 'carrera').map(([nombre, n]) => (
              <option key={nombre} value={nombre}>
                {nombre} ({n})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-b-2 border-dashed border-linea pb-3">
        <p role="status" className="font-display text-lg font-bold text-titulo">
          {copy.count(resultado.length)}
        </p>
        {hayFiltros && (
          <button type="button" onClick={handleReset} className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-acento hover:underline">
            <X aria-hidden="true" className="size-4" />
            {copy.limpiar}
          </button>
        )}
      </div>

      {resultado.length === 0 ? (
        <p className="py-10 text-center text-grafito-600">{copy.empty}</p>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {resultado.slice(0, visibles).map((i) => (
            <li key={i.foto}>
              <figure className="h-full overflow-hidden rounded-2xl border border-linea bg-hoja">
                <img src={i.foto} alt="" width={600} height={750} loading="lazy" decoding="async" className="aspect-[4/5] w-full bg-aula-50 object-cover" />
                <figcaption className="p-3">
                  <p className="text-sm leading-snug font-bold text-titulo">{displayName(i.nombre)}</p>
                  <p className="mt-0.5 text-xs leading-snug text-grafito">{i.carrera}</p>
                  <p className="mt-1 text-xs font-semibold text-acento">{i.sede}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {visibles < resultado.length ? (
          <button type="button" onClick={() => setVisibles((n) => n + PAGE)} className="inline-flex min-h-11 items-center rounded-full bg-aula px-5 text-sm font-semibold text-white transition-colors hover:bg-aula-700">
            {copy.more(Math.min(PAGE, resultado.length - visibles))}
          </button>
        ) : (
          <span />
        )}
        <a href={`${site.links.cachimbos}/unmsm/2027-1`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-acento hover:underline">
          {copy.fuente}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  )
}
