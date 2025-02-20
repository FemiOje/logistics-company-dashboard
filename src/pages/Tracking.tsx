import { trackingUpdates } from '../mocks/data';

const Tracking = () => {
  return (
    <div className="tracking">
      <h1>Tracking</h1>
      <div className="timeline">
        {trackingUpdates.map(update => (
          <div key={update.id} className="timeline-event">
            <div className="timestamp">
              {new Date(update.timestamp).toLocaleTimeString()}
            </div>
            <div className="event-details">
              <h4>{update.location}</h4>
              <p>{update.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
