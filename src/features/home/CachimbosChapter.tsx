import { Users } from 'lucide-react'
import { lazy, Suspense, useRef, useState } from 'react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { HojaDialog } from '../../components/ui/HojaDialog'
import { admisionCachimbos } from '../../content/cachimbos'
import { cachimbosCopy } from '../../content/home'
import { CachimbosFila } from './CachimbosFila'

/** Los 403 cachimbos (datos + hoja) se descargan solo al abrir el directorio. */
const CachimbosDirectorio = lazy(() => import('./CachimbosDirectorio'))

/** Capítulo 6 · cachimbos: primeros puestos en tarjetas que avanzan solas (3 por fila) y el directorio completo. */
export function CachimbosChapter() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isDirectorioOpen, setIsDirectorioOpen] = useState(false)

  const handleOpenDirectorio = () => {
    setIsDirectorioOpen(true)
    dialogRef.current?.showModal()
  }

  return (
    <section id="cachimbos" aria-labelledby="titulo-cachimbos" className="bg-papel py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="titulo-cachimbos"
            eyebrow={`${cachimbosCopy.eyebrow} · ${admisionCachimbos}`}
            title={cachimbosCopy.title}
            body={cachimbosCopy.body}
          />
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={handleOpenDirectorio}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-aula px-5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-aula-700 lg:self-auto"
          >
            <Users aria-hidden="true" className="size-4" />
            {cachimbosCopy.cta}
          </button>
        </div>

        <CachimbosFila />
      </Container>

      <HojaDialog
        ref={dialogRef}
        titleId="cachimbos-directorio-titulo"
        eyebrow={cachimbosCopy.directorio.eyebrow}
        title={cachimbosCopy.directorio.title}
        closeLabel={cachimbosCopy.directorio.close}
        size="wide"
      >
        {isDirectorioOpen && (
          <Suspense fallback={<p className="px-8 py-10 text-grafito-600">{cachimbosCopy.directorio.loading}</p>}>
            <CachimbosDirectorio />
          </Suspense>
        )}
      </HojaDialog>
    </section>
  )
}
