import { MessageCircle, Plus } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { faqCopy, preguntas } from '../../content/faq'
import { site } from '../../content/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'

const askHref = buildWhatsAppLink(site.contact.phone, faqCopy.askMessage)

/**
 * Preguntas frecuentes antes del cierre: resuelve las dudas que frenan la matrícula.
 * <details> nativo (teclado y lector de pantalla sin JavaScript); las mismas preguntas van en schema.org (headTags.ts).
 */
export function PreguntasChapter() {
  return (
    <section id="preguntas" aria-labelledby="titulo-preguntas" className="bg-papel py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading id="titulo-preguntas" eyebrow={faqCopy.eyebrow} title={faqCopy.title} body={faqCopy.body} />
          <Reveal index={1} className="mt-8">
            <ButtonLink href={askHref} variant="solid" icon={MessageCircle} isExternal>
              {faqCopy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-8">
          <div className="divide-y divide-linea rounded-3xl border border-linea bg-hoja">
            {preguntas.map((item) => (
              <details key={item.pregunta} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-bold text-titulo sm:px-8 [&::-webkit-details-marker]:hidden">
                  {item.pregunta}
                  <Plus
                    aria-hidden="true"
                    className="size-5 shrink-0 text-acento transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  />
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-grafito-600 sm:px-8">{item.respuesta}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
