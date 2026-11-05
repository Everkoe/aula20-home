import { Camera, KeyRound, LogOut, Trash2 } from 'lucide-react'
import { useId, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { site } from '../../content/site'
import { alumno } from '../content/alumno'
import { contactoSedes } from '../content/sede'
import { ACCEPT_FOTO, FotoError, prepararFoto, setFotoPerfil, useFotoPerfil } from '../fotoPerfil'
import { PageHeader } from '../layout/PageHeader'
import { signOut } from '../session'
import { Avatar } from '../ui/Avatar'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { Panel } from '../ui/Panel'

/** Única entrada de la cuenta: tus datos y tu foto, la contraseña y la única salida de la intranet. */
export function CuentaPage() {
  const navigate = useNavigate()

  // La foto no se borra al salir: es de la cuenta, no de la sesión (se quita con "Quitar foto").
  const handleSignOut = () => {
    signOut()
    navigate('/entrar', { replace: true })
  }

  return (
    <>
      <PageHeader title="Mi" highlight="cuenta." />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:items-start">
        <Ficha />
        <div className="grid gap-6">
          <Panel id="cuenta-clave" title="Contraseña">
            <p className="mt-1 text-sm text-grafito-600">La que usas para entrar a la intranet.</p>
            <div className="mt-4">
              <DemoAction icon={KeyRound} label="Cambiar contraseña" detail="de la intranet" message="En la demostración no se cambian contraseñas." />
            </div>
          </Panel>
          <Panel id="cuenta-salir" title="Salir de la intranet">
            <p className="mt-1 text-sm text-grafito-600">Si usas una computadora compartida, cierra sesión al terminar.</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-titulo px-5 text-sm font-semibold text-titulo transition-colors hover:bg-titulo hover:text-hoja"
            >
              <LogOut aria-hidden="true" className="size-4" />
              Cerrar sesión
            </button>
          </Panel>
        </div>
      </div>
    </>
  )
}

/** Tus datos como ficha de alumno: hoja clara (también en modo oscuro), pegada con cinta. */
function Ficha() {
  const sede = contactoSedes[alumno.sedeId]?.nombre ?? '—'
  const datos = [
    { label: 'Ciclo', value: `${alumno.ciclo} ${alumno.universidad}` },
    { label: 'Sede', value: sede },
    { label: 'Salón', value: alumno.salon },
    { label: 'Turno', value: alumno.turno },
    { label: 'Carrera que buscas', value: alumno.meta.carrera },
  ]

  return (
    <section aria-labelledby="cuenta-datos" className="hoja-clara relative mx-auto w-full max-w-md lg:mx-0 lg:-rotate-1">
      <span aria-hidden="true" className="cinta z-10" />
      <div className="overflow-hidden rounded-3xl bg-hoja shadow-[0_30px_60px_-30px_rgb(0_10_59/0.55)] ring-1 ring-linea">
        <div className="cuadricula-marca flex items-center justify-between px-6 pt-5 pb-12">
          <img src={site.logo.light} alt="Aula 20" width={site.logo.width} height={site.logo.height} className="h-7 w-auto" />
        </div>
        <div className="px-6 pb-6">
          {/* La foto se monta sobre la franja; el nombre empieza debajo de ella, así un nombre largo baja en vez de subir. */}
          <div className="-mt-10 flex items-start gap-4">
            <Avatar className="size-24 text-3xl ring-4 ring-hoja" />
            <div className="min-w-0 pt-13">
              <h2 id="cuenta-datos" className="text-2xl leading-tight font-extrabold text-titulo">
                {alumno.nombres} {alumno.apellidos}
              </h2>
              <p className="text-sm text-grafito-600 tabular-nums">
                Código {alumno.codigo}
                <Etiqueta>Ejemplo</Etiqueta>
              </p>
            </div>
          </div>

          <FotoControles />

          <dl className="mt-5 divide-y divide-dashed divide-linea border-y border-dashed border-linea">
            {datos.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-grafito-600">{label}</dt>
                <dd className="text-right font-semibold text-titulo">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-grafito-600">Si algún dato está mal, pide el cambio en tu sede.</p>
        </div>
      </div>
    </section>
  )
}

const botonClass =
  'inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-linea px-4 text-sm font-semibold text-acento transition-colors hover:border-acento'

/** Cambiar o quitar la foto. El archivo se procesa en el navegador; en la demo no sale de aquí. */
function FotoControles() {
  const foto = useFotoPerfil()
  const [mensaje, setMensaje] = useState<{ texto: string; isError: boolean } | null>(null)
  const [isProcesando, setIsProcesando] = useState(false)
  const ayudaId = useId()

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''
    if (!file) return

    setIsProcesando(true)
    try {
      setFotoPerfil(await prepararFoto(file))
      setMensaje({ texto: 'Foto actualizada.', isError: false })
    } catch (error) {
      const texto = error instanceof FotoError ? error.message : 'No se pudo cambiar la foto. Prueba con otra imagen.'
      setMensaje({ texto, isError: true })
    } finally {
      setIsProcesando(false)
    }
  }

  const handleRemove = () => {
    setFotoPerfil(null)
    setMensaje({ texto: 'Foto quitada.', isError: false })
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        <label className={`${botonClass} has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento ${isProcesando ? 'pointer-events-none opacity-60' : ''}`}>
          <input type="file" accept={ACCEPT_FOTO} onChange={handleFile} disabled={isProcesando} aria-describedby={ayudaId} className="sr-only" />
          <Camera aria-hidden="true" className="size-4" />
          {isProcesando ? 'Procesando…' : foto ? 'Cambiar foto' : 'Subir foto'}
        </label>
        {foto && (
          <button type="button" onClick={handleRemove} className={botonClass}>
            <Trash2 aria-hidden="true" className="size-4" />
            Quitar foto
          </button>
        )}
      </div>
      <p id={ayudaId} className="mt-2 text-xs text-grafito-600">
        JPG, PNG o WebP. En la demostración se guarda solo en este navegador.
      </p>
      <p role="status" className={`mt-1 text-sm font-semibold ${mensaje?.isError ? 'text-acento' : 'text-titulo'}`}>
        {mensaje?.texto}
      </p>
    </div>
  )
}
