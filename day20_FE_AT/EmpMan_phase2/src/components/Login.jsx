import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useApp();
  const [tab, setTab] = useState('admin'); // 'admin' | 'employee'
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password, tab);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Zap size={32} color="#fff" />
          </div>
          <div>
            <h1 className="login-brand-title">EMS Pro</h1>
            <p className="login-brand-sub">Enterprise HRMS</p>
          </div>
        </div>

        <div className="login-tagline">
          <h2>Manage your workforce<br />with confidence</h2>
          <p>A complete HR management system built for modern enterprises. Streamline payroll, attendance, recruitment, and performance — all in one place.</p>
        </div>

        <div className="login-features">
          {[
            'Employee Directory & Profiles',
            'Payroll & Tax Management',
            'Attendance Tracking',
            'Leave Management',
            'Performance Reviews',
            'Advanced Analytics',
          ].map(f => (
            <div key={f} className="login-feature-item">
              <div className="login-feature-dot" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-title">Sign in to EMS Pro</h2>
            <p className="login-subtitle">Access your HR dashboard</p>
          </div>

          {/* Role Tabs */}
          <div className="login-tabs">
            <button
              className={`login-tab ${tab === 'admin' ? 'active' : ''}`}
              onClick={() => { setTab('admin'); setError(''); }}
              id="admin-login-tab"
            >
              Administrator
            </button>
            <button
              className={`login-tab ${tab === 'employee' ? 'active' : ''}`}
              onClick={() => { setTab('employee'); setError(''); }}
              id="employee-login-tab"
            >
              Employee
            </button>
          </div>

          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {tab === 'admin' ? 'Username' : 'Email Address'}
              </label>
              <input
                className="input"
                name="username"
                type={tab === 'admin' ? 'text' : 'email'}
                placeholder={tab === 'admin' ? 'admin' : 'your@email.com'}
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                id="login-username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  id="login-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-demo-creds">
            <div className="demo-cred-title">Demo Credentials</div>
            {tab === 'admin' ? (
              <div className="demo-cred-row">
                <span>Username: <code>admin</code></span>
                <span>Password: <code>admin123</code></span>
              </div>
            ) : (
              <div className="demo-cred-row">
                <span>Email: any employee email</span>
                <span>Password: <code>emp123</code></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
