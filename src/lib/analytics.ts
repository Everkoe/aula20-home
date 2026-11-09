/**
 * Medición de lo que trae matrículas: clics en WhatsApp y en llamar, y qué universidad marcan en la cartilla.
 *
 * - Cada evento va siempre a `window.dataLayer` (listo para Google Tag Manager) y, si están configurados,
 *   a GA4 y al píxel de Meta. Sin IDs no se carga ningún script de terceros.
 * - Los IDs salen de `VITE_GA4_ID` y `VITE_META_PIXEL_ID` (ver `.env.example`) y se validan antes de usarse.
 * - No se envía el texto del mensaje de WhatsApp ni ningún dato personal: solo el canal y la zona de la página.
 */

export type ContactChannel = 'whatsapp' | 'telefono'
export type EventParams = Record<string, string | number>
export type AnalyticsConfig = { ga4Id?: string; metaPixelId?: string }

type Gtag = (...args: unknown[]) => void
type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string; callMethod?: Fbq; push?: Fbq }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const GA4_ID = /^G-[A-Z0-9]{4,20}$/
const META_PIXEL_ID = /^\d{10,20}$/

/** IDs válidos de las variables de entorno; uno mal escrito se ignora en vez de inyectarse en una URL. */
export function parseAnalyticsConfig(env: { VITE_GA4_ID?: string; VITE_META_PIXEL_ID?: string }): AnalyticsConfig {
  const ga4Id = env.VITE_GA4_ID?.trim().toUpperCase()
  const metaPixelId = env.VITE_META_PIXEL_ID?.trim()
  return {
    ga4Id: ga4Id && GA4_ID.test(ga4Id) ? ga4Id : undefined,
    metaPixelId: metaPixelId && META_PIXEL_ID.test(metaPixelId) ? metaPixelId : undefined,
  }
}

/** Canal de contacto de un enlace, o null si no es de contacto. */
export function contactChannel(href: string): ContactChannel | null {
  if (href.startsWith('tel:')) return 'telefono'
  try {
    const url = new URL(href)
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') return 'whatsapp'
  } catch {
    return null
  }
  return null
}

/** Dónde está el botón: la zona marcada con data-zona, la sección, el encabezado o el pie. */
export function contactZone(element: Element): string {
  const marked = element.closest<HTMLElement>('[data-zona]')?.dataset.zona
  if (marked) return marked
  const section = element.closest('section[id]')?.id
  if (section) return section
  if (element.closest('header')) return 'encabezado'
  if (element.closest('footer')) return 'pie'
  return 'otra'
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer ??= []
  window.dataLayer.push({ event: name, ...params })
  window.gtag?.('event', name, params)
}

/** Clic en WhatsApp o llamar: `generate_lead` en GA4 y `Contact` en Meta. */
export function trackContact(channel: ContactChannel, zona: string) {
  trackEvent('generate_lead', { method: channel, zona })
  window.fbq?.('track', 'Contact', { content_category: channel, content_name: zona })
}

/** Un solo escuchador para toda la página: cualquier enlace de contacto, presente o futuro, queda medido. */
export function installContactTracking(root: Document = document) {
  root.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const channel = contactChannel(link.getAttribute('href') ?? '')
      if (channel) trackContact(channel, contactZone(link))
    },
    { capture: true },
  )
}

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.append(script)
}

function loadGa4(id: string) {
  window.dataLayer ??= []
  window.gtag = function gtag() {
    // gtag.js espera el objeto `arguments`, no un arreglo.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
}

/** El fragmento oficial del píxel de Meta, sin el <noscript>. */
function loadMetaPixel(id: string) {
  if (window.fbq) return
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue?.push(args)
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq ??= fbq
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', id)
  fbq('track', 'PageView')
}

export function loadAnalytics(config: AnalyticsConfig) {
  if (typeof window === 'undefined') return
  if (config.ga4Id) loadGa4(config.ga4Id)
  if (config.metaPixelId) loadMetaPixel(config.metaPixelId)
}
