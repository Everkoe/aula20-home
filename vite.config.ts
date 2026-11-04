import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { buildHeadTags } from './src/lib/headTags.ts'

/** Fuentes del primer pantallazo (texto y titulares, solo latín). */
const ABOVE_THE_FOLD_FONTS = ['manrope-latin-wght-normal', 'bricolage-grotesque-latin-wght-normal']

/** Vista previa para redes, schema.org y precarga de la foto principal (ver src/lib/headTags.ts). */
function headTags(): Plugin {
  return {
    name: 'aula20-head-tags',
    transformIndexHtml: () => buildHeadTags().map((tag) => ({ ...tag, injectTo: 'head' as const })),
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), headTags(), fontPreloads()],
})
