import { createContext, useContext } from 'react'

export const DEFAULT_DEMO_MESSAGE = 'En la demostración no se abren archivos. En la intranet real, aquí se descarga.'

/** Muestra un aviso breve: las acciones que en la intranet real abren archivos o guardan cambios. */
export const DemoNoticeContext = createContext<(message?: string) => void>(() => {})

export function useDemoNotice() {
  return useContext(DemoNoticeContext)
}
