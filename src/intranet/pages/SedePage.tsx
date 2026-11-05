import { ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { sedes } from '../../content/sedes'
import { mapsSearchHref } from '../../lib/format'
import { buildWhatsAppLink, formatPhone } from '../../lib/whatsapp'
import { alumno } from '../content/alumno'
import { contactoSedes, horarioSede } from '../content/sede'
import { PageHeader } from '../layout/PageHeader'
import { Etiqueta } from '../ui/Etiqueta'
import { Panel } from '../ui/Panel'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

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

  const matricula = [
    { label: 'Ciclo', value: `${alumno.ciclo} ${alumno.universidad}` },
    { label: 'Modalidad', value: alumno.modalidad },
    { label: 'Turno', value: alumno.turno },
    { label: 'Salón', value: alumno.salon },
  ]

  return (
    <>
      <PageHeader eyebrow="Tu sede" title="Sede" highlight={`${sede.name}.`} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <Panel id="sede-donde" title="Dónde queda">
          <p className="mt-3 text-lg font-semibold text-titulo">{sede.address}</p>
          {sede.reference && <p className="mt-1 text-grafito-600">{sede.reference}</p>}
          <p className="mt-4 text-sm text-grafito-600">Atención: {horarioSede.toLowerCase()}</p>
          <a
            href={mapsSearchHref(sede.address)}
            {...external}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-linea px-4 text-sm font-semibold text-acento transition-colors hover:border-acento"
          >
            <MapPin aria-hidden="true" className="size-4" />
            Cómo llegar
            <span className="sr-only">(Google Maps, se abre en otra pestaña)</span>
          </a>

          <h3 className="mt-8 text-sm font-bold tracking-[0.2em] text-acento uppercase">WhatsApp de la sede</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {contacto.whatsapp.map((phone) => (
              <li key={phone}>
                <a
                  href={buildWhatsAppLink(phone)}
                  {...external}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-aula px-5 text-sm font-semibold text-white tabular-nums transition-colors hover:bg-aula-700"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {formatPhone(phone)}
                  <span className="sr-only">(WhatsApp, se abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel id="sede-matricula" title="Tu matrícula" aside={<Etiqueta>Ejemplo</Etiqueta>}>
          <dl className="mt-4 divide-y divide-linea">
            {matricula.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-grafito-600">{label}</dt>
                <dd className="text-right font-semibold text-titulo">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>

      <a href="/#sedes" className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-acento hover:underline">
        Ver las demás sedes en la web
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </>
  )
}
