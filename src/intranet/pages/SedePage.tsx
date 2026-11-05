import { ArrowRight, CalendarDays, MapPin, MessageCircle } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { sedes, type Sede } from '../../content/sedes'
import { mapsSearchHref } from '../../lib/format'
import { buildWhatsAppLink, formatPhone } from '../../lib/whatsapp'
import { alumno } from '../content/alumno'
import { contactoSedes, horarioSede } from '../content/sede'
import { PageHeader } from '../layout/PageHeader'
import { Etiqueta } from '../ui/Etiqueta'

/** "Av. Venezuela N° 792 - Breña" → calle grande y distrito aparte. */
function partirDireccion(address: string): { calle: string; distrito?: string } {
  const [calle = address, distrito] = address.split(' - ')
  return { calle, distrito }
}

export function SedePage() {
  const contacto = contactoSedes[alumno.sedeId]
  const sede = sedes.find((s) => s.name === contacto?.nombre)

  if (!contacto || !sede) {
    return (
      <PageHeader title="Tu" highlight="sede.">
        No encontramos los datos de tu sede. Escribe a la central para confirmarlos.
      </PageHeader>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Tu sede" title="Sede" highlight={`${sede.name}.`}>
        Dónde queda, cómo escribirle y con qué te matriculaste.
      </PageHeader>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-8">
        <DondeQueda sede={sede} whatsapp={contacto.whatsapp} />
        <Matricula />
      </div>

      <a href="/#sedes" className="mt-8 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-acento hover:underline">
        Ver las demás sedes en la web
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </>
  )
}

function DondeQueda({ sede, whatsapp }: { sede: Sede; whatsapp: string[] }) {
  const { calle, distrito } = partirDireccion(sede.address)

  return (
    <section aria-labelledby="sede-donde" className="cuadricula-oscura min-w-0 rounded-3xl p-6 text-cielo ring-1 ring-white/10 sm:p-8">
      <h2 id="sede-donde" className="text-xs font-bold tracking-[0.2em] uppercase">
        Dónde queda
      </h2>
      <p className="mt-3 max-w-[18ch] font-display text-4xl leading-[1.02] font-extrabold tracking-tight text-white sm:text-5xl">{calle}</p>
      {distrito && <p className="mt-2 text-lg font-semibold text-menta">{distrito}</p>}
      {sede.reference && <p className="mt-3 max-w-prose">{sede.reference}.</p>}

      <div className="mt-6">
        <ButtonLink href={mapsSearchHref(sede.address)} variant="ghost-dark" icon={MapPin} isExternal>
          Cómo llegar
          <span className="sr-only">(Google Maps, se abre en otra pestaña)</span>
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-6 border-t border-dashed border-white/20 pt-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10">
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase">Atención</h3>
          <p className="mt-2 flex items-center gap-2 font-semibold text-white">
            <CalendarDays aria-hidden="true" className="size-4 text-menta" />
            {horarioSede}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase">WhatsApp de la sede</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {whatsapp.map((phone) => (
              <li key={phone}>
                <ButtonLink href={buildWhatsAppLink(phone)} variant="primary" icon={MessageCircle} isExternal className="tabular-nums">
                  {formatPhone(phone)}
                  <span className="sr-only">(WhatsApp, se abre en otra pestaña)</span>
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Tu matrícula como boleta de papel: clara también en modo oscuro, pegada con cinta y con su línea para cortar. */
function Matricula() {
  const detalle = [
    { label: 'Modalidad', value: alumno.modalidad },
    { label: 'Turno', value: alumno.turno },
    { label: 'Salón', value: alumno.salon },
  ]

  return (
    <section aria-labelledby="sede-matricula" className="hoja-clara relative mx-auto w-full max-w-sm lg:mt-6 lg:rotate-1">
      <span aria-hidden="true" className="cinta z-10" />
      <div className="rounded-3xl bg-hoja shadow-[0_30px_60px_-30px_rgb(0_10_59/0.5)] ring-1 ring-linea">
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center justify-between gap-2">
            <h2 id="sede-matricula" className="text-xs font-bold tracking-[0.2em] text-acento uppercase">
              Tu matrícula
            </h2>
            <Etiqueta>Ejemplo</Etiqueta>
          </div>
          <p className="mt-3 font-display text-3xl leading-none font-extrabold text-titulo">{alumno.ciclo}</p>
          <p className="mt-1 font-semibold text-grafito">{alumno.universidad}</p>
        </div>

        {/* Línea de corte con sus muescas. */}
        <div aria-hidden="true" className="relative border-t-2 border-dashed border-linea">
          <span className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-papel ring-1 ring-linea [clip-path:inset(0_0_0_50%)]" />
          <span className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-papel ring-1 ring-linea [clip-path:inset(0_50%_0_0)]" />
        </div>

        <dl className="divide-y divide-dashed divide-linea px-6 pt-2 pb-4">
          {detalle.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
              <dt className="text-grafito-600">{label}</dt>
              <dd className="text-right font-bold text-titulo">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
