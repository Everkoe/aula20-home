import { FileText, PlayCircle } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { bloques, type Bloque } from '../content/cursos'
import { semanas, type Semana } from '../content/semanas'
import { PageHeader } from '../layout/PageHeader'
import { clasesDeSemana, type FilaClase } from '../lib/ciclo'
import { semanaEnCurso } from '../lib/semanas'
import { formatRango } from '../lib/fechas'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { OvaloRadio } from '../ui/OvaloRadio'

type Filtro = Bloque | 'todos'

const ordenBloques = Object.keys(bloques) as Bloque[]

function isBloque(value: string | null): value is Bloque {
  return value !== null && value in bloques
}

/** Semana y bloque viven en la URL (?semana=semana-1&bloque=letras): se pueden compartir y sobreviven a recargar. */
export function ClasesPage() {
  const [params, setParams] = useSearchParams()
  const semana = semanas.find((s) => s.id === params.get('semana')) ?? semanaEnCurso
  const pedido = params.get('bloque')
  const filtro: Filtro = isBloque(pedido) ? pedido : 'todos'

  const update = (key: 'semana' | 'bloque', value: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (key === 'bloque' && value === 'todos') next.delete('bloque')
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }

  if (!semana) return <PageHeader title="Clases" />

  const filas = clasesDeSemana(semana)
  const visibles = filtro === 'todos' ? filas : filas.filter((f) => f.curso.bloque === filtro)
  const grupos = ordenBloques
    .map((bloque) => ({ bloque, filas: visibles.filter((f) => f.curso.bloque === bloque) }))
    .filter((g) => g.filas.length > 0)

  return (
    <>
      <PageHeader eyebrow={formatRango(semana.inicio, semana.fin)} title="Clases de la" highlight={`${semana.nombre}.`}>
        Separata y grabación de cada curso, juntas.
      </PageHeader>

      <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <SemanaPicker semanaId={semana.id} onSelect={(id) => update('semana', id)} />

        <div className="min-w-0">
          <BloqueFilter filtro={filtro} onSelect={(value) => update('bloque', value)} />
          <p role="status" className="mt-4 text-sm text-grafito-600">
            {resumen(semana, visibles)}
          </p>
          <div className="mt-4 grid gap-6">
            {grupos.map((g) => (
              <section key={g.bloque} aria-labelledby={`bloque-${g.bloque}`} className="rounded-3xl border border-linea bg-hoja px-5 py-2 sm:px-7">
                <h2 id={`bloque-${g.bloque}`} className="pt-4 pb-1 text-lg font-extrabold text-titulo">
                  {bloques[g.bloque]}
                </h2>
                <ul className="divide-y divide-linea">
                  {g.filas.map((fila) => (
                    <FilaCurso key={fila.curso.id} fila={fila} isEnCurso={semana.id === semanaEnCurso?.id} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function resumen(semana: Semana, filas: FilaClase[]): string {
  const separatas = filas.filter((f) => f.hasSeparata).length
  const grabaciones = filas.reduce((n, f) => n + f.grabaciones.length, 0)
  const plural = (n: number, una: string, varias: string) => `${n} ${n === 1 ? una : varias}`
  return `${plural(filas.length, 'curso', 'cursos')} · ${plural(separatas, 'separata', 'separatas')} · ${plural(grabaciones, 'grabación', 'grabaciones')} en la ${semana.nombre}`
}

function SemanaPicker({ semanaId, onSelect }: { semanaId: string; onSelect: (id: string) => void }) {
  return (
    <fieldset className="rounded-3xl border border-linea bg-hoja p-3">
      {/* float: así la leyenda va dentro de la hoja y no corta el borde del fieldset. */}
      <legend className="float-left w-full px-2 pt-1 pb-2 text-xs font-bold tracking-[0.2em] text-acento uppercase">Semana</legend>
      <div className="clear-left grid gap-1 sm:grid-cols-3 lg:grid-cols-1">
        {[...semanas].reverse().map((s) => (
          <OvaloRadio key={s.id} name="semana" value={s.id} isChecked={s.id === semanaId} onSelect={onSelect} detail={formatRango(s.inicio, s.fin)}>
            {s.nombre}
          </OvaloRadio>
        ))}
      </div>
    </fieldset>
  )
}

const filtros: { value: Filtro; label: string }[] = [{ value: 'todos', label: 'Todos' }, ...ordenBloques.map((b) => ({ value: b, label: bloques[b] }))]

function BloqueFilter({ filtro, onSelect }: { filtro: Filtro; onSelect: (value: Filtro) => void }) {
  return (
    <fieldset>
      <legend className="sr-only">Cursos de</legend>
      <div className="flex flex-wrap gap-2">
        {filtros.map(({ value, label }) => (
          <label
            key={value}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-linea bg-hoja px-4 text-sm font-semibold text-grafito transition-colors hover:border-acento has-checked:border-titulo has-checked:bg-titulo has-checked:text-papel has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento"
          >
            <input type="radio" name="bloque" value={value} checked={filtro === value} onChange={() => onSelect(value)} className="sr-only" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function FilaCurso({ fila, isEnCurso }: { fila: FilaClase; isEnCurso: boolean }) {
  const { curso, hasSeparata, grabaciones } = fila
  return (
    <li className="grid gap-3 py-4 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-start sm:gap-5">
      <p className="font-bold text-titulo">
        {curso.nombre}
        {curso.sigla && <span className="block text-xs font-semibold text-grafito-600">{curso.sigla}</span>}
      </p>

      <div className="grid gap-2">
        {grabaciones.length === 0 ? (
          <p className="text-sm text-grafito-600">{isEnCurso ? 'Aún sin grabación.' : 'Sin grabación esa semana.'}</p>
        ) : (
          grabaciones.map((g) => (
            <div key={`${g.tema}-${g.isEspecializado ? 'esp' : 'reg'}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="min-w-0 text-sm text-grafito">
                {g.tema}
                {g.isEspecializado && <Etiqueta>Especializado</Etiqueta>}
              </p>
              <DemoAction icon={PlayCircle} label="Grabación" detail={`de ${curso.nombre}: ${g.tema}${g.isEspecializado ? ' (especializado)' : ''}`} />
            </div>
          ))
        )}
      </div>

      <div className="sm:pt-0.5">
        {hasSeparata ? (
          <DemoAction icon={FileText} label="Separata" detail={`de ${curso.nombre}`} />
        ) : (
          <p className="text-sm text-grafito-600">Sin separata</p>
        )}
      </div>
    </li>
  )
}
