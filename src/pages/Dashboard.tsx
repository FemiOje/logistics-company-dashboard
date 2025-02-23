import { useState } from 'react';
import { DashboardStats, RecentUpdate } from '../types/types';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats ] = useState<DashboardStats>({
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0
  });
  
  const [recentUpdates ] = useState<RecentUpdate[]>([]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{value}</h3>
            <p>{key.replace(/_/g, ' ')}</p>
          </div>
        ))}
      </div>
      
      <div className="recent-updates">
        <h2>Recent Updates</h2>
        {recentUpdates.map(update => (
          <div key={update.id} className="update-card">
            <div className="update-header">
              <span className={`status ${update.type.toLowerCase()}`}>
                {update.type}
              </span>
              <span className="update-time">
                {new Date(update.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p>{update.shipmentId} - {update.update}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;