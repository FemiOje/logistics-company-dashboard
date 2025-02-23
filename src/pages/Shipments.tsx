import { useState } from 'react';
import { Shipment } from '../types/types';
import { Link } from 'react-router-dom';
import shipmentsData from '../mocks/shipments.json';
import '../styles/Shipments.css';

const Shipments = () => {
  const [ shipments ] = useState<Shipment[]>(shipmentsData.shipments);

  const formatStatus = (status: string) => status.toLowerCase().replace(' ', '_');

  return (
    <div className="shipments-list">
      <h1>Active Shipments</h1>
      <div className="shipments-grid">
        {shipments.map((shipment: Shipment) => (
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