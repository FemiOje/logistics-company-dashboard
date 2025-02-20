export const dashboardData = {
  stats: {
    totalShipments: 42,
    inTransit: 28,
    delayed: 5,
    delivered: 9
  },
  recentUpdates: [
    {
      id: "1",
      shipmentId: "SHIP-12345",
      update: "Departed Chicago facility",
      timestamp: new Date().toISOString(),
      type: "LOCATION_UPDATE"
    }
  ]
};

export const shipments = [
  {
    id: "SHIP-12345",
    status: "in_transit",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    currentLocation: "Denver, CO",
    lastUpdated: new Date().toISOString(),
    estimatedDelivery: "2024-02-17T18:00:00Z",
    value: 12500
  }
];

export const trackingUpdates = [
  {
    id: "1",
    shipmentId: "SHIP-12345",
    timestamp: new Date().toISOString(),
    location: "Denver, CO",
    status: "in_transit",
    lat: 39.7392,
    lng: -104.9903
  }
];

export const reportsData = {
  monthly: {
    labels: ["Jan", "Feb", "Mar"],
    shipments: [45, 52, 48],
    revenue: [125000, 142000, 138000]
  }
};

export const initialSettings = {
  theme: "light",
  notifications: true,
  refreshInterval: 30
};