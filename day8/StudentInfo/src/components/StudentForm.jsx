import React, { useState, useEffect } from 'react';
import { AddStudentIcon, EditIcon, CheckIcon, XIcon } from './Icons';

export default function StudentForm({ onSubmit, editingStudent, cancelEdit, students, addNotification }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [status, setStatus] = useState('present');
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setStudentId(editingStudent.studentId);
      setDepartment(editingStudent.department);
      setStatus(editingStudent.status);
    } else {
      // Set defaults for adding
      setName('');
      // Generate a suggested ID (e.g. STU-XYZ) to make it easier for the user
      const nextNum = students.length > 0 
        ? Math.max(...students.map(s => {
            const match = s.studentId.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          })) + 1 
        : 101;
      setStudentId(`STU-${nextNum}`);
      setDepartment('Computer Science');
      setStatus('present');
    }
    setErrors({});
  }, [editingStudent, students]);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Student Name is required.';
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Student Name must be at least 3 characters.';
    }

    if (!studentId.trim()) {
      tempErrors.studentId = 'Student ID is required.';
    } else {
      const idPattern = /^STU-\d+$/i;
      if (!idPattern.test(studentId)) {
        tempErrors.studentId = 'Student ID must follow the STU-XXXX format (e.g., STU-102).';
      }
      
      // Check for duplicate Student ID (ignoring self if editing)
      const duplicate = students.find(
        (s) => s.studentId.toUpperCase() === studentId.trim().toUpperCase() && 
               (!editingStudent || s.id !== editingStudent.id)
      );
      if (duplicate) {
        tempErrors.studentId = `Student ID "${studentId}" is already assigned to "${duplicate.name}".`;
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addNotification('Please fix the errors on the form.', 'error');
      return;
    }

    const studentData = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name: name.trim(),
      studentId: studentId.trim().toUpperCase(),
      department,
      status
    };

    onSubmit(studentData);
    
    if (editingStudent) {
      addNotification(`Student "${studentData.name}" details updated successfully!`, 'success');
    } else {
      addNotification(`Student "${studentData.name}" has been registered successfully!`, 'success');
      // Reset form
      setName('');
      // Suggest new ID
      const nextNum = parseInt(studentData.studentId.replace(/\D/g, ''), 10) + 1;
      setStudentId(`STU-${nextNum || 101}`);
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {editingStudent ? <EditIcon size={20} /> : <AddStudentIcon size={20} />}
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{editingStudent ? 'Edit Student Record' : 'Register New Student'}</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {editingStudent ? `Modifying profile details of ${editingStudent.name}` : 'Create a new profile in the school registry'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="student-name">Student Name</label>
          <input
            type="text"
            id="student-name"
            className="form-input"
            placeholder="e.g. Johnathan Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: errors.name ? 'var(--danger-color)' : 'var(--border-color)' }}
          />
          {errors.name && <span style={{ fontSize: '0.75rem', color: 'var(--danger-color)', fontWeight: 500 }}>{errors.name}</span>}
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="student-id">Student ID</label>
            <input
              type="text"
              id="student-id"
              className="form-input"
              placeholder="e.g. STU-101"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ borderColor: errors.studentId ? 'var(--danger-color)' : 'var(--border-color)' }}
            />
            {errors.studentId && <span style={{ fontSize: '0.75rem', color: 'var(--danger-color)', fontWeight: 500 }}>{errors.studentId}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="student-dept">Department</label>
            <select
              id="student-dept"
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Eng.">Electrical Eng.</option>
              <option value="Mechanical Eng.">Mechanical Eng.</option>
              <option value="Business Admin.">Business Admin.</option>
              <option value="Physics">Physics</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '0.5rem' }}>
          <label className="form-label">Today's Attendance Status</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
            <button
              type="button"
              className="btn"
              onClick={() => setStatus('present')}
              style={{
                flex: 1,
                border: '1px solid var(--border-color)',
                backgroundColor: status === 'present' ? 'var(--success-bg)' : 'var(--bg-secondary)',
                color: status === 'present' ? 'var(--success-text)' : 'var(--text-secondary)',
                borderColor: status === 'present' ? 'var(--success-color)' : 'var(--border-color)',
                fontWeight: status === 'present' ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                height: '46px'
              }}
            >
              <CheckIcon size={18} style={{ color: status === 'present' ? 'var(--success-color)' : 'var(--text-muted)' }} />
              Present Today
            </button>
            
            <button
              type="button"
              className="btn"
              onClick={() => setStatus('absent')}
              style={{
                flex: 1,
                border: '1px solid var(--border-color)',
                backgroundColor: status === 'absent' ? 'var(--danger-bg)' : 'var(--bg-secondary)',
                color: status === 'absent' ? 'var(--danger-text)' : 'var(--text-secondary)',
                borderColor: status === 'absent' ? 'var(--danger-color)' : 'var(--border-color)',
                fontWeight: status === 'absent' ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                height: '46px'
              }}
            >
              <XIcon size={18} style={{ color: status === 'absent' ? 'var(--danger-color)' : 'var(--text-muted)' }} />
              Absent Today
            </button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          marginTop: '2rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem'
        }}>
          {editingStudent && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
              style={{ height: '42px', minWidth: '100px' }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: '42px', minWidth: '130px' }}
          >
            {editingStudent ? 'Save Changes' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}
