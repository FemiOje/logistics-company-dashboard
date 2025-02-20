import { useParams } from 'react-router-dom';
import shipments from '../mocks/shipments.json';
import '../styles/ShipmentDetails.css';

const ShipmentDetails = () => {
  const { shipmentId } = useParams();
  const shipment = shipments.shipments.find((s: { shipmentId: string }) => s.shipmentId === shipmentId);

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
        <p>Last Updated: {new Date(shipment.lastUpdated).toLocaleString()}</p>
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
          <p>Value: ${shipment.value.toLocaleString()}</p>
        </div>
        <div>
          <h4>Current Location</h4>
          <p>{shipment.currentLocation.city}, {shipment.currentLocation.state}</p>
          <p>Coordinates: {shipment.currentLocation.latitude}, {shipment.currentLocation.longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;