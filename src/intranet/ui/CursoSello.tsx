import type { Curso } from '../content/cursos'
import { colorBloque } from './bloques'

type Props = {
  curso: Curso
  size?: 'md' | 'lg'
}

const sizes = {
  md: 'size-11 rounded-xl text-[0.7rem]',
  lg: 'size-14 rounded-2xl text-xs',
} as const

/** Sello del curso: rótulo corto sobre el color de su bloque. Decorativo: el nombre va al lado. */
export function CursoSello({ curso, size = 'md' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center font-display leading-none font-extrabold tracking-tight ${sizes[size]} ${colorBloque[curso.bloque].sello}`}
    >
      {curso.abrev}
    </span>
  )
}
