import { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, Circle } from 'lucide-react';

export default function ESSProjects() {
  const [projects] = useState([
    {
      id: 1,
      name: 'Phoenix Enterprise ERP Upgrade',
      description: 'Upgrading the core ERP modules to version 12.4 with multi-currency support and revised payroll engines.',
      role: 'Lead Frontend Developer',
      status: 'In Progress',
      progress: 72,
      deadline: '2026-09-30',
      tasks: [
        { label: 'Integrate new chart layers', done: true },
        { label: 'Implement leave balance calculator', done: true },
        { label: 'Rewrite routing logic in AppShell', done: false },
        { label: 'Conduct final cross-browser validation', done: false },
      ]
    },
    {
      id: 2,
      name: 'Cyber Security Auditing & Compliance',
      description: 'Reviewing employee authorization flows and validating password hash architectures.',
      role: 'Contributor / Reviewer',
      status: 'Active',
      progress: 45,
      deadline: '2026-11-15',
      tasks: [
        { label: 'Evaluate active JWT token lifetimes', done: true },
        { label: 'Update company security settings form', done: false },
      ]
    }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ marginBottom: 4 }}>
        <h2 className="dashboard-title" style={{ margin: 0 }}>My Projects</h2>
        <p className="dashboard-subtitle">Assigned corporate initiatives and project milestones</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map(proj => (
          <div key={proj.id} className="card" style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left side info */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{proj.name}</h3>
                <span className={`badge ${proj.status === 'In Progress' ? 'badge-primary' : 'badge-success'}`}>{proj.status}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{proj.description}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>My Role</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{proj.role}</span>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Deadline</span>
                  <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={14} /> {proj.deadline}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Overall Progress</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{proj.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Right side tasks checklist */}
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Project Checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {proj.tasks.map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                    {task.done ? (
                      <CheckCircle2 size={16} color="var(--accent-success)" />
                    ) : (
                      <Circle size={16} color="var(--text-muted)" />
                    )}
                    <span style={{ color: task.done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: task.done ? 'line-through' : 'none' }}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
