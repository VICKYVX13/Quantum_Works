import { createContext, useContext, useState, useEffect } from 'react';
import { initialEmployees, generateSchedule, notifications as notifData } from '../data/employees';
import api from '../API/Employeeapi.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [notifications, setNotifications] = useState(notifData);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Fetch from mockapi using the axios instance
    api.get('/Employee')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          const formattedData = data.map(emp => ({
            id: emp.id || `EMP${Math.floor(Math.random() * 1000)}`,
            name: emp.name || 'Unknown',
            email: emp.email || '',
            phone: emp.phone || '',
            department: emp.department || 'Engineering',
            role: emp.role || 'Employee',
            status: emp.status || 'Active',
            joinDate: emp.joinDate || new Date().toISOString().split('T')[0],
            salary: Number(emp.salary) || 50000,
            location: emp.location || 'Remote',
            shift: emp.shift || 'Morning',
            skills: Array.isArray(emp.skills) ? emp.skills : (typeof emp.skills === 'string' ? emp.skills.split(',') : []),
            performance: emp.performance || 80
          }));
          setEmployees(formattedData);
          setSchedule(generateSchedule(formattedData));
        }
      })
      .catch(err => console.error("Error fetching employees from MockAPI:", err));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const addEmployee = async (emp) => {
    const newEmp = {
      ...emp,
      avatar: null,
      performance: Math.floor(Math.random() * 20) + 75,
    };
    try {
      const res = await api.post('/Employee', newEmp);
      const addedEmp = res.data;
      setEmployees(prev => [...prev, addedEmp]);
      setSchedule(prev => {
        const newSched = { ...prev };
        newSched[addedEmp.id] = {};
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(d => {
          newSched[addedEmp.id][d] = (d === 'Sat' || d === 'Sun') ? 'Off' : addedEmp.shift;
        });
        return newSched;
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const updateEmployee = async (id, updates) => {
    try {
      const res = await api.put(`/Employee/${id}`, updates);
      setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...res.data } : e));
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/Employee/${id}`);
      setEmployees(prev => prev.filter(e => e.id !== id));
      setSchedule(prev => {
        const s = { ...prev };
        delete s[id];
        return s;
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
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
