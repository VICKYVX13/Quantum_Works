import { useState } from 'react';
import { HelpCircle, Mail, Phone, ExternalLink, Plus, Check } from 'lucide-react';

export default function ESSSupport() {
  const [tickets, setTickets] = useState([
    { id: 'TKT-102', category: 'IT Support', subject: 'VPN Login Issue', date: '2026-07-10', status: 'Closed' },
    { id: 'TKT-105', category: 'Payroll Inquiry', subject: 'Tax deduction query for June', date: '2026-07-12', status: 'In Progress' }
  ]);

  const [form, setForm] = useState({ category: 'HR Support', subject: '', desc: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      category: form.category,
      subject: form.subject,
      date: new Date().toISOString().split('T')[0],
      status: 'Open'
    };
    setTickets([newTicket, ...tickets]);
    setForm({ category: 'HR Support', subject: '', desc: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
      {/* Helpdesk Form & Tickets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Support Tickets list */}
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, padding: 20, margin: 0, borderBottom: '1px solid var(--border-color)' }}>My Support Requests</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Opened Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.id}</td>
                  <td><span className="badge badge-secondary">{t.category}</span></td>
                  <td style={{ fontSize: 13 }}>{t.subject}</td>
                  <td>{t.date}</td>
                  <td>
                    <span className={`badge ${
                      t.status === 'Closed' ? 'badge-success' : 
                      t.status === 'In Progress' ? 'badge-warning' : 'badge-danger'
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Raise a ticket form */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Raise a Support Ticket</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category</label>
                <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option>HR Support</option>
                  <option>IT Support</option>
                  <option>Payroll Inquiry</option>
                  <option>Facilities / Admin</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subject</label>
                <input 
                  className="input" 
                  placeholder="e.g. Printer not responding" 
                  value={form.subject} 
                  onChange={e => setForm({...form, subject: e.target.value})} 
                  required 
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Description</label>
              <textarea 
                className="input" 
                rows="4" 
                placeholder="Details of the issue..." 
                value={form.desc} 
                onChange={e => setForm({...form, desc: e.target.value})} 
                required 
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" className="btn btn-primary">Create Ticket</button>
              {submitted && (
                <span style={{ color: 'var(--accent-success)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Check size={14} /> Ticket opened successfully
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Support Info Sidebar */}
      <div className="card" style={{ height: 'fit-content', padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Help &amp; Resources</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Phone size={18} color="var(--accent-primary)" style={{ marginTop: 2 }} />
            <div>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 600 }}>Emergency IT Hotline</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Ext. 9900 (Mon-Fri 24/7)</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Mail size={18} color="var(--accent-primary)" style={{ marginTop: 2 }} />
            <div>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 600 }}>HR Support Desk</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>hr.support@company.com</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 20, paddingTop: 16 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Knowledge Base</span>
          {[
            'FAQ Guidelines',
            'Travel Reimbursement Policies',
            'IT Hardware Policies',
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '6px 0', cursor: 'pointer', color: 'var(--accent-primary)' }}>
              <span>{item}</span>
              <ExternalLink size={12} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
