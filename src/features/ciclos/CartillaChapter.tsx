import { ArrowDown } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { opciones, type Opcion } from '../../content/ciclos'
import { cartilla } from '../../content/home'
import { CiclosPanel } from './CiclosPanel'

const groups = ['universidad', 'programa'] as const
const RESULT_ID = 'resultado-cartilla'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

/** Capítulo 3 (pico) · cartilla óptica: se rellena el óvalo y aparecen los ciclos de esa opción. */
export function CartillaChapter({ selectedId, onSelect }: Props) {
  const selected = opciones.find((o) => o.id === selectedId) ?? opciones[0]

  return (
    <section id="ciclos" aria-labelledby="titulo-ciclos" className="cuadricula-clara py-20 sm:py-28">
      <Container>
        <SectionHeading id="titulo-ciclos" eyebrow={cartilla.eyebrow} title={cartilla.title} body={cartilla.body} />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-24 lg:col-span-5">
            <form onSubmit={(event) => event.preventDefault()} className="hoja-clara rounded-3xl border border-linea bg-hoja p-6 shadow-[0_30px_60px_-40px_rgb(0_10_59/0.45)] sm:p-8 dark:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)]">
              <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-linea pb-4">
                <p className="font-display text-lg font-bold text-titulo">{cartilla.sheetTitle}</p>
                <p className="text-xs font-bold tracking-[0.18em] text-grafito-600 uppercase">Aula 20</p>
              </div>
              {groups.map((group) => (
                <fieldset key={group} className="mt-6">
                  <legend className="text-sm font-bold text-grafito">{cartilla.questions[group]}</legend>
                  <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 lg:grid-cols-2">
                    {opciones
                      .filter((opcion) => opcion.group === group)
                      .map((opcion) => (
                        <Bubble key={opcion.id} opcion={opcion} isChecked={opcion.id === selectedId} onSelect={onSelect} />
                      ))}
                  </div>
                </fieldset>
              ))}
              {selected && <PickedRow opcion={selected} />}
            </form>
          </Reveal>

          {selected && (
            <Reveal index={1} className="lg:col-span-7">
              <CiclosPanel key={selected.id} id={RESULT_ID} opcion={selected} />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}

/**
 * Pie de la hoja. En móvil el resultado queda debajo de la cartilla, fuera de pantalla: esta fila confirma
 * lo marcado y lleva hasta los ciclos. En escritorio solo queda el aviso para el lector de pantalla.
 */
function PickedRow({ opcion }: { opcion: Opcion }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 border-t-2 border-dashed border-linea pt-4 lg:mt-0 lg:border-0 lg:pt-0">
      <p role="status" className="text-sm text-grafito lg:sr-only">
        {cartilla.pickedLabel} <span className="font-bold text-titulo">{opcion.label}</span>{' '}
        <span className="whitespace-nowrap">· {cartilla.ciclosCount(opcion.ciclos.length)}</span>
      </p>
      <a href={`#${RESULT_ID}`} className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-bold text-acento hover:underline lg:hidden">
        {cartilla.jumpCta}
        <ArrowDown aria-hidden="true" className="size-4" />
      </a>
    </div>
  )
}

type BubbleProps = {
  opcion: Opcion
  isChecked: boolean
  onSelect: (id: string) => void
}

/** Opción de la cartilla: radio nativo (teclado y lector de pantalla) con el óvalo como dibujo. */
function Bubble({ opcion, isChecked, onSelect }: BubbleProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-grafito transition-colors hover:bg-aula-50">
      <input type="radio" name="opcion" value={opcion.id} checked={isChecked} onChange={() => onSelect(opcion.id)} className="sr-only" />
      <span aria-hidden="true" className="ovalo shrink-0 text-grafito-600" />
      <span className="text-sm leading-tight font-semibold">
        {opcion.label}
        {opcion.isNew && <span className="ml-1.5 inline-block rounded-full bg-menta px-1.5 py-0.5 align-middle text-xs font-bold text-tinta">Nuevo</span>}
      </span>
    </label>
  )
}
