import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from '../providers/WebSocketProvider';
import { Shipment } from '../types/types';
import { Link } from 'react-router-dom';
import shipmentsData from '../mocks/shipments.json';
import { WebSocketMessage } from '../types/types';
import '../styles/Shipments.css';

const Shipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>(shipmentsData.shipments);
  const { subscribe, unsubscribe } = useWebSocket();

  const handleMessage = useCallback((msg: WebSocketMessage) => {
    if (msg.type === 'STATUS_UPDATE') {
      setShipments(prev => prev.map(shipment =>
        shipment.shipmentId === msg.data.shipmentId
          ? { ...shipment, ...msg.data }
          : shipment
      ));
    }
  }, [setShipments]);

  useEffect(() => {
    subscribe(handleMessage);

    return () => {
      unsubscribe(handleMessage);
    };
  }, [subscribe, unsubscribe, handleMessage]);

  useEffect(() => {
    const handleMessage = (msg: WebSocketMessage) => {
      if (msg.type === 'STATUS_UPDATE') {
        setShipments(prev => prev.map(shipment =>
          shipment.shipmentId === msg.data.shipmentId
            ? { ...shipment, ...msg.data }
            : shipment
        ));
      }
    };

    subscribe(handleMessage);
  }, [subscribe]);

  const formatStatus = (status: string) => status.toLowerCase().replace(' ', '_');

  return (
    <div className="shipments-list">
      <h1>Active Shipments</h1>
      <div className="shipments-grid">
        {shipments.map((shipment: {
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
        }) => (
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