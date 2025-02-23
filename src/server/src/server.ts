import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

const wss = new WebSocketServer({ port: 8080 });

wss.on('error', (error) => {
  console.error('Server error:', error);
});

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const clientIp = req.socket.remoteAddress || 'unknown';
  console.log(`Client connected from IP: ${clientIp}`);

  const welcomeMessage = {
    type: 'welcome',
    message: 'Connected to WebSocket server',
    timestamp: Date.now(),
    clientIp,
  };
  ws.send(JSON.stringify(welcomeMessage));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      console.log(`Received from ${clientIp}:`, parsed);

      // Broadcast to all clients except the sender
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            ...parsed,
            sender: clientIp,
            receivedAt: Date.now(),
          }));
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format',
      }));
    }
  });

  // Heartbeat mechanism
  let isAlive = true;
  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on('pong', () => {
    isAlive = true;
  });

  ws.on('close', (code, reason) => {
    console.log(`Client disconnected (${clientIp}), code: ${code}, reason: ${reason.toString()}`);
    clearInterval(heartbeat);
  });

  ws.on('error', (error) => {
    console.error(`Client error (${clientIp}):`, error);
  });

  // Terminate broken connections
  const connectionCheck = setInterval(() => {
    if (!isAlive) {
      console.log(`Terminating broken connection to ${clientIp}`);
      ws.terminate();
      clearInterval(connectionCheck);
      return;
    }
    isAlive = false;
    ws.ping();
  }, 30000);
});

console.log('WebSocket server running on ws://localhost:8080');