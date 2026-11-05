import { alumno } from '../content/alumno'
import { useFotoPerfil } from '../fotoPerfil'

const iniciales = `${alumno.nombres[0] ?? ''}${alumno.apellidos[0] ?? ''}`

/** Foto de perfil si la hay; si no, las iniciales sobre menta. Decorativa: el nombre siempre va al lado. */
export function Avatar({ className = '' }: { className?: string }) {
  const foto = useFotoPerfil()
  if (foto) return <img src={foto} alt="" className={`shrink-0 rounded-full bg-menta object-cover ${className}`} />
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full bg-menta font-display font-extrabold text-tinta ${className}`}>
      {iniciales}
    </span>
  )
}
