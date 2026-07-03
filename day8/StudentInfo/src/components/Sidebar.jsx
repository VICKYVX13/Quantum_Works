import React, { useState } from 'react';
import { 
  DashboardIcon, 
  StudentsIcon, 
  AddStudentIcon, 
  SettingsIcon, 
  LogOutIcon, 
  SunIcon, 
  MoonIcon, 
  GraduationIcon,
  MenuIcon,
  XIcon
} from './Icons';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onSignOut, 
  user,
  darkMode,
  setDarkMode,
  addNotification
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon size={20} /> },
    { id: 'students', label: 'Student Directory', icon: <StudentsIcon size={20} /> },
    { id: 'add-student', label: 'Register Student', icon: <AddStudentIcon size={20} /> },
    { id: 'settings', label: 'Data Actions', icon: <SettingsIcon size={20} /> },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleToggleTheme = () => {
    setDarkMode(prev => !prev);
    addNotification(`Theme toggled to ${!darkMode ? 'Dark' : 'Light'} Mode.`, 'info');
  };

  const handleSignOutClick = () => {
    setMobileMenuOpen(false);
    onSignOut();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-section">
          <div className="brand-logo-container">
            <GraduationIcon size={22} color="white" />
          </div>
          <span className="brand-name">EduPulse</span>
        </div>
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: 'white' }}
        >
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <nav className={`sidebar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`btn nav-item ${activeTab === item.id ? 'active' : ''}`}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={`sidebar-footer ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Dark Mode Switcher */}
        <button
          onClick={handleToggleTheme}
          className="btn nav-item"
          style={{
            justifyContent: 'flex-start',
            border: 'none',
            background: 'rgba(255,255,255,0.03)',
            width: '100%',
            textAlign: 'left',
            padding: '0.625rem 1rem',
            borderRadius: '8px'
          }}
        >
          {darkMode ? <SunIcon size={20} style={{ color: 'var(--warning-color)' }} /> : <MoonIcon size={20} />}
          <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
        </button>

        {/* User Card */}
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleSignOutClick}
          className="btn nav-item"
          style={{
            justifyContent: 'flex-start',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            width: '100%',
            textAlign: 'left',
            marginTop: '0.25rem'
          }}
        >
          <LogOutIcon size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
