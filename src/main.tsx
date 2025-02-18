import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './components/layout/Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Shipments from './pages/Shipments.tsx'
import Tracking from './pages/Tracking.tsx'
import Reports from './pages/Reports.tsx'
import Settings from './pages/Settings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
