import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebSocketData } from '../hooks/useWebSocketData';
import '../styles/Shipments.css';
import { DashboardStats, Shipment, WebSocketMessage } from '../types/types';

const Shipments = () => {
  const initialStats: DashboardStats = {
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0,
    shipments: []
  };

  const [shipments, setShipments] = useState<Shipment[]>([])

  const { data: stats, sendMessage } = useWebSocketData<DashboardStats>(initialStats);

  const shipmentIdCounter = useRef<number>(1);

  const formatStatus = (status: string) => status.toLowerCase().replace(' ', '_');

  const generateAndSendNewShipment = useCallback(() => {
    const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL'];
    const originIndex = Math.floor(Math.random() * cities.length);
    const originCity = cities[originIndex];
    let destinationCity;

    do {
      destinationCity = cities[Math.floor(Math.random() * cities.length)];
    } while (destinationCity === originCity);

    const statusOptions = ['in_transit', 'delayed', 'delivered'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)] as typeof statusOptions[number];
    const newShipmentId = `SHIP-${shipmentIdCounter.current.toString().padStart(4, '0')}`;

    shipmentIdCounter.current++;

    const newShipment: Shipment = {
      shipmentId: newShipmentId,
      status,
      origin: {
        name: originCity,
        address: originCity,
        timestamp: new Date().toISOString()
      },
      destination: {
        name: destinationCity,
        address: destinationCity,
        estimatedDelivery: new Date().toISOString()
      }
    };

    const createMessage: WebSocketMessage = {
      type: 'SHIPMENT_CREATED',
      data: newShipment
    };

    sendMessage(createMessage);
  }, [sendMessage]);

  const removeRandomShipment = useCallback(() => {
    if (shipments.length === 0) return;

    const randomIndex = Math.floor(Math.random() * shipments.length);
    const shipmentToDelete = shipments[randomIndex];

    const deleteMessage: WebSocketMessage = {
      type: 'SHIPMENT_DELETED',
      data: { shipmentId: shipmentToDelete.shipmentId }
    };

    sendMessage(deleteMessage);

  }, [sendMessage, shipments]);

  useEffect(() => {
    const creationInterval = setInterval(generateAndSendNewShipment, 5000);
    const removalInterval = setInterval(removeRandomShipment, 7500);

    return () => {
      clearInterval(creationInterval);
      clearInterval(removalInterval);
    };
  }, [generateAndSendNewShipment, removeRandomShipment]);

  useEffect(() => {
    if (stats && Array.isArray(stats?.shipments)) {
      setShipments(stats.shipments);
    }
  }, [stats]);

  return (
    <div className="shipments-list">
      <h1>Active Shipments</h1>
      <div className="shipments-grid">
        {shipments.map(shipment => (
          <div key={shipment.shipmentId} className="shipment-card">
            <h3>{shipment.shipmentId}</h3>
            <p className={`status ${formatStatus(shipment.status)}`}>
              Status: {shipment.status}
            </p>
            <p>From: {shipment.origin.address}</p>
            <p>To: {shipment.destination.address}</p>
            <Link to={`/shipments/${shipment.shipmentId}`} className="button-text">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shipments;