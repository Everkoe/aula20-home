import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { DEFAULT_DEMO_MESSAGE, DemoNoticeContext } from '../demoNotice'

const VISIBLE_MS = 4200

/** Aviso flotante en una región role="status": el lector de pantalla lo lee sin mover el foco. */
export function DemoNoticeProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const notify = useCallback((text: string = DEFAULT_DEMO_MESSAGE) => {
    window.clearTimeout(timer.current)
    setMessage(text)
    timer.current = window.setTimeout(() => setMessage(''), VISIBLE_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <DemoNoticeContext value={notify}>
      {children}
      <div role="status" className="pointer-events-none fixed inset-x-4 bottom-24 z-[60] flex justify-center lg:bottom-6">
        {message && (
          <p className="animate-rise max-w-md rounded-2xl bg-tinta px-5 py-3 text-sm font-medium text-white shadow-[0_20px_40px_-20px_rgb(0_10_59/0.6)] dark:ring-1 dark:ring-white/15">
            {message}
          </p>
        )}
      </div>
    </DemoNoticeContext>
  )
}
