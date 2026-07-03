import React, { useState, useMemo } from 'react';
import { SearchIcon, EditIcon, TrashIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function StudentTable({ students, onMarkPresent, onEdit, onDelete, addNotification }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset page when filter/search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeptFilter = (e) => {
    setSelectedDept(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  // Filter and Search logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDept === 'All' || student.department === selectedDept;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchQuery, selectedDept, selectedStatus]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  
  // Adjust current page if out of bounds
  const activePage = currentPage > totalPages ? totalPages : currentPage;

  const paginatedStudents = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, activePage]);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleDeleteClick = (student) => {
    if (window.confirm(`Are you sure you want to remove student "${student.name}" (ID: ${student.studentId})?`)) {
      onDelete(student.id);
      addNotification(`Student "${student.name}" has been removed.`, 'info');
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.75rem' }}>
      
      {/* Table Controls / Filters Header */}
      <div className="table-controls">
        <div className="search-wrapper">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by Name or ID..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-group">
          <div>
            <select
              className="form-select"
              value={selectedDept}
              onChange={handleDeptFilter}
              style={{ minWidth: '160px', padding: '0.625rem 0.875rem' }}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Eng.">Electrical Eng.</option>
              <option value="Mechanical Eng.">Mechanical Eng.</option>
              <option value="Business Admin.">Business Admin.</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={handleStatusFilter}
              style={{ minWidth: '140px', padding: '0.625rem 0.875rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-container">
        {paginatedStudents.length === 0 ? (
          <div className="empty-state">
            <SearchIcon size={48} className="empty-state-icon" />
            <h3>No results found</h3>
            <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              We couldn't find any students matching "{searchQuery}" with the current filters.
            </p>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Details</th>
                <th>Department</th>
                <th>Status</th>
                <th>Quick Actions</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {student.studentId}
                  </td>
                  <td>
                    <div className="student-name-cell">
                      <div className="student-avatar">
                        {getInitials(student.name)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.department}</td>
                  <td>
                    <span className={`badge ${student.status === 'present' ? 'badge-success' : 'badge-danger'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    {student.status === 'absent' ? (
                      <button
                        className="btn btn-success btn-sm animate-pulse"
                        onClick={() => onMarkPresent(student.id)}
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <CheckIcon size={14} />
                        Mark Present
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success-color)', fontSize: '0.875rem', fontWeight: 500 }}>
                        Attended ✓
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-icon-only btn-sm"
                        onClick={() => onEdit(student)}
                        aria-label="Edit Student"
                        title="Edit Student details"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        className="btn btn-danger btn-icon-only btn-sm"
                        onClick={() => handleDeleteClick(student)}
                        aria-label="Delete Student"
                        title="Delete Student"
                        style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--danger-color)', border: 'none' }}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {filteredStudents.length > 0 && (
        <div className="pagination">
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>
              {Math.min(filteredStudents.length, (activePage - 1) * itemsPerPage + 1)}
            </strong> to <strong style={{ color: 'var(--text-primary)' }}>
              {Math.min(filteredStudents.length, activePage * itemsPerPage)}
            </strong> of <strong style={{ color: 'var(--text-primary)' }}>{filteredStudents.length}</strong> students
          </div>
          
          <div className="pagination-buttons">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              style={{ padding: '0.5rem', borderRadius: '8px' }}
            >
              <ChevronLeftIcon size={16} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={`btn btn-sm ${activePage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    minWidth: '32px',
                    padding: '0.375rem 0.5rem',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              style={{ padding: '0.5rem', borderRadius: '8px' }}
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
