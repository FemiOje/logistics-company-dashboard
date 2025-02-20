// import { StatItem } from './StatItem';

interface DashboardStats {
  totalShipments: number;
  inTransit: number;
  delayed: number;
  onTimePercentage: number;
}

interface StatItemProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

export const DashboardStats = ({ stats }: { stats: DashboardStats }) => {
  return (
    <div className="stats-grid">
      <StatItem
        title="Total Shipments"
        value={stats.totalShipments}
        icon="📦"
        trend="+12% from last month"
      />
      <StatItem
        title="In Transit"
        value={stats.inTransit}
        icon="🚚"
        color="var(--status-in-transit-bg)"
      />
      <StatItem
        title="Delayed"
        value={stats.delayed}
        icon="⚠️"
        color="var(--status-delayed-bg)"
      />
      <StatItem
        title="On-Time Rate"
        value={`${stats.onTimePercentage}%`}
        icon="⏱️"
        trend="2% improvement"
      />
    </div>
  );
};

export const StatItem = ({ title, value, icon, trend }: StatItemProps) => (
  <div className="stat-card" style={{ backgroundColor: 'var(--background-primary)' }}>
    <div className="stat-header">
      <span className="stat-icon">{icon}</span>
      <h3>{title}</h3>
    </div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  </div>
);