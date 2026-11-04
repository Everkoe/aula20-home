import { BookOpenCheck, MessageCircle, Phone, ShieldCheck, Zap } from 'lucide-react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Container } from '../../components/ui/Container'
import { Highlight } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { cierre } from '../../content/home'
import { site } from '../../content/site'
import { buildWhatsAppLink, formatPhone, telHref } from '../../lib/whatsapp'

const enrollHref = buildWhatsAppLink(site.contact.phone, site.whatsappMessages.enroll)
const assuranceIcons = [ShieldCheck, Zap, BookOpenCheck]

/** Capítulo 8 · cierre: la decisión, con WhatsApp (+51) y teléfono en texto, no dentro de una imagen. */
export function ClosingChapter() {
  return (
    <section id="matricula" aria-labelledby="titulo-cierre" className="cuadricula-marca py-20 text-white sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="titulo-cierre" className="text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
            {cierre.title.lead} <Highlight tone="dark">{cierre.title.highlight}</Highlight>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white">{cierre.body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={enrollHref} variant="primary" size="lg" icon={MessageCircle} isExternal>
              {cierre.cta}
            </ButtonLink>
            <a href={telHref(site.contact.phone)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:underline">
              <Phone aria-hidden="true" className="size-4" />
              o llámanos al {formatPhone(site.contact.phone)}
            </a>
          </div>
          <p className="mt-4 text-sm text-white/85">{site.contact.schedule}</p>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold">
            {cierre.assurances.map((text, index) => {
              const Icon = assuranceIcons[index] ?? ShieldCheck
              return (
                <li key={text} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 text-menta" />
                  {text}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
