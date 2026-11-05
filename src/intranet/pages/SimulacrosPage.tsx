import { FileCheck2, FileText, NotebookPen } from 'lucide-react'
import { alumno, notasDemo, type NotaSimulacro } from '../content/alumno'
import { areasUnmsm, partesExamen, simulacros, type AreaUnmsm, type Simulacro } from '../content/simulacros'
import { PageHeader } from '../layout/PageHeader'
import { avanceMeta } from '../lib/ciclo'
import { formatFecha, formatPuntaje } from '../lib/fechas'
import { nombreSemana, semanaEnCurso } from '../lib/semanas'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { MetaBar } from '../ui/MetaBar'
import { Panel } from '../ui/Panel'

const areas = Object.keys(areasUnmsm) as AreaUnmsm[]

export function SimulacrosPage() {
  const { meta } = alumno
  const actual = semanaEnCurso
  const hasSimulacroActual = simulacros.some((s) => s.semanaId === actual?.id)
  const publicados = [...simulacros].reverse()

  return (
    <>
      <PageHeader eyebrow={`Área ${meta.area} · ${areasUnmsm[meta.area]}`} title="Tus" highlight="simulacros." />

      <div className="mt-8 grid gap-6">
        <Panel id="simulacros-notas" title="Notas" aside={<Etiqueta>Ejemplo</Etiqueta>}>
          <p className="mt-1 text-sm text-grafito-600">
            Meta: {meta.carrera}, mínimo {formatPuntaje(meta.puntajeMinimo)} puntos.
          </p>
          {notasDemo.length === 0 ? (
            <p className="mt-4 text-grafito-600">Aún no tienes simulacros calificados.</p>
          ) : (
            <>
              <Avance notas={notasDemo} minimo={meta.puntajeMinimo} />
              <TablaNotas notas={notasDemo} />
            </>
          )}
        </Panel>

        <section aria-labelledby="simulacros-examenes">
          <h2 id="simulacros-examenes" className="text-xl font-extrabold tracking-tight text-titulo">
            Exámenes
          </h2>
          {actual && !hasSimulacroActual && <p className="mt-1 text-sm text-grafito-600">El de la {actual.nombre} aún no se publica.</p>}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {publicados.map((s) => (
              <Examen key={s.semanaId} simulacro={s} area={meta.area} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

/** Una regla por simulacro, con el mínimo de la carrera al final: se ve si la distancia se acorta. */
function Avance({ notas, minimo }: { notas: NotaSimulacro[]; minimo: number }) {
  return (
    <ol className="mt-6 grid gap-5">
      {notas.map((nota) => {
        const semana = nombreSemana(nota.semanaId)
        const { faltan, isAlcanzada } = avanceMeta(nota.total, minimo)
        return (
          <li key={nota.semanaId} className="grid gap-2">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
              <span className="font-bold text-titulo">{semana}</span>
              <span className="text-grafito-600">
                <span className="font-display text-lg font-extrabold text-titulo">{formatPuntaje(nota.total)}</span>
                {isAlcanzada ? ' · pasaste el mínimo' : ` · faltan ${formatPuntaje(faltan)}`}
              </span>
            </p>
            <MetaBar puntaje={nota.total} minimo={minimo} label={`Puntaje de la ${semana} frente al mínimo`} />
          </li>
        )
      })}
    </ol>
  )
}

const columnas = [
  { key: 'hv', label: 'HV', title: 'Habilidad verbal' },
  { key: 'hm', label: 'HM', title: 'Habilidad matemática' },
  { key: 'matematicas', label: 'Matemáticas' },
  { key: 'letras', label: 'Letras' },
  { key: 'ciencias', label: 'Ciencias' },
] as const

function TablaNotas({ notas }: { notas: NotaSimulacro[] }) {
  const filas = [...notas].reverse()
  return (
    <div role="region" aria-labelledby="tabla-notas" tabIndex={0} className="mt-8 overflow-x-auto rounded-2xl border border-linea">
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
                {'title' in c ? <abbr title={c.title} className="no-underline">{c.label}</abbr> : c.label}
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

function ParDeExamenes({ semana, area }: { semana: string; area: AreaUnmsm }) {
  return (
    <>
      {partesExamen.map((parte) => (
        <DemoAction key={parte} icon={NotebookPen} label={parte} detail={`(área ${area}, ${semana})`} />
      ))}
    </>
  )
}

function Examen({ simulacro, area }: { simulacro: Simulacro; area: AreaUnmsm }) {
  const semana = nombreSemana(simulacro.semanaId)
  const otras = areas.filter((a) => a !== area)

  return (
    <article aria-labelledby={`examen-${simulacro.semanaId}`} className="rounded-3xl border border-linea bg-hoja p-5 sm:p-6">
      <h3 id={`examen-${simulacro.semanaId}`} className="text-lg font-extrabold text-titulo">
        {semana}
      </h3>
      <p className="text-sm text-grafito-600">{simulacro.fecha ? formatFecha(simulacro.fecha) : 'Fecha no publicada'}</p>

      <p className="mt-5 text-xs font-bold tracking-[0.2em] text-acento uppercase">Tu área · {area}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <ParDeExamenes semana={semana} area={area} />
        {simulacro.hasClaves && <DemoAction icon={FileCheck2} label="Claves" detail={`del simulacro de la ${semana}`} />}
        {simulacro.hasSolucionario && <DemoAction icon={FileText} label="Solucionario" detail={`del simulacro de la ${semana}`} />}
      </div>

      <details className="group mt-5 border-t border-dashed border-linea pt-3">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-bold text-acento [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Ver las otras áreas</span>
          <span className="hidden group-open:inline">Ocultar las otras áreas</span>
        </summary>
        <ul className="mt-2 grid gap-3">
          {otras.map((a) => (
            <li key={a}>
              <p className="text-sm font-semibold text-titulo">
                {a} · {areasUnmsm[a]}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <ParDeExamenes semana={semana} area={a} />
              </div>
            </li>
          ))}
        </ul>
      </details>
    </article>
  )
}
