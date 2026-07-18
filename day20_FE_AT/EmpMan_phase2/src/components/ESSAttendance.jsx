import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Calendar, CheckCircle, Search, Filter, Play, Square, MapPin } from 'lucide-react';

export default function ESSAttendance() {
  const { currentUser, attendance, checkIn, checkOut } = useApp();
  const emp = currentUser?.employee || { id: 'EMP000' };
  
  const myRecord = attendance[emp.id] || { status: 'Absent', checkInTime: null, reason: 'Not Checked In' };
  
  // Mock monthly logs
  const [logs] = useState([
    { date: '2026-07-13', checkIn: myRecord.status === 'Present' ? myRecord.checkInTime : '—', checkOut: '—', hours: '—', status: myRecord.status, type: 'Office' },
    { date: '2026-07-12', checkIn: '09:05 AM', checkOut: '06:00 PM', hours: '8.9 hrs', status: 'Present', type: 'Office' },
    { date: '2026-07-11', checkIn: '08:58 AM', checkOut: '06:05 PM', hours: '9.1 hrs', status: 'Present', type: 'WFH' },
    { date: '2026-07-10', checkIn: '09:12 AM', checkOut: '05:55 PM', hours: '8.7 hrs', status: 'Present', type: 'Office' },
    { date: '2026-07-09', checkIn: '—', checkOut: '—', hours: '—', status: 'Absent', type: '—' },
    { date: '2026-07-08', checkIn: '09:02 AM', checkOut: '06:00 PM', hours: '9.0 hrs', status: 'Present', type: 'Office' },
  ]);

  const [filterType, setFilterType] = useState('all');

  const filteredLogs = logs.filter(log => {
    if (filterType === 'all') return true;
    if (filterType === 'wfh') return log.type === 'WFH';
    if (filterType === 'present') return log.status === 'Present';
    if (filterType === 'absent') return log.status === 'Absent';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Clock-in dashboard widget */}
      <div className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0' }}>Daily Time Tracking</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13 }}>Record your hours for today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Status</span>
            <span className={`badge ${myRecord.status === 'Present' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 13, marginTop: 2 }}>
              {myRecord.status}
            </span>
          </div>
          {myRecord.status === 'Present' && (
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Clocked In</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{myRecord.checkInTime}</span>
            </div>
          )}
          <div>
            {myRecord.status === 'Absent' || myRecord.reason === 'Checked Out' ? (
              <button className="btn btn-primary" onClick={() => checkIn(emp.id)}>
                <Play size={16} /> Clock In
              </button>
            ) : (
              <button className="btn btn-danger" onClick={() => checkOut(emp.id)}>
                <Square size={16} /> Clock Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Attendance logs table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Attendance Logs</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All Days</option>
              <option value="present">Present Only</option>
              <option value="absent">Absences Only</option>
              <option value="wfh">WFH Only</option>
            </select>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Working Hours</th>
              <th>Work Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{log.date}</td>
                <td>{log.checkIn}</td>
                <td>{log.checkOut}</td>
                <td>{log.hours}</td>
                <td>
                  {log.type !== '—' ? (
                    <span className={`badge ${log.type === 'WFH' ? 'badge-purple' : 'badge-info'}`}>
                      {log.type}
                    </span>
                  ) : '—'}
                </td>
                <td>
                  <span className={`badge ${log.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
