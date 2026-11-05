import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Connect, type Plugin } from 'vite'
import { buildHeadTags, buildIntranetHeadTags } from './src/lib/headTags.ts'

/** Fuentes del primer pantallazo (texto y titulares, solo latín). */
const ABOVE_THE_FOLD_FONTS = ['manrope-latin-wght-normal', 'bricolage-grotesque-latin-wght-normal']
const INTRANET_HTML = /[\\/]intranet[\\/]index\.html$/
/** Rutas de la intranet sin extensión (/intranet, /intranet/clases…): las resuelve react-router. */
const INTRANET_ROUTE = /^\/intranet(\/[^.]*)?$/

/** Vista previa para redes, schema.org y precarga de la foto en la landing; noindex en la intranet (ver src/lib/headTags.ts). */
function headTags(): Plugin {
  return {
    name: 'aula20-head-tags',
    transformIndexHtml: (_html, { filename }) =>
      (INTRANET_HTML.test(filename) ? buildIntranetHeadTags() : buildHeadTags()).map((tag) => ({ ...tag, injectTo: 'head' as const })),
  }
}

/**
 * Precarga las fuentes con el nombre final (con hash) que usa el CSS: sin esto llegan tarde,
 * el texto cambia de fuente ya pintado y el hero salta (CLS). Solo al compilar.
 */
function fontPreloads(): Plugin {
  let base = '/'
  return {
    name: 'aula20-font-preloads',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler: (_html, { bundle }) =>
        Object.values(bundle ?? {})
          .filter((file) => file.type === 'asset' && ABOVE_THE_FOLD_FONTS.some((font) => file.fileName.includes(`/${font}-`)))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `${base}${file.fileName}`, as: 'font', type: 'font/woff2', crossorigin: true },
            injectTo: 'head' as const,
          })),
    },
  }
}

/**
 * En desarrollo y en `vite preview`, un enlace directo a /intranet/clases debe servir la intranet y no la landing
 * (el respaldo de Vite manda todo a /index.html). En Vercel lo hace la reescritura de vercel.json.
 */
function intranetFallback(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    if (req.url && INTRANET_ROUTE.test(req.url.split('?')[0] ?? '')) req.url = '/intranet/index.html'
    next()
  }
  return {
    name: 'aula20-intranet-fallback',
    configureServer: (server) => {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer: (server) => {
      server.middlewares.use(rewrite)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), headTags(), fontPreloads(), intranetFallback()],
  build: {
    rolldownOptions: {
      input: {
        landing: fileURLToPath(new URL('./index.html', import.meta.url)),
        intranet: fileURLToPath(new URL('./intranet/index.html', import.meta.url)),
      },
    },
  },
})
