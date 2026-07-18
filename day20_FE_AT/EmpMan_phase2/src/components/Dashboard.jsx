import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, UserCheck, Building2, ClipboardCheck, 
  CalendarClock, BadgeDollarSign, UserPlus, UserMinus,
  TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: "'Inter', sans-serif",
          size: 12
        },
        color: '#475569'
      }
    }
  }
};

function KpiCard({ title, value, icon, trend, trendValue, colorClass }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className={`kpi-icon-wrap ${colorClass}`}>
          {icon}
        </div>
      </div>
      <div className="kpi-body">
        <span className="kpi-value">{value}</span>
        <div className="kpi-trend">
          {trend === 'up' ? <TrendingUp size={14} className="text-success" /> : 
           trend === 'down' ? <TrendingDown size={14} className="text-danger" /> : 
           <Minus size={14} className="text-muted" />}
          <span className={trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted'}>
            {trendValue}
          </span>
          <span className="kpi-trend-text"> vs last month</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { employees, attendance } = useApp();

  const active = employees.filter(e => e.status === 'Active').length;
  const total = employees.length;
  
  // Calculate attendance numbers
  const presentToday = Object.values(attendance || {}).filter(a => a.status === 'Present').length;
  const attRate = total > 0 ? Math.round((presentToday / total) * 100) : 0;

  // Dept distribution
  const deptMap = {};
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1; });
  const deptLabels = Object.keys(deptMap);
  const deptData = Object.values(deptMap);

  // Growth Data (Mock)
  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Employees',
        data: [120, 125, 128, 132, 140, 145, total],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Attendance Data (Mock)
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Present',
        data: [95, 92, 98, 94, attRate],
        backgroundColor: '#10B981',
      },
      {
        label: 'Absent/Leave',
        data: [5, 8, 2, 6, 100 - attRate],
        backgroundColor: '#E2E8F0',
      }
    ]
  };

  // Dept Doughnut
  const deptChartData = {
    labels: deptLabels,
    datasets: [
      {
        data: deptData,
        backgroundColor: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8', '#1E40AF'],
        borderWidth: 0,
      }
    ]
  };

  // Leave Stats
  const leaveData = {
    labels: ['Annual', 'Sick', 'Casual', 'Maternity'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#F59E0B', '#FCD34D', '#FDE68A', '#FEF3C7'],
        borderWidth: 0,
      }
    ]
  };

  // Payroll Summary
  const payrollData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Payroll Expense ($k)',
        data: [450, 460, 465, 480, 500, 510],
        backgroundColor: '#64748B',
      }
    ]
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Enterprise HRMS Analytics & Metrics</p>
        </div>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <KpiCard 
          title="Total Employees" value={total} icon={<Users size={20} />} 
          trend="up" trendValue="+5%" colorClass="text-primary bg-primary-light" 
        />
        <KpiCard 
          title="Active Employees" value={active} icon={<UserCheck size={20} />} 
          trend="up" trendValue="+2%" colorClass="text-success bg-success-light" 
        />
        <KpiCard 
          title="Departments" value={deptLabels.length} icon={<Building2 size={20} />} 
          trend="flat" trendValue="0" colorClass="text-purple bg-purple-light" 
        />
        <KpiCard 
          title="Attendance Rate" value={`${attRate}%`} icon={<ClipboardCheck size={20} />} 
          trend="up" trendValue="+1.2%" colorClass="text-success bg-success-light" 
        />
        <KpiCard 
          title="Pending Leave" value="12" icon={<CalendarClock size={20} />} 
          trend="down" trendValue="-3" colorClass="text-warning bg-warning-light" 
        />
        <KpiCard 
          title="Monthly Payroll" value="$510k" icon={<BadgeDollarSign size={20} />} 
          trend="up" trendValue="+2.1%" colorClass="text-danger bg-danger-light" 
        />
        <KpiCard 
          title="New Hires" value="8" icon={<UserPlus size={20} />} 
          trend="up" trendValue="+4" colorClass="text-primary bg-primary-light" 
        />
        <KpiCard 
          title="Resigned" value="2" icon={<UserMinus size={20} />} 
          trend="down" trendValue="-1" colorClass="text-muted bg-muted-light" 
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Employee Growth</h3>
          <div className="chart-container">
            <Line data={growthData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Attendance Trends</h3>
          <div className="chart-container">
            <Bar data={attendanceData} options={{...chartOptions, scales: { x: { stacked: true }, y: { stacked: true } }}} />
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Department Distribution</h3>
          <div className="chart-container">
            <Doughnut data={deptChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Leave Statistics</h3>
          <div className="chart-container">
            <Pie data={leaveData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Payroll Summary</h3>
          <div className="chart-container">
            <Bar data={payrollData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Recent Activities</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon bg-primary-light text-primary"><UserPlus size={14} /></div>
              <div className="activity-details">
                <p className="activity-text"><strong>Sarah Jenkins</strong> joined as Senior Developer</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon bg-warning-light text-warning"><CalendarClock size={14} /></div>
              <div className="activity-details">
                <p className="activity-text"><strong>Mike Ross</strong> applied for Annual Leave</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon bg-success-light text-success"><BadgeDollarSign size={14} /></div>
              <div className="activity-details">
                <p className="activity-text">Payroll for <strong>June 2026</strong> approved</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
