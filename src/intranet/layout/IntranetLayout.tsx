import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ThemeToggle } from '../../components/layout/ThemeToggle'
import { site } from '../../content/site'
import { alumno, nombrePila } from '../content/alumno'
import type { Semana } from '../content/semanas'
import { semanaEnCurso } from '../lib/semanas'
import { formatRango } from '../lib/fechas'
import { Avatar } from '../ui/Avatar'
import { navItems } from './navigation'

const nombreCorto = `${nombrePila} ${alumno.apellidos.split(' ')[0] ?? ''}`.trim()

/**
 * Marco de la intranet. Escritorio: barra lateral tinta (la "sala") con la semana y las 5 secciones.
 * Celular: barra superior y barra inferior con las mismas secciones. Mi cuenta tiene una sola entrada: el nombre.
 */
export function IntranetLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  // Al cambiar de sección: arriba de la página y foco en el h1, para que el lector de pantalla anuncie dónde está.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    mainRef.current?.querySelector('h1')?.focus()
  }, [pathname])

  return (
    <>
      <a href="#contenido" className="sr-only z-[70] rounded-full bg-menta px-4 py-2 font-semibold text-tinta focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Saltar al contenido
      </a>
      <div className="min-h-svh bg-papel lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        <Sidebar semana={semanaEnCurso} />
        <MobileTopBar />
        <main id="contenido" ref={mainRef} className="cuadricula-clara min-w-0 pb-28 lg:pb-16">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-dashed border-linea px-4 py-2 text-center text-xs text-grafito-600">
            <span className="rounded-full bg-menta px-2 py-0.5 font-bold text-tinta">Demostración</span>
            Las notas y el código de alumna son de ejemplo; cursos, temas y sede salen de la intranet actual.
          </p>
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-10 lg:pt-12">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
    </>
  )
}

function Sidebar({ semana }: { semana?: Semana }) {
  return (
    <aside className="cuadricula-oscura sticky top-0 hidden h-svh flex-col text-cielo lg:flex">
      <div className="px-6 pt-7">
        <Link to="/inicio" className="inline-block rounded-md">
          <img src={site.logo.light} alt="Aula 20, intranet" width={site.logo.width} height={site.logo.height} className="h-9 w-auto" />
        </Link>
        {semana && (
          <div className="mt-9">
            <p className="text-xs font-bold tracking-[0.2em] text-cielo/80 uppercase">
              {alumno.ciclo} {alumno.universidad}
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-white">{semana.nombre}</p>
            <p className="text-sm">{formatRango(semana.inicio, semana.fin)}</p>
          </div>
        )}
      </div>

      <nav aria-label="Secciones" className="mt-8 px-3">
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className="relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-menta before:opacity-0 hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white aria-[current=page]:before:opacity-100"
              >
                <Icon aria-hidden="true" className="size-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex items-center gap-2 border-t border-white/10 p-3">
        <NavLink to="/cuenta" className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/5 aria-[current=page]:bg-white/10">
          <Avatar className="size-10 text-sm" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{nombreCorto}</span>
            <span className="block text-xs">Mi cuenta</span>
          </span>
        </NavLink>
        <ThemeToggle />
      </div>
    </aside>
  )
}

function MobileTopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 bg-tinta px-4 lg:hidden">
      <Link to="/inicio" className="mr-auto rounded-md">
        <img src={site.logo.light} alt="Aula 20, intranet" width={site.logo.width} height={site.logo.height} className="h-8 w-auto" />
      </Link>
      <ThemeToggle />
      <NavLink to="/cuenta" aria-label="Mi cuenta" className="grid size-11 place-items-center rounded-full">
        <Avatar className="size-9 text-xs" />
      </NavLink>
    </header>
  )
}

function BottomNav() {
  return (
    <nav aria-label="Secciones" className="sala fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-tinta pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="grid grid-cols-5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className="flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold text-cielo transition-colors aria-[current=page]:text-menta"
            >
              <Icon aria-hidden="true" className="size-5" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
