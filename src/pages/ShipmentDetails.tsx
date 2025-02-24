import { useParams } from 'react-router-dom';
import '../styles/ShipmentDetails.css';
import { useWebSocketData } from '../hooks/useWebSocketData';
import { DashboardStats, Shipment } from '../types/types';
import { useEffect, useState } from 'react';

const ShipmentDetails = () => {
  const initialStats: DashboardStats = {
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0,
    shipments: []
  };

  const [shipment, setShipment] = useState<Shipment | undefined>(undefined)

  const { data: stats } = useWebSocketData<DashboardStats>(initialStats);

  const { shipmentId } = useParams();

  useEffect(() => {
    if (stats && Array.isArray(stats?.shipments)) {
      const foundShipment = stats.shipments.find((s: Shipment) => s.shipmentId === shipmentId);
      setShipment(foundShipment);
    }
  }, [stats, shipmentId])


  if (!shipment) {
    return <div>Shipment not found</div>;
  }

  return (
    <div className="shipment-details">
      <h2>Shipment {shipment.shipmentId}</h2>
      <div className="status-card" data-status={shipment.status}>
        <h3>
          {shipment.status === 'In Transit' && '🚚'}
          {shipment.status === 'Delayed' && '⚠️'}
          {shipment.status === 'Delivered' && '✅'}
          Current Status: {shipment.status}
        </h3>
      </div>
      <div className="details-grid">
        <div>
          <h4>Origin</h4>
          <p>{shipment.origin.name}</p>
          <p>{shipment.origin.address}</p>
        </div>
        <div>
          <h4>Destination</h4>
          <p>{shipment.destination.name}</p>
          <p>{shipment.destination.address}</p>
        </div>
        <div>
          <h4>Carrier Information</h4>
          <p>Carrier: {shipment.carrier}</p>
          <p>Weight: {shipment.weight} kg</p>
          <p>Value: ${shipment.value?.toLocaleString()}</p>
        </div>
        {shipment.currentLocation &&
          <div>
            <h4>Current Location</h4>
            <p>{shipment.currentLocation?.city}, {shipment.currentLocation?.state}</p>
            <p>Coordinates: {shipment.currentLocation?.latitude}, {shipment.currentLocation?.longitude}</p>
          </div>
        }

      </div>
    </div>
  );
};

export default ShipmentDetails;