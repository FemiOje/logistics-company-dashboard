import { Link } from 'react-router-dom';
import shipments from '../mocks/shipments.json';
import '../styles/Shipments.css';

const Shipments = () => {
  return (
    <div className="shipments-list">
      <h1>Active Shipments</h1>
      <div className="shipments-grid">
        {shipments.shipments.map((shipment: {
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
            <p>Status: {shipment.status}</p>
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