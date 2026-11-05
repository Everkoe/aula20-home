import { ChevronDown, MessageCircle, Phone } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { site } from '../../content/site'
import { buildWhatsAppLink, formatPhone, telHref } from '../../lib/whatsapp'
import { alumno } from '../content/alumno'
import { categoriasBuzon, estadosBuzon, preguntas } from '../content/ayuda'
import { contactoSedes } from '../content/sede'
import { useDemoNotice } from '../demoNotice'
import { PageHeader } from '../layout/PageHeader'
import { OvaloRadio } from '../ui/OvaloRadio'

const MIN_CARACTERES = 10
const MAX_CARACTERES = 1000

type Categoria = (typeof categoriasBuzon)[number]

type Mensaje = {
  id: string
  categoria: Categoria
  texto: string
  estado: keyof typeof estadosBuzon
}

function isCategoria(value: string): value is Categoria {
  return (categoriasBuzon as readonly string[]).includes(value)
}

export function AyudaPage() {
  return (
    <>
      <PageHeader title="Ayuda y" highlight="buzón.">
        Lo que más se pregunta, a quién escribir y dónde dejar lo que mejorarías.
      </PageHeader>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8">
        <div className="grid min-w-0 gap-10">
          <Preguntas />
          <Buzon />
        </div>
        <Contacto />
      </div>
    </>
  )
}

function Preguntas() {
  return (
    <section aria-labelledby="ayuda-preguntas">
      <h2 id="ayuda-preguntas" className="text-2xl font-extrabold tracking-tight text-titulo sm:text-3xl">
        Preguntas frecuentes
      </h2>
      <ol className="mt-5 divide-y divide-linea overflow-hidden rounded-3xl border border-linea bg-hoja">
        {preguntas.map(({ pregunta, respuesta }, i) => (
          <li key={pregunta}>
            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors hover:bg-papel sm:px-6 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="w-8 shrink-0 font-display text-2xl leading-none font-extrabold text-acento tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 font-semibold text-titulo">{pregunta}</span>
                <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-acento transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <p className="px-5 pb-5 pl-17 text-grafito sm:px-6 sm:pl-18">{respuesta}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** La pieza oscura de la página: con quién hablar, sin buscar números. */
function Contacto() {
  const sede = contactoSedes[alumno.sedeId]
  const whatsapp = sede?.whatsapp[0]

  return (
    <section aria-labelledby="ayuda-contacto" className="cuadricula-oscura rounded-3xl p-6 text-cielo ring-1 ring-white/10 sm:p-7 lg:sticky lg:top-8">
      <p className="text-xs font-bold tracking-[0.2em] uppercase">Contacto</p>
      <h2 id="ayuda-contacto" className="mt-2 text-2xl leading-tight font-extrabold text-white">
        Habla con alguien
      </h2>
      <p className="mt-2 text-sm">Para dudas de pagos, horarios o tu matrícula, mejor que el buzón.</p>

      <ul className="mt-6 grid gap-3">
        {sede && whatsapp && (
          <li>
            <ButtonLink href={buildWhatsAppLink(whatsapp)} variant="primary" icon={MessageCircle} isExternal className="w-full">
              Sede {sede.nombre}
              <span className="sr-only">: {formatPhone(whatsapp)} (WhatsApp, se abre en otra pestaña)</span>
            </ButtonLink>
          </li>
        )}
        <li>
          <ButtonLink href={telHref(site.contact.phone)} variant="ghost-dark" icon={Phone} className="w-full tabular-nums">
            Central · {formatPhone(site.contact.phone)}
          </ButtonLink>
        </li>
      </ul>
      <p className="mt-4 border-t border-dashed border-white/20 pt-4 text-sm">{site.contact.schedule}</p>
    </section>
  )
}

/** Buzón de sugerencias. En la demostración el mensaje queda en esta pantalla: no se envía a ningún lado. */
function Buzon() {
  const notify = useDemoNotice()
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const errorId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const texto = String(new FormData(form).get('texto') ?? '').trim()

    if (!categoria) return setError('Elige de qué trata tu mensaje.')
    if (texto.length < MIN_CARACTERES) return setError(`Escribe al menos ${MIN_CARACTERES} caracteres.`)

    setMensajes((prev) => [{ id: crypto.randomUUID(), categoria, texto, estado: 'enviado' }, ...prev])
    setError(null)
    setCategoria(null)
    form.reset()
    notify('En la demostración tu mensaje se queda en esta pantalla. En la intranet real, llega a la academia.')
  }

  const handleCategoria = (value: string) => {
    if (isCategoria(value)) setCategoria(value)
  }

  // La hoja de la cartilla: clara también en modo oscuro, como el formulario de la landing.
  return (
    <section aria-labelledby="ayuda-buzon" className="hoja-clara min-w-0 overflow-hidden rounded-3xl border border-linea bg-hoja shadow-[0_30px_60px_-45px_rgb(0_10_59/0.45)]">
      <div className="border-b border-dashed border-linea px-5 pt-6 pb-5 sm:px-7">
        <p className="text-xs font-bold tracking-[0.2em] text-acento uppercase">Buzón de sugerencias</p>
        <h2 id="ayuda-buzon" className="mt-2 text-2xl leading-tight font-extrabold text-titulo sm:text-3xl">
          ¿Qué mejorarías?
        </h2>
        <p className="mt-2 text-grafito-600">De la intranet o de las clases. La academia te responde con el estado.</p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="grid gap-6 px-5 py-6 sm:px-7">
        <fieldset aria-describedby={error ? errorId : undefined}>
          <legend className="text-sm font-bold text-titulo">Trata de</legend>
          <div className="mt-2 grid gap-1 sm:grid-cols-3">
            {categoriasBuzon.map((c) => (
              <OvaloRadio key={c} name="categoria" value={c} isChecked={categoria === c} onSelect={handleCategoria}>
                {c}
              </OvaloRadio>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-titulo">Tu mensaje</span>
          <textarea
            name="texto"
            rows={4}
            maxLength={MAX_CARACTERES}
            aria-describedby={error ? errorId : undefined}
            className="rounded-2xl border border-linea bg-papel px-4 py-3 text-grafito placeholder:text-grafito-600 focus:border-acento"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="inline-flex min-h-11 items-center rounded-full bg-aula px-6 text-sm font-semibold text-white transition-colors hover:bg-aula-700">
            Enviar al buzón
          </button>
          <p id={errorId} role="alert" className="text-sm font-semibold text-acento">
            {error}
          </p>
        </div>
      </form>

      {mensajes.length > 0 && <TusMensajes mensajes={mensajes} />}
    </section>
  )
}

function TusMensajes({ mensajes }: { mensajes: Mensaje[] }) {
  return (
    <section aria-labelledby="buzon-enviados" className="border-t border-dashed border-linea bg-papel px-5 py-6 sm:px-7">
      <h3 id="buzon-enviados" className="text-xs font-bold tracking-[0.2em] text-acento uppercase">
        Tus mensajes
      </h3>
      <ul className="mt-3 grid gap-3">
        {mensajes.map((m) => (
          <li key={m.id} className="rounded-2xl border border-linea bg-hoja p-4">
            <p className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-grafito-600">
              {m.categoria}
              <span className="rounded-full bg-aula-50 px-2 py-0.5 text-acento">{estadosBuzon[m.estado]}</span>
            </p>
            <p className="mt-2 text-sm whitespace-pre-line text-grafito">{m.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
