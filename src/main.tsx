import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/manrope'
import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { installContactTracking, loadAnalytics, parseAnalyticsConfig } from './lib/analytics'

loadAnalytics(parseAnalyticsConfig(import.meta.env))
installContactTracking()

const root = document.getElementById('root')
if (!root) throw new Error('Falta el elemento #root en index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
