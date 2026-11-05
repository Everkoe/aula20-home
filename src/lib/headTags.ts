/**
 * Etiquetas del <head> que vite.config.ts escribe en el HTML al servir y al compilar: vista previa para
 * redes, datos schema.org para buscadores y precarga de la foto principal. Salen del mismo contenido que
 * pinta la página, así no se desincronizan, y están en el HTML sin esperar a React.
 * Los imports llevan .ts porque vite.config.ts también carga este archivo (tsconfig.node, módulos de Node).
 */
import { photos } from '../content/images.ts'
import { sedes } from '../content/sedes.ts'
import { site } from '../content/site.ts'
import { internationalPhone } from './whatsapp.ts'

export type HeadTag = {
  tag: string
  attrs?: Record<string, string | boolean>
  children?: string
}

const PAGE_URL = `${site.url}/`
const TITLE = `${site.name} · ${site.tagline.replace(/\.$/, '')}`
/** Foto del hero (HeroChapter): es el elemento más grande del primer pantallazo. */
const HERO_PHOTO = photos.tutores

export const DESCRIPTION = `Academia preuniversitaria ${site.name}: ciclos para San Marcos, UNI, Católica, Agraria, Villarreal, Callao y Beca 18. ${sedes.length} sedes en Lima y Callao y modalidad virtual.`

/** Distrito y calle de las direcciones de /sedes, que terminan en " - Distrito". */
export function splitAddress(address: string): { streetAddress: string; addressLocality?: string } {
  const parts = address.split(' - ')
  if (parts.length < 2) return { streetAddress: address }
  return { streetAddress: parts.slice(0, -1).join(' - ').trim(), addressLocality: parts.at(-1)?.trim() }
}

export function buildStructuredData() {
  const telephone = internationalPhone(site.contact.phone)
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.url}/#organizacion`,
    name: site.name,
    alternateName: site.legalName,
    url: PAGE_URL,
    description: DESCRIPTION,
    slogan: site.tagline,
    image: HERO_PHOTO.src,
    telephone,
    contactPoint: { '@type': 'ContactPoint', telephone, contactType: 'informes y matrícula', areaServed: 'PE', availableLanguage: 'es' },
    sameAs: site.social.map((social) => social.href),
    location: sedes.map((sede) => ({
      '@type': 'Place',
      name: `${site.name} ${sede.name}`,
      address: { '@type': 'PostalAddress', ...splitAddress(sede.address), addressCountry: 'PE' },
    })),
  }
}

/** JSON para un <script> en línea: se escapa "<" para que ningún texto pueda cerrar la etiqueta. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const meta = (key: 'name' | 'property', id: string, content: string): HeadTag => ({ tag: 'meta', attrs: { [key]: id, content } })

/** La intranet es privada: fuera de los buscadores y sin vista previa para redes. */
export function buildIntranetHeadTags(): HeadTag[] {
  return [meta('name', 'robots', 'noindex, nofollow'), meta('name', 'description', `Intranet de alumnos de ${site.name}.`)]
}

export function buildHeadTags(): HeadTag[] {
  return [
    meta('name', 'description', DESCRIPTION),
    { tag: 'link', attrs: { rel: 'canonical', href: PAGE_URL } },
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:locale', 'es_PE'),
    meta('property', 'og:url', PAGE_URL),
    meta('property', 'og:title', TITLE),
    meta('property', 'og:description', DESCRIPTION),
    meta('property', 'og:image', HERO_PHOTO.src),
    meta('property', 'og:image:width', String(HERO_PHOTO.width)),
    meta('property', 'og:image:height', String(HERO_PHOTO.height)),
    meta('property', 'og:image:alt', HERO_PHOTO.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
    { tag: 'link', attrs: { rel: 'preload', as: 'image', href: HERO_PHOTO.src, fetchpriority: 'high' } },
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: serializeJsonLd(buildStructuredData()) },
  ]
}
