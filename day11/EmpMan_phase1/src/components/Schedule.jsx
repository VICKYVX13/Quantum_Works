import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weekDays, shiftColors } from '../data/employees';
import './Schedule.css';

export default function Schedule() {
  const { employees, schedule, updateShift } = useApp();
  const [filterDept, setFilterDept] = useState('');
  const [search, setSearch] = useState('');
  const [editingCell, setEditingCell] = useState(null); // {empId, day}

  const shifts = ['Morning', 'Evening', 'Night', 'Off'];

  const departments = [...new Set(employees.map(e => e.department))].sort();

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase())) &&
    (!filterDept || e.department === filterDept)
  );

  const shiftCounts = {};
  weekDays.forEach(day => {
    shiftCounts[day] = { Morning: 0, Evening: 0, Night: 0, Off: 0 };
    employees.forEach(e => {
      const s = schedule[e.id]?.[day] || 'Off';
      shiftCounts[day][s]++;
    });
  });

  return (
    <div className="schedule animate-fade-in">
      {/* Header */}
      <div className="schedule-header">
        <div>
          <h1 className="dashboard-title">Schedule Manager</h1>
          <p className="dashboard-subtitle">Weekly shift assignments for all employees</p>
        </div>
      </div>

      {/* Shift Summary Cards */}
      <div className="shift-summary">
        {shifts.map(shift => {
          const cfg = shiftColors[shift];
          const total = Object.values(shiftCounts).reduce((sum, day) => sum + (day[shift] || 0), 0);
          const icon = shift === 'Morning' ? '☀️' : shift === 'Evening' ? '🌆' : shift === 'Night' ? '🌙' : '🔴';
          return (
            <div key={shift} className="shift-card card" style={{ borderColor: cfg.border }}>
              <div className="shift-card-icon" style={{ background: cfg.bg, color: cfg.color }}>{icon}</div>
              <div className="shift-card-info">
                <span className="shift-card-label">{shift} Shift</span>
                <span className="shift-card-count" style={{ color: cfg.color }}>{total}</span>
                <span className="shift-card-sub">assignments this week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="schedule-legend card">
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Shift Types:</span>
        {shifts.map(shift => {
          const cfg = shiftColors[shift];
          return (
            <div key={shift} className="legend-item" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <span style={{ color: cfg.color, fontSize: 12, fontWeight: 700 }}>{shift}</span>
            </div>
          );
        })}
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          💡 Click any cell to change shift
        </span>
      </div>

      {/* Filters */}
      <div className="empdb-filters card" style={{ marginBottom: 0 }}>
        <div className="input-group" style={{ flex: 2 }}>
          <span className="input-icon">🔍</span>
          <input className="input" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} id="schedule-search" />
        </div>
        <select className="input" style={{ flex: 1 }} value={filterDept} onChange={e => setFilterDept(e.target.value)} id="schedule-dept-filter">
          <option value="">All Departments</option>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Schedule Grid */}
      <div className="schedule-table-wrap card">
        <div className="schedule-scroll">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="emp-col">Employee</th>
                {weekDays.map(day => (
                  <th key={day} className={`day-col ${day === 'Sat' || day === 'Sun' ? 'weekend' : ''}`}>
                    <div className="day-header">
                      <span className="day-name">{day}</span>
                      <div className="day-counts">
                        {shifts.slice(0,3).map(s => (
                          <span key={s} className="day-count-dot" style={{ background: shiftColors[s].color }}
                            data-tooltip={`${s}: ${shiftCounts[day]?.[s] || 0}`}
                          />
                        ))}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td className="emp-info-cell">
                    <div className="schedule-emp-name">{emp.name}</div>
                    <div className="schedule-emp-dept">{emp.department}</div>
                  </td>
                  {weekDays.map(day => {
                    const shift = schedule[emp.id]?.[day] || 'Off';
                    const cfg = shiftColors[shift];
                    const isEditing = editingCell?.empId === emp.id && editingCell?.day === day;
                    return (
                      <td key={day} className={`shift-cell ${day === 'Sat' || day === 'Sun' ? 'weekend-cell' : ''}`}>
                        {isEditing ? (
                          <select
                            className="shift-select"
                            value={shift}
                            autoFocus
                            onChange={e => {
                              updateShift(emp.id, day, e.target.value);
                              setEditingCell(null);
                            }}
                            onBlur={() => setEditingCell(null)}
                          >
                            {shifts.map(s => <option key={s}>{s}</option>)}
                          </select>
                        ) : (
                          <button
                            className="shift-pill"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                            onClick={() => setEditingCell({ empId: emp.id, day })}
                            id={`shift-${emp.id}-${day}`}
                          >
                            {shift === 'Morning' ? '☀️' : shift === 'Evening' ? '🌆' : shift === 'Night' ? '🌙' : '–'}
                            {shift}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
