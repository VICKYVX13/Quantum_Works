import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Palette, Lock, Settings2, Bell, Globe, Shield, Users, LogOut, Check } from 'lucide-react';
import './Settings.css';

export default function Settings({ onLogout }) {
  const { toggleTheme, employees } = useApp();
  const [adminForm, setAdminForm] = useState({
    name: 'Admin User',
    email: 'admin@emspro.com',
    phone: '+1-555-0000',
    company: 'Acme Corp',
    timezone: 'UTC+5:30',
    language: 'English',
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = e => setAdminForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'company', label: 'Company', icon: <Settings2 size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'roles', label: 'Roles & Permissions', icon: <Shield size={16} /> },
  ];

  return (
    <div className="settings">
      <div style={{ marginBottom: 24 }}>
        <h1 className="dashboard-title">Settings</h1>
        <p className="dashboard-subtitle">Manage your account, company, and system preferences</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar */}
        <nav className="settings-sidenav card">
          {tabs.map(t => (
            <button
              key={t.id}
              id={`settings-tab-${t.id}`}
              className={`hr-nav-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
            <button className="hr-nav-item" style={{ color: 'var(--accent-danger)', width: '100%' }} onClick={onLogout}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="settings-content">

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Admin Profile</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28, fontWeight: 700
                }}>A</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{adminForm.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Super Administrator</div>
                  <button className="btn btn-secondary btn-sm">Change Photo</button>
                </div>
              </div>
              <form id="admin-profile-form" onSubmit={handleSave}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="input" name="name" value={adminForm.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="input" type="email" name="email" value={adminForm.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="input" name="phone" value={adminForm.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select className="input" name="language" value={adminForm.language} onChange={handleChange}>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Timezone</label>
                  <select className="input" name="timezone" value={adminForm.timezone} onChange={handleChange}>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+5:30">IST (UTC+5:30)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                  <button type="submit" className="btn btn-primary" id="save-profile-btn">Save Changes</button>
                  {saved && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-success)', fontSize: 14, fontWeight: 500 }}>
                      <Check size={16} /> Saved successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Company Settings</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input className="input" defaultValue="Acme Corporation" />
                </div>
                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <select className="input">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Manufacturing</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company Email</label>
                  <input className="input" type="email" defaultValue="hr@acme.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Phone</label>
                  <input className="input" defaultValue="+1-800-555-0000" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Company Address</label>
                <textarea className="input" rows={2} defaultValue="123 Business Ave, New York, NY 10001" style={{ resize: 'vertical' }}></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Financial Year Start</label>
                  <select className="input">
                    <option>January</option>
                    <option>April</option>
                    <option>July</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select className="input">
                    <option>USD ($)</option>
                    <option>INR (₹)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-primary">Save Company Settings</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Notification Preferences</h3>
              {[
                { label: 'New Employee Joined', desc: 'Get notified when a new employee is added' },
                { label: 'Leave Requests', desc: 'Alert when a leave request is submitted' },
                { label: 'Attendance Alerts', desc: 'Daily attendance summary and anomalies' },
                { label: 'Payroll Processed', desc: 'Notification after payroll is run' },
                { label: 'Performance Review Due', desc: 'Reminder for upcoming performance reviews' },
                { label: 'System Updates', desc: 'Get notified about system maintenance' },
              ].map((item, i) => (
                <div key={i} className="settings-notif-item">
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <label className="toggle-wrap">
                    <input type="checkbox" defaultChecked={i < 4} className="toggle-input" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Appearance</h3>
              <div className="settings-notif-item">
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>Theme</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Switch between light and dark mode</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={toggleTheme} id="theme-toggle-btn">
                  Toggle Theme
                </button>
              </div>
              <div className="settings-notif-item">
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>Accent Color</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Primary interface accent color</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'].map(c => (
                    <button key={c} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c, border: c === '#2563EB' ? '3px solid var(--text-primary)' : '2px solid transparent', cursor: 'pointer'
                    }} />
                  ))}
                </div>
              </div>
              <div className="settings-notif-item">
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>Compact Mode</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Reduce spacing and padding</div>
                </div>
                <label className="toggle-wrap">
                  <input type="checkbox" className="toggle-input" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Security Settings</h3>
              {[
                { title: 'Change Password', desc: 'Last changed 30 days ago', action: 'Update' },
                { title: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: 'Enable' },
                { title: 'Active Sessions', desc: '1 active session (This Device)', action: 'Manage' },
                { title: 'Login History', desc: 'View recent login activity', action: 'View' },
                { title: 'API Access Keys', desc: 'Manage API keys and tokens', action: 'Configure' },
              ].map((item, i) => (
                <div key={i} className="settings-notif-item">
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm">{item.action}</button>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: 20, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-danger)', marginBottom: 8 }}>Danger Zone</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>This will sign you out from all active sessions.</p>
                <button className="btn btn-danger" id="logout-settings-btn" onClick={onLogout}>Sign Out of All Devices</button>
              </div>
            </div>
          )}

          {/* Roles & Permissions Tab */}
          {activeTab === 'roles' && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Roles &amp; Permissions</h3>
              {[
                { role: 'Super Admin', users: 1, permissions: ['All Modules', 'User Management', 'System Config', 'Reports'] },
                { role: 'HR Manager', users: 2, permissions: ['Employees', 'Payroll', 'HR Module', 'Reports'] },
                { role: 'Department Head', users: 5, permissions: ['Employees (Dept)', 'Attendance', 'Leave Approval'] },
                { role: 'Employee', users: employees.length, permissions: ['Own Attendance', 'My Leave', 'My Payslip'] },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: 20, padding: 20, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{r.role}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.users} user(s)</div>
                    </div>
                    <button className="btn btn-secondary btn-sm">Edit Permissions</button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {r.permissions.map(p => (
                      <span key={p} className="badge badge-info">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
