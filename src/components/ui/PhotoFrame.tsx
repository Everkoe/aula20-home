import type { Photo } from '../../content/images'

type Props = {
  photo: Photo
  /** Imagen principal de la página: se carga con prioridad. */
  isPriority?: boolean
  /** cover recorta respetando photo.focus; contain muestra la pieza completa. */
  fit?: 'cover' | 'contain'
  sizes?: string
  className?: string
}

/** Fotografía con ancho y alto declarados (evita saltos) y punto de foco al recortar. */
export function PhotoFrame({ photo, isPriority = false, fit = 'cover', sizes, className = '' }: Props) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      loading={isPriority ? 'eager' : 'lazy'}
      fetchPriority={isPriority ? 'high' : 'auto'}
      decoding="async"
      className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  )
}
