import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Calendar, Shield, Check } from 'lucide-react';

export default function ESSProfile() {
  const { currentUser } = useApp();
  const emp = currentUser?.employee || { name: 'Employee', role: 'Staff', department: 'Operations', id: 'EMP000', email: 'emp@acme.com', phone: '+1-555-0199', location: 'New York, NY', joinDate: '2025-01-10', salary: 75000 };
  
  const [profileForm, setProfileForm] = useState({
    phone: emp.phone || '',
    location: emp.location || '',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1-555-0100',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
      {/* Left Column - Card */}
      <div className="card" style={{ padding: 24, textAlign: 'center', height: 'fit-content' }}>
        <div style={{
          width: 90, height: 90, borderRadius: '50%', background: 'var(--accent-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32, fontWeight: 700,
          margin: '0 auto 16px'
        }}>
          {emp.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0' }}>{emp.name}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '0 0 16px' }}>{emp.role} &bull; {emp.department}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Mail size={16} color="var(--text-muted)" />
            <span>{emp.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Phone size={16} color="var(--text-muted)" />
            <span>{emp.phone || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <MapPin size={16} color="var(--text-muted)" />
            <span>{emp.location || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Calendar size={16} color="var(--text-muted)" />
            <span>Joined: {emp.joinDate || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Right Column - Forms */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Personal Details Form */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Personal Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  className="input" 
                  value={profileForm.phone} 
                  onChange={e => setProfileForm({...profileForm, phone: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location / Address</label>
                <input 
                  className="input" 
                  value={profileForm.location} 
                  onChange={e => setProfileForm({...profileForm, location: e.target.value})} 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Emergency Contact Name</label>
                <input 
                  className="input" 
                  value={profileForm.emergencyContactName} 
                  onChange={e => setProfileForm({...profileForm, emergencyContactName: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Emergency Contact Phone</label>
                <input 
                  className="input" 
                  value={profileForm.emergencyContactPhone} 
                  onChange={e => setProfileForm({...profileForm, emergencyContactPhone: e.target.value})} 
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" className="btn btn-primary">Save Profile</button>
              {saved && (
                <span style={{ color: 'var(--accent-success)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Check size={14} /> Profile details updated
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Work / Employment details */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Employment Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Employee ID</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{emp.id}</span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Department</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{emp.department}</span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Designation</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{emp.role}</span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Shift</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{emp.shift || 'Morning'}</span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Manager</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>John Smith</span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Status</span>
              <span className="badge badge-success" style={{ marginTop: 2 }}>{emp.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
