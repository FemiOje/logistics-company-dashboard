import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './providers/WebSocketProvider';
import Layout from './components/layout/Layout.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const Shipments = lazy(() => import('./pages/Shipments.tsx'));
const Settings = lazy(() => import('./pages/Settings.tsx'));
const ShipmentDetails = lazy(() => import('./pages/ShipmentDetails.tsx'));

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ThemeProvider>
      <WebSocketProvider>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="shipments">
                    <Route index element={<Shipments />} />
                    <Route path=":shipmentId" element={<ShipmentDetails />} />
                  </Route>
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
      </WebSocketProvider>
    </ThemeProvider>
  );
}

export default App;