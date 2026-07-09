import { useApp } from '../context/AppContext';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard',      icon: '📊', label: 'Dashboard',       badge: null },
  { id: 'employees',      icon: '👥', label: 'Employees',        badge: null },
  { id: 'schedule',       icon: '📅', label: 'Schedule',         badge: null },
  { id: 'analytics',      icon: '📈', label: 'Analytics',        badge: null },
  { id: 'notifications',  icon: '🔔', label: 'Notifications',    badge: 'unread' },
  { id: 'settings',       icon: '⚙️', label: 'Settings',         badge: null },
];

export default function Sidebar({ onLogout }) {
  const { activeView, setActiveView, unreadCount, sidebarOpen, setSidebarOpen, theme } = useApp();

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
            <span className="sidebar-logo-icon">⚡</span>
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
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Admin profile chip */}
        {sidebarOpen && (
          <div className="sidebar-profile">
            <div className="sidebar-profile-avatar">A</div>
            <div className="sidebar-profile-info">
              <span className="sidebar-profile-name">Admin User</span>
              <span className="sidebar-profile-role">Super Administrator</span>
            </div>
            <span className="sidebar-profile-dot dot dot-success" />
          </div>
        )}

        {/* Navigation */}
        <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            const badgeCount = item.badge === 'unread' ? unreadCount : null;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                data-tooltip={!sidebarOpen ? item.label : undefined}
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
              <span className="badge badge-primary">v2.0.0</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>EMS Pro</span>
            </div>
          )}
          <button
            id="logout-btn"
            className="sidebar-logout btn"
            onClick={onLogout}
            style={{ width: '100%', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
          >
            <span>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>
    </>
  );
}
