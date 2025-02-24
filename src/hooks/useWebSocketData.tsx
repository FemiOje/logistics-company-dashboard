import { useState, useEffect, useCallback } from 'react';
import { WebSocketMessage } from '../types/types';

const WS_URL = "ws://localhost:8080";

export function useWebSocketData<T>(initialState: T) {
    const [data, setData] = useState<T>(initialState);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const connect = useCallback(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);

                switch (message.type) {
                    case 'CONNECTION_ACK':
                        console.log('Connection acknowledged by server');
                        break;
                    case 'DASHBOARD_UPDATE':
                        if (typeof message.data === 'object' && 'totalShipments' in message.data) {
                            setData(message.data as T);
                        }
                        break;
                }
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
            
            setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        const cleanup = connect();
        return () => {
            cleanup();
            setSocket(null);
        };
    }, [connect]);

    const sendMessage = useCallback((message: WebSocketMessage) => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    }, [socket]);

    return {
        data,
        isConnected,
        sendMessage
    };
}