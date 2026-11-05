import { Link } from 'react-router'
import { PageHeader } from '../layout/PageHeader'

export function NoEncontradaPage() {
  return (
    <>
      <PageHeader title="Esta página no" highlight="existe.">
        Puede que el enlace esté mal escrito.
      </PageHeader>
      <Link to="/inicio" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-aula px-5 text-sm font-semibold text-white hover:bg-aula-700">
        Ir al inicio
      </Link>
    </>
  )
}
