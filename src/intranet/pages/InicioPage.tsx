import { ArrowRight, BookOpenCheck, CalendarClock, ClipboardList, FileCheck2, FileText, PlayCircle, Trophy, Users } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { CountUp } from '../../components/ui/CountUp'
import { Highlight } from '../../components/ui/Heading'
import type { Bloque as BloqueHorario } from '../../content/ciclos'
import { horasLabel } from '../../lib/horario'
import { alumno, nombrePila, notasDemo } from '../content/alumno'
import { bloques as nombresBloque, cursos, type Bloque } from '../content/cursos'
import { contactoSedes } from '../content/sede'
import type { Grabacion, Semana } from '../content/semanas'
import { simulacros } from '../content/simulacros'
import { avanceMeta, cambioEntre } from '../lib/ciclo'
import { formatDia, formatFecha, formatPuntaje, formatRango, parseIsoDate } from '../lib/fechas'
import { estadoDeHoy, turnoDeAlumna, type EstadoHoy } from '../lib/hoy'
import { hoy, nombreSemana, semanaEnCurso } from '../lib/semanas'
import { colorBloque } from '../ui/bloques'
import { BloquesChart } from '../ui/BloquesChart'
import { Cuadernillo } from '../ui/Cuadernillo'
import { CursoSello } from '../ui/CursoSello'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { Delta, Kpi, Sparkline, Superados } from '../ui/Kpi'
import { MetaCard } from '../ui/MetaCard'
import { Panel } from '../ui/Panel'
import { SemanaOvalos } from '../ui/SemanaOvalos'

/** Grabaciones que se ven en Inicio; el resto, en Clases. */
const GRABACIONES_EN_INICIO = 6

const linkClass = 'inline-flex min-h-11 items-center gap-1 text-sm font-bold text-acento hover:underline'
const cursoPorId = new Map(cursos.map((c) => [c.id, c]))
const ORDEN_BLOQUES: Bloque[] = ['habilidades', 'matematicas', 'letras', 'ciencias']

/** Turno de la alumna según la ficha pública del ciclo; el estado se calcula con la hora de carga, como la semana. */
const turno = turnoDeAlumna(alumno.ciclo, alumno.turno)
const estadoHoy = turno ? estadoDeHoy(turno, hoy) : null

const ultima = notasDemo.at(-1)
const anterior = notasDemo.at(-2)
const cambio = ultima && anterior ? cambioEntre(anterior, ultima) : null
const avance = ultima ? avanceMeta(ultima.total, alumno.meta.puntajeMinimo) : null

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`

export function InicioPage() {
  const semana = semanaEnCurso
  if (!semana) return null

  return (
    <>
      <title>Inicio · Intranet Aula 20</title>
      <Portada semana={semana} />
      <Resumen semana={semana} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        <div className="grid min-w-0 gap-6">
          {notasDemo.length > 0 && <BloquesChart id="inicio-bloques" notas={notasDemo} />}
          <ClasesDeLaSemana semana={semana} />
        </div>
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

/**
 * Portada: el saludo y, en vez de cifras sueltas, una frase que resume la semana con los datos en negrita.
 * A la derecha, qué toca hoy según el horario del turno.
 */
function Portada({ semana }: { semana: Semana }) {
  const isPasada = hoy > parseIsoDate(semana.fin)
  const clases = semana.grabaciones.length
  const separatas = semana.separatas.length

  return (
    <section
      aria-labelledby="inicio-titulo"
      className="cuadricula-marca relative overflow-hidden rounded-[2rem] px-6 pt-7 pb-8 text-white sm:px-10 sm:pt-10 lg:pb-10 xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-center xl:gap-10"
    >
      <div>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cielo">
          <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-menta" />
          {alumno.ciclo} {alumno.universidad} · {semana.nombre}
        </p>
        <h1 id="inicio-titulo" tabIndex={-1} className="mt-5 animate-settle text-5xl leading-[0.95] font-extrabold tracking-tight outline-none sm:text-6xl lg:text-7xl">
          Hola,{' '}
          <Highlight tone="dark" isDrawnOnLoad>
            {nombrePila}.
          </Highlight>
        </h1>
        <p className="mt-5 max-w-2xl text-cielo sm:text-lg [&_strong]:font-bold [&_strong]:text-white">
          {isPasada ? (
            <>
              En la {semana.nombre}, la última publicada, hay <strong>{plural(clases, 'clase grabada', 'clases grabadas')}</strong> y{' '}
              <strong>{plural(separatas, 'separata', 'separatas')}</strong>.
            </>
          ) : (
            <>
              Esta semana tienes <strong>{plural(clases, 'clase grabada', 'clases grabadas')}</strong> y <strong>{plural(separatas, 'separata', 'separatas')}</strong>.
            </>
          )}
          {ultima && avance && (
            <>
              {' '}
              En tu último simulacro sacaste <strong>{formatPuntaje(ultima.total)}</strong>
              {cambio && anterior && cambio.puntos > 0 && (
                <>
                  , <strong>{formatPuntaje(cambio.puntos)} puntos más</strong> que en el {nombreSemana(anterior.semanaId)}
                </>
              )}
              {avance.isAlcanzada ? (
                <>, y ya pasas el mínimo de {alumno.meta.carrera}.</>
              ) : (
                <>
                  , y te faltan <strong>{formatPuntaje(avance.faltan)}</strong> para {alumno.meta.carrera}.
                </>
              )}
            </>
          )}
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-3">
          <SemanaOvalos semana={semana} hoy={hoy} />
          <p className="pb-0.5 text-sm text-cielo">
            {capitalizar(formatDia(hoy))} <span className="text-white/40">·</span> {semana.nombre}, {formatRango(semana.inicio, semana.fin)}
          </p>
        </div>
      </div>

      {estadoHoy && <HoyWidget estado={estadoHoy} />}
    </section>
  )
}

const ETIQUETA_ESTADO: Record<EstadoHoy['tipo'], string> = {
  'en-clase': 'En clase ahora',
  'mas-tarde': 'Hoy tienes clases',
  termino: 'Terminaste por hoy',
  libre: 'Hoy no hay clases',
}

/** Cristal sobre el azul de la portada: el estado de hoy con un punto "en vivo" y lo que viene. */
function HoyWidget({ estado }: { estado: EstadoHoy }) {
  const isEnVivo = estado.tipo === 'en-clase'
  const sede = contactoSedes[alumno.sedeId]?.nombre

  return (
    <aside
      aria-labelledby="inicio-hoy"
      className="entrada mt-8 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:max-w-md xl:mt-0 xl:max-w-none"
      style={{ '--i': 1 } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="inicio-hoy" className="text-xs font-bold tracking-[0.18em] text-cielo uppercase">
          Hoy
        </h2>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${isEnVivo ? 'bg-menta text-tinta' : 'bg-white/10 text-white'}`}>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${isEnVivo ? 'animate-pulse-dot bg-tinta' : 'bg-menta'}`} />
          {ETIQUETA_ESTADO[estado.tipo]}
        </span>
      </div>

      {'hoy' in estado && (
        <ul className="mt-4 space-y-2">
          {estado.hoy.map((bloque) => (
            <BloqueFila key={`${bloque.inicio}-${bloque.fin}`} bloque={bloque} isActual={'bloque' in estado && estado.bloque === bloque} />
          ))}
        </ul>
      )}

      {'proximo' in estado && estado.proximo && (
        <p className="mt-4 border-t border-white/15 pt-3 text-sm text-cielo">
          <span className="font-bold text-white">{capitalizar(estado.proximo.cuando)}:</span> {estado.proximo.bloque.isSimulacro ? 'simulacro, ' : ''}
          {horasLabel(estado.proximo.bloque)}
        </p>
      )}

      <p className="mt-4 text-xs text-cielo/80">
        Turno {alumno.turno.toLowerCase()}
        {sede && ` · Sede ${sede}`}
      </p>
    </aside>
  )
}

function BloqueFila({ bloque, isActual }: { bloque: BloqueHorario; isActual: boolean }) {
  return (
    <li className={`flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 ${isActual ? 'bg-white text-tinta' : 'bg-white/5'}`}>
      <span className="text-sm font-bold">{bloque.isSimulacro ? 'Simulacro' : 'Clases'}</span>
      <span className={`text-sm tabular-nums ${isActual ? 'font-semibold' : 'text-cielo'}`}>{horasLabel(bloque)}</span>
    </li>
  )
}

/** Fila de KPI: cada tarjeta, una idea. Las notas son de ejemplo (lo dice la franja de demostración). */
function Resumen({ semana }: { semana: Semana }) {
  const porBloque = ORDEN_BLOQUES.map((bloque) => ({
    bloque,
    n: semana.grabaciones.filter((g) => cursoPorId.get(g.cursoId)?.bloque === bloque).length,
  }))
  const total = semana.grabaciones.length

  return (
    <section aria-label="Resumen" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {ultima && (
        <Kpi
          index={2}
          icon={Trophy}
          label="Último simulacro"
          value={<CountUp to={ultima.total} decimals={1} isGrouped={false} />}
          unit="puntos"
          delta={cambio && <Delta value={cambio.puntos} unit="pts" format={formatPuntaje} />}
          detail={anterior ? `desde ${nombreSemana(anterior.semanaId)}` : nombreSemana(ultima.semanaId)}
          chart={notasDemo.length > 1 && <Sparkline values={notasDemo.map((n) => n.total)} />}
        />
      )}
      {ultima && (
        <Kpi
          index={3}
          icon={Users}
          label="Puesto en tu salón"
          value={<CountUp to={ultima.puestoSalon} />}
          unit={`de ${ultima.alumnosSalon}`}
          delta={cambio && cambio.puestosSalon !== 0 && <Delta value={cambio.puestosSalon} unit={Math.abs(cambio.puestosSalon) === 1 ? 'puesto' : 'puestos'} />}
          detail={`Superaste a ${ultima.alumnosSalon - ultima.puestoSalon}`}
          chart={<Superados superados={ultima.alumnosSalon - ultima.puestoSalon} total={ultima.alumnosSalon - 1} />}
        />
      )}
      {ultima && (
        <Kpi
          index={4}
          icon={ClipboardList}
          label={`Puesto en el área ${alumno.meta.area}`}
          value={<CountUp to={ultima.puestoArea} />}
          unit={`de ${ultima.alumnosArea}`}
          delta={anterior && anterior.puestoArea !== ultima.puestoArea && <Delta value={anterior.puestoArea - ultima.puestoArea} unit="puestos" />}
          detail={`Superaste a ${ultima.alumnosArea - ultima.puestoArea}`}
          chart={<Superados superados={ultima.alumnosArea - ultima.puestoArea} total={ultima.alumnosArea - 1} />}
        />
      )}
      <Kpi
        index={5}
        icon={BookOpenCheck}
        label="Clases grabadas"
        value={<CountUp to={total} />}
        unit={semana.nombre}
        detail={plural(semana.separatas.length, 'separata', 'separatas')}
        chart={
          total > 0 && (
            <div>
              <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
                {porBloque
                  .filter((b) => b.n > 0)
                  .map((b) => (
                    <span key={b.bloque} style={{ flexGrow: b.n }} className={`crece-x origin-left ${colorBloque[b.bloque].relleno}`} />
                  ))}
              </div>
              <p className="mt-2 flex flex-wrap gap-x-3 text-[0.7rem] text-grafito-600">
                {porBloque
                  .filter((b) => b.n > 0)
                  .map((b) => (
                  <span key={b.bloque}>
                    {nombresBloque[b.bloque]} <b className="text-titulo">{b.n}</b>
                  </span>
                ))}
              </p>
            </div>
          )
        }
      />
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
    <Panel id="inicio-clases" title="Clases grabadas" aside={<p className="text-sm text-grafito-600">{semana.nombre}</p>} className="entrada [--i:5]">
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
