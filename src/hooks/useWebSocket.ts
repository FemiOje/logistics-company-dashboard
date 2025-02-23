import { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';

export const useWebSocket = () => useContext(WebSocketContext);