import React from 'react';
import { StudentsIcon, CheckIcon, XIcon, GraduationIcon } from './Icons';

export default function Dashboard({ students, setActiveTab, onQuickPresent }) {
  const total = students.length;
  const present = students.filter(s => s.status === 'present').length;
  const absent = students.filter(s => s.status === 'absent').length;
  const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

  // Department Analytics
  const departments = ['Computer Science', 'Electrical Eng.', 'Mechanical Eng.', 'Business Admin.', 'Physics'];
  
  const deptData = departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept);
    const deptTotal = deptStudents.length;
    const deptPresent = deptStudents.filter(s => s.status === 'present').length;
    const rate = deptTotal > 0 ? Math.round((deptPresent / deptTotal) * 100) : 0;
    return { name: dept, total: deptTotal, present: deptPresent, rate };
  });

  // Donut Chart calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const presentPercent = total > 0 ? (present / total) : 0;
  const absentPercent = total > 0 ? (absent / total) : 0;
  
  const strokeDashArray = `${circumference}`;
  const presentOffset = circumference * (1 - presentPercent);
  
  // Recent 4 registered students
  const recentStudents = [...students].slice(-4).reverse();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="glass-card kpi-card">
          <div className="kpi-info">
            <p>Total Students</p>
            <h3>{total}</h3>
          </div>
          <div className="kpi-icon-container primary">
            <StudentsIcon size={24} />
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-info">
            <p>Attendance Rate</p>
            <h3 style={{ color: attendanceRate >= 75 ? 'var(--success-color)' : 'var(--warning-color)' }}>
              {attendanceRate}%
            </h3>
          </div>
          <div className="kpi-icon-container warning">
            <GraduationIcon size={24} />
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-info">
            <p>Present Today</p>
            <h3 style={{ color: 'var(--success-color)' }}>{present}</h3>
          </div>
          <div className="kpi-icon-container success">
            <CheckIcon size={24} />
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-info">
            <p>Absent Today</p>
            <h3 style={{ color: 'var(--danger-color)' }}>{absent}</h3>
          </div>
          <div className="kpi-icon-container danger">
            <XIcon size={24} />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Department-wise Attendance Rate Bar Chart */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.25rem' }}>Attendance Rate by Department</h3>
          <div className="svg-chart-container" style={{ minHeight: '260px' }}>
            {total === 0 ? (
              <div className="empty-state">
                <p>No student data available to display department charts.</p>
              </div>
            ) : (
              <svg viewBox="0 0 500 240" width="100%" height="100%" style={{ overflow: 'visible' }}>
                {/* Horizontal Grid lines */}
                {[0, 25, 50, 75, 100].map((gridVal, i) => {
                  const y = 180 - (gridVal * 1.4);
                  return (
                    <g key={gridVal}>
                      <line x1="45" y1={y} x2="480" y2={y} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="15" y={y + 4} fill="var(--text-secondary)" fontSize="10" fontWeight="500">{gridVal}%</text>
                    </g>
                  );
                })}

                {/* Bars */}
                {deptData.map((dept, index) => {
                  const barWidth = 36;
                  const spacing = 84;
                  const x = 65 + (index * spacing);
                  const barHeight = dept.rate * 1.4; // max 140px
                  const y = 180 - barHeight;
                  const hasStudents = dept.total > 0;

                  return (
                    <g key={dept.name} style={{ cursor: 'pointer' }}>
                      {/* Bar Background track */}
                      <rect
                        x={x}
                        y={40}
                        width={barWidth}
                        height={140}
                        fill="var(--bg-tertiary)"
                        rx="6"
                        opacity="0.5"
                      />
                      {/* Actual attendance bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight > 0 ? barHeight : 4}
                        fill={hasStudents ? "url(#barGradient)" : "var(--border-color)"}
                        rx="6"
                        className="transition-all"
                        style={{
                          transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1), y 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                      
                      {/* Percentage Value on top of bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 8}
                        textAnchor="middle"
                        fill="var(--text-primary)"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {hasStudents ? `${dept.rate}%` : '0%'}
                      </text>

                      {/* Department Label (truncated or slanted if needed, here split) */}
                      <text
                        x={x + barWidth / 2}
                        y="202"
                        textAnchor="middle"
                        fill="var(--text-secondary)"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {dept.name.split(' ')[0]}
                      </text>
                      <text
                        x={x + barWidth / 2}
                        y="214"
                        textAnchor="middle"
                        fill="var(--text-muted)"
                        fontSize="9"
                      >
                        {`(${dept.present}/${dept.total})`}
                      </text>
                    </g>
                  );
                })}

                {/* SVG Definitions for Gradients */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-color)" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        </div>

        {/* Present vs Absent Ratio (Donut Chart) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3>Attendance Ratio</h3>
          <div className="svg-chart-container" style={{ height: '180px', marginTop: '1rem' }}>
            {total === 0 ? (
              <div className="empty-state">
                <p>No records</p>
              </div>
            ) : (
              <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="10"
                  />
                  {/* Absent Arc (Outer Red segment) */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="var(--danger-color)"
                    strokeWidth="10"
                    strokeDasharray={strokeDashArray}
                    strokeDashoffset="0"
                    transform="rotate(-90 60 60)"
                  />
                  {/* Present Arc (Green overlay segment) */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="var(--success-color)"
                    strokeWidth="10"
                    strokeDasharray={strokeDashArray}
                    strokeDashoffset={presentOffset}
                    strokeLinecap={present > 0 && present < total ? 'round' : 'butt'}
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                {/* Center text */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  pointerEvents: 'none'
                }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {attendanceRate}%
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                    Present
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: 'var(--success-color)' }} />
              <span>Present ({present})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: 'var(--danger-color)' }} />
              <span>Absent ({absent})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Recent Registrations & Quick Actions */}
      <div className="grid-2">
        {/* Recent Registrations Table */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Recent Registrations</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('students')}>
              View Directory
            </button>
          </div>

          {recentStudents.length === 0 ? (
            <div className="empty-state" style={{ flexGrow: 1 }}>
              <p style={{ fontSize: '0.875rem' }}>No student records registered yet.</p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }} onClick={() => setActiveTab('add-student')}>
                Add First Student
              </button>
            </div>
          ) : (
            <div className="table-container" style={{ flexGrow: 1 }}>
              <table className="custom-table" style={{ fontSize: '0.875rem' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0.75rem 1rem' }}>ID & Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Department</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.id}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {student.studentId}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>{student.department.split(' ')[0]}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className={`badge ${student.status === 'present' ? 'badge-success' : 'badge-danger'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }} className="text-center">
                        {student.status === 'absent' ? (
                          <button
                            className="btn btn-success btn-sm"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                            onClick={() => onQuickPresent(student.id)}
                          >
                            Mark Present
                          </button>
                        ) : (
                          <span style={{ color: 'var(--success-color)', fontSize: '0.75rem', fontWeight: 500 }}>
                            Attended ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Portal Guide */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3>EduPulse Faculty Help</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
              Welcome to the **EduPulse Student Management & Attendance Dashboard**. This interface is designed for real-time tracking of student rosters and academic statuses.
            </p>
            
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--primary-light)', color: 'var(--primary-color)', width: '24px', height: '24px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0,
                  fontSize: '0.8125rem', fontWeight: 700, justifyContent: 'center'
                }}>1</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>Manage Directory</strong>: View full details, filters, search by student name/ID, and perform edits under <strong>Student Directory</strong>.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--primary-light)', color: 'var(--primary-color)', width: '24px', height: '24px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0,
                  fontSize: '0.8125rem', fontWeight: 700, justifyContent: 'center'
                }}>2</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>Register Student</strong>: Use the onboarding wizard to add new students with instant validations.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--primary-light)', color: 'var(--primary-color)', width: '24px', height: '24px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0,
                  fontSize: '0.8125rem', fontWeight: 700, justifyContent: 'center'
                }}>3</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>Export / Seed Data</strong>: Head to the <strong>Data Actions</strong> tab to backup directories as Excel/CSV/JSON formats or seed dummy rosters.
                </p>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem' }}
            onClick={() => setActiveTab('add-student')}
          >
            Register New Student
          </button>
        </div>
      </div>

    </div>
  );
}
