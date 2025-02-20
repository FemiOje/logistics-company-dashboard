import { dashboardData } from '../mocks/data';
import '../styles/Components.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {Object.entries(dashboardData.stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{value}</h3>
            <p>{key.replace(/_/g, ' ')}</p>
          </div>
        ))}
      </div>
      
      <div className="recent-updates">
        <h2>Recent Updates</h2>
        {dashboardData.recentUpdates.map(update => (
          <div key={update.id} className="update-card">
            <p>{new Date(update.timestamp).toLocaleTimeString()}</p>
            <p>{update.shipmentId} - {update.update}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;