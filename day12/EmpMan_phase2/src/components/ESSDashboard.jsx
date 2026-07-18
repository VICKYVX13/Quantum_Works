import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, Calendar, CreditCard, Bell, CalendarDays, CheckCircle, 
  MapPin, LogOut, FileText, ArrowRight, User, HelpCircle, GraduationCap, Briefcase, Download
} from 'lucide-react';
import jsPDF from 'jspdf';

const getAvatarColor = (name) => {
  const colors = ['#2563EB', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function ESSDashboard() {
  const { currentUser, attendance, checkIn, checkOut, setActiveView } = useApp();
  const emp = currentUser?.employee || { name: 'Employee', role: 'Staff', department: 'Operations', id: 'EMP000' };

  // Calculate current date and details
  const todayStr = new Date().toISOString().split('T')[0];
  const myRecord = attendance[emp.id] || { status: 'Absent', checkInTime: null, reason: 'Not Checked In' };

  // Mock Holiday List
  const holidays = [
    { name: 'Independence Day', date: '2026-08-15', day: 'Saturday' },
    { name: 'Labor Day', date: '2026-09-07', day: 'Monday' },
    { name: 'Thanksgiving', date: '2026-11-26', day: 'Thursday' },
  ];

  // Mock Calendar Days for July 2026 (Starts on Wednesday, 31 days)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    // Mock status: mostly Present, weekends Off
    const date = new Date(2026, 6, dayNum);
    const dayOfWeek = date.getDay();
    let status = 'present';
    if (dayOfWeek === 0 || dayOfWeek === 6) status = 'weekend';
    else if (dayNum === 10) status = 'leave';
    else if (dayNum > new Date().getDate()) status = 'upcoming';
    
    return { dayNum, status };
  });

  const handleCheckInOut = () => {
    if (myRecord.status === 'Present') {
      checkOut(emp.id);
    } else {
      checkIn(emp.id);
    }
  };

  const downloadLatestPayslip = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.text('EMS Pro — Payslip Summary', 20, 20);
    doc.setFont('helvetica', 'normal');
    doc.text(`Employee: ${emp.name}`, 20, 40);
    doc.text(`Designation: ${emp.role}`, 20, 50);
    doc.text(`Department: ${emp.department}`, 20, 60);
    doc.text('Gross Earnings: $6,500.00', 20, 80);
    doc.text('Deductions: $820.00', 20, 90);
    doc.text('Net Pay: $5,680.00', 20, 100);
    doc.save(`Payslip_Latest_${emp.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header and Quick Profile card */}
      <div className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', background: getAvatarColor(emp.name),
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 700
          }}>
            {emp.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Welcome back, {emp.name}!</h2>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: 14 }}>{emp.role} &bull; {emp.department} (ID: {emp.id})</p>
          </div>
        </div>

        {/* Quick actions row */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className={`btn ${myRecord.status === 'Present' ? 'btn-danger' : 'btn-primary'}`} onClick={handleCheckInOut}>
            {myRecord.status === 'Present' ? <LogOut size={16} /> : <Clock size={16} />}
            {myRecord.status === 'Present' ? 'Clock Out' : 'Clock In'}
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveView('ess-leave')}>
            <Calendar size={16} /> Apply Leave
          </button>
          <button className="btn btn-secondary" onClick={downloadLatestPayslip}>
            <Download size={16} /> Download Payslip
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveView('ess-profile')}>
            <User size={16} /> My Profile
          </button>
        </div>
      </div>

      {/* ESS Summary Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Today's Attendance</span>
            <div className={`kpi-icon-wrap ${myRecord.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value" style={{ fontSize: 22 }}>
              {myRecord.status === 'Present' ? `Present (${myRecord.checkInTime})` : myRecord.reason || 'Absent'}
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Leave Balance</span>
            <div className="kpi-icon-wrap badge-info"><CalendarDays size={18} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value">15 Days</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Upcoming Holiday</span>
            <div className="kpi-icon-wrap badge-warning"><Calendar size={18} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value" style={{ fontSize: 16, fontWeight: 600 }}>Independence Day</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Aug 15, 2026</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Latest Net Pay</span>
            <div className="kpi-icon-wrap badge-success"><CreditCard size={18} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value">$5,680.00</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Pending Leave Requests</span>
            <div className="kpi-icon-wrap badge-warning"><CalendarDays size={18} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value">1 Request</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Unread Alerts</span>
            <div className="kpi-icon-wrap badge-danger"><Bell size={18} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value">2 New</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Monthly Attendance Calendar */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Attendance Calendar — July 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', marginBottom: 12 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
              {/* Empty days for offset (starts on Wednesday) */}
              {Array.from({ length: 3 }).map((_, i) => <div key={`empty-${i}`} />)}
              {calendarDays.map(day => {
                let bg = 'var(--bg-secondary)';
                let color = 'var(--text-primary)';
                if (day.status === 'present') { bg = '#ECFDF5'; color = '#059669'; }
                else if (day.status === 'leave') { bg = '#FFFBEB'; color = '#D97706'; }
                else if (day.status === 'weekend') { bg = '#F1F5F9'; color = '#94A3B8'; }
                else if (day.status === 'upcoming') { bg = '#FFFFFF'; color = '#CBD5E1'; }

                return (
                  <div key={day.dayNum} style={{
                    aspectRatio: '1', borderRadius: 'var(--radius-md)', background: bg, color,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, border: '1px solid var(--border-color)'
                  }}>
                    {day.dayNum}
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 12, justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#ECFDF5', border: '1px solid #A7F3D0' }} />
                <span>Present</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#FFFBEB', border: '1px solid #FDE68A' }} />
                <span>Leave</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#F1F5F9', border: '1px solid #E2E8F0' }} />
                <span>Weekend / Off</span>
              </div>
            </div>
          </div>

          {/* Company Announcements */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Company Announcements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Q3 Town Hall Meeting</span>
                  <span className="badge badge-danger">High Priority</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>The company-wide Q3 Town Hall is scheduled for July 25, 2026. All employees are requested to join online.</p>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>New Leave Policy Updates</span>
                  <span className="badge badge-info">Policy</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>Effective August 1st, 2026, employee wellness leaves will be extended by 2 additional days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Recent Activities */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Activities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', marginTop: 6 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Clocked In Today</span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>July 13, 2026 - 09:05 AM</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-success)', marginTop: 6 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Leave Request Approved</span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>July 10, 2026 - Annual Leave (2 days)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', marginTop: 6 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Training Completed</span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>June 28, 2026 - Cyber Security Compliance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contacts / Team */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>My Manager</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 600
              }}>JS</div>
              <div>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>John Smith</span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Engineering Manager</span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--accent-primary)', cursor: 'pointer', marginTop: 2 }}>john.smith@company.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
