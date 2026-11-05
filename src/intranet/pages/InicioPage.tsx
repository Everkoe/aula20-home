import { ArrowRight, FileCheck2, FileText, PlayCircle } from 'lucide-react'
import { Link } from 'react-router'
import { alumno, notasDemo } from '../content/alumno'
import type { Grabacion, Semana } from '../content/semanas'
import { simulacros } from '../content/simulacros'
import { PageHeader } from '../layout/PageHeader'
import { avanceMeta, nombreCurso } from '../lib/ciclo'
import { formatFecha, formatPuntaje, formatRango } from '../lib/fechas'
import { nombreSemana, semanaEnCurso } from '../lib/semanas'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { MetaBar } from '../ui/MetaBar'
import { Panel } from '../ui/Panel'

/** Grabaciones que se ven en Inicio; el resto, en Clases. */
const GRABACIONES_EN_INICIO = 6

const linkClass = 'inline-flex min-h-11 items-center gap-1 text-sm font-bold text-acento hover:underline'

export function InicioPage() {
  const semana = semanaEnCurso
  if (!semana) return <PageHeader title="Hola," highlight={`${alumno.nombres}.`} />

  return (
    <>
      <PageHeader eyebrow={`${semana.nombre} · ${formatRango(semana.inicio, semana.fin)}`} title="Hola," highlight={`${alumno.nombres}.`} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <ClasesDeLaSemana semana={semana} />
        <div className="grid gap-6">
          <TuMeta />
          <SimulacroDeLaSemana semana={semana} />
          <p className="rounded-3xl border border-dashed border-linea px-5 py-4 text-sm text-grafito-600">
            <span className="font-semibold text-titulo">Eventos:</span> tu sede no tiene eventos programados.
          </p>
        </div>
      </div>
    </>
  )
}

function grabacionKey(g: Grabacion): string {
  return `${g.cursoId}-${g.tema}-${g.isEspecializado ? 'esp' : 'reg'}`
}

function ClasesDeLaSemana({ semana }: { semana: Semana }) {
  const total = semana.grabaciones.length
  const visibles = semana.grabaciones.slice(0, GRABACIONES_EN_INICIO)

  return (
    <Panel
      id="inicio-clases"
      title="Clases grabadas"
      aside={<p className="text-sm text-grafito-600">{total === 1 ? '1 clase' : `${total} clases`} en la {semana.nombre}</p>}
    >
      {total === 0 ? (
        <p className="mt-4 text-grafito-600">Todavía no hay grabaciones de esta semana.</p>
      ) : (
        <ul className="mt-5 divide-y divide-linea border-y border-linea">
          {visibles.map((g) => {
            const curso = nombreCurso(g.cursoId)
            return (
              <li key={grabacionKey(g)} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-titulo">
                    {curso}
                    {g.isEspecializado && <Etiqueta>Especializado</Etiqueta>}
                  </p>
                  <p className="text-sm text-grafito-600">{g.tema}</p>
                </div>
                <DemoAction icon={PlayCircle} label="Ver" detail={`la grabación de ${curso}: ${g.tema}${g.isEspecializado ? ' (especializado)' : ''}`} />
              </li>
            )
          })}
        </ul>
      )}
      <Link to={`/clases?semana=${semana.id}`} className={`${linkClass} mt-3`}>
        {total > GRABACIONES_EN_INICIO ? `Ver las ${total} con sus separatas` : 'Ver separatas y grabaciones'}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Panel>
  )
}

/** La pieza oscura de la página: tu último puntaje contra el mínimo de tu carrera. */
function TuMeta() {
  const { meta } = alumno
  const ultima = notasDemo.at(-1)

  return (
    <section aria-labelledby="inicio-meta" className="cuadricula-oscura rounded-3xl p-6 text-cielo ring-1 ring-white/10">
      <p className="text-xs font-bold tracking-[0.2em] uppercase">Tu meta</p>
      <h2 id="inicio-meta" className="mt-2 text-2xl font-extrabold text-white">
        {meta.carrera}
      </h2>
      <p className="text-sm">
        Área {meta.area} · mínimo {formatPuntaje(meta.puntajeMinimo)}
      </p>
      {ultima ? (
        <UltimoPuntaje puntaje={ultima.total} semanaId={ultima.semanaId} minimo={meta.puntajeMinimo} />
      ) : (
        <p className="mt-6 text-sm text-white">Cuando se califique tu primer simulacro, aquí verás cuánto te falta.</p>
      )}
      <Link to="/simulacros" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-menta hover:underline">
        Ver tus notas
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  )
}

function UltimoPuntaje({ puntaje, semanaId, minimo }: { puntaje: number; semanaId: string; minimo: number }) {
  const { faltan, isAlcanzada } = avanceMeta(puntaje, minimo)
  const semana = nombreSemana(semanaId)
  return (
    <>
      <p className="mt-6 font-display text-5xl leading-none font-extrabold text-menta">{formatPuntaje(puntaje)}</p>
      <p className="mt-2 mb-4 text-sm">en el simulacro de la {semana}</p>
      <MetaBar tone="dark" puntaje={puntaje} minimo={minimo} label={`Puntaje de la ${semana} frente al mínimo`} />
      <p className="mt-3 text-sm text-white">
        {isAlcanzada ? 'Pasaste el mínimo de tu carrera.' : `Te faltan ${formatPuntaje(faltan)} puntos.`}
      </p>
    </>
  )
}

function SimulacroDeLaSemana({ semana }: { semana: Semana }) {
  const deEstaSemana = simulacros.find((s) => s.semanaId === semana.id)
  const ultimo = deEstaSemana ?? simulacros.at(-1)
  const fecha = ultimo?.fecha ? formatFecha(ultimo.fecha) : 'fecha no publicada'

  return (
    <Panel id="inicio-simulacro" title="Simulacro">
      {!deEstaSemana && <p className="mt-2 text-sm text-grafito-600">El de la {semana.nombre} aún no se publica.</p>}
      {ultimo && (
        <>
          <p className="mt-4 text-sm font-bold text-titulo">
            {nombreSemana(ultimo.semanaId)} <span className="font-normal text-grafito-600">· {fecha}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ultimo.hasClaves && <DemoAction icon={FileCheck2} label="Claves" detail={`del simulacro de la ${nombreSemana(ultimo.semanaId)}`} />}
            {ultimo.hasSolucionario && <DemoAction icon={FileText} label="Solucionario" detail={`del simulacro de la ${nombreSemana(ultimo.semanaId)}`} />}
          </div>
        </>
      )}
      <Link to="/simulacros" className={`${linkClass} mt-3`}>
        Exámenes y notas
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Panel>
  )
}
