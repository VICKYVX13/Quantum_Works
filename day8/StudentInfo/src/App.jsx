import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import Settings from './components/Settings';
import Notification from './components/Notification';

const initialStudentsSeed = [
  { id: 1, name: 'Arjun Sharma', studentId: 'STU-101', department: 'Computer Science', status: 'present' },
  { id: 2, name: 'Priya Patel', studentId: 'STU-102', department: 'Electrical Eng.', status: 'absent' },
  { id: 3, name: 'Rohan Verma', studentId: 'STU-103', department: 'Mechanical Eng.', status: 'present' },
  { id: 4, name: 'Ananya Iyer', studentId: 'STU-104', department: 'Business Admin.', status: 'present' },
  { id: 5, name: 'Vikram Singh', studentId: 'STU-105', department: 'Physics', status: 'absent' },
  { id: 6, name: 'Sneha Reddy', studentId: 'STU-106', department: 'Computer Science', status: 'present' },
  { id: 7, name: 'Kabir Malhotra', studentId: 'STU-107', department: 'Electrical Eng.', status: 'present' },
  { id: 8, name: 'Meera Nair', studentId: 'STU-108', department: 'Business Admin.', status: 'absent' }
];

export default function App() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Database state
  const [students, setStudents] = useState([]);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Edit mode details
  const [editingStudent, setEditingStudent] = useState(null);

  // Theme states
  const [darkMode, setDarkMode] = useState(false);

  // Toast banner queue
  const [notifications, setNotifications] = useState([]);

  // 1. Initial boot: check theme, load student data and auth cache
  useEffect(() => {
    // Authentication Cache check
    const cachedUser = localStorage.getItem('edupulse_user');
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('edupulse_user');
      }
    }

    // Student Database Cache check
    const cachedStudents = localStorage.getItem('edupulse_students');
    if (cachedStudents) {
      try {
        const parsed = JSON.parse(cachedStudents);
        setStudents(parsed);
      } catch (e) {
        setStudents(initialStudentsSeed);
        localStorage.setItem('edupulse_students', JSON.stringify(initialStudentsSeed));
      }
    } else {
      // Seed default database on first boot
      setStudents(initialStudentsSeed);
      localStorage.setItem('edupulse_students', JSON.stringify(initialStudentsSeed));
    }

    // Dark Mode preference
    const savedTheme = localStorage.getItem('edupulse_darkmode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  // 2. Synchronize dark mode class on Document Element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edupulse_darkmode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edupulse_darkmode', 'false');
    }
  }, [darkMode]);

  // 3. System Notification Dispatcher
  const addNotification = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((toast) => toast.id !== id));
  };

  // 4. Session Operations
  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('edupulse_user', JSON.stringify(userInfo));
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('edupulse_user');
    addNotification('Logged out successfully. Secure session terminated.', 'info');
  };

  // 5. Roster CRUD Operations
  const saveStudentsToStorage = (updatedList) => {
    setStudents(updatedList);
    localStorage.setItem('edupulse_students', JSON.stringify(updatedList));
  };

  const handleAddOrUpdateStudent = (studentData) => {
    if (editingStudent) {
      // Edit operation
      const updated = students.map((s) => (s.id === studentData.id ? studentData : s));
      saveStudentsToStorage(updated);
      setEditingStudent(null);
    } else {
      // Add operation
      const updated = [...students, studentData];
      saveStudentsToStorage(updated);
    }
    setActiveTab('students');
  };

  const handleQuickPresent = (id) => {
    const targetStudent = students.find((s) => s.id === id);
    const updated = students.map((s) => (s.id === id ? { ...s, status: 'present' } : s));
    saveStudentsToStorage(updated);
    if (targetStudent) {
      addNotification(`Marked "${targetStudent.name}" as Present.`, 'success');
    }
  };

  const handleEditTrigger = (student) => {
    setEditingStudent(student);
    setActiveTab('add-student');
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setActiveTab('students');
  };

  const handleDelete = (id) => {
    const updated = students.filter((s) => s.id !== id);
    saveStudentsToStorage(updated);
  };

  // 6. Database Operations (via Settings Panel)
  const handleSeedDatabase = () => {
    if (window.confirm('Reset database to preloaded default dummy records? This replaces active rosters.')) {
      saveStudentsToStorage(initialStudentsSeed);
      addNotification('Roster database restored with initial seed rosters.', 'success');
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm('WARNING: Are you sure you want to wipe the entire student database? This action is irreversible.')) {
      saveStudentsToStorage([]);
      addNotification('Roster database wiped. All records deleted.', 'error');
    }
  };

  const handleImportDatabase = (importedList) => {
    saveStudentsToStorage(importedList);
  };

  // 7. Dynamic View Render Switch
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            students={students} 
            setActiveTab={setActiveTab} 
            onQuickPresent={handleQuickPresent} 
          />
        );
      case 'students':
        return (
          <StudentTable
            students={students}
            onMarkPresent={handleQuickPresent}
            onEdit={handleEditTrigger}
            onDelete={handleDelete}
            addNotification={addNotification}
          />
        );
      case 'add-student':
        return (
          <StudentForm
            onSubmit={handleAddOrUpdateStudent}
            editingStudent={editingStudent}
            cancelEdit={handleCancelEdit}
            students={students}
            addNotification={addNotification}
          />
        );
      case 'settings':
        return (
          <Settings
            students={students}
            onSeedDatabase={handleSeedDatabase}
            onClearDatabase={handleClearDatabase}
            onImportDatabase={handleImportDatabase}
            addNotification={addNotification}
          />
        );
      default:
        return <div>View not found.</div>;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Analytics Dashboard';
      case 'students': return 'Student Directory';
      case 'add-student': return editingStudent ? 'Edit Profile details' : 'Register New Student';
      case 'settings': return 'Database Settings & Export';
      default: return 'EduPulse';
    }
  };

  const getHeaderSubtitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Overview of institutional metrics & attendance rates.';
      case 'students': return 'Roster records, query search filters, and attendance updates.';
      case 'add-student': return editingStudent ? 'Modify records in local storage.' : 'Add a new member to the directory.';
      case 'settings': return 'Data backup, spreadsheet exports, and diagnostics.';
      default: return '';
    }
  };

  // Redirect to Login if unauthenticated
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} addNotification={addNotification} />
        <Notification notifications={notifications} removeNotification={removeNotification} />
      </>
    );
  }

  return (
    <div className="app-container">
      {/* Responsive Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={handleSignOut}
        user={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        addNotification={addNotification}
      />

      {/* Main Workspace Frame */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-title-section">
            <h2>{getHeaderTitle()}</h2>
            <p className="header-subtitle">{getHeaderSubtitle()}</p>
          </div>
          
          <div className="header-actions">
            {activeTab !== 'add-student' && (
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setEditingStudent(null);
                  setActiveTab('add-student');
                }}
              >
                ➕ Register Student
              </button>
            )}
          </div>
        </header>

        {/* View render hub */}
        <div style={{ flexGrow: 1 }}>
          {renderActiveView()}
        </div>
      </main>

      {/* Toast banners frame */}
      <Notification notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
}
