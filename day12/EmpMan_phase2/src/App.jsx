import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeDB from './components/EmployeeDB';
import Schedule from './components/Schedule';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Attendance from './components/Attendance';
import HRModule from './components/HRModule';
import PayrollModule from './components/PayrollModule';
import ReportsModule from './components/ReportsModule';

// ESS Components
import ESSDashboard from './components/ESSDashboard';
import ESSProfile from './components/ESSProfile';
import ESSAttendance from './components/ESSAttendance';
import ESSLeave from './components/ESSLeave';
import ESSPayroll from './components/ESSPayroll';
import ESSDocuments from './components/ESSDocuments';
import ESSProjects from './components/ESSProjects';
import ESSTraining from './components/ESSTraining';
import ESSNotifications from './components/ESSNotifications';
import ESSDirectory from './components/ESSDirectory';
import ESSSupport from './components/ESSSupport';
import ESSSettings from './components/ESSSettings';

import { Menu, Search, Bell } from 'lucide-react';
import './App.css';

function AppShell({ onLogout }) {
  const { activeView, sidebarOpen, setSidebarOpen, currentUser, setActiveView } = useApp();

  const isEmployee = currentUser?.role === 'employee';

  const viewComponents = {
    // Admin Views
    dashboard:     <Dashboard />,
    employees:     <EmployeeDB />,
    attendance:    <Attendance />,
    schedule:      <Schedule />,
    hr:            <HRModule />,
    payroll:       <PayrollModule />,
    analytics:     <Analytics />,
    reports:       <ReportsModule />,
    notifications: <Notifications />,
    settings:      <Settings onLogout={onLogout} />,

    // Employee Self-Service (ESS) Views
    'ess-dashboard':     <ESSDashboard />,
    'ess-profile':       <ESSProfile />,
    'ess-attendance':    <ESSAttendance />,
    'ess-leave':         <ESSLeave />,
    'ess-payroll':       <ESSPayroll />,
    'ess-documents':     <ESSDocuments />,
    'ess-projects':      <ESSProjects />,
    'ess-training':      <ESSTraining />,
    'ess-notifications': <ESSNotifications />,
    'ess-directory':     <ESSDirectory />,
    'ess-support':       <ESSSupport />,
    'ess-settings':      <ESSSettings onLogout={onLogout} />,
  };

  const viewTitles = {
    // Admin View Titles
    dashboard:     'Dashboard',
    employees:     'Employees',
    attendance:    'Attendance Management',
    schedule:      'Shift Schedule',
    hr:            'HR Module',
    payroll:       'Payroll Management',
    analytics:     'Organization Analytics',
    reports:       'System Reports',
    notifications: 'System Notifications',
    settings:      'System Settings',

    // ESS View Titles
    'ess-dashboard':     'Employee Self-Service Dashboard',
    'ess-profile':       'My Profile',
    'ess-attendance':    'My Attendance History',
    'ess-leave':         'Leave Management',
    'ess-payroll':       'My Payroll & Payslips',
    'ess-documents':     'My Documents',
    'ess-projects':      'My Projects & Tasks',
    'ess-training':      'My Training & Courses',
    'ess-notifications': 'My Notifications',
    'ess-directory':     'Company Directory',
    'ess-support':       'Help & Support Desk',
    'ess-settings':      'Account Settings',
  };

  const defaultView = isEmployee ? 'ess-dashboard' : 'dashboard';

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
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-root">EMS Pro</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{viewTitles[activeView] || 'Overview'}</span>
            </div>
          </div>
          <div className="app-header-right">
            <div className="header-search input-group">
              <span className="input-icon"><Search size={16} /></span>
              <input className="input" placeholder="Search anything..." id="global-search" style={{ minWidth: 240 }} />
            </div>
            <button className="btn-icon header-notif-btn" id="header-notif-btn" onClick={() => {
              const notifView = isEmployee ? 'ess-notifications' : 'notifications';
              setActiveView(notifView);
            }}>
              <Bell size={20} />
            </button>
            <div className="header-admin">
              <div className="header-admin-avatar">
                {isEmployee ? currentUser?.employee?.name?.split(' ').map(n=>n[0]).join('') : 'A'}
              </div>
              <span className="header-admin-name">
                {isEmployee ? currentUser?.employee?.name : 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="app-content" id="main-content">
          {viewComponents[activeView] || viewComponents[defaultView]}
        </main>
      </div>
    </div>
  );
}

function MainAppContent() {
  const { currentUser, logout } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  return <AppShell onLogout={logout} />;
}

function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
