import { createContext, useEffect, useState, useCallback } from 'react';
import { WebSocketContextType } from '../types/types';

const WebSocketContext = createContext<WebSocketContextType>({
  connect: () => new WebSocket('ws://localhost:8080'),
  isConnected: false
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {

  const [isConnected, setIsConnected] = useState(false);
  const connect = useCallback(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return ws;
  }, []);

  useEffect(() => {
    const connection = connect();

    return () => {
      connection.close();
    };
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ connect, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};