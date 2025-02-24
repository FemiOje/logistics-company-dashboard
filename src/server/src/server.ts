// import { WebSocketServer, WebSocket } from 'ws';
// import { IncomingMessage } from 'http';
// import { DashboardStats, Shipment, WebSocketMessage } from '../../types/types';

// const wss = new WebSocketServer({ port: 8080 });

// let dashboardStats: DashboardStats = {
//   totalShipments: 0,
//   in_transit: 0,
//   delayed: 0,
//   delivered: 0
// };

// const shipments: Shipment[] = [];

// function generateShipment(): Shipment {
//   const statuses = ['in_transit', 'delayed', 'delivered'];
//   const status = statuses[Math.floor(Math.random() * statuses.length)];
  
//   return {
//     shipmentId: `SHIP${Math.floor(Math.random() * 10000)}`,
//     status,
//     origin: {
//       name: 'Origin Warehouse',
//       address: '123 Shipping Lane',
//       timestamp: new Date().toISOString()
//     },
//     destination: {
//       name: 'Destination Center',
//       address: '456 Delivery Road',
//       estimatedDelivery: new Date(Date.now() + 86400000).toISOString()
//     },
//     currentLocation: {
//       latitude: 40.7128,
//       longitude: -74.0060,
//       city: 'New York',
//       state: 'NY'
//     },
//     carrier: 'Fast Shipping Co.',
//     weight: Math.floor(Math.random() * 100),
//     value: Math.floor(Math.random() * 1000),
//     lastUpdated: new Date().toISOString()
//   };
// }

// function updateDashboardStats() {
//   dashboardStats = {
//     totalShipments: shipments.length,
//     in_transit: shipments.filter(s => s.status === 'in_transit').length,
//     delayed: shipments.filter(s => s.status === 'delayed').length,
//     delivered: shipments.filter(s => s.status === 'delivered').length
//   };
// }

// wss.on('error', (error) => {
//   console.error('Server error:', error);
// });

// wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
//   const clientIp = req.socket.remoteAddress || 'unknown';
//   console.log(`Client connected from IP: ${clientIp}`);

//   const welcomeMessage: WebSocketMessage = {
//     type: 'CONNECTION_ACK',
//     data: true
//   };
//   ws.send(JSON.stringify(welcomeMessage));

//   ws.send(JSON.stringify({
//     type: 'DASHBOARD_UPDATE',
//     data: dashboardStats
//   }));

//   const shipmentUpdates = setInterval(() => {
//     if (ws.readyState === WebSocket.OPEN) {

//       // Randomly either create new shipment or update existing one
//       if (Math.random() > 0.5 && shipments.length > 0) {
//         const shipment = shipments[Math.floor(Math.random() * shipments.length)];
//         const newStatus = ['in_transit', 'delayed', 'delivered'][Math.floor(Math.random() * 3)] as 'in_transit' | 'delayed' | 'delivered';
        
//         const updateMessage: WebSocketMessage = {
//           type: 'SHIPMENT_UPDATE',
//           data: {
//             shipmentId: shipment.shipmentId,
//             newStatus,
//             oldStatus: shipment.status as 'in_transit' | 'delayed' | 'delivered',
//             timestamp: new Date().toISOString()
//           }
//         };
        
//         shipment.status = newStatus;
//         updateDashboardStats();
        
//         ws.send(JSON.stringify(updateMessage));
//       } else {
//         const newShipment = generateShipment();
//         shipments.push(newShipment);
//         updateDashboardStats();
        
//         const createMessage: WebSocketMessage = {
//           type: 'SHIPMENT_CREATED',
//           data: newShipment
//         };
        
//         ws.send(JSON.stringify(createMessage));
//       }

//       // Send updated dashboard stats
//       ws.send(JSON.stringify({
//         type: 'DASHBOARD_UPDATE',
//         data: dashboardStats
//       }));
//     }
//   }, 5000);

//   // Heartbeat mechanism
//   let isAlive = true;
//   const heartbeat = setInterval(() => {
//     if (ws.readyState === WebSocket.OPEN) {
//       ws.ping();
//     }
//   }, 30000);

//   ws.on('pong', () => {
//     isAlive = true;
//   });

//   ws.on('close', (code, reason) => {
//     console.log(`Client disconnected (${clientIp}), code: ${code}, reason: ${reason.toString()}`);
//     clearInterval(heartbeat);
//     clearInterval(shipmentUpdates);
//   });

//   ws.on('error', (error) => {
//     console.error(`Client error (${clientIp}):`, error);
//   });

//   const connectionCheck = setInterval(() => {
//     if (!isAlive) {
//       console.log(`Terminating broken connection to ${clientIp}`);
//       ws.terminate();
//       clearInterval(connectionCheck);
//       return;
//     }
//     isAlive = false;
//     ws.ping();
//   }, 30000);
// });

// console.log('WebSocket server running on ws://localhost:8080');

import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { DashboardStats, Shipment, WebSocketMessage } from '../../types/types';

const wss = new WebSocketServer({ port: 8080 });

let dashboardStats: DashboardStats = {
  totalShipments: 0,
  in_transit: 0,
  delayed: 0,
  delivered: 0,
  shipments: []
};

const shipments: Shipment[] = [];

function generateShipment(): Shipment {
  const statuses = ['in_transit', 'delayed', 'delivered'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    shipmentId: `SHIP${Math.floor(Math.random() * 10000)}`,
    status,
    origin: {
      name: 'Origin Warehouse',
      address: '123 Shipping Lane',
      timestamp: new Date().toISOString()
    },
    destination: {
      name: 'Destination Center',
      address: '456 Delivery Road',
      estimatedDelivery: new Date(Date.now() + 86400000).toISOString()
    },
    currentLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      state: 'NY'
    },
    carrier: 'Fast Shipping Co.',
    weight: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 1000),
    lastUpdated: new Date().toISOString()
  };
}

function updateDashboardStats() {
  dashboardStats = {
    totalShipments: shipments.length,
    in_transit: shipments.filter(s => s.status === 'in_transit').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    shipments: shipments
  };
}

wss.on('error', (error) => {
  console.error('Server error:', error);
});

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const clientIp = req.socket.remoteAddress || 'unknown';
  console.log(`Client connected from IP: ${clientIp}`);

  const welcomeMessage: WebSocketMessage = {
    type: 'CONNECTION_ACK',
    data: true
  };
  ws.send(JSON.stringify(welcomeMessage));

  ws.send(JSON.stringify({
    type: 'DASHBOARD_UPDATE',
    data: {
      ...dashboardStats,
      shipments: shipments
    }
  }));

  const shipmentUpdates = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {

      // Randomly either create new shipment or update existing one
      if (Math.random() > 0.5 && shipments.length > 0) {
        const shipment = shipments[Math.floor(Math.random() * shipments.length)];
        const newStatus = ['in_transit', 'delayed', 'delivered'][Math.floor(Math.random() * 3)] as 'in_transit' | 'delayed' | 'delivered';
        
        const updateMessage: WebSocketMessage = {
          type: 'SHIPMENT_UPDATE',
          data: {
            shipmentId: shipment.shipmentId,
            newStatus,
            oldStatus: shipment.status as 'in_transit' | 'delayed' | 'delivered',
            timestamp: new Date().toISOString()
          }
        };
        
        shipment.status = newStatus;
        updateDashboardStats();
        
        ws.send(JSON.stringify(updateMessage));
        ws.send(JSON.stringify({
            type: 'DASHBOARD_UPDATE',
            data: dashboardStats
        }));
      } else {
        const newShipment = generateShipment();
        shipments.push(newShipment);
        updateDashboardStats();
        
        const createMessage: WebSocketMessage = {
          type: 'SHIPMENT_CREATED',
          data: newShipment
        };
        
        ws.send(JSON.stringify(createMessage));
        ws.send(JSON.stringify({
            type: 'DASHBOARD_UPDATE',
            data: dashboardStats
        }));
      }
    }
  }, 5000);

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
    clearInterval(shipmentUpdates);
  });

  ws.on('error', (error) => {
    console.error(`Client error (${clientIp}):`, error);
  });

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