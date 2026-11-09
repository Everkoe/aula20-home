import { nav } from '../../content/home'
import { sedes } from '../../content/sedes'
import { site } from '../../content/site'
import { buildWhatsAppLink, formatPhone } from '../../lib/whatsapp'
import { Container } from '../ui/Container'

type FooterLink = { label: string; href: string; isExternal?: boolean }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Academia',
    links: [
      ...nav.map((item) => ({ label: item.label, href: item.href })),
      { label: 'Para la familia', href: '#familias' },
      { label: 'Preguntas frecuentes', href: '#preguntas' },
      { label: 'Plana docente', href: site.links.docentes, isExternal: true },
      { label: 'Nosotros', href: site.links.nosotros, isExternal: true },
    ],
  },
  {
    title: 'Legales',
    links: [
      { label: 'Términos y condiciones', href: site.links.terms, isExternal: true },
      { label: 'Reglamento y privacidad', href: site.links.privacy, isExternal: true },
      { label: 'Libro de Reclamaciones', href: site.links.complaints, isExternal: true },
    ],
  },
  {
    title: 'Contacto',
    links: [
      // Espacios de no separación: el número no se parte en dos líneas en la columna angosta.
      { label: `WhatsApp ${formatPhone(site.contact.phone).replaceAll(' ', ' ')}`, href: buildWhatsAppLink(site.contact.phone, site.whatsappMessages.info), isExternal: true },
      { label: 'Intranet de alumnos', href: site.links.intranet },
      ...site.social.map((s) => ({ label: s.label, href: s.href, isExternal: true })),
    ],
  },
]

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-tinta text-cielo">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <img src={site.logo.light} alt="Aula 20 Academia" width={site.logo.width} height={site.logo.height} loading="lazy" className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Academia preuniversitaria. {sedes.length} sedes en Lima y Callao y clases virtuales para todo el Perú.
          </p>
          <p className="mt-3 text-sm">{site.contact.schedule}</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="lg:col-span-2 lg:first-of-type:col-start-6">
            <h2 className="text-xs font-bold tracking-[0.18em] text-white uppercase">{column.title}</h2>
            <ul className="mt-4 space-y-1">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-9 items-center text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {currentYear} {site.legalName}. Todos los derechos reservados.</p>
          <p>Propuesta de rediseño · prototipo</p>
        </Container>
      </div>
    </footer>
  )
}
