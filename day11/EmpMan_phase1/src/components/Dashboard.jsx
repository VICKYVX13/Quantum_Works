import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const getAvatarColor = (name) => {
  const colors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

function AnimatedNumber({ target, duration = 1500 }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCurrent(target); clearInterval(timer); }
      else setCurrent(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{current.toLocaleString()}</span>;
}

function KpiCard({ icon, label, value, change, changeType, gradient, delay }) {
  return (
    <div className="kpi-card card" style={{ animationDelay: `${delay}s` }}>
      <div className="kpi-card-header">
        <div className="kpi-icon" style={{ background: gradient }}>
          <span>{icon}</span>
        </div>
        <div className={`kpi-change ${changeType}`}>
          {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '–'} {change}
        </div>
      </div>
      <div className="kpi-value">
        <AnimatedNumber target={value} />
      </div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function MiniBarChart({ data, color }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="mini-bar-chart">
      {data.map((d, i) => (
        <div key={i} className="mini-bar-wrap">
          <div
            className="mini-bar"
            style={{
              height: `${(d.value / max) * 100}%`,
              background: color,
              animationDelay: `${i * 0.08}s`,
            }}
            data-tooltip={`${d.label}: ${d.value}`}
          />
          <span className="mini-bar-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments, size = 120 }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        {segments.map((seg, i) => {
          const dashArr = (seg.value / total) * circ;
          const dashOff = circ - dashArr;
          const startOffset = -(offset / total) * circ;
          offset += seg.value;
          return (
            <circle
              key={i}
              cx="50" cy="50" r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="8"
              strokeDasharray={`${dashArr} ${circ - dashArr}`}
              strokeDashoffset={startOffset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dasharray 1s ease' }}
            />
          );
        })}
        <text x="50" y="46" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="700" fontFamily="var(--font-display)">
          {total}
        </text>
        <text x="50" y="60" textAnchor="middle" fill="var(--text-muted)" fontSize="7">
          Total
        </text>
      </svg>
      <div className="donut-legend">
        {segments.map((seg, i) => (
          <div key={i} className="donut-legend-item">
            <span className="donut-dot" style={{ background: seg.color }} />
            <span className="donut-leg-label">{seg.label}</span>
            <span className="donut-leg-val">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { employees, setActiveView } = useApp();

  const active = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const inactive = employees.filter(e => e.status === 'Inactive').length;
  const total = employees.length;

  // Dept distribution
  const deptMap = {};
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1; });
  const deptData = Object.entries(deptMap).map(([label, value]) => ({ label: label.slice(0,3), value }));

  const departmentColors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316'];

  const donutSegments = [
    { label: 'Active', value: active, color: '#10b981' },
    { label: 'On Leave', value: onLeave, color: '#f59e0b' },
    { label: 'Inactive', value: inactive, color: '#ef4444' },
  ];

  // Recent employees
  const recent = [...employees].sort((a,b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0,5);

  // Top performers
  const topPerformers = [...employees].sort((a,b) => b.performance - a.performance).slice(0,4);

  const kpis = [
    { icon: '👥', label: 'Total Employees', value: total, change: '+2 this month', changeType: 'up', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', delay: 0 },
    { icon: '✅', label: 'Active Staff', value: active, change: `${Math.round(active/total*100)}% of total`, changeType: 'neutral', gradient: 'linear-gradient(135deg,#10b981,#06b6d4)', delay: 0.1 },
    { icon: '🏖️', label: 'On Leave', value: onLeave, change: 'This week', changeType: 'neutral', gradient: 'linear-gradient(135deg,#f59e0b,#f97316)', delay: 0.2 },
    { icon: '🚀', label: 'Avg Performance', value: Math.round(employees.reduce((a,e)=>a+e.performance,0)/total), change: '+3 vs last month', changeType: 'up', gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)', delay: 0.3 },
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Employee', view: 'employees', color: '#6366f1' },
    { icon: '📅', label: 'View Schedule', view: 'schedule', color: '#10b981' },
    { icon: '📊', label: 'Analytics', view: 'analytics', color: '#f59e0b' },
    { icon: '🔔', label: 'Notifications', view: 'notifications', color: '#ef4444' },
  ];

  return (
    <div className="dashboard animate-fade-in">
      {/* Top Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="dashboard-header-actions">
          <div className="current-time-badge">
            <span>📅</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Bar chart */}
        <div className="chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Employees by Department</h3>
              <p className="chart-sub">Distribution across {Object.keys(deptMap).length} departments</p>
            </div>
          </div>
          <MiniBarChart data={deptData} color="var(--gradient-primary)" />
        </div>

        {/* Donut chart */}
        <div className="chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Status Breakdown</h3>
              <p className="chart-sub">Current workforce status</p>
            </div>
          </div>
          <DonutChart segments={donutSegments} size={130} />
        </div>

        {/* Top performers */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="chart-title">Top Performers</h3>
          </div>
          <div className="top-performers">
            {topPerformers.map((emp, i) => (
              <div key={emp.id} className="performer-item">
                <span className="performer-rank">#{i + 1}</span>
                <div className="avatar-placeholder performer-avatar" style={{ background: getAvatarColor(emp.name), width: 36, height: 36, fontSize: 14 }}>
                  {emp.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="performer-info">
                  <span className="performer-name">{emp.name}</span>
                  <span className="performer-dept">{emp.department}</span>
                </div>
                <div className="performer-score-wrap">
                  <span className="performer-score">{emp.performance}%</span>
                  <div className="progress-bar" style={{ width: 60 }}>
                    <div className="progress-fill" style={{ width: `${emp.performance}%`, background: emp.performance >= 90 ? '#10b981' : emp.performance >= 75 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        {/* Recent hires */}
        <div className="recent-card card">
          <div className="chart-header">
            <h3 className="chart-title">Recent Hires</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('employees')}>View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar-placeholder" style={{ background: getAvatarColor(emp.name), width: 32, height: 32, fontSize: 12 }}>
                        {emp.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{emp.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{emp.department}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{emp.joinDate}</td>
                  <td>
                    <span className={`badge ${emp.status === 'Active' ? 'badge-success' : emp.status === 'On Leave' ? 'badge-warning' : 'badge-danger'}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick actions */}
        <div className="quick-actions-card card">
          <h3 className="chart-title" style={{ marginBottom: 16 }}>Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="quick-action-btn"
                onClick={() => setActiveView(a.view)}
                style={{ '--qa-color': a.color }}
                id={`quick-action-${a.view}`}
              >
                <span className="qa-icon">{a.icon}</span>
                <span className="qa-label">{a.label}</span>
              </button>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="summary-stat-label">Departments</span>
              <span className="summary-stat-val">{Object.keys(deptMap).length}</span>
            </div>
            <div className="summary-stat">
              <span className="summary-stat-label">Avg Salary</span>
              <span className="summary-stat-val">${Math.round(employees.reduce((a,e)=>a+e.salary,0)/total/1000)}K</span>
            </div>
            <div className="summary-stat">
              <span className="summary-stat-label">Remote</span>
              <span className="summary-stat-val">34%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
