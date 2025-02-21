export type Shipment = {
    shipmentId: string,
    status: string,
    origin: { name: string, address: string, timestamp: string },
    destination: { name: string, address: string, estimatedDelivery: string },
    currentLocation: {
        latitude: number,
        longitude: number,
        city: string,
        state: string
    },
    carrier: string,
    weight: number,
    value: number,
    lastUpdated: string,
};

export type WebSocketMessage = {
    type: 'STATUS_UPDATE';
    data: StatusUpdateData;
};

export type WebSocketContextType = {
    subscribe: (callback: (msg: WebSocketMessage) => void) => void;
    unsubscribe: (callback: (msg: WebSocketMessage) => void) => void;
};

export interface DashboardStats {
    totalShipments: number;
    in_transit: number;
    delayed: number;
    delivered: number;
}

export interface StatusUpdateData {
    status: 'in_transit' | 'delayed' | 'delivered';
    shipmentId: string;
    timestamp: string;
}

export interface RecentUpdate {
    id: string;
    shipmentId: string;
    update: string;
    timestamp: string;
    type: 'STATUS_UPDATE';
}