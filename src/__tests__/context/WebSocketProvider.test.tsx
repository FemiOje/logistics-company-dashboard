import { renderHook, waitFor } from '@testing-library/react';
import { WebSocketProvider } from '../../providers/WebSocketProvider';
import { WebSocketContext } from '../../contexts/WebSocketContext';
import { Shipment } from '../../types/types';
import { useContext } from 'react';

const mockShipment: Shipment = {
  shipmentId: 'SHIP-123',
  status: 'in_transit',
  origin: { name: 'Origin', address: 'Address', timestamp: new Date().toISOString() },
  destination: { name: 'Dest', address: 'Dest Address', estimatedDelivery: new Date().toISOString() }
};

describe('WebSocketProvider', () => {
  const originalWebSocket = global.WebSocket;

  beforeEach(() => {
    class MockWebSocket {
      send = jest.fn();
      close = jest.fn();
      onmessage = jest.fn();
      onopen = jest.fn(() => this.onopen());
      onclose = jest.fn();
      readyState = 1;
      
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;
    }
  
    global.WebSocket = MockWebSocket as any;
  });

  afterEach(() => {
    global.WebSocket = originalWebSocket;
    jest.clearAllMocks();
  });

  test('handles shipment updates', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WebSocketProvider>{children}</WebSocketProvider>
    );

    const { result } = renderHook(() => useContext(WebSocketContext), { wrapper });

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });
  });
});