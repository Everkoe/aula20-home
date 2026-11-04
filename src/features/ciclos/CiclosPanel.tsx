import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Eyebrow } from '../../components/ui/Heading'
import { cicloDestacado, modalidadCiclos, type Opcion } from '../../content/ciclos'
import { cartilla } from '../../content/home'
import { site } from '../../content/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'

/**
 * Resultado de la cartilla: ciclos reales de la opción marcada, con enlace a su ficha y a WhatsApp.
 * Se vuelve a montar con cada opción, así que el aviso al lector de pantalla lo da la cartilla (role="status").
 */
export function CiclosPanel({ opcion, id }: { opcion: Opcion; id: string }) {
  const askHref = buildWhatsAppLink(site.contact.phone, cartilla.askMessage(opcion.label))
  const hasFeatured = opcion.id === cicloDestacado.opcionId

  return (
    <div id={id} className="cuadricula-oscura animate-rise rounded-3xl p-6 text-white sm:p-8 lg:p-10 dark:ring-1 dark:ring-white/15">
      <Eyebrow tone="dark">{cartilla.resultLabel}</Eyebrow>
      <h3 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{opcion.label}</h3>
      <p className="mt-1 text-cielo">{opcion.detail}</p>

      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {opcion.ciclos.map((ciclo) => (
          <li key={ciclo.href}>
            <a href={ciclo.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4">
              <span>
                <span className="block font-display text-xl font-bold">{ciclo.name}</span>
                <span className="text-sm text-cielo">{modalidadCiclos}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-menta">
                {cartilla.detailsCta}
                <span className="sr-only"> del ciclo {ciclo.name}</span>
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {hasFeatured && <FeaturedCiclo />}

      <ButtonLink href={askHref} variant="primary" icon={MessageCircle} isExternal className="mt-8">
        {cartilla.askCta}
      </ButtonLink>
    </div>
  )
}

/** Ficha del único ciclo que publica fechas y horario en texto (Intensivo San Marcos). */
function FeaturedCiclo() {
  return (
    <article className="hoja-clara mt-8 rounded-2xl bg-hoja p-5 text-titulo sm:p-6">
      <p className="text-xs font-bold tracking-[0.18em] text-acento uppercase">{cartilla.featuredLabel}</p>
      <h4 className="mt-2 font-display text-xl font-bold">
        <a href={cicloDestacado.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {cicloDestacado.name}
        </a>
      </h4>
      <p className="mt-1 text-sm text-grafito-600">{cicloDestacado.audience}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2.5">
        {cicloDestacado.facts.map((fact) => (
          <div key={fact.label} className="rounded-xl bg-papel p-3">
            <dt className="text-xs font-semibold text-grafito-600">{fact.label}</dt>
            <dd className="mt-0.5 text-sm font-bold">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <dl className="mt-4 space-y-1.5 text-sm">
        {cicloDestacado.schedules.map((schedule) => (
          <div key={schedule.label} className="flex flex-wrap gap-x-2">
            <dt className="font-bold">Horario {schedule.label.toLowerCase()}:</dt>
            <dd className="text-grafito-600">{schedule.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
