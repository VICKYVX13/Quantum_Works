import { useApp } from '../context/AppContext';
import { AlertTriangle, CheckCircle, Info, AlertCircle, Clock, Check } from 'lucide-react';
import './Notifications.css';

const typeConfig = {
  warning: { cls: 'badge-warning', icon: <AlertTriangle size={16} />, border: '#F59E0B' },
  success: { cls: 'badge-success', icon: <CheckCircle size={16} />, border: '#10B981' },
  info:    { cls: 'badge-info',    icon: <Info size={16} />, border: '#2563EB' },
  danger:  { cls: 'badge-danger',  icon: <AlertCircle size={16} />, border: '#EF4444' },
};

const typeLabels = { warning: 'Warnings', success: 'Success', info: 'Info', danger: 'Alerts' };

function NotifCard({ notif, onRead }) {
  const cfg = typeConfig[notif.type] || typeConfig.info;
  return (
    <div className={`notif-card card ${notif.read ? 'notif-read' : ''}`} style={{ borderLeft: `3px solid ${cfg.border}` }}>
      <div className={`notif-icon ${notif.read ? '' : cfg.cls}`}>{cfg.icon}</div>
      <div className="notif-content">
        <div className="notif-title">{notif.title}</div>
        <div className="notif-message">{notif.message}</div>
        <div className="notif-meta">
          <Clock size={12} />
          <span className="notif-time">{notif.time}</span>
          {!notif.read && <span className="badge badge-primary" style={{ fontSize: 10 }}>NEW</span>}
        </div>
      </div>
      {!notif.read ? (
        <button className="btn btn-secondary btn-sm notif-action-btn" onClick={() => onRead(notif.id)} id={`mark-read-${notif.id}`}>
          Mark Read
        </button>
      ) : (
        <Check size={16} color="var(--accent-success)" style={{ flexShrink: 0 }} />
      )}
    </div>
  );
}

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <div className="notifs">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Notifications</h1>
          <p className="dashboard-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllRead} id="mark-all-read-btn">
            Mark All as Read
          </button>
        )}
      </div>

      {/* Type Summary */}
      <div className="notif-summary">
        {['warning', 'success', 'info', 'danger'].map(type => {
          const count = notifications.filter(n => n.type === type).length;
          const cfg = typeConfig[type];
          return (
            <div key={type} className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">{typeLabels[type]}</span>
                <div className={`kpi-icon-wrap ${cfg.cls}`}>{cfg.icon}</div>
              </div>
              <div className="kpi-body">
                <span className="kpi-value">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lists */}
      {unreadCount > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
            Unread ({unreadCount})
          </div>
          <div className="notifs-list">
            {notifications.filter(n => !n.read).map(n => (
              <NotifCard key={n.id} notif={n} onRead={markNotificationRead} />
            ))}
          </div>
        </div>
      )}

      {notifications.some(n => n.read) && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '16px 0 12px' }}>
            Read
          </div>
          <div className="notifs-list">
            {notifications.filter(n => n.read).map(n => (
              <NotifCard key={n.id} notif={n} onRead={markNotificationRead} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
