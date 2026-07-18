import { useState } from 'react';
import {
  Briefcase, UserPlus, Calendar, Users, GraduationCap,
  Star, TrendingUp, FileText, Megaphone, MessageSquare, X, Plus
} from 'lucide-react';
import './HRModule.css';

// ============ Sub-Sections ============

function Recruitment() {
  const [candidates] = useState([
    { id: 1, name: 'James Carter', role: 'Senior React Developer', dept: 'Engineering', stage: 'Interview', date: '2026-07-10', status: 'Active' },
    { id: 2, name: 'Priya Sharma', role: 'HR Business Partner', dept: 'Human Resources', stage: 'Offer', date: '2026-07-08', status: 'Active' },
    { id: 3, name: 'Mark Liu', role: 'Product Manager', dept: 'Product', stage: 'Screening', date: '2026-07-12', status: 'Active' },
    { id: 4, name: 'Elena Torres', role: 'Data Analyst', dept: 'Analytics', stage: 'Rejected', date: '2026-07-05', status: 'Closed' },
  ]);

  const stageColor = {
    Screening: 'badge-info',
    Interview: 'badge-warning',
    Offer: 'badge-primary',
    Hired: 'badge-success',
    Rejected: 'badge-danger',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Candidate Tracking</h3>
        <button className="btn btn-primary"><Plus size={16} /> Add Candidate</button>
      </div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role Applied</th>
              <th>Department</th>
              <th>Stage</th>
              <th>Application Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.role}</td>
                <td><span className="badge badge-primary">{c.dept}</span></td>
                <td><span className={`badge ${stageColor[c.stage] || 'badge-info'}`}>{c.stage}</span></td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm">View</button>
                    <button className="btn btn-primary btn-sm">Schedule Interview</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Onboarding() {
  const tasks = [
    { label: 'Send welcome email', done: true },
    { label: 'Set up workstation / IT access', done: true },
    { label: 'Complete paperwork & contracts', done: false },
    { label: 'HR orientation session', done: false },
    { label: 'Introduction to team', done: false },
    { label: 'Assign buddy / mentor', done: false },
  ];
  const offboardingTasks = [
    { label: 'Collect company assets', done: false },
    { label: 'Revoke system access', done: false },
    { label: 'Exit interview', done: false },
    { label: 'Final payroll settlement', done: false },
    { label: 'Knowledge transfer', done: false },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Employee Onboarding Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: `2px solid ${t.done ? 'var(--accent-success)' : 'var(--border-color)'}`,
                background: t.done ? 'var(--accent-success)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {t.done && <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, color: t.done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Employee Offboarding Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {offboardingTasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: `2px solid ${t.done ? 'var(--accent-success)' : 'var(--border-color)'}`,
                background: t.done ? 'var(--accent-success)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {t.done && <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, color: t.done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Training() {
  const programs = [
    { name: 'Leadership Excellence', dept: 'All', trainer: 'Dr. Sarah Kim', enrolled: 24, capacity: 30, date: '2026-07-20', status: 'Upcoming' },
    { name: 'React Advanced Patterns', dept: 'Engineering', trainer: 'Mark Chen', enrolled: 12, capacity: 15, date: '2026-07-15', status: 'Active' },
    { name: 'Data Privacy & GDPR', dept: 'All', trainer: 'Legal Team', enrolled: 45, capacity: 50, date: '2026-07-10', status: 'Active' },
    { name: 'Project Management (PMP)', dept: 'Product', trainer: 'John Mills', enrolled: 8, capacity: 12, date: '2026-08-01', status: 'Upcoming' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Training Programs</h3>
        <button className="btn btn-primary"><Plus size={16} /> Add Program</button>
      </div>
      <div className="hr-cards-grid">
        {programs.map((p, i) => (
          <div key={i} className="card hr-program-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{p.name}</h4>
              <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 12px' }}>Trainer: {p.trainer}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Enrolled: {p.enrolled}/{p.capacity}</span>
              <span className="badge badge-primary">{p.dept}</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 12 }}>
              <div className="progress-fill" style={{ width: `${(p.enrolled / p.capacity) * 100}%` }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Date: {p.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceReviews() {
  const reviews = [
    { emp: 'Alice Johnson', dept: 'Engineering', reviewer: 'John Smith', period: 'Q2 2026', score: 92, status: 'Completed' },
    { emp: 'Bob Williams', dept: 'Sales', reviewer: 'Lisa Ray', period: 'Q2 2026', score: 78, status: 'In Progress' },
    { emp: 'Carol Davis', dept: 'Marketing', reviewer: 'Tom Brown', period: 'Q2 2026', score: null, status: 'Pending' },
    { emp: 'David Miller', dept: 'Engineering', reviewer: 'John Smith', period: 'Q2 2026', score: 88, status: 'Completed' },
  ];
  const statusColor = { Completed: 'badge-success', 'In Progress': 'badge-warning', Pending: 'badge-danger' };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Performance Reviews</h3>
        <button className="btn btn-primary"><Plus size={16} /> Initiate Review</button>
      </div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Reviewer</th>
              <th>Period</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{r.emp}</td>
                <td><span className="badge badge-primary">{r.dept}</span></td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r.reviewer}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r.period}</td>
                <td>
                  {r.score !== null ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${r.score}%`, background: r.score >= 90 ? 'var(--accent-success)' : r.score >= 75 ? 'var(--accent-warning)' : 'var(--accent-danger)' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{r.score}%</span>
                    </div>
                  ) : <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>}
                </td>
                <td><span className={`badge ${statusColor[r.status]}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Announcements() {
  const [showForm, setShowForm] = useState(false);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Q3 Town Hall Meeting', body: 'The company-wide Q3 Town Hall is scheduled for July 25, 2026 at 10:00 AM. All employees are required to attend.', author: 'HR Department', date: '2026-07-13', priority: 'High' },
    { id: 2, title: 'New Leave Policy Update', body: 'Effective August 1st, 2026, the annual leave policy has been updated. Please review the updated HR policy document.', author: 'HR Department', date: '2026-07-12', priority: 'Medium' },
    { id: 3, title: 'Office Renovation - Floor 3', body: 'The 3rd floor will be under renovation from July 20-27. Please work from home or use floors 1 and 2 during this period.', author: 'Admin', date: '2026-07-11', priority: 'Low' },
  ]);

  const priorityColor = { High: 'badge-danger', Medium: 'badge-warning', Low: 'badge-info' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>HR Announcements</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={16} /> New Announcement</button>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">New Announcement</h2>
              <button className="btn-icon" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setShowForm(false); }}>
              <div className="form-group"><label className="form-label">Title *</label><input className="input" required placeholder="Announcement title" /></div>
              <div className="form-group"><label className="form-label">Priority</label><select className="input"><option>High</option><option>Medium</option><option>Low</option></select></div>
              <div className="form-group"><label className="form-label">Message *</label><textarea className="input" rows={4} required placeholder="Announcement message..."></textarea></div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Post Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {announcements.map(a => (
          <div key={a.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{a.title}</h4>
              <span className={`badge ${priorityColor[a.priority]}`}>{a.priority}</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 12px' }}>{a.body}</p>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 16 }}>
              <span>Posted by: {a.author}</span>
              <span>Date: {a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Grievances() {
  const [complaints] = useState([
    { id: 1, emp: 'Mark Williams', subject: 'Workplace Harassment', date: '2026-07-10', status: 'Under Review', priority: 'High' },
    { id: 2, emp: 'Sara Khan', subject: 'Salary Discrepancy', date: '2026-07-08', status: 'Resolved', priority: 'Medium' },
    { id: 3, emp: 'John Doe', subject: 'Work Environment Concern', date: '2026-07-05', status: 'Open', priority: 'Low' },
  ]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Complaints &amp; Grievances</h3>
        <button className="btn btn-primary"><Plus size={16} /> Submit Grievance</button>
      </div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr><th>Employee</th><th>Subject</th><th>Date</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.emp}</td>
                <td style={{ fontSize: 13 }}>{c.subject}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.date}</td>
                <td><span className={`badge ${c.priority === 'High' ? 'badge-danger' : c.priority === 'Medium' ? 'badge-warning' : 'badge-info'}`}>{c.priority}</span></td>
                <td><span className={`badge ${c.status === 'Resolved' ? 'badge-success' : c.status === 'Open' ? 'badge-danger' : 'badge-warning'}`}>{c.status}</span></td>
                <td><button className="btn btn-secondary btn-sm">View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ Main HR Module ============

const hrTabs = [
  { id: 'recruitment', label: 'Recruitment', icon: <UserPlus size={16} /> },
  { id: 'onboarding', label: 'Onboarding / Offboarding', icon: <Users size={16} /> },
  { id: 'training', label: 'Training', icon: <GraduationCap size={16} /> },
  { id: 'performance', label: 'Performance', icon: <Star size={16} /> },
  { id: 'announcements', label: 'Announcements', icon: <Megaphone size={16} /> },
  { id: 'grievances', label: 'Grievances', icon: <MessageSquare size={16} /> },
];

export default function HRModule() {
  const [activeTab, setActiveTab] = useState('recruitment');

  return (
    <div className="hr-module">
      <div className="dashboard-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="dashboard-title">HR Module</h1>
          <p className="dashboard-subtitle">Recruitment, Onboarding, Training, Performance &amp; More</p>
        </div>
      </div>

      {/* Sidebar Tabs */}
      <div className="hr-layout">
        <nav className="hr-sidenav card">
          {hrTabs.map(t => (
            <button
              key={t.id}
              className={`hr-nav-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="hr-content">
          {activeTab === 'recruitment' && <Recruitment />}
          {activeTab === 'onboarding' && <Onboarding />}
          {activeTab === 'training' && <Training />}
          {activeTab === 'performance' && <PerformanceReviews />}
          {activeTab === 'announcements' && <Announcements />}
          {activeTab === 'grievances' && <Grievances />}
        </div>
      </div>
    </div>
  );
}
