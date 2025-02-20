import { reportsData } from '../mocks/data';

const Reports = () => {
  return (
    <div className="reports">
      <h1>Reports</h1>
      <div className="chart-container">
        <h3>Monthly Shipments</h3>
        <div className="chart">
          {reportsData.monthly.shipments.map((count, index) => (
            <div key={index} className="chart-bar">
              <div className="bar" style={{ height: `${count}%` }}></div>
              <span>{reportsData.monthly.labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
