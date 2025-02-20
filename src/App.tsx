import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Shipments from './pages/Shipments.tsx';
import Tracking from './pages/Tracking.tsx';
import Reports from './pages/Reports.tsx';
import Settings from './pages/Settings.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import ShipmentDetails from './pages/ShipmentDetails.tsx';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="shipments">
              <Route index element={<Shipments />} />
              <Route path=":shipmentId" element={<ShipmentDetails />} />
            </Route>
            <Route path="tracking" element={<Tracking />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;