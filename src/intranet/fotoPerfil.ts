import { useSyncExternalStore } from 'react'

/**
 * Foto de perfil de la demostración. Se recorta y reduce en el navegador y se guarda solo en este navegador
 * (localStorage): no se sube a ningún lado. En la intranet real iría al servidor de la academia.
 */

const STORAGE_KEY = 'aula20-demo-foto'
const LADO_PX = 256
const CALIDAD_JPEG = 0.85
const MAX_BYTES = 8 * 1024 * 1024
const TIPOS_ACEPTADOS = ['image/jpeg', 'image/png', 'image/webp']

export const ACCEPT_FOTO = TIPOS_ACEPTADOS.join(',')

export class FotoError extends Error {}

function leerGuardada(): string | null {
  try {
    const valor = window.localStorage.getItem(STORAGE_KEY)
    return valor?.startsWith('data:image/') ? valor : null
  } catch {
    return null
  }
}

let foto: string | null = leerGuardada()
const oyentes = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  oyentes.add(onChange)
  return () => oyentes.delete(onChange)
}

function getSnapshot(): string | null {
  return foto
}

/** Guarda (o quita, con null) la foto. Si el navegador no deja guardar, queda solo mientras la página esté abierta. */
export function setFotoPerfil(dataUrl: string | null): void {
  foto = dataUrl
  try {
    if (dataUrl) window.localStorage.setItem(STORAGE_KEY, dataUrl)
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Sin almacenamiento (modo privado, cuota llena): la foto sigue en memoria.
  }
  oyentes.forEach((onChange) => onChange())
}

export function useFotoPerfil(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

/** Valida el archivo, recorta el centro en cuadrado y lo reduce a 256 × 256 en JPEG (unos 20 KB). */
export async function prepararFoto(file: File): Promise<string> {
  if (!TIPOS_ACEPTADOS.includes(file.type)) throw new FotoError('Elige una imagen JPG, PNG o WebP.')
  if (file.size > MAX_BYTES) throw new FotoError('La imagen pesa más de 8 MB. Elige una más liviana.')

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new FotoError('No se pudo leer la imagen. Prueba con otra.')
  }

  const lado = Math.min(bitmap.width, bitmap.height)
  const canvas = document.createElement('canvas')
  canvas.width = LADO_PX
  canvas.height = LADO_PX
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new FotoError('Tu navegador no pudo procesar la imagen.')
  }
  context.drawImage(bitmap, (bitmap.width - lado) / 2, (bitmap.height - lado) / 2, lado, lado, 0, 0, LADO_PX, LADO_PX)
  bitmap.close()
  return canvas.toDataURL('image/jpeg', CALIDAD_JPEG)
}
