import { createContext, useContext, useState } from 'react';
import { initialEmployees, generateSchedule, notifications as notifData } from '../data/employees';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [employees, setEmployees] = useState(initialEmployees);
  const [schedule, setSchedule] = useState(generateSchedule(initialEmployees));
  const [notifications, setNotifications] = useState(notifData);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const addEmployee = (emp) => {
    const newEmp = {
      ...emp,
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      avatar: null,
      performance: Math.floor(Math.random() * 20) + 75,
    };
    setEmployees(prev => [...prev, newEmp]);
    setSchedule(prev => {
      const newSched = { ...prev };
      newSched[newEmp.id] = {};
      ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => {
        newSched[newEmp.id][d] = (d === 'Sat' || d === 'Sun') ? 'Off' : newEmp.shift;
      });
      return newSched;
    });
  };

  const updateEmployee = (id, updates) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setSchedule(prev => {
      const s = { ...prev };
      delete s[id];
      return s;
    });
  };

  const updateShift = (empId, day, shift) => {
    setSchedule(prev => ({
      ...prev,
      [empId]: { ...prev[empId], [day]: shift }
    }));
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      employees, addEmployee, updateEmployee, deleteEmployee,
      schedule, updateShift,
      notifications, markNotificationRead, markAllRead, unreadCount,
      activeView, setActiveView,
      selectedEmployee, setSelectedEmployee,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
