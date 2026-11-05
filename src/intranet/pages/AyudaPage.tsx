import { ChevronDown, MessageCircle, Phone } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { site } from '../../content/site'
import { buildWhatsAppLink, formatPhone, telHref } from '../../lib/whatsapp'
import { alumno } from '../content/alumno'
import { categoriasBuzon, estadosBuzon, preguntas } from '../content/ayuda'
import { contactoSedes } from '../content/sede'
import { useDemoNotice } from '../demoNotice'
import { PageHeader } from '../layout/PageHeader'
import { OvaloRadio } from '../ui/OvaloRadio'
import { Panel } from '../ui/Panel'

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
      <PageHeader title="Ayuda y" highlight="buzón." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="grid gap-6">
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
    <Panel id="ayuda-preguntas" title="Preguntas frecuentes">
      <div className="mt-4 divide-y divide-linea border-y border-linea">
        {preguntas.map(({ pregunta, respuesta }) => (
          <details key={pregunta} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-titulo [&::-webkit-details-marker]:hidden">
              {pregunta}
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-acento transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="pb-4 text-grafito-600">{respuesta}</p>
          </details>
        ))}
      </div>
    </Panel>
  )
}

function Contacto() {
  const sede = contactoSedes[alumno.sedeId]
  const whatsapp = sede?.whatsapp[0]
  const linkClass = 'flex min-h-11 items-center gap-3 rounded-2xl text-sm font-semibold text-acento hover:underline'

  return (
    <Panel id="ayuda-contacto" title="Habla con alguien">
      <ul className="mt-4 grid gap-3">
        {sede && whatsapp && (
          <li>
            <a href={buildWhatsAppLink(whatsapp)} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <MessageCircle aria-hidden="true" className="size-5 shrink-0" />
              <span>
                Sede {sede.nombre} · <span className="tabular-nums">{formatPhone(whatsapp)}</span>
                <span className="sr-only"> (WhatsApp, se abre en otra pestaña)</span>
              </span>
            </a>
          </li>
        )}
        <li>
          <a href={telHref(site.contact.phone)} className={linkClass}>
            <Phone aria-hidden="true" className="size-5 shrink-0" />
            <span>
              Central · <span className="tabular-nums">{formatPhone(site.contact.phone)}</span>
            </span>
          </a>
          <p className="mt-1 pl-8 text-xs text-grafito-600">{site.contact.schedule}</p>
        </li>
      </ul>
    </Panel>
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

  return (
    <Panel id="ayuda-buzon" title="Buzón de sugerencias">
      <p className="mt-1 text-sm text-grafito-600">Lo que mejorarías de la intranet o de las clases. La academia te responde con el estado.</p>
      <form noValidate onSubmit={handleSubmit} className="mt-5 grid gap-5">
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
    </Panel>
  )
}

function TusMensajes({ mensajes }: { mensajes: Mensaje[] }) {
  return (
    <section aria-labelledby="buzon-enviados" className="mt-8 border-t border-dashed border-linea pt-5">
      <h3 id="buzon-enviados" className="text-sm font-bold tracking-[0.2em] text-acento uppercase">
        Tus mensajes
      </h3>
      <ul className="mt-3 grid gap-3">
        {mensajes.map((m) => (
          <li key={m.id} className="rounded-2xl border border-linea bg-papel p-4">
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
