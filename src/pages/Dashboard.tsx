import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from '../providers/WebSocketProvider';
import { WebSocketMessage, DashboardStats, StatusUpdateData, RecentUpdate } from '../types/types';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0
  });
  
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  const handleMessage = useCallback((msg: WebSocketMessage) => {
    if (msg.type === 'STATUS_UPDATE' && 
        msg.data && 
        typeof msg.data.status === 'string' && 
        msg.data.status in stats) {
      const data = msg.data as StatusUpdateData;
      setStats(prev => ({
        ...prev,
        [data.status]: prev[data.status] + 1,
      }));
      
      setRecentUpdates(prev => [
        {
          id: Date.now().toString(),
          shipmentId: data.shipmentId,
          update: `Status changed to ${data.status}`,
          timestamp: data.timestamp,
          type: 'STATUS_UPDATE'
        },
        ...prev.slice(0, 9)
      ]);
    }
  }, [stats]);

  useEffect(() => {
    subscribe(handleMessage);
    return () => unsubscribe(handleMessage);
  }, [subscribe, unsubscribe, handleMessage]);

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