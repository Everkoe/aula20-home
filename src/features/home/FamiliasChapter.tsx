import { FileText, MessageCircle } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { familias } from '../../content/home'
import { site } from '../../content/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'

const askHref = buildWhatsAppLink(site.contact.phone, familias.askMessage)

const legales = [
  { label: 'Términos y condiciones', href: site.links.terms },
  { label: 'Reglamento y privacidad', href: site.links.privacy },
  { label: 'Libro de Reclamaciones', href: site.links.complaints },
]

/**
 * Capítulo para la familia, que suele ser quien paga: qué acompañamiento tiene el alumno y qué puede revisar.
 * La hoja usa la cartilla ya marcada (todas las respuestas rellenas) y sigue clara en modo oscuro.
 */
export function FamiliasChapter() {
  return (
    <section id="familias" aria-labelledby="titulo-familias" className="cuadricula-marca py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="titulo-familias" tone="dark" eyebrow={familias.eyebrow} title={familias.title} body={familias.body} />
          <Reveal index={1} className="mt-8">
            <ButtonLink href={askHref} variant="primary" size="lg" icon={MessageCircle} isExternal>
              {familias.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-7">
          <div className="hoja-clara rounded-3xl border border-linea bg-hoja p-6 text-grafito shadow-[0_30px_60px_-30px_rgb(0_10_59/0.6)] sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-linea pb-4">
              <h3 className="font-display text-lg font-bold text-titulo">{familias.sheetTitle}</h3>
              <p className="text-xs font-bold tracking-[0.18em] text-grafito-600 uppercase">Aula 20</p>
            </div>

            <ul className="mt-2 divide-y divide-linea">
              {familias.items.map((item) => (
                <li key={item.title} className="flex gap-4 py-4">
                  <span aria-hidden="true" className="ovalo ovalo-marcado mt-0.5 shrink-0 text-grafito-600" />
                  <div>
                    <p className="font-bold text-titulo">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-grafito-600">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-2 rounded-2xl bg-aula-50 px-4 py-3 text-sm font-semibold text-titulo">{familias.kids}</p>

            <div className="mt-6 border-t-2 border-dashed border-linea pt-4">
              <p className="text-xs font-bold tracking-[0.18em] text-grafito-600 uppercase">{familias.legalTitle}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {legales.map((doc) => (
                  <li key={doc.label}>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-acento hover:underline"
                    >
                      <FileText aria-hidden="true" className="size-4" />
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
