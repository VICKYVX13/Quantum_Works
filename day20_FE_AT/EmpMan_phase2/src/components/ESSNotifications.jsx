import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Clock, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const typeConfig = {
  warning: { cls: 'badge-warning', icon: <AlertTriangle size={16} />, border: '#F59E0B' },
  success: { cls: 'badge-success', icon: <CheckCircle size={16} />, border: '#10B981' },
  info:    { cls: 'badge-info',    icon: <Info size={16} />, border: '#2563EB' },
  danger:  { cls: 'badge-danger',  icon: <AlertCircle size={16} />, border: '#EF4444' },
};

export default function ESSNotifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="dashboard-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="dashboard-title" style={{ margin: 0 }}>My Notifications</h1>
          <p className="dashboard-subtitle">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllRead}>
            Mark All as Read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.map(n => {
          const cfg = typeConfig[n.type] || typeConfig.info;
          return (
            <div key={n.id} className={`card ${n.read ? 'notif-read' : ''}`} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, padding: 16,
              borderLeft: `3px solid ${cfg.border}`, opacity: n.read ? 0.65 : 1
            }}>
              <div className={`notif-icon ${n.read ? '' : cfg.cls}`} style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {cfg.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{n.message}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  <span>{n.time}</span>
                  {!n.read && <span className="badge badge-primary" style={{ fontSize: 10 }}>NEW</span>}
                </div>
              </div>
              {!n.read ? (
                <button className="btn btn-secondary btn-sm" onClick={() => markNotificationRead(n.id)}>
                  Mark Read
                </button>
              ) : (
                <Check size={16} color="var(--accent-success)" style={{ flexShrink: 0, alignSelf: 'center' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
