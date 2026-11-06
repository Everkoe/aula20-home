import { ArrowUpRight, CalendarCheck, CalendarDays, Check, Clock, MessageCircle, MonitorSmartphone } from 'lucide-react'
import { useState, type RefObject } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { HojaDialog } from '../../components/ui/HojaDialog'
import type { Ciclo, Opcion } from '../../content/ciclos'
import { cartilla } from '../../content/home'
import { site } from '../../content/site'
import { formatFecha } from '../../lib/horario'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { HorarioSemana } from './HorarioSemana'
import { MetodologiaDonut } from './MetodologiaDonut'

const copy = cartilla.ficha
const numero = new Intl.NumberFormat('es-PE')

type Props = {
  ref: RefObject<HTMLDialogElement | null>
  ciclo: Ciclo | null
  opcion: Opcion
}

/** Ficha completa de un ciclo: fechas, metodología, horario semanal, beneficios y logros. */
export function CicloFicha({ ref, ciclo, opcion }: Props) {
  return (
    <HojaDialog ref={ref} titleId="ficha-titulo" eyebrow={`${copy.label} · ${opcion.label}`} title={ciclo?.name ?? ''} closeLabel={copy.close}>
      {ciclo && <FichaContenido key={ciclo.href} ciclo={ciclo} opcion={opcion} />}
    </HojaDialog>
  )
}

function FichaContenido({ ciclo, opcion }: { ciclo: Ciclo; opcion: Opcion }) {
  const [turnoIndex, setTurnoIndex] = useState(0)
  const turno = ciclo.turnos[turnoIndex] ?? ciclo.turnos[0] ?? { nombre: '', bloques: [] }
  const askHref = buildWhatsAppLink(site.contact.phone, copy.askMessage(ciclo.name, opcion.label))
  const facts = [
    { icon: CalendarDays, label: copy.facts.inicio, value: formatFecha(ciclo.inicio) },
    { icon: CalendarCheck, label: copy.facts.fin, value: formatFecha(ciclo.fin) },
    { icon: Clock, label: copy.facts.duracion, value: `${ciclo.semanas} ${ciclo.semanas === 1 ? 'semana' : 'semanas'}` },
    { icon: MonitorSmartphone, label: copy.facts.modalidad, value: ciclo.modalidad },
  ]

  return (
    <div className="space-y-8 px-6 pt-5 pb-8 sm:px-8">
      <p className="text-grafito-600">{ciclo.para}</p>

      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-papel p-3.5">
            <dt className="flex items-center gap-1.5 text-xs font-semibold text-grafito-600">
              <Icon aria-hidden="true" className="size-3.5 text-acento" />
              {label}
            </dt>
            <dd className="mt-1 font-bold text-titulo">{value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="ficha-metodologia">
        <SectionTitle id="ficha-metodologia">{copy.metodologia}</SectionTitle>
        <div className="mt-3">
          <MetodologiaDonut practico={ciclo.practico} />
        </div>
      </section>

      <section aria-labelledby="ficha-horario">
        <SectionTitle id="ficha-horario">{copy.horario}</SectionTitle>
        {ciclo.turnos.length > 1 && (
          <div role="group" aria-label={copy.turno} className="mt-3 flex flex-wrap gap-2">
            {ciclo.turnos.map((t, index) => (
              <button
                key={t.nombre}
                type="button"
                aria-pressed={index === turnoIndex}
                onClick={() => setTurnoIndex(index)}
                className="min-h-9 rounded-full border border-linea px-3.5 text-sm font-semibold text-grafito transition-colors hover:border-acento aria-pressed:border-aula aria-pressed:bg-aula aria-pressed:text-white"
              >
                {t.nombre}
              </button>
            ))}
          </div>
        )}
        {ciclo.turnos.length === 1 && turno.nombre !== 'Horario' && <p className="mt-1 text-sm font-semibold text-grafito-600">Turno {turno.nombre.toLowerCase()}</p>}
        <div className="mt-4">
          <HorarioSemana turno={turno} />
        </div>
      </section>

      <section aria-labelledby="ficha-beneficios">
        <SectionTitle id="ficha-beneficios">{copy.beneficios}</SectionTitle>
        <ul className="mt-3 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
          {ciclo.beneficios.map((beneficio) => (
            <li key={beneficio} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-aula-50 text-acento">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {beneficio}
            </li>
          ))}
        </ul>
      </section>

      {ciclo.logro && (
        <section aria-labelledby="ficha-logros">
          <SectionTitle id="ficha-logros">{copy.logros}</SectionTitle>
          <p className="mt-1 text-sm text-grafito-600">{ciclo.logro.proceso}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2.5">
            {ciclo.logro.cifras.map((cifra) => (
              <div key={cifra.label} className="flex flex-col-reverse rounded-2xl bg-tinta p-4 text-white">
                <dt className="mt-1 text-sm text-cielo">{cifra.label}</dt>
                <dd className="font-display text-4xl leading-none font-extrabold text-menta tabular-nums">{numero.format(cifra.value)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="flex flex-col gap-4 border-t border-linea pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink href={askHref} variant="solid" icon={MessageCircle} isExternal>
          {copy.ask}
        </ButtonLink>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
          <ExternalLink href={ciclo.preciosPdf}>{copy.precios}</ExternalLink>
          <ExternalLink href={ciclo.horarioPdf}>{copy.horarioPdf}</ExternalLink>
          <ExternalLink href={ciclo.href}>{copy.pagina}</ExternalLink>
        </ul>
      </div>
    </div>
  )
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h3 id={id} className="font-display text-lg font-bold text-titulo">
      {children}
    </h3>
  )
}

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1 text-acento hover:underline">
        {children}
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </li>
  )
}
