import { useApp } from '../context/AppContext';
import './Notifications.css';

const typeConfig = {
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  success: { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)' },
  info:    { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.3)' },
  danger:  { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)' },
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <div className="notifs animate-fade-in">
      <div className="notifs-header">
        <div>
          <h1 className="dashboard-title">Notifications</h1>
          <p className="dashboard-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllRead} id="mark-all-read-btn">
            ✅ Mark All as Read
          </button>
        )}
      </div>

      {/* Notification type summary */}
      <div className="notif-summary">
        {['warning','success','info','danger'].map(type => {
          const count = notifications.filter(n => n.type === type).length;
          const cfg = typeConfig[type];
          const icons = { warning: '⚠️', success: '✅', info: 'ℹ️', danger: '🔴' };
          const labels = { warning: 'Warnings', success: 'Success', info: 'Info', danger: 'Alerts' };
          return (
            <div key={type} className="notif-type-card card" style={{ borderColor: cfg.border }}>
              <span style={{ fontSize: 24 }}>{icons[type]}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: cfg.color }}>{count}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{labels[type]}</div>
            </div>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="notifs-list">
        {unreadCount > 0 && (
          <div className="notif-section-header">
            <span className="badge badge-danger">🔴 Unread ({unreadCount})</span>
          </div>
        )}
        {notifications.filter(n => !n.read).map(n => (
          <NotifCard key={n.id} notif={n} onRead={markNotificationRead} />
        ))}
        {notifications.some(n => n.read) && (
          <div className="notif-section-header" style={{ marginTop: 12 }}>
            <span className="badge badge-info">📋 Read</span>
          </div>
        )}
        {notifications.filter(n => n.read).map(n => (
          <NotifCard key={n.id} notif={n} onRead={markNotificationRead} />
        ))}
      </div>
    </div>
  );
}

function NotifCard({ notif, onRead }) {
  const cfg = typeConfig[notif.type] || typeConfig.info;
  return (
    <div
      className={`notif-card card ${notif.read ? 'notif-read' : 'notif-unread'}`}
      style={{ borderLeft: `4px solid ${cfg.color}` }}
    >
      <div className="notif-icon" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
        {notif.icon}
      </div>
      <div className="notif-content">
        <div className="notif-title">{notif.title}</div>
        <div className="notif-message">{notif.message}</div>
        <div className="notif-meta">
          <span className="notif-time">🕐 {notif.time}</span>
          {!notif.read && (
            <span className="badge badge-primary" style={{ fontSize: 10 }}>NEW</span>
          )}
        </div>
      </div>
      {!notif.read && (
        <button
          className="btn btn-secondary btn-sm notif-action-btn"
          onClick={() => onRead(notif.id)}
          id={`mark-read-${notif.id}`}
        >
          Mark Read
        </button>
      )}
      {notif.read && (
        <span className="notif-read-check">✓</span>
      )}
    </div>
  );
}
