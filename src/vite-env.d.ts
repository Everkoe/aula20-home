/// <reference types="vite/client" />

/** Variables de entorno públicas (ver .env.example). */
interface ImportMetaEnv {
  readonly VITE_GA4_ID?: string
  readonly VITE_META_PIXEL_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
