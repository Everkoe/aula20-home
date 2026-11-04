import { Lock, Menu, MessageCircle, X } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { nav } from '../../content/home'
import { site } from '../../content/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { ThemeToggle } from './ThemeToggle'
import { useActiveSection } from './useActiveSection'

const enrollHref = buildWhatsAppLink(site.contact.phone, site.whatsappMessages.enroll)
const sectionIds = nav.map((item) => item.href.slice(1))

/** Encabezado fijo. El botón de matrícula se ve en todos los tamaños; Intranet y el modo oscuro pasan al menú en móvil. */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const activeId = useActiveSection(sectionIds)
  const handleToggle = () => setIsOpen((open) => !open)
  const handleNavigate = () => setIsOpen(false)

  /** Escape cierra el menú móvil y devuelve el foco al botón que lo abrió. */
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || !isOpen) return
    setIsOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-50 border-b border-white/15 bg-aula/95 backdrop-blur-md dark:border-white/10 dark:bg-tinta/90"
    >
      <Container className="flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <a href="#inicio" className="shrink-0 rounded-md">
          <img src={site.logo.light} alt="Aula 20 Academia" width={site.logo.width} height={site.logo.height} className="h-8 w-auto sm:h-9" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = item.href === `#${activeId}`
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className="rounded-full px-3 py-2 text-sm font-medium text-cielo transition-colors hover:bg-white/10 hover:text-white aria-[current]:bg-white/15 aria-[current]:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.links.intranet}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-cielo transition-colors hover:text-white sm:inline-flex"
          >
            <Lock aria-hidden="true" className="size-4" />
            Intranet
          </a>
          <ButtonLink href={enrollHref} variant="primary" icon={MessageCircle} isExternal>
            Matricúlate
          </ButtonLink>
          <ThemeToggle className="hidden sm:grid" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="menu-movil"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <div id="menu-movil" className="disclosure lg:hidden" data-open={isOpen}>
        <div>
          <Container className="pt-1 pb-6">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavigate}
                    aria-current={item.href === `#${activeId}` ? 'location' : undefined}
                    className="block border-b border-white/10 py-3.5 font-display text-xl font-bold text-white aria-[current]:text-menta"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-x-8 sm:hidden">
              <a
                href={site.links.intranet}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cielo"
              >
                <Lock aria-hidden="true" className="size-4" />
                Intranet de alumnos
              </a>
              <ThemeToggle isLabelVisible />
            </div>
          </Container>
        </div>
      </div>
    </header>
  )
}
