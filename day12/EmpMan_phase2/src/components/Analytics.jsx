import { useApp } from '../context/AppContext';
import './Analytics.css';

const getBarHeight = (value, max) => `${Math.max(4, (value / max) * 180)}px`;
const departmentColors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316'];

export default function Analytics() {
  const { employees } = useApp();

  // Department breakdown
  const deptMap = {};
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1; });
  const deptEntries = Object.entries(deptMap).sort((a,b) => b[1] - a[1]);
  const deptMax = Math.max(...deptEntries.map(([,v]) => v));

  // Status breakdown
  const statusMap = { Active: 0, 'On Leave': 0, Inactive: 0 };
  employees.forEach(e => { statusMap[e.status] = (statusMap[e.status] || 0) + 1; });

  // Salary ranges
  const salaryRanges = [
    { label: '<60K', min: 0, max: 60000 },
    { label: '60-80K', min: 60000, max: 80000 },
    { label: '80-100K', min: 80000, max: 100000 },
    { label: '100-120K', min: 100000, max: 120000 },
    { label: '>120K', min: 120000, max: Infinity },
  ];
  const salaryData = salaryRanges.map(r => ({
    label: r.label,
    value: employees.filter(e => e.salary >= r.min && e.salary < r.max).length,
  }));
  const salaryMax = Math.max(...salaryData.map(d => d.value));

  // Performance distribution
  const perfRanges = [
    { label: 'Excellent\n(90-100)', min: 90, color: '#10b981' },
    { label: 'Good\n(75-89)',   min: 75, max: 90, color: '#6366f1' },
    { label: 'Average\n(60-74)', min: 60, max: 75, color: '#f59e0b' },
    { label: 'Below\n(<60)',    min: 0,  max: 60, color: '#ef4444' },
  ];
  const perfData = perfRanges.map(r => ({
    ...r,
    value: employees.filter(e => e.performance >= r.min && (r.max === undefined || e.performance < r.max)).length,
  }));
  const perfMax = Math.max(...perfData.map(d => d.value), 1);

  // Shift distribution
  const shiftMap = { Morning: 0, Evening: 0, Night: 0 };
  employees.forEach(e => { shiftMap[e.shift] = (shiftMap[e.shift] || 0) + 1; });

  // Salary stats
  const salaries = employees.map(e => e.salary).filter(Boolean);
  const avgSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
  const maxSalary = Math.max(...salaries);
  const minSalary = Math.min(...salaries);

  // Avg performance
  const avgPerf = Math.round(employees.reduce((a, e) => a + e.performance, 0) / employees.length);

  // Top departments by avg performance
  const deptPerf = {};
  employees.forEach(e => {
    if (!deptPerf[e.department]) deptPerf[e.department] = [];
    deptPerf[e.department].push(e.performance);
  });
  const deptPerfAvg = Object.entries(deptPerf).map(([dept, perfs]) => ({
    dept,
    avg: Math.round(perfs.reduce((a,b)=>a+b,0)/perfs.length),
    count: perfs.length
  })).sort((a,b) => b.avg - a.avg);

  return (
    <div className="analytics animate-fade-in">
      <div className="analytics-header">
        <div>
          <h1 className="dashboard-title">Analytics & Insights</h1>
          <p className="dashboard-subtitle">Data-driven workforce intelligence</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="analytics-stats-row">
        {[
          { label: 'Total Employees', value: employees.length, icon: '👥', color: '#6366f1' },
          { label: 'Avg Performance', value: `${avgPerf}%`, icon: '🎯', color: '#10b981' },
          { label: 'Avg Salary', value: `$${Math.round(avgSalary/1000)}K`, icon: '💰', color: '#f59e0b' },
          { label: 'Departments', value: deptEntries.length, icon: '🏢', color: '#06b6d4' },
          { label: 'Active Rate', value: `${Math.round(statusMap.Active / employees.length * 100)}%`, icon: '✅', color: '#ec4899' },
        ].map((s, i) => (
          <div key={i} className="analytics-stat-card card">
            <div className="analytics-stat-icon" style={{ color: s.color, fontSize: 24 }}>{s.icon}</div>
            <div className="analytics-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="analytics-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="analytics-charts-row">
        {/* Department Bar Chart */}
        <div className="analytics-chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Department Headcount</h3>
              <p className="chart-sub">Employees per department</p>
            </div>
          </div>
          <div className="bar-chart-container">
            {deptEntries.map(([dept, count], i) => (
              <div key={dept} className="bar-group">
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      height: getBarHeight(count, deptMax),
                      background: departmentColors[i % departmentColors.length],
                      boxShadow: `0 4px 12px ${departmentColors[i % departmentColors.length]}44`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                    data-tooltip={`${dept}: ${count}`}
                  />
                </div>
                <span className="bar-label">{dept.slice(0,4)}</span>
                <span className="bar-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="analytics-chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Performance Distribution</h3>
              <p className="chart-sub">Employee performance tiers</p>
            </div>
          </div>
          <div className="perf-chart">
            {perfData.map((p, i) => (
              <div key={i} className="perf-item">
                <div className="perf-label-row">
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.label.replace('\n', ' ')}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.value}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(p.value / employees.length) * 100}%`, background: p.color }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{Math.round(p.value / employees.length * 100)}% of workforce</span>
              </div>
            ))}
          </div>
          <div className="perf-avg-badge">
            <span>🎯</span>
            <span>Company Average: <strong>{avgPerf}%</strong></span>
          </div>
        </div>

        {/* Shift Distribution */}
        <div className="analytics-chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Shift Distribution</h3>
              <p className="chart-sub">Preferred shift breakdown</p>
            </div>
          </div>
          <div className="shift-dist">
            {Object.entries(shiftMap).map(([shift, count]) => {
              const pct = Math.round(count / employees.length * 100);
              const colors = { Morning: '#10b981', Evening: '#f59e0b', Night: '#6366f1' };
              const icons = { Morning: '☀️', Evening: '🌆', Night: '🌙' };
              return (
                <div key={shift} className="shift-dist-item">
                  <div className="shift-dist-header">
                    <span>{icons[shift]} {shift}</span>
                    <span style={{ fontWeight: 700, color: colors[shift] }}>{count} ({pct}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: colors[shift] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Salary range mini viz */}
          <div style={{ marginTop: 20 }}>
            <p className="chart-sub" style={{ marginBottom: 12 }}>💰 Salary Range Distribution</p>
            <div className="salary-bars">
              {salaryData.map((d, i) => (
                <div key={i} className="salary-bar-group">
                  <div className="salary-bar-track">
                    <div
                      className="salary-bar-fill"
                      style={{ height: `${(d.value / Math.max(salaryMax, 1)) * 60}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                  <span className="salary-bar-label">{d.label}</span>
                  <span className="salary-bar-val">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="card" style={{ padding: 24 }}>
        <div className="chart-header">
          <h3 className="chart-title">Department Performance Rankings</h3>
          <span className="badge badge-primary">{deptPerfAvg.length} Departments</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Avg Performance</th>
              <th>Score Bar</th>
            </tr>
          </thead>
          <tbody>
            {deptPerfAvg.map((d, i) => (
              <tr key={d.dept}>
                <td>
                  <span style={{ fontWeight: 700, color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#f97316' : 'var(--text-muted)' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`}
                  </span>
                </td>
                <td><span className="badge badge-primary">{d.dept}</span></td>
                <td style={{ fontWeight: 600 }}>{d.count}</td>
                <td>
                  <span style={{ fontWeight: 700, color: d.avg >= 90 ? '#10b981' : d.avg >= 75 ? '#f59e0b' : '#ef4444' }}>
                    {d.avg}%
                  </span>
                </td>
                <td style={{ width: 160 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${d.avg}%`, background: d.avg >= 90 ? 'var(--gradient-success)' : d.avg >= 75 ? 'var(--gradient-warning)' : 'var(--gradient-danger)' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Summary Card */}
      <div className="salary-summary-grid">
        {[
          { label: 'Average Salary', value: `$${avgSalary.toLocaleString()}`, icon: '📊', color: '#6366f1' },
          { label: 'Highest Salary', value: `$${maxSalary.toLocaleString()}`, icon: '🔝', color: '#10b981' },
          { label: 'Lowest Salary', value: `$${minSalary.toLocaleString()}`, icon: '🔽', color: '#f59e0b' },
          { label: 'Total Payroll', value: `$${(salaries.reduce((a,b)=>a+b,0)/1000).toFixed(0)}K`, icon: '💵', color: '#ec4899' },
        ].map((s, i) => (
          <div key={i} className="salary-stat-card card">
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
