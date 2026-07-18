import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Calendar,
  Briefcase,
  CreditCard,
  LineChart,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  Clock,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import './Sidebar.css';

const adminNavItems = [
  { id: 'dashboard',      icon: <LayoutDashboard size={20} />, label: 'Dashboard',       badge: null },
  { id: 'employees',      icon: <Users size={20} />,           label: 'Employees',        badge: null },
  { id: 'attendance',     icon: <ClipboardCheck size={20} />,  label: 'Attendance',      badge: null },
  { id: 'schedule',       icon: <Calendar size={20} />,        label: 'Schedule',         badge: null },
  { id: 'hr',             icon: <Briefcase size={20} />,       label: 'HR Module',        badge: null },
  { id: 'payroll',        icon: <CreditCard size={20} />,      label: 'Payroll',          badge: null },
  { id: 'analytics',      icon: <LineChart size={20} />,       label: 'Analytics',        badge: null },
  { id: 'reports',        icon: <FileText size={20} />,        label: 'Reports',          badge: null },
  { id: 'notifications',  icon: <Bell size={20} />,            label: 'Notifications',    badge: 'unread' },
  { id: 'settings',       icon: <Settings size={20} />,        label: 'Settings',         badge: null },
];

const employeeNavItems = [
  { id: 'ess-dashboard',      icon: <LayoutDashboard size={20} />, label: 'Dashboard',       badge: null },
  { id: 'ess-profile',        icon: <User size={20} />,            label: 'My Profile',      badge: null },
  { id: 'ess-attendance',     icon: <Clock size={20} />,           label: 'Attendance',      badge: null },
  { id: 'ess-leave',          icon: <Calendar size={20} />,        label: 'Leave Management', badge: null },
  { id: 'ess-payroll',        icon: <CreditCard size={20} />,      label: 'Payroll',          badge: null },
  { id: 'ess-documents',      icon: <FileText size={20} />,        label: 'Documents',        badge: null },
  { id: 'ess-projects',       icon: <Briefcase size={20} />,       label: 'My Projects',      badge: null },
  { id: 'ess-training',       icon: <GraduationCap size={20} />,   label: 'Training',         badge: null },
  { id: 'ess-notifications',  icon: <Bell size={20} />,            label: 'Notifications',    badge: 'unread' },
  { id: 'ess-directory',      icon: <Users size={20} />,           label: 'Company Directory',badge: null },
  { id: 'ess-support',        icon: <HelpCircle size={20} />,      label: 'Help & Support',   badge: null },
  { id: 'ess-settings',       icon: <Settings size={20} />,        label: 'Settings',         badge: null },
];

export default function Sidebar({ onLogout }) {
  const { activeView, setActiveView, unreadCount, sidebarOpen, setSidebarOpen, currentUser } = useApp();

  const isEmployee = currentUser?.role === 'employee';
  const displayItems = isEmployee ? employeeNavItems : adminNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon"><Zap size={24} color="var(--accent-primary)" /></span>
            {sidebarOpen && (
              <span className="sidebar-logo-text">EMS Pro</span>
            )}
          </div>
          <button
            className="sidebar-toggle btn-icon"
            onClick={() => setSidebarOpen(s => !s)}
            aria-label="Toggle sidebar"
            id="sidebar-toggle-btn"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Profile chip */}
        {sidebarOpen && (
          <div className="sidebar-profile">
            <div className="sidebar-profile-avatar">
              {isEmployee ? currentUser?.employee?.name?.split(' ').map(n=>n[0]).join('') : 'A'}
            </div>
            <div className="sidebar-profile-info">
              <span className="sidebar-profile-name">
                {isEmployee ? currentUser?.employee?.name : 'Admin User'}
              </span>
              <span className="sidebar-profile-role">
                {isEmployee ? currentUser?.employee?.role : 'Super Administrator'}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
          {displayItems.map(item => {
            const isActive = activeView === item.id;
            const badgeCount = item.badge === 'unread' ? unreadCount : null;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {badgeCount > 0 && (
                      <span className="nav-badge">{badgeCount}</span>
                    )}
                  </>
                )}
                {!sidebarOpen && badgeCount > 0 && (
                  <span className="nav-badge-dot" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="sidebar-version">
              <span className="badge badge-primary">v3.0 Enterprise</span>
            </div>
          )}
          <button
            id="logout-btn"
            className="sidebar-logout btn"
            onClick={onLogout}
            style={{ width: '100%', justifyContent: sidebarOpen ? 'flex-start' : 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
          >
            <LogOut size={20} />
            {sidebarOpen && <span style={{ marginLeft: 8 }}>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
