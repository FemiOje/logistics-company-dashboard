import { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { WebSocketMessage, WebSocketContextType } from '../types/types';
import shipmentsData from '../mocks/shipments.json';

const WebSocketContext = createContext<WebSocketContextType>({
  subscribe: () => {},
  unsubscribe: () => {}
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  
  const subscribers = useRef<((msg: WebSocketMessage) => void)[]>([]);
  const subscribe = useCallback((callback: (msg: WebSocketMessage) => void) => {
    subscribers.current.push(callback);
  }, []);
  const unsubscribe = useCallback((callback: (msg: WebSocketMessage) => void) => {
    subscribers.current = subscribers.current.filter(sub => sub !== callback);
  }, []);
  
  useEffect(() => {
    const STATUS_OPTIONS = ['in_transit', 'delayed', 'delivered'] as const;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * shipmentsData.shipments.length);
      const randomShipment = shipmentsData.shipments[randomIndex];
      const randomStatus = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];

      const mockUpdate: WebSocketMessage = {
        type: 'STATUS_UPDATE',
        data: {
          shipmentId: randomShipment.shipmentId,
          status: randomStatus,
          timestamp: new Date().toISOString()
        }
      };
      
      subscribers.current.forEach(callback => callback(mockUpdate));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WebSocketContext.Provider value={{ subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => useContext(WebSocketContext);
