import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { DemoNoticeProvider } from './layout/DemoNoticeProvider'
import { IntranetLayout } from './layout/IntranetLayout'
import { AyudaPage } from './pages/AyudaPage'
import { ClasesPage } from './pages/ClasesPage'
import { CuentaPage } from './pages/CuentaPage'
import { EntradaPage } from './pages/EntradaPage'
import { InicioPage } from './pages/InicioPage'
import { NoEncontradaPage } from './pages/NoEncontradaPage'
import { SedePage } from './pages/SedePage'
import { SimulacrosPage } from './pages/SimulacrosPage'
import { isSignedIn } from './session'

/** Sin sesión de demostración, a la entrada; después vuelve a la sección que se pidió. */
function RequireSession({ children }: { children: ReactNode }) {
  const location = useLocation()
  if (!isSignedIn()) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  return children
}

export function App() {
  return (
    <BrowserRouter basename="/intranet">
      <DemoNoticeProvider>
        <Routes>
          <Route path="entrar" element={<EntradaPage />} />
          <Route
            element={
              <RequireSession>
                <IntranetLayout />
              </RequireSession>
            }
          >
            <Route index element={<Navigate to="/inicio" replace />} />
            <Route path="inicio" element={<InicioPage />} />
            <Route path="clases" element={<ClasesPage />} />
            <Route path="simulacros" element={<SimulacrosPage />} />
            <Route path="sede" element={<SedePage />} />
            <Route path="ayuda" element={<AyudaPage />} />
            <Route path="cuenta" element={<CuentaPage />} />
            <Route path="*" element={<NoEncontradaPage />} />
          </Route>
        </Routes>
      </DemoNoticeProvider>
    </BrowserRouter>
  )
}
