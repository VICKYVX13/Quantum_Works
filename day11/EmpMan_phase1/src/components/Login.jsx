import { useState } from 'react';
import './Login.css';

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async auth
    await new Promise(r => setTimeout(r, 1200));
    if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError('Invalid credentials. Try admin / admin123');
    }
    setLoading(false);
  };

  return (
    <div className="login-root">
      {/* Animated background orbs */}
      <div className="orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay" />

      <div className="login-container">
        {/* Left branding panel */}
        <div className="login-brand">
          <div className="brand-logo">
            <span className="brand-icon">⚡</span>
            <span className="brand-name">EMS Pro</span>
          </div>
          <h1 className="brand-headline">Manage Your <br /><span className="gradient-text">Workforce</span><br />Smarter</h1>
          <p className="brand-sub">AI-powered employee management platform for modern organizations. Real-time insights, seamless collaboration.</p>

          <div className="brand-features">
            {[
              { icon: '👥', text: 'Employee Database' },
              { icon: '📅', text: 'Smart Scheduling' },
              { icon: '📊', text: 'Analytics & Reports' },
              { icon: '🔔', text: 'Real-time Alerts' },
            ].map((f, i) => (
              <div key={i} className="brand-feature-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-num">12K+</span>
              <span className="stat-lbl">Companies</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">500K+</span>
              <span className="stat-lbl">Employees</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">99.9%</span>
              <span className="stat-lbl">Uptime</span>
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="login-form-wrap">
          <div className="login-card">
            <div className="login-header">
              <div className="login-avatar">
                <span>🔐</span>
              </div>
              <h2 className="login-title">Admin Portal</h2>
              <p className="login-subtitle">Sign in to access the dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form" id="login-form" noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="login-username">Username</label>
                <div className="input-group">
                  <span className="input-icon">👤</span>
                  <input
                    id="login-username"
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <div className="input-group" style={{ position: 'relative' }}>
                  <span className="input-icon">🔑</span>
                  <input
                    id="login-password"
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(s => !s)}
                    aria-label="Toggle password"
                  >
                    
                  </button>
                </div>
              </div>

              {error && (
                <div className="login-error" role="alert">
                  <span>⚠️</span> {error}
                </div>
              )}

              <div className="login-hint">
                <span className="hint-icon">💡</span>
                <span>Demo credentials: <strong>admin</strong> / <strong>admin123</strong></span>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    Authenticating...
                  </>
                ) : (
                  <>
                  
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <span className="secure-badge">🔒 256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
