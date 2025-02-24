import { createContext } from 'react';
import { WebSocketContextType } from '../types/types';

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
