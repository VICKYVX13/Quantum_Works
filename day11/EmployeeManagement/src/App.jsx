import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeDB from './components/EmployeeDB';
import Schedule from './components/Schedule';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import './App.css';

function AppShell({ onLogout }) {
  const { activeView, sidebarOpen, setSidebarOpen } = useApp();

  const viewComponents = {
    dashboard:     <Dashboard />,
    employees:     <EmployeeDB />,
    schedule:      <Schedule />,
    analytics:     <Analytics />,
    notifications: <Notifications />,
    settings:      <Settings onLogout={onLogout} />,
  };

  const viewTitles = {
    dashboard:     '📊 Dashboard',
    employees:     '👥 Employees',
    schedule:      '📅 Schedule',
    analytics:     '📈 Analytics',
    notifications: '🔔 Notifications',
    settings:      '⚙️ Settings',
  };

  return (
    <div className="app-shell">
      <Sidebar onLogout={onLogout} />

      <div className={`app-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        {/* Top header bar */}
        <header className="app-header">
          <div className="app-header-left">
            {/* Mobile menu button */}
            <button
              className="btn-icon mobile-menu-btn"
              onClick={() => setSidebarOpen(s => !s)}
              id="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-root">EMS Pro</span>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">{viewTitles[activeView]}</span>
            </div>
          </div>
          <div className="app-header-right">
            <div className="header-search input-group">
              <span className="input-icon" style={{ fontSize: 14 }}>🔍</span>
              <input className="input" placeholder="Search anything..." id="global-search" style={{ minWidth: 200 }} />
            </div>
            <button className="btn-icon header-notif-btn" id="header-notif-btn">
              🔔
            </button>
            <div className="header-admin">
              <div className="header-admin-avatar">A</div>
              <span className="header-admin-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="app-content" id="main-content">
          {viewComponents[activeView] || <Dashboard />}
        </main>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <AppProvider>
      <AppShell onLogout={() => setLoggedIn(false)} />
    </AppProvider>
  );
}

export default App;
