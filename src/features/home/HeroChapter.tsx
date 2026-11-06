import { ArrowDown, Clock, MapPin, MessageCircle, MonitorPlay } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Container } from '../../components/ui/Container'
import { Highlight } from '../../components/ui/Heading'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { hero } from '../../content/home'
import { photos } from '../../content/images'
import { sedes } from '../../content/sedes'
import { site } from '../../content/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'

const enrollHref = buildWhatsAppLink(site.contact.phone, site.whatsappMessages.enroll)

const facts = [
  { icon: MapPin, text: `${sedes.length} sedes en Lima y Callao` },
  { icon: MonitorPlay, text: 'Clases virtuales para todo el Perú' },
  { icon: Clock, text: site.contact.schedule },
]

/** Capítulo 1 · portada en el azul del logo: lema como H1, matrícula visible y la foto real como hoja pegada en el cuaderno. */
export function HeroChapter() {
  return (
    <section id="inicio" aria-labelledby="titulo-portada" className="cuadricula-marca relative overflow-hidden text-white">
      <Container className="grid items-center gap-16 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cielo">
            <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-menta" />
            {hero.eyebrow}
          </p>
          <h1
            id="titulo-portada"
            className="mt-6 animate-settle text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl lg:text-[5.75rem]"
          >
            {hero.title.lead} <Highlight tone="dark" isDrawnOnLoad>{hero.title.highlight}</Highlight>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-cielo [animation-delay:120ms] sm:text-xl">{hero.body}</p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:200ms] sm:flex-row">
            <ButtonLink href={enrollHref} variant="primary" size="lg" icon={MessageCircle} isExternal>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#ciclos" variant="ghost-dark" size="lg" icon={ArrowDown}>
              {hero.secondaryCta}
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cielo">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-menta" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <HeroPhoto />
      </Container>
    </section>
  )
}

/** Foto de tutores en su proporción original (5:3, sin recortes) con las cifras como notas pegadas. */
function HeroPhoto() {
  const { main, side } = hero.notes
  return (
    <div className="hoja-clara relative mx-auto w-full max-w-xl animate-rise [animation-delay:250ms] lg:col-span-5">
      <figure className="relative -rotate-2 rounded-[1.75rem] bg-white p-3 shadow-2xl shadow-black/40">
        <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-3 rounded-sm bg-menta/85" />
        <div className="aspect-[5/3] overflow-hidden rounded-[1.25rem] bg-aula-50">
          <PhotoFrame photo={photos.tutores} isPriority sizes="(min-width: 1024px) 40vw, 92vw" />
        </div>
        <figcaption className="pt-3 pr-2 pb-1 pl-44 text-right text-xs font-semibold text-grafito-600 sm:pl-2 sm:text-sm lg:pl-36 xl:pl-2">{hero.photoCaption}</figcaption>
      </figure>

      <div className="absolute -bottom-10 -left-2 rotate-3 rounded-2xl bg-white px-5 py-4 text-tinta shadow-xl shadow-black/30 sm:-left-8">
        <p className="font-display text-5xl leading-none font-extrabold text-aula sm:text-6xl">{main.value}</p>
        <p className="mt-1 text-sm font-bold">{main.label}</p>
        <p className="text-xs font-medium text-grafito-600">{main.detail}</p>
      </div>
      <div className="absolute -top-9 -right-1 -rotate-6 rounded-2xl bg-menta px-4 py-3 text-tinta shadow-xl shadow-black/30 sm:-right-6">
        <p className="font-display text-4xl leading-none font-extrabold">{side.value}</p>
        <p className="mt-0.5 text-xs font-bold">{side.label}</p>
        <p className="text-xs font-medium">{side.detail}</p>
      </div>
    </div>
  )
}
