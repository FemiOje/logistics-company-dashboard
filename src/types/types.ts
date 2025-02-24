export type Shipment = {
  shipmentId: string,
  status: string,
  origin: { name: string, address: string, timestamp: string },
  destination: { name: string, address: string, estimatedDelivery: string },
  currentLocation?: {
    latitude: number,
    longitude: number,
    city: string,
    state: string
  },
  carrier?: string,
  weight?: number,
  value?: number,
  lastUpdated?: string,
};

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export type WebSocketMessage =
  | {
    type: 'SHIPMENT_CREATED';
    data: Shipment;
  }
  | {
    type: 'SHIPMENT_DELETED';
    data: { shipmentId: string };
  }
  | {
    type: 'SHIPMENT_UPDATE';
    data: StatusUpdateData;
  }
  | {
    type: 'CONNECTION_ACK';
    data: boolean;
  } | {
    type: 'DASHBOARD_UPDATE';
    data: DashboardStats;
  };

export interface StatusUpdateData {
  shipmentId: string;
  newStatus: 'in_transit' | 'delayed' | 'delivered';
  timestamp: string;
  oldStatus?: 'in_transit' | 'delayed' | 'delivered';
}

export type WebSocketContextType = {
  shipments: Shipment[];
  stats: DashboardStats;
  recentUpdates: RecentUpdate[];
  sendMessage: (message: string) => void;
};

export interface DashboardStats {
  totalShipments: number;
  in_transit: number;
  delayed: number;
  delivered: number;
  shipments: Shipment[]
}

export interface RecentUpdate {
  id: string;
  shipmentId: string;
  update: string;
  timestamp: string;
  type: 'SHIPMENT_CREATED' | 'SHIPMENT_UPDATE' | 'SHIPMENT_DELETED' | 'DASHBOARD_UPDATE' | 'CONNECTION_ACK';
}