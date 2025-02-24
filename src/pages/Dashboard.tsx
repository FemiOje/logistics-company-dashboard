import { useWebSocketData } from '../hooks/useWebSocketData';
import '../styles/Dashboard.css';
import { DashboardStats } from '../types/types';

const Dashboard = () => {
  const initialStats: DashboardStats = {
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0,
    shipments: []
  };

  const { data: stats, isConnected } = useWebSocketData<DashboardStats>(initialStats);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {isConnected ? (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Shipments</h3>
            <p>{stats.totalShipments}</p>
          </div>
          
          <div className="stat-card">
            <h3>In Transit</h3>
            <p>{stats.in_transit}</p>
          </div>
          
          <div className="stat-card">
            <h3>Delayed</h3>
            <p>{stats.delayed}</p>
          </div>
          
          <div className="stat-card">
            <h3>Delivered</h3>
            <p>{stats.delivered}</p>
          </div>
        </div>
      ) : (
        <div>Connecting to server...</div>
      )}
    </div>
  );
};

export default Dashboard;