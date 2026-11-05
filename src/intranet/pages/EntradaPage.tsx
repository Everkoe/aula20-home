import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { Highlight } from '../../components/ui/Heading'
import { site } from '../../content/site'
import { alumno, nombrePila } from '../content/alumno'
import { signIn } from '../session'

/**
 * Entrada sin usuario ni contraseña: el prototipo publicado no pide credenciales a nadie.
 * Fondo de la portada de la landing (azul; azul noche en modo oscuro) y una hoja blanca encima.
 */
export function EntradaPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from

  const handleEnter = () => {
    signIn()
    navigate(from && from !== '/entrar' ? from : '/inicio', { replace: true })
  }

  return (
    <main className="cuadricula-marca grid min-h-svh place-items-center px-4 py-12">
      <title>Entrar · Intranet Aula 20</title>
      <div className="w-full max-w-md">
        <img src={site.logo.light} alt="Aula 20" width={site.logo.width} height={site.logo.height} className="mx-auto h-12 w-auto" />
        <div className="hoja-clara mt-8 rounded-3xl bg-hoja p-7 shadow-[0_30px_60px_-30px_rgb(0_10_59/0.6)] sm:p-9">
          <p className="text-xs font-bold tracking-[0.2em] text-acento uppercase">Intranet de alumnos</p>
          <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-titulo">
            Tu semana, <Highlight>en un lugar.</Highlight>
          </h1>
          <p className="mt-4 text-grafito-600">
            Prototipo con la cuenta de {nombrePila}, del {alumno.ciclo} {alumno.universidad}; sus notas son de ejemplo. No pide usuario ni contraseña.
          </p>
          <button
            type="button"
            onClick={handleEnter}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-aula px-6 font-semibold text-white transition-colors hover:bg-aula-700"
          >
            Entrar con la cuenta de demostración
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
        <a href="/" className="mx-auto mt-6 flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-cielo hover:text-white">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Volver a la web
        </a>
      </div>
    </main>
  )
}
