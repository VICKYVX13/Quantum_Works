import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Settings.css';

export default function Settings({ onLogout }) {
  const { theme, toggleTheme } = useApp();
  const [adminForm, setAdminForm] = useState({ name: 'Admin User', email: 'admin@emspro.com', phone: '+1-555-0000', company: 'Acme Corp', timezone: 'UTC-5' });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = e => setAdminForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'appearance', label: '🎨 Appearance' },
    { id: 'security', label: '🔒 Security' },
    { id: 'system', label: '⚙️ System' },
  ];

  return (
    <div className="settings animate-fade-in">
      <div className="settings-header">
        <h1 className="dashboard-title">Settings</h1>
        <p className="dashboard-subtitle">Manage your account and system preferences</p>
      </div>

      {/* Tab navigation */}
      <div className="settings-tabs card">
        {tabs.map(t => (
          <button
            key={t.id}
            id={`settings-tab-${t.id}`}
            className={`settings-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="settings-body">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="settings-section card animate-fade-in">
            <div className="settings-section-header">
              <h3 className="chart-title">Admin Profile</h3>
              <p className="chart-sub">Update your personal information</p>
            </div>
            <div className="profile-avatar-section">
              <div className="profile-big-avatar">A</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 4 }}>{adminForm.name}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Super Administrator</p>
                <button className="btn btn-secondary btn-sm">📷 Change Avatar</button>
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
                  <label className="form-label">Company</label>
                  <input className="input" name="company" value={adminForm.company} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Timezone</label>
                <select className="input" name="timezone" value={adminForm.timezone} onChange={handleChange}>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                  <option value="UTC+5:30">IST (UTC+5:30)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                <button type="submit" className="btn btn-primary" id="save-profile-btn">💾 Save Changes</button>
                {saved && <span className="save-success">✅ Saved successfully!</span>}
              </div>
            </form>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="settings-section card animate-fade-in">
            <div className="settings-section-header">
              <h3 className="chart-title">Appearance</h3>
              <p className="chart-sub">Customize the look and feel of EMS Pro</p>
            </div>
            <div className="appearance-options">
              <div className="appearance-option">
                <div>
                  <h4 className="option-title">Theme Mode</h4>
                  <p className="option-desc">Switch between dark and light mode</p>
                </div>
                <button
                  id="theme-toggle-btn"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                >
                  <span className={`theme-option ${theme === 'dark' ? 'active' : ''}`}>🌙 Dark</span>
                  <span className={`theme-option ${theme === 'light' ? 'active' : ''}`}>☀️ Light</span>
                </button>
              </div>

              <div className="appearance-option">
                <div>
                  <h4 className="option-title">Accent Color</h4>
                  <p className="option-desc">Primary interface color</p>
                </div>
                <div className="color-swatches">
                  {['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899'].map(c => (
                    <button key={c} className="color-swatch" style={{ background: c }} data-tooltip={c} />
                  ))}
                </div>
              </div>

              <div className="appearance-option">
                <div>
                  <h4 className="option-title">Sidebar</h4>
                  <p className="option-desc">Current: Collapsible sidebar with icons</p>
                </div>
                <span className="badge badge-success">Active</span>
              </div>

              <div className="appearance-option">
                <div>
                  <h4 className="option-title">Animations</h4>
                  <p className="option-desc">Micro-animations and transitions</p>
                </div>
                <div className="toggle-switch active" id="animations-toggle" />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="settings-section card animate-fade-in">
            <div className="settings-section-header">
              <h3 className="chart-title">Security Settings</h3>
              <p className="chart-sub">Manage your account security</p>
            </div>
            <div className="security-items">
              {[
                { icon: '🔑', title: 'Change Password', desc: 'Last changed 30 days ago', action: 'Update' },
                { icon: '📱', title: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: 'Enable' },
                { icon: '🔒', title: 'Active Sessions', desc: '1 active session (This Device)', action: 'Manage' },
                { icon: '📋', title: 'Login History', desc: 'View recent login activity', action: 'View' },
                { icon: '🛡️', title: 'API Access', desc: 'Manage API keys and tokens', action: 'Configure' },
              ].map((item, i) => (
                <div key={i} className="security-item">
                  <span className="security-item-icon">{item.icon}</span>
                  <div className="security-item-info">
                    <span className="security-item-title">{item.title}</span>
                    <span className="security-item-desc">{item.desc}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm">{item.action}</button>
                </div>
              ))}
            </div>
            <div className="danger-zone">
              <h4 style={{ color: 'var(--accent-danger)', marginBottom: 12 }}>⚠️ Danger Zone</h4>
              <button className="btn btn-danger" id="logout-settings-btn" onClick={onLogout}>🚪 Sign Out of All Devices</button>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="settings-section card animate-fade-in">
            <div className="settings-section-header">
              <h3 className="chart-title">System Information</h3>
              <p className="chart-sub">EMS Pro system details and configuration</p>
            </div>
            <div className="system-info-grid">
              {[
                { label: 'Application Version', value: 'EMS Pro v2.0.0', icon: '⚡' },
                { label: 'Build', value: 'React 19 + Vite', icon: '⚛️' },
                { label: 'Database', value: 'In-Memory (Demo)', icon: '🗄️' },
                { label: 'Environment', value: 'Development', icon: '🔧' },
                { label: 'Last Update', value: 'July 2026', icon: '📅' },
                { label: 'License', value: 'MIT Open Source', icon: '📜' },
              ].map((item, i) => (
                <div key={i} className="system-info-item">
                  <span className="system-info-icon">{item.icon}</span>
                  <div>
                    <span className="system-info-label">{item.label}</span>
                    <span className="system-info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="system-actions">
              <button className="btn btn-secondary">📤 Export Data (CSV)</button>
              <button className="btn btn-secondary">🔄 Reset to Defaults</button>
              <button className="btn btn-secondary">📋 View Audit Log</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
