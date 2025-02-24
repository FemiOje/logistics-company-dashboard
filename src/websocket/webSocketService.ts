export class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;
    private subscribers = new Map<string, Set<(data: any) => void>>();

    private constructor() {
        this.connect();
    }

    static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private connect() {
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // Route messages to correct subscribers based on type/channel
                const subscribers = this.subscribers.get(data.type);
                if (subscribers) {
                    subscribers.forEach(() => {
                        this.send(JSON.stringify({
                            ...data.payload,
                            receivedAt: Date.now(),
                        }), true);
                    });
                }
            } catch (error) {
                console.error('Error parsing message:', error);
                this.send(JSON.stringify({
                    type: 'error',
                    message: 'Invalid message format',
                }), false);
            }
        };
    }

    subscribe(channel: string, callback: (data: any) => void) {
        if (!this.subscribers.has(channel)) {
            this.subscribers.set(channel, new Set());
        }
        this.subscribers.get(channel)!.add(callback);
    }

    unsubscribe(channel: string, callback: (data: any) => void) {
        this.subscribers.get(channel)?.delete(callback);
    }

    send(type: string, payload: any) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type, payload }));
        }
    }
}