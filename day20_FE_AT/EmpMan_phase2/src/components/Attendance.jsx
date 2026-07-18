import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weekDays } from '../data/employees';
import { 
  CheckCircle, XCircle, Clock, BarChart2, AlertCircle, Search, CalendarDays, Users
} from 'lucide-react';
import './Attendance.css';

const getAvatarColor = (name) => {
  const colors = ['#2563EB', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function Attendance() {
  const { employees, attendance, schedule } = useApp();
  const [activeTab, setActiveTab] = useState('attendance');
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const todayDay = weekDays[new Date().getDay() - 1] || 'Mon';
  const departments = [...new Set(employees.map(e => e.department))].sort();

  const totalEmployeesCount = employees.length;
  const presentCount = Object.values(attendance).filter(a => a.status === 'Present').length;
  const absentCount = totalEmployeesCount - presentCount;
  const presentRate = totalEmployeesCount > 0 ? Math.round((presentCount / totalEmployeesCount) * 100) : 0;

  const filteredRoster = employees.filter(emp => {
    const record = attendance[emp.id] || { status: 'Absent', checkInTime: null, reason: 'Not Checked In' };
    const empStatus = record.status.toLowerCase();
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !filterDept || emp.department === filterDept;
    const matchesStatus = filterStatus === 'all' || empStatus === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, empName: 'Alice Smith', type: 'Annual', from: '2026-07-15', to: '2026-07-20', status: 'Pending', days: 5 },
    { id: 2, empName: 'Bob Jones', type: 'Sick', from: '2026-07-14', to: '2026-07-15', status: 'Approved', days: 2 },
    { id: 3, empName: 'Carol Davis', type: 'Casual', from: '2026-07-18', to: '2026-07-19', status: 'Pending', days: 1 },
  ]);

  const handleApproveLeave = (id) =>
    setLeaveRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  const handleRejectLeave = (id) =>
    setLeaveRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));

  return (
    <div className="attendance">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Attendance &amp; Leave Administration</h1>
          <p className="dashboard-subtitle">Monitor organization-wide presence and approve leave requests</p>
        </div>
        <div className="current-time-badge">
          <CalendarDays size={18} color="var(--accent-primary)" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Tabs */}
      <div className="attendance-tabs">
        <button className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
          <Clock size={16} /> Daily Attendance
        </button>
        <button className={`tab-btn ${activeTab === 'leave-requests' ? 'active' : ''}`} onClick={() => setActiveTab('leave-requests')}>
          <AlertCircle size={16} /> Pending Leave Requests ({leaveRequests.filter(r => r.status === 'Pending').length})
        </button>
      </div>

      {/* === Attendance Tab === */}
      {activeTab === 'attendance' && (
        <div>
          {/* Admin KPIs */}
          <div className="kpi-grid" style={{ marginBottom: 24 }}>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Workforce</span>
                <div className="kpi-icon-wrap text-primary bg-primary-light"><Users size={20} /></div>
              </div>
              <div className="kpi-body"><span className="kpi-value">{totalEmployeesCount}</span></div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Present Today</span>
                <div className="kpi-icon-wrap text-success bg-success-light"><CheckCircle size={20} /></div>
              </div>
              <div className="kpi-body"><span className="kpi-value">{presentCount}</span></div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Absent Today</span>
                <div className="kpi-icon-wrap text-danger bg-danger-light"><XCircle size={20} /></div>
              </div>
              <div className="kpi-body"><span className="kpi-value">{absentCount}</span></div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Attendance Rate</span>
                <div className="kpi-icon-wrap text-warning bg-warning-light"><BarChart2 size={20} /></div>
              </div>
              <div className="kpi-body"><span className="kpi-value">{presentRate}%</span></div>
            </div>
          </div>

          {/* Roster Table */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h3 className="chart-title" style={{ margin: 0 }}>Daily Attendance Roster</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div className="input-group">
                  <span className="input-icon"><Search size={16} /></span>
                  <input className="input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ minWidth: 200 }} />
                </div>
                <select className="input" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="">All Departments</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
                <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Shift</th>
                    <th>Status</th>
                    <th>Check-in Time / Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoster.length > 0 ? filteredRoster.map(emp => {
                    const record = attendance[emp.id] || { status: 'Absent', checkInTime: null, reason: 'Not Checked In' };
                    const empShift = schedule[emp.id]?.[todayDay] || emp.shift || 'Off';
                    return (
                      <tr key={emp.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="avatar-placeholder" style={{
                              background: getAvatarColor(emp.name), width: 32, height: 32, fontSize: 12,
                              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0
                            }}>
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 500 }}>{emp.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-primary">{emp.department}</span></td>
                        <td><span className="badge badge-info">{empShift}</span></td>
                        <td>
                          <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                            {record.status}
                          </span>
                        </td>
                        <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                          {record.status === 'Present' ? record.checkInTime : (record.reason || 'N/A')}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No employees match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* === Leave Requests Tab === */}
      {activeTab === 'leave-requests' && (
        <div className="card">
          <h3 className="chart-title" style={{ marginBottom: 16 }}>Leave Requests Queue</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 500 }}>{req.empName}</td>
                  <td><span className="badge badge-info">{req.type}</span></td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.days}</td>
                  <td>
                    <span className={`badge ${req.status === 'Approved' ? 'badge-success' : req.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-success btn-sm" onClick={() => handleApproveLeave(req.id)}>Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleRejectLeave(req.id)}>Reject</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
