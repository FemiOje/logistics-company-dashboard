import { createContext } from 'react';
import { WebSocketContextType } from '../types/types';

export const WebSocketContext = createContext<WebSocketContextType>({
    connect: () => new WebSocket('ws://localhost:8080'),
    isConnected: false
  });