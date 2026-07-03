import React, { useEffect } from 'react';
import { CheckIcon, XIcon, ShieldIcon } from './Icons';

export default function Notification({ notifications, removeNotification }) {
  return (
    <div className="toast-container">
      {notifications.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeNotification(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const { message, type, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon size={18} style={{ color: 'var(--success-color)' }} />;
      case 'error':
        return <XIcon size={18} style={{ color: 'var(--danger-color)' }} />;
      case 'info':
      default:
        return <ShieldIcon size={18} style={{ color: 'var(--primary-color)' }} />;
    }
  };

  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'toast toast-success';
      case 'error':
        return 'toast toast-error';
      case 'info':
      default:
        return 'toast toast-info';
    }
  };

  return (
    <div className={getClassName()}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {getIcon()}
      </div>
      <div style={{ flexGrow: 1, fontSize: '0.875rem', fontWeight: 500, paddingRight: '0.5rem' }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.25rem'
        }}
        aria-label="Dismiss toast"
      >
        <XIcon size={14} />
      </button>
    </div>
  );
}
