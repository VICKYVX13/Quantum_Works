import { createContext, useContext, useState, useEffect } from 'react';
import { initialEmployees, generateSchedule, notifications as notifData } from '../data/employees';
import api from '../API/Employeeapi.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [notifications, setNotifications] = useState(notifData);
  const [activeView, setActiveView] = useState(() => {
    const savedUser = localStorage.getItem('ems_current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.role === 'employee' ? 'ess-dashboard' : 'dashboard';
    }
    return 'dashboard';
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ems_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Daily attendance state
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('ems_attendance');
    return saved ? JSON.parse(saved) : {};
  });

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

  // Initialize and seed daily attendance roster
  useEffect(() => {
    if (employees.length === 0) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const lastSavedDate = localStorage.getItem('ems_attendance_date');
    let currentAttendance = { ...attendance };

    if (lastSavedDate !== todayStr || Object.keys(currentAttendance).length === 0) {
      const todayDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
      currentAttendance = {};
      
      employees.forEach((emp, index) => {
        const empShift = schedule[emp.id]?.[todayDay] || emp.shift || 'Off';

        if (emp.status === 'On Leave') {
          currentAttendance[emp.id] = { status: 'Absent', checkInTime: null, reason: 'On Leave' };
        } else if (emp.status === 'Inactive') {
          currentAttendance[emp.id] = { status: 'Absent', checkInTime: null, reason: 'Inactive' };
        } else if (empShift === 'Off') {
          currentAttendance[emp.id] = { status: 'Absent', checkInTime: null, reason: 'Scheduled Off' };
        } else {
          // Regular employee scheduled to work today. Seed 75% Present, 25% Absent.
          // Deterministic seeding based on index to avoid layout shifting on initial load
          const isPresent = ((index + 3) % 4) !== 0;
          if (isPresent) {
            // Check-in between 08:30 AM and 09:45 AM
            const hour = 8 + (index % 2);
            const minute = ((index * 7) % 60).toString().padStart(2, '0');
            currentAttendance[emp.id] = {
              status: 'Present',
              checkInTime: `${hour.toString().padStart(2, '0')}:${minute} AM`,
              reason: null
            };
          } else {
            currentAttendance[emp.id] = {
              status: 'Absent',
              checkInTime: null,
              reason: 'Not Checked In'
            };
          }
        }
      });

      localStorage.setItem('ems_attendance', JSON.stringify(currentAttendance));
      localStorage.setItem('ems_attendance_date', todayStr);
      setAttendance(currentAttendance);
    }
  }, [employees, schedule]);

  const login = (usernameOrEmail, password, role) => {
    return new Promise((resolve, reject) => {
      // Simulate network request delay
      setTimeout(() => {
        if (role === 'admin') {
          if (usernameOrEmail === 'admin' && password === 'admin123') {
            const user = { role: 'admin' };
            setCurrentUser(user);
            localStorage.setItem('ems_current_user', JSON.stringify(user));
            setActiveView('dashboard');
            resolve(user);
          } else {
            reject(new Error('Invalid Admin credentials'));
          }
        } else {
          // Employee login
          const emp = employees.find(e => e.email.toLowerCase() === usernameOrEmail.trim().toLowerCase());
          if (emp) {
            // Password can be their employee ID or "emp123" or "employee123"
            const matchedPassword = password.trim() === emp.id || password.trim().toLowerCase() === 'emp123' || password.trim().toLowerCase() === 'employee123';
            if (matchedPassword) {
              const user = { role: 'employee', employee: emp };
              setCurrentUser(user);
              localStorage.setItem('ems_current_user', JSON.stringify(user));
              setActiveView('ess-dashboard');
              resolve(user);
            } else {
              reject(new Error('Invalid password. Try employee ID or emp123'));
            }
          } else {
            reject(new Error('Employee email not found'));
          }
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ems_current_user');
    setActiveView('dashboard');
  };

  const checkIn = (empId) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
    const timeStr = `${displayHours}:${minutes} ${ampm}`;

    setAttendance(prev => {
      const updated = {
        ...prev,
        [empId]: { status: 'Present', checkInTime: timeStr, reason: null }
      };
      localStorage.setItem('ems_attendance', JSON.stringify(updated));
      return updated;
    });
  };

  const checkOut = (empId) => {
    setAttendance(prev => {
      const updated = {
        ...prev,
        [empId]: { status: 'Absent', checkInTime: null, reason: 'Checked Out' }
      };
      localStorage.setItem('ems_attendance', JSON.stringify(updated));
      return updated;
    });
  };

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
      currentUser, login, logout,
      attendance, checkIn, checkOut,
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
