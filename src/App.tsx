import { useState } from 'react'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { SocialRail } from './components/layout/SocialRail'
import { DEFAULT_OPCION_ID } from './content/ciclos'
import { CartillaChapter } from './features/ciclos/CartillaChapter'
import { CachimbosChapter } from './features/home/CachimbosChapter'
import { ClosingChapter } from './features/home/ClosingChapter'
import { FamiliasChapter } from './features/home/FamiliasChapter'
import { HeroChapter } from './features/home/HeroChapter'
import { MetodoChapter } from './features/home/MetodoChapter'
import { PreguntasChapter } from './features/home/PreguntasChapter'
import { ResultadosChapter } from './features/home/ResultadosChapter'
import { trackEvent } from './lib/analytics'
import { UniversidadesMarquee } from './features/home/UniversidadesMarquee'
import { SedesChapter } from './features/sedes/SedesChapter'

export function App() {
  // Vive aquí porque la franja de universidades también marca la cartilla.
  const [opcionId, setOpcionId] = useState(DEFAULT_OPCION_ID)
  // Qué universidad interesa: dato para decidir en qué ciclos invertir en anuncios.
  const handleSelectOpcion = (id: string) => {
    setOpcionId(id)
    trackEvent('elegir_universidad', { opcion: id })
  }

  return (
    <>
      <a href="#contenido" className="sr-only z-[60] rounded-full bg-menta px-4 py-2 font-semibold text-tinta focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <HeroChapter />
        <UniversidadesMarquee onPick={handleSelectOpcion} />
        <CartillaChapter selectedId={opcionId} onSelect={handleSelectOpcion} />
        <MetodoChapter />
        <ResultadosChapter />
        <CachimbosChapter />
        <FamiliasChapter />
        <SedesChapter />
        <PreguntasChapter />
        <ClosingChapter />
      </main>
      <SiteFooter />
      <SocialRail />
    </>
  )
}
