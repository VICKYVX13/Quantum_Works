import { useState } from 'react';
import { Lock, Eye, EyeOff, Check, CheckCircle2 } from 'lucide-react';

export default function ESSSettings() {
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) {
      alert('New passwords do not match');
      return;
    }
    setSuccess(true);
    setPassForm({ current: '', new: '', confirm: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
      {/* Settings Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Security & Password */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label className="form-label">Current Password *</label>
              <input 
                type={showPass ? 'text' : 'password'} 
                className="input" 
                value={passForm.current} 
                onChange={e => setPassForm({...passForm, current: e.target.value})} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">New Password *</label>
                <input 
                  type={showPass ? 'text' : 'password'} 
                  className="input" 
                  value={passForm.new} 
                  onChange={e => setPassForm({...passForm, new: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password *</label>
                <input 
                  type={showPass ? 'text' : 'password'} 
                  className="input" 
                  value={passForm.confirm} 
                  onChange={e => setPassForm({...passForm, confirm: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="submit" className="btn btn-primary">Update Password</button>
                {success && (
                  <span style={{ color: 'var(--accent-success)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={16} /> Updated
                  </span>
                )}
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? 'Hide' : 'Show'} Passwords
              </button>
            </div>
          </form>
        </div>

        {/* UI preferences */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>UI Preferences</h3>
          {[
            { label: 'Compact Interface Mode', desc: 'Reduce row padding in tables' },
            { label: 'Desktop Notifications', desc: 'Receive sound alerts for updates' },
            { label: 'Dark Mode (Beta)', desc: 'Toggle high contrast colors' },
          ].map((item, idx) => (
            <div key={idx} className="settings-notif-item">
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" defaultChecked={idx === 1} className="toggle-input" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="card" style={{ padding: 20, height: 'fit-content' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Security Notice</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          Passwords must contain at least 8 characters, including a capital letter and a special character. For assistance, contact the Security Admin desk.
        </p>
      </div>
    </div>
  );
}
