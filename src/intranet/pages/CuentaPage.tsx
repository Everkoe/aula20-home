import { KeyRound, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { alumno } from '../content/alumno'
import { contactoSedes } from '../content/sede'
import { PageHeader } from '../layout/PageHeader'
import { signOut } from '../session'
import { DemoAction } from '../ui/DemoAction'
import { Etiqueta } from '../ui/Etiqueta'
import { Panel } from '../ui/Panel'

/** Única entrada de la cuenta: datos para leer, contraseña y la única salida de la intranet. */
export function CuentaPage() {
  const navigate = useNavigate()
  const sede = contactoSedes[alumno.sedeId]?.nombre ?? '—'

  const datos = [
    { label: 'Nombre', value: `${alumno.nombres} ${alumno.apellidos}` },
    { label: 'Código', value: alumno.codigo },
    { label: 'Ciclo', value: `${alumno.ciclo} ${alumno.universidad}` },
    { label: 'Sede', value: sede },
    { label: 'Salón', value: alumno.salon },
    { label: 'Carrera que buscas', value: alumno.meta.carrera },
  ]

  const handleSignOut = () => {
    signOut()
    navigate('/entrar', { replace: true })
  }

  return (
    <>
      <PageHeader title="Mi" highlight="cuenta." />
      <div className="mt-8 grid max-w-3xl gap-6">
        <Panel id="cuenta-datos" title="Tus datos" aside={<Etiqueta>Ejemplo</Etiqueta>}>
          <dl className="mt-4 divide-y divide-linea">
            {datos.map(({ label, value }) => (
              <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
                <dt className="text-grafito-600">{label}</dt>
                <dd className="font-semibold text-titulo">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-grafito-600">Si algún dato está mal, pide el cambio en tu sede.</p>
        </Panel>

        <Panel id="cuenta-clave" title="Contraseña">
          <p className="mt-1 text-sm text-grafito-600">La que usas para entrar a la intranet.</p>
          <div className="mt-4">
            <DemoAction icon={KeyRound} label="Cambiar contraseña" detail="de la intranet" message="En la demostración no se cambian contraseñas." />
          </div>
        </Panel>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-titulo px-5 text-sm font-semibold text-titulo transition-colors hover:bg-titulo hover:text-papel"
          >
            <LogOut aria-hidden="true" className="size-4" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}
