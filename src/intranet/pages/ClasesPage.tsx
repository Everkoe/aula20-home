import { FileText, PlayCircle } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { bloques, type Bloque } from '../content/cursos'
import { semanas, type Semana } from '../content/semanas'
import { PageHeader } from '../layout/PageHeader'
import { clasesDeSemana, type FilaClase } from '../lib/ciclo'
import { formatRango } from '../lib/fechas'
import { semanaEnCurso } from '../lib/semanas'
import { colorBloque } from '../ui/bloques'
import { CursoSello } from '../ui/CursoSello'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { OvaloRadio } from '../ui/OvaloRadio'
import { Recuento } from '../ui/Recuento'
import { useFlip } from '../ui/useFlip'

type Filtro = Bloque | 'todos'
type Cuenta = { label: string; value: number }

const ordenBloques = Object.keys(bloques) as Bloque[]

function isBloque(value: string | null): value is Bloque {
  return value !== null && value in bloques
}

/** Semana y bloque viven en la URL (?semana=semana-1&bloque=letras): se pueden compartir y sobreviven a recargar. */
export function ClasesPage() {
  const [params, setParams] = useSearchParams()
  const listaRef = useRef<HTMLDivElement>(null)
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

  // Al filtrar o cambiar de semana, las fichas que siguen se deslizan a su sitio y las nuevas entran con un fundido.
  useFlip(listaRef, `${semana?.id}|${filtro}`)

  if (!semana) return <PageHeader title="Clases" />

  const filas = clasesDeSemana(semana)
  const visibles = filtro === 'todos' ? filas : filas.filter((f) => f.curso.bloque === filtro)
  const grupos = ordenBloques
    .map((bloque) => ({ bloque, filas: visibles.filter((f) => f.curso.bloque === bloque) }))
    .filter((g) => g.filas.length > 0)
  const isEnCurso = semana.id === semanaEnCurso?.id
  const cuenta = contar(visibles)

  return (
    <>
      <PageHeader eyebrow={formatRango(semana.inicio, semana.fin)} title="Clases de la" highlight={`${semana.nombre}.`}>
        Separata y grabación de cada curso, juntas.
      </PageHeader>

      {/* La cartilla de la landing: hoja clara (también en modo oscuro) con los óvalos para elegir semana. */}
      <div className="hoja-clara mt-8 overflow-hidden rounded-3xl border border-linea bg-hoja shadow-[0_30px_60px_-45px_rgb(0_10_59/0.45)]">
        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SemanaPicker semanaId={semana.id} onSelect={(id) => update('semana', id)} />
          <dl className="flex gap-6 border-t border-dashed border-linea pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            {cuenta.map(({ label, value }) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-xs font-semibold text-grafito-600">{label}</dt>
                <dd className="font-display text-3xl leading-none font-extrabold text-titulo">
                  <Recuento value={value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="border-t border-dashed border-linea bg-papel px-5 py-4 sm:px-6">
          <BloqueFilter filtro={filtro} onSelect={(value) => update('bloque', value)} />
        </div>
      </div>
      <p role="status" className="sr-only">
        {resumen(semana, cuenta)}
      </p>

      <div ref={listaRef} className="mt-10 grid gap-10">
        {grupos.map((g) => (
          <section key={g.bloque} aria-labelledby={`bloque-${g.bloque}`}>
            <div data-flip={`grupo-${g.bloque}`} className="flex items-center gap-3">
              <span aria-hidden="true" className={`h-6 w-1.5 rounded-full ${colorBloque[g.bloque].relleno}`} />
              <h2 id={`bloque-${g.bloque}`} className="text-2xl font-extrabold tracking-tight text-titulo">
                {bloques[g.bloque]}
              </h2>
              <span className="text-sm text-grafito-600">{g.filas.length === 1 ? '1 curso' : `${g.filas.length} cursos`}</span>
            </div>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {g.filas.map((fila) => (
                <FichaCurso key={fila.curso.id} fila={fila} isEnCurso={isEnCurso} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

function contar(filas: FilaClase[]): Cuenta[] {
  return [
    { label: filas.length === 1 ? 'curso' : 'cursos', value: filas.length },
    { label: 'separatas', value: filas.filter((f) => f.hasSeparata).length },
    { label: 'grabaciones', value: filas.reduce((n, f) => n + f.grabaciones.length, 0) },
  ]
}

function resumen(semana: Semana, cuenta: Cuenta[]): string {
  return `${cuenta.map((c) => `${c.value} ${c.label}`).join(', ')} en la ${semana.nombre}.`
}

function SemanaPicker({ semanaId, onSelect }: { semanaId: string; onSelect: (id: string) => void }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-bold tracking-[0.2em] text-acento uppercase">Semana</legend>
      <div className="mt-2 grid gap-1 sm:grid-cols-3">
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

/**
 * Filtro por bloque: radios nativos con una pastilla tinta que se desliza al elegido. Los chips pueden ocupar
 * dos líneas en celular, así que la pastilla se coloca midiendo el chip (y se vuelve a medir si cambia el ancho).
 */
function BloqueFilter({ filtro, onSelect }: { filtro: Filtro; onSelect: (value: Filtro) => void }) {
  const grupoRef = useRef<HTMLDivElement>(null)
  const pastillaRef = useRef<HTMLSpanElement>(null)

  // Posición de la pastilla: medir el DOM y escribir el estilo (no es estado de React).
  useLayoutEffect(() => {
    const grupo = grupoRef.current
    const pastilla = pastillaRef.current
    if (!grupo || !pastilla) return
    const colocar = () => {
      const chip = grupo.querySelector<HTMLElement>(`[data-filtro="${filtro}"]`)
      if (!chip) return
      pastilla.style.width = `${chip.offsetWidth}px`
      pastilla.style.height = `${chip.offsetHeight}px`
      pastilla.style.transform = `translate(${chip.offsetLeft}px, ${chip.offsetTop}px)`
    }
    colocar()
    // La primera vez aparece en su sitio; desde ahí, se desliza.
    requestAnimationFrame(() => pastilla.setAttribute('data-lista', ''))
    const observer = new ResizeObserver(colocar)
    observer.observe(grupo)
    return () => observer.disconnect()
  }, [filtro])

  return (
    <fieldset>
      <legend className="sr-only">Cursos de</legend>
      <div ref={grupoRef} className="relative flex flex-wrap gap-2">
        <span ref={pastillaRef} aria-hidden="true" className="pastilla-libre absolute top-0 left-0 rounded-full bg-titulo" />
        {filtros.map(({ value, label }) => (
          <label
            key={value}
            data-filtro={value}
            className="relative inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-linea bg-hoja px-4 text-sm font-semibold text-grafito transition-colors duration-300 hover:border-acento has-checked:border-transparent has-checked:bg-transparent has-checked:text-hoja has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento"
          >
            <input type="radio" name="bloque" value={value} checked={filtro === value} onChange={() => onSelect(value)} className="sr-only" />
            {value !== 'todos' && <span aria-hidden="true" className={`size-2.5 rounded-full ring-1 ring-tinta/15 ${colorBloque[value].enHojaClara}`} />}
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Ficha de un curso: sello, temas grabados (cada uno con su botón) y la separata. */
function FichaCurso({ fila, isEnCurso }: { fila: FilaClase; isEnCurso: boolean }) {
  const { curso, hasSeparata, grabaciones } = fila
  return (
    <li data-flip={curso.id} className="flex gap-4 rounded-3xl border border-linea bg-hoja p-4 sm:p-5">
      <CursoSello curso={curso} size="lg" />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg leading-tight font-bold text-titulo">
          {curso.nombre}
          {curso.sigla && <span className="ml-2 text-xs font-semibold text-grafito-600">{curso.sigla}</span>}
        </h3>

        {grabaciones.length === 0 ? (
          <p className="mt-1 text-sm text-grafito-600">{isEnCurso ? 'Aún sin grabación.' : 'Sin grabación esa semana.'}</p>
        ) : (
          <ul className="mt-2 grid gap-2">
            {grabaciones.map((g) => (
              <li key={`${g.tema}-${g.isEspecializado ? 'esp' : 'reg'}`} className="flex items-start justify-between gap-3">
                <p className="min-w-0 pt-1.5 text-sm text-grafito">
                  {g.tema}
                  {g.isEspecializado && <Etiqueta>Especializado</Etiqueta>}
                </p>
                <DemoAction icon={PlayCircle} label="Ver" detail={`la grabación de ${curso.nombre}: ${g.tema}${g.isEspecializado ? ' (especializado)' : ''}`} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 border-t border-dashed border-linea pt-3">
          {hasSeparata ? (
            <DemoAction icon={FileText} label="Separata" detail={`de ${curso.nombre}`} />
          ) : (
            <p className="text-sm text-grafito-600">Sin separata esta semana.</p>
          )}
        </div>
      </div>
    </li>
  )
}
