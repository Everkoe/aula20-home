import { FileCheck2, FileText, NotebookPen, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { alumno, notasDemo, type NotaSimulacro } from '../content/alumno'
import { areasUnmsm, partesExamen, simulacros, type AreaUnmsm, type Simulacro } from '../content/simulacros'
import { PageHeader } from '../layout/PageHeader'
import { cambioEntre } from '../lib/ciclo'
import { formatFecha, formatPuntaje } from '../lib/fechas'
import { nombreSemana, semanaEnCurso } from '../lib/semanas'
import { colorBloque } from '../ui/bloques'
import { Cuadernillo } from '../ui/Cuadernillo'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { MetaCard } from '../ui/MetaCard'
import { Panel } from '../ui/Panel'

const areas = Object.keys(areasUnmsm) as AreaUnmsm[]

/** Bloques de la nota en el orden de la intranet, con el color de su bloque del examen. */
const columnas = [
  { key: 'hv', label: 'HV', title: 'Habilidad verbal', color: colorBloque.habilidades.relleno },
  { key: 'hm', label: 'HM', title: 'Habilidad matemática', color: 'bg-menta-300' },
  { key: 'matematicas', label: 'Matemáticas', color: colorBloque.matematicas.relleno },
  { key: 'letras', label: 'Letras', color: colorBloque.letras.relleno },
  { key: 'ciencias', label: 'Ciencias', color: colorBloque.ciencias.relleno },
] as const

function fechaDe(semanaId: string): string | null {
  const fecha = simulacros.find((s) => s.semanaId === semanaId)?.fecha
  return fecha ? formatFecha(fecha) : null
}

export function SimulacrosPage() {
  const { meta } = alumno
  const actual = semanaEnCurso
  const hasSimulacroActual = simulacros.some((s) => s.semanaId === actual?.id)
  const publicados = [...simulacros].reverse()
  const ultima = notasDemo.at(-1)

  return (
    <>
      <PageHeader eyebrow={`Área ${meta.area} · ${areasUnmsm[meta.area]}`} title="Tus" highlight="simulacros." />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        {ultima ? (
          <Boleta nota={ultima} anterior={notasDemo.at(-2)} />
        ) : (
          <Panel id="simulacros-boleta" title="Tu último resultado">
            <p className="mt-3 text-grafito-600">Aún no tienes simulacros calificados.</p>
          </Panel>
        )}
        <MetaCard id="simulacros-meta" hasLink={false} />
      </div>

      {notasDemo.length > 0 && (
        <Panel id="simulacros-historial" title="Todos tus simulacros" aside={<Etiqueta>Ejemplo</Etiqueta>} className="mt-6">
          <TablaNotas notas={notasDemo} />
        </Panel>
      )}

      <section aria-labelledby="simulacros-examenes" className="mt-12">
        <h2 id="simulacros-examenes" className="text-2xl font-extrabold tracking-tight text-titulo sm:text-3xl">
          Exámenes
        </h2>
        {actual && !hasSimulacroActual && <p className="mt-1 text-grafito-600">El de la {actual.nombre} aún no se publica.</p>}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {publicados.map((s) => (
            <Examen key={s.semanaId} simulacro={s} />
          ))}
        </div>
      </section>
    </>
  )
}

/** Boleta del último simulacro: el total grande, cómo se arma y en qué puesto quedaste. */
function Boleta({ nota, anterior }: { nota: NotaSimulacro; anterior?: NotaSimulacro }) {
  const semana = nombreSemana(nota.semanaId)
  const cambio = anterior ? cambioEntre(anterior, nota) : null
  const fecha = fechaDe(nota.semanaId)

  return (
    <section aria-labelledby="simulacros-boleta" className="min-w-0 rounded-3xl border border-linea bg-hoja p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-acento uppercase">Último resultado</p>
          <h2 id="simulacros-boleta" className="mt-1 text-2xl font-extrabold tracking-tight text-titulo">
            Simulacro de la {semana}
          </h2>
          {fecha && <p className="text-sm text-grafito-600">{fecha}</p>}
        </div>
        <Etiqueta>Ejemplo</Etiqueta>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="font-display text-7xl leading-[0.8] font-extrabold tracking-tight text-titulo">
          {formatPuntaje(nota.total)}
          <span className="ml-2 text-base font-bold tracking-normal text-grafito-600">puntos</span>
        </p>
        {cambio && anterior && cambio.puntos !== 0 && (
          <p className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-menta px-3 py-1 text-sm font-bold text-tinta">
            <TrendingUp aria-hidden="true" className={`size-4 ${cambio.puntos < 0 ? '-scale-y-100' : ''}`} />
            {cambio.puntos > 0 ? '+' : ''}
            {formatPuntaje(cambio.puntos)} desde {nombreSemana(anterior.semanaId)}
          </p>
        )}
      </div>

      <Composicion nota={nota} />

      <div className="mt-7 grid gap-6 border-t border-dashed border-linea pt-6 sm:grid-cols-2">
        <PuestoSalon nota={nota} subio={cambio?.puestosSalon ?? 0} />
        <PuestoArea nota={nota} />
      </div>
    </section>
  )
}

/** Barra apilada: cuánto aporta cada bloque al total (los bloques suman el total). */
function Composicion({ nota }: { nota: NotaSimulacro }) {
  return (
    <div className="mt-7">
      <h3 className="text-sm font-bold text-titulo">Cómo se arma tu puntaje</h3>
      <div aria-hidden="true" className="mt-3 flex h-4 gap-0.5 overflow-hidden rounded-full">
        {columnas.map((c) => (
          <span key={c.key} className={c.color} style={{ width: `${(nota.bloques[c.key] / nota.total) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-5">
        {columnas.map((c) => (
          <div key={c.key} className="flex flex-col-reverse">
            <dt className="flex items-center gap-1.5 text-xs font-semibold text-grafito-600">
              <span aria-hidden="true" className={`size-2.5 rounded-full ring-1 ring-tinta/15 ${c.color}`} />
              {'title' in c ? c.title : c.label}
            </dt>
            <dd className="font-display text-xl font-extrabold text-titulo tabular-nums">{formatPuntaje(nota.bloques[c.key])}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Tu puesto en el salón como una fila de óvalos: uno por alumno, el tuyo marcado. */
function PuestoSalon({ nota, subio }: { nota: NotaSimulacro; subio: number }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-titulo">En tu salón</h3>
      <p className="mt-1 font-display text-3xl font-extrabold text-titulo">
        {nota.puestoSalon}.º <span className="text-base font-bold text-grafito-600">de {nota.alumnosSalon}</span>
      </p>
      <ol aria-hidden="true" className="mt-3 flex flex-wrap gap-1">
        {Array.from({ length: nota.alumnosSalon }, (_, i) => (
          <li
            key={i}
            className={`h-2.5 w-4 rounded-full border-[1.5px] ${i + 1 === nota.puestoSalon ? 'border-acento bg-acento' : 'border-grafito-600/35'}`}
          />
        ))}
      </ol>
      {subio !== 0 && (
        <p className="mt-2 text-sm text-grafito-600">
          {subio > 0 ? `Subiste ${subio}` : `Bajaste ${-subio}`} {Math.abs(subio) === 1 ? 'puesto' : 'puestos'} desde el anterior.
        </p>
      )}
    </div>
  )
}

/** Tu puesto entre todos los del área: una línea del 1.º al último con tu marca. */
function PuestoArea({ nota }: { nota: NotaSimulacro }) {
  const posicion = ((nota.puestoArea - 1) / Math.max(1, nota.alumnosArea - 1)) * 100
  return (
    <div>
      <h3 className="text-sm font-bold text-titulo">En el área {alumno.meta.area}</h3>
      <p className="mt-1 font-display text-3xl font-extrabold text-titulo">
        {nota.puestoArea}.º <span className="text-base font-bold text-grafito-600">de {nota.alumnosArea}</span>
      </p>
      <div aria-hidden="true" className="relative mt-5 h-1 rounded-full bg-aula-50">
        <span className="absolute inset-y-0 left-0 rounded-full bg-acento" style={{ width: `${posicion}%` }} />
        <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-hoja bg-acento shadow" style={{ left: `${posicion}%` }} />
      </div>
      <p aria-hidden="true" className="mt-2 flex justify-between text-[0.65rem] text-grafito-600 tabular-nums">
        <span>1.º</span>
        <span>{nota.alumnosArea}.º</span>
      </p>
    </div>
  )
}

function TablaNotas({ notas }: { notas: NotaSimulacro[] }) {
  const filas = [...notas].reverse()
  return (
    <div role="region" aria-labelledby="tabla-notas" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-linea">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <caption id="tabla-notas" className="sr-only">
          Puntaje por bloque y puesto en cada simulacro
        </caption>
        <thead className="bg-papel text-xs font-bold tracking-wide text-grafito-600 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">
              Simulacro
            </th>
            {columnas.map((c) => (
              <th key={c.key} scope="col" className="px-3 py-3 text-right">
                {'title' in c ? (
                  <abbr title={c.title} className="no-underline">
                    {c.label}
                  </abbr>
                ) : (
                  c.label
                )}
              </th>
            ))}
            <th scope="col" className="px-3 py-3 text-right">
              Total
            </th>
            <th scope="col" className="px-3 py-3 text-right">
              Salón
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Área
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-linea tabular-nums">
          {filas.map((nota) => (
            <tr key={nota.semanaId}>
              <th scope="row" className="px-4 py-3 font-bold whitespace-nowrap text-titulo">
                {nombreSemana(nota.semanaId)}
              </th>
              {columnas.map((c) => (
                <td key={c.key} className="px-3 py-3 text-right">
                  {formatPuntaje(nota.bloques[c.key])}
                </td>
              ))}
              <td className="px-3 py-3 text-right font-bold text-titulo">{formatPuntaje(nota.total)}</td>
              <td className="px-3 py-3 text-right whitespace-nowrap">
                {nota.puestoSalon}.º <span className="text-grafito-600">de {nota.alumnosSalon}</span>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                {nota.puestoArea}.º <span className="text-grafito-600">de {nota.alumnosArea}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Cuadernillo de un simulacro: eliges el área (la tuya, de entrada) y ves sus dos exámenes. */
function Examen({ simulacro }: { simulacro: Simulacro }) {
  const tuArea = alumno.meta.area
  const [area, setArea] = useState<AreaUnmsm>(tuArea)
  const semana = nombreSemana(simulacro.semanaId)
  const titleId = `examen-${simulacro.semanaId}`

  return (
    <Cuadernillo id={titleId} eyebrow="Simulacro" title={semana} meta={simulacro.fecha ? formatFecha(simulacro.fecha) : 'Fecha no publicada'}>
      <fieldset>
        <legend className="text-xs font-bold tracking-[0.2em] text-acento uppercase">Área</legend>
        <div className="mt-2 flex gap-2">
          {areas.map((a) => (
            <label
              key={a}
              className="relative grid size-11 cursor-pointer place-items-center rounded-full border-2 border-linea font-display text-lg font-extrabold text-grafito transition-colors hover:border-acento has-checked:border-titulo has-checked:bg-titulo has-checked:text-hoja has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento"
            >
              <input type="radio" name={`area-${simulacro.semanaId}`} value={a} checked={area === a} onChange={() => setArea(a)} className="sr-only" />
              <span className="sr-only">Área </span>
              {a}
              {a === tuArea && <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-hoja bg-menta" />}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 text-sm text-grafito-600">
        <span className="font-semibold text-titulo">{areasUnmsm[area]}</span>
        {area === tuArea && ' · tu área'}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {partesExamen.map((parte) => (
          <DemoAction key={parte} icon={NotebookPen} label={parte} detail={`(área ${area}, ${semana})`} />
        ))}
      </div>

      {(simulacro.hasClaves || simulacro.hasSolucionario) && (
        <div className="mt-5 border-t border-dashed border-linea pt-4">
          <p className="text-xs font-semibold text-grafito-600">Para todas las áreas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {simulacro.hasClaves && <DemoAction icon={FileCheck2} label="Claves" detail={`del simulacro de la ${semana}`} />}
            {simulacro.hasSolucionario && <DemoAction icon={FileText} label="Solucionario" detail={`del simulacro de la ${semana}`} />}
          </div>
        </div>
      )}
    </Cuadernillo>
  )
}
