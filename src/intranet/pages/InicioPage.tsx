import { ArrowRight, CalendarClock, FileCheck2, FileText, PlayCircle } from 'lucide-react'
import { Link } from 'react-router'
import { Highlight } from '../../components/ui/Heading'
import { alumno, notasDemo } from '../content/alumno'
import { cursos } from '../content/cursos'
import type { Grabacion, Semana } from '../content/semanas'
import { simulacros } from '../content/simulacros'
import { formatDia, formatFecha, formatPuntaje, formatRango } from '../lib/fechas'
import { hoy, nombreSemana, semanaEnCurso } from '../lib/semanas'
import { Cuadernillo } from '../ui/Cuadernillo'
import { CursoSello } from '../ui/CursoSello'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { MetaCard } from '../ui/MetaCard'
import { Panel } from '../ui/Panel'
import { SemanaOvalos } from '../ui/SemanaOvalos'

/** Grabaciones que se ven en Inicio; el resto, en Clases. */
const GRABACIONES_EN_INICIO = 6

const linkClass = 'inline-flex min-h-11 items-center gap-1 text-sm font-bold text-acento hover:underline'
const cursoPorId = new Map(cursos.map((c) => [c.id, c]))

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export function InicioPage() {
  const semana = semanaEnCurso
  if (!semana) return null

  return (
    <>
      <title>Inicio · Intranet Aula 20</title>
      <Portada semana={semana} />
      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        <ClasesDeLaSemana semana={semana} />
        <div className="grid gap-6">
          <MetaCard id="inicio-meta" />
          <SimulacroDeLaSemana semana={semana} />
          <p className="flex items-center gap-3 rounded-3xl border border-dashed border-linea px-5 py-4 text-sm text-grafito-600">
            <CalendarClock aria-hidden="true" className="size-5 shrink-0 text-acento" />
            <span>
              <span className="font-semibold text-titulo">Eventos:</span> tu sede no tiene eventos programados.
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

/** Portada de la semana: el azul de la landing, el saludo, la semana en óvalos y dos notas pegadas. */
function Portada({ semana }: { semana: Semana }) {
  const ultima = notasDemo.at(-1)
  const grabaciones = semana.grabaciones.length

  return (
    <section
      aria-labelledby="inicio-titulo"
      className="cuadricula-marca relative overflow-hidden rounded-[2rem] px-6 pt-7 pb-9 text-white sm:px-10 sm:pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pb-11"
    >
      <div>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cielo">
          <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-menta" />
          {alumno.ciclo} {alumno.universidad} · {semana.nombre}
        </p>
        <h1 id="inicio-titulo" tabIndex={-1} className="mt-5 animate-settle text-5xl leading-[0.95] font-extrabold tracking-tight outline-none sm:text-6xl lg:text-7xl">
          Hola,{' '}
          <Highlight tone="dark" isDrawnOnLoad>
            {alumno.nombres}.
          </Highlight>
        </h1>
        <p className="mt-5 text-cielo sm:text-lg">
          {capitalizar(formatDia(hoy))} <span className="text-white/40">·</span> {semana.nombre}, {formatRango(semana.inicio, semana.fin)}
        </p>
        <div className="mt-6">
          <SemanaOvalos semana={semana} hoy={hoy} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-start gap-x-6 gap-y-8 lg:mt-0 lg:w-56 lg:flex-col lg:items-stretch">
        <Link to={`/clases?semana=${semana.id}`} className="nota hoja-clara relative block -rotate-3 rounded-2xl bg-hoja px-5 pt-6 pb-4 text-tinta shadow-xl shadow-black/30">
          <span aria-hidden="true" className="cinta" />
          <span className="block font-display text-5xl leading-none font-extrabold text-acento">{grabaciones}</span>
          <span className="mt-1.5 block text-sm font-bold">{grabaciones === 1 ? 'clase grabada' : 'clases grabadas'}</span>
          <span className="block text-xs font-medium text-grafito-600">en la {semana.nombre}</span>
        </Link>
        {ultima && (
          <Link to="/simulacros" className="nota relative block rotate-2 rounded-2xl bg-menta px-5 py-4 text-tinta shadow-xl shadow-black/30 lg:ml-6">
            <span className="block font-display text-4xl leading-none font-extrabold">{formatPuntaje(ultima.total)}</span>
            <span className="mt-1.5 block text-sm font-bold">tu último simulacro</span>
            <span className="block text-xs font-medium">{nombreSemana(ultima.semanaId)}</span>
          </Link>
        )}
      </div>
    </section>
  )
}

function grabacionKey(g: Grabacion): string {
  return `${g.cursoId}-${g.tema}-${g.isEspecializado ? 'esp' : 'reg'}`
}

function ClasesDeLaSemana({ semana }: { semana: Semana }) {
  const total = semana.grabaciones.length
  const visibles = semana.grabaciones.slice(0, GRABACIONES_EN_INICIO)

  return (
    <Panel id="inicio-clases" title="Clases grabadas" aside={<p className="text-sm text-grafito-600">{semana.nombre}</p>}>
      {total === 0 ? (
        <p className="mt-4 text-grafito-600">Todavía no hay grabaciones de esta semana.</p>
      ) : (
        <ul className="mt-4 divide-y divide-linea">
          {visibles.map((g) => {
            const curso = cursoPorId.get(g.cursoId)
            if (!curso) return null
            return (
              <li key={grabacionKey(g)} className="flex items-center gap-4 py-3.5">
                <CursoSello curso={curso} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-titulo">
                    {curso.nombre}
                    {g.isEspecializado && <Etiqueta>Especializado</Etiqueta>}
                  </p>
                  <p className="text-sm text-grafito-600">{g.tema}</p>
                </div>
                <DemoAction icon={PlayCircle} label="Ver" detail={`la grabación de ${curso.nombre}: ${g.tema}${g.isEspecializado ? ' (especializado)' : ''}`} />
              </li>
            )
          })}
        </ul>
      )}
      <Link to={`/clases?semana=${semana.id}`} className={`${linkClass} mt-2 border-t border-dashed border-linea pt-3`}>
        {total > GRABACIONES_EN_INICIO ? `Ver las ${total} con sus separatas` : 'Ver separatas y grabaciones'}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Panel>
  )
}

function SimulacroDeLaSemana({ semana }: { semana: Semana }) {
  const deEstaSemana = simulacros.find((s) => s.semanaId === semana.id)
  const ultimo = deEstaSemana ?? simulacros.at(-1)
  if (!ultimo) return null
  const nombre = nombreSemana(ultimo.semanaId)

  return (
    <Cuadernillo id="inicio-simulacro" headingLevel="h2" eyebrow="Simulacro" title={nombre} meta={ultimo.fecha ? formatFecha(ultimo.fecha) : 'Fecha no publicada'}>
      {!deEstaSemana && <p className="text-sm text-grafito-600">El de la {semana.nombre} aún no se publica.</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {ultimo.hasClaves && <DemoAction icon={FileCheck2} label="Claves" detail={`del simulacro de la ${nombre}`} />}
        {ultimo.hasSolucionario && <DemoAction icon={FileText} label="Solucionario" detail={`del simulacro de la ${nombre}`} />}
      </div>
      <Link to="/simulacros" className={`${linkClass} mt-2`}>
        Exámenes y notas
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Cuadernillo>
  )
}
