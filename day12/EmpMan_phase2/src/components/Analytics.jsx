import { useApp } from '../context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale
);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { font: { family: "'Inter', sans-serif", size: 12 }, color: '#475569' }
    }
  }
};

export default function Analytics() {
  const { employees } = useApp();

  const total = employees.length;
  const active = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const inactive = employees.filter(e => e.status === 'Inactive').length;

  // Department distribution
  const deptMap = {};
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1; });
  const deptLabels = Object.keys(deptMap);
  const deptValues = Object.values(deptMap);

  // Employee Growth (mock)
  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Headcount',
      data: [110, 115, 120, 128, 135, 142, total],
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37,99,235,0.1)',
      fill: true, tension: 0.4
    }]
  };

  // Hiring Trends (mock)
  const hiringData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      { label: 'New Hires', data: [5, 8, 3, 7, 9, 6, 8], backgroundColor: '#10B981' },
      { label: 'Resignations', data: [2, 1, 3, 2, 1, 4, 2], backgroundColor: '#EF4444' }
    ]
  };

  // Department Distribution
  const deptChartData = {
    labels: deptLabels,
    datasets: [{
      data: deptValues,
      backgroundColor: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8', '#1E40AF', '#BFDBFE'],
      borderWidth: 0
    }]
  };

  // Status Breakdown
  const statusData = {
    labels: ['Active', 'On Leave', 'Inactive'],
    datasets: [{
      data: [active, onLeave, inactive],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  };

  // Salary Distribution
  const salaryRanges = [
    { label: '<60K', min: 0, max: 60000 },
    { label: '60-80K', min: 60000, max: 80000 },
    { label: '80-100K', min: 80000, max: 100000 },
    { label: '100-120K', min: 100000, max: 120000 },
    { label: '>120K', min: 120000, max: Infinity },
  ];
  const salaryDistData = {
    labels: salaryRanges.map(r => r.label),
    datasets: [{
      label: 'Employees',
      data: salaryRanges.map(r => employees.filter(e => e.salary >= r.min && e.salary < r.max).length),
      backgroundColor: '#64748B'
    }]
  };

  // Performance Distribution
  const performanceData = {
    labels: ['Excellent (90-100)', 'Good (75-89)', 'Average (60-74)', 'Below (<60)'],
    datasets: [{
      data: [
        employees.filter(e => e.performance >= 90).length,
        employees.filter(e => e.performance >= 75 && e.performance < 90).length,
        employees.filter(e => e.performance >= 60 && e.performance < 75).length,
        employees.filter(e => e.performance < 60).length,
      ],
      backgroundColor: ['#10B981', '#2563EB', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  };

  // Gender Ratio (mock)
  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      data: [Math.round(total * 0.55), Math.round(total * 0.42), Math.round(total * 0.03)],
      backgroundColor: ['#2563EB', '#8B5CF6', '#F59E0B'],
      borderWidth: 0
    }]
  };

  // Attrition Rate (mock)
  const attritionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Attrition Rate (%)',
      data: [2.1, 1.8, 3.2, 1.5, 2.8, 2.0],
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239,68,68,0.1)',
      fill: true, tension: 0.4
    }]
  };

  // Dept Avg Performance
  const deptPerfData = {
    labels: deptLabels,
    datasets: [{
      label: 'Avg Performance (%)',
      data: deptLabels.map(dept => {
        const deptEmps = employees.filter(e => e.department === dept);
        return deptEmps.length > 0 ? Math.round(deptEmps.reduce((sum, e) => sum + e.performance, 0) / deptEmps.length) : 0;
      }),
      backgroundColor: '#2563EB'
    }]
  };

  const salaries = employees.map(e => e.salary).filter(Boolean);
  const avgSalary = salaries.length > 0 ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) : 0;
  const avgPerf = employees.length > 0 ? Math.round(employees.reduce((a, e) => a + e.performance, 0) / employees.length) : 0;

  return (
    <div className="analytics-module">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Analytics</h1>
          <p className="dashboard-subtitle">Workforce insights, trends, and performance metrics</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-title">Total Employees</span></div>
          <div className="kpi-body"><span className="kpi-value">{total}</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-title">Avg Salary</span></div>
          <div className="kpi-body"><span className="kpi-value">${avgSalary.toLocaleString()}</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-title">Avg Performance</span></div>
          <div className="kpi-body"><span className="kpi-value">{avgPerf}%</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-title">Departments</span></div>
          <div className="kpi-body"><span className="kpi-value">{deptLabels.length}</span></div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Employee Growth</h3>
          <div className="chart-container"><Line data={growthData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Hiring Trends</h3>
          <div className="chart-container"><Bar data={hiringData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Department Distribution</h3>
          <div className="chart-container"><Doughnut data={deptChartData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Employee Status Breakdown</h3>
          <div className="chart-container"><Doughnut data={statusData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Salary Distribution</h3>
          <div className="chart-container"><Bar data={salaryDistData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Performance Distribution</h3>
          <div className="chart-container"><Doughnut data={performanceData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Gender Ratio</h3>
          <div className="chart-container"><Doughnut data={genderData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Attrition Rate Trend</h3>
          <div className="chart-container"><Line data={attritionData} options={chartDefaults} /></div>
        </div>
        <div className="chart-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="chart-title">Department Performance Comparison</h3>
          <div className="chart-container"><Bar data={deptPerfData} options={chartDefaults} /></div>
        </div>
      </div>
    </div>
  );
}
