import { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, Plus, Check } from 'lucide-react';

export default function ESSLeave() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: 'Annual', from: '2026-07-15', to: '2026-07-20', status: 'Pending', days: 5, reason: 'Family Vacation' },
    { id: 2, type: 'Sick', from: '2026-07-14', to: '2026-07-15', status: 'Approved', days: 2, reason: 'Medical Checkup' },
  ]);
  const leaveBalances = { Annual: 15, Sick: 8, Casual: 5 };

  const [form, setForm] = useState({
    type: 'Annual',
    from: '',
    to: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate difference in days
    const start = new Date(form.from);
    const end = new Date(form.to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newRequest = {
      id: Date.now(),
      type: form.type,
      from: form.from,
      to: form.to,
      status: 'Pending',
      days: isNaN(diffDays) ? 1 : diffDays,
      reason: form.reason,
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setForm({ type: 'Annual', from: '', to: '', reason: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Balances */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>My Leave Balances</h3>
          <div style={{ display: 'flex', gap: 16 }}>
            {Object.entries(leaveBalances).map(([type, days]) => (
              <div key={type} style={{
                flex: 1, padding: 20, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center'
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>{days}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{type} Leave</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, padding: '20px 20px 0 20px', margin: 0 }}>Leave History</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 500 }}>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.days}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{req.reason}</td>
                  <td>
                    <span className={`badge ${req.status === 'Approved' ? 'badge-success' : req.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column - Apply Form */}
      <div className="card" style={{ height: 'fit-content', padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Apply for Leave</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Leave Type</label>
            <select className="input" value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
              <option>Annual</option>
              <option>Sick</option>
              <option>Casual</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Start Date</label>
            <input type="date" className="input" value={form.from} onChange={e => setForm({...form, from: e.target.value})} required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">End Date</label>
            <input type="date" className="input" value={form.to} onChange={e => setForm({...form, to: e.target.value})} required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Reason</label>
            <textarea className="input" rows="3" placeholder="Describe the reason..." value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required style={{ resize: 'none' }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Submit Request
          </button>
          {submitted && (
            <span style={{ color: 'var(--accent-success)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
              <Check size={14} /> Request submitted successfully
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
