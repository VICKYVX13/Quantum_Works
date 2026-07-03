import React, { useState } from 'react';
import { ShieldIcon, GraduationIcon } from './Icons';

export default function Login({ onLogin, addNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        onLogin({ username: 'Admin User', role: 'Administrator' });
        addNotification('Welcome back! Successfully logged into EduPulse.', 'success');
      } else {
        setError('Invalid username or password.');
        addNotification('Authentication failed. Check your credentials.', 'error');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleDemoFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card animate-fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <GraduationIcon size={32} />
          </div>
          <h2>EduPulse Portal</h2>
          <p className="auth-subtitle">Sign in to manage student directory & attendance</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-text)',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '1.25rem',
              border: '1px solid rgba(239, 68, 68, 0.1)'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', height: '44px' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Simulated Loading Spinner */}
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                  animation: 'spin 1s linear infinite'
                }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldIcon size={18} />
                Sign In Securely
              </span>
            )}
          </button>
        </form>

        <div className="demo-credentials" onClick={handleDemoFill}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>💡 Quick Test Credentials:</div>
          <div>Username: <strong style={{ color: 'var(--primary-color)' }}>admin</strong> | Password: <strong style={{ color: 'var(--primary-color)' }}>admin123</strong></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>
            Click this card to auto-fill credentials.
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
