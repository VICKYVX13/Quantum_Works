import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { departments, roles } from '../data/employees';
import './EmployeeDB.css';

const getAvatarColor = (name) => {
  const colors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const statusConfig = {
  Active:    { cls: 'badge-success', dot: 'dot-success' },
  'On Leave':{ cls: 'badge-warning', dot: 'dot-warning' },
  Inactive:  { cls: 'badge-danger',  dot: 'dot-danger'  },
};

const emptyForm = {
  name: '', email: '', phone: '', department: '', role: '',
  status: 'Active', joinDate: '', salary: '', location: '', shift: 'Morning', skills: ''
};

function EmployeeModal({ mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState(mode === 'edit' ? {
    ...initialData,
    skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : ''
  } : emptyForm);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...form, salary: Number(form.salary), skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean) });
    onClose();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'add' ? '➕ Add New Employee' : '✏️ Edit Employee'}</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form id={`employee-${mode}-form`} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="input" name="name" placeholder="e.g. John Doe" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="input" type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="input" name="phone" placeholder="+1-555-0000" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="input" name="location" placeholder="City, State" value={form.location} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select className="input" name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select className="input" name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="input" name="status" value={form.status} onChange={handleChange}>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Shift</label>
              <select className="input" name="shift" value={form.shift} onChange={handleChange}>
                <option>Morning</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Join Date</label>
              <input className="input" type="date" name="joinDate" value={form.joinDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Salary (USD)</label>
              <input className="input" type="number" name="salary" placeholder="75000" value={form.salary} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Skills (comma-separated)</label>
            <input className="input" name="skills" placeholder="React, Python, SQL" value={form.skills} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id={`submit-${mode}-employee`}>
              {mode === 'add' ? '➕ Add Employee' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EmployeeDetailModal({ employee, onClose, onEdit, onDelete }) {
  const color = getAvatarColor(employee.name);
  return (
    <div className="overlay">
      <div className="modal" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h2 className="modal-title">👤 Employee Profile</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="emp-profile-card">
          <div className="emp-profile-top">
            <div className="avatar-placeholder emp-big-avatar" style={{ background: color, width: 80, height: 80, fontSize: 28 }}>
              {employee.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h3 className="emp-profile-name">{employee.name}</h3>
              <p className="emp-profile-role">{employee.role} · {employee.department}</p>
              <span className={`badge ${statusConfig[employee.status]?.cls}`}>{employee.status}</span>
            </div>
          </div>
          <div className="emp-profile-grid">
            {[
              { icon: '🆔', label: 'Employee ID', val: employee.id },
              { icon: '📧', label: 'Email', val: employee.email },
              { icon: '📱', label: 'Phone', val: employee.phone },
              { icon: '📍', label: 'Location', val: employee.location },
              { icon: '📅', label: 'Join Date', val: employee.joinDate },
              { icon: '💰', label: 'Salary', val: `$${employee.salary?.toLocaleString()}` },
              { icon: '⏰', label: 'Shift', val: employee.shift },
              { icon: '🎯', label: 'Performance', val: `${employee.performance}%` },
            ].map((item, i) => (
              <div key={i} className="emp-profile-field">
                <span className="emp-field-icon">{item.icon}</span>
                <div>
                  <span className="emp-field-label">{item.label}</span>
                  <span className="emp-field-val">{item.val}</span>
                </div>
              </div>
            ))}
          </div>
          {employee.skills?.length > 0 && (
            <div className="emp-skills">
              <span className="form-label">Skills</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                {employee.skills.map(s => (
                  <span key={s} className="badge badge-purple">{s}</span>
                ))}
              </div>
            </div>
          )}
          <div className="progress-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span className="form-label">Performance Score</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{employee.performance}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${employee.performance}%`, background: employee.performance >= 90 ? 'var(--gradient-success)' : employee.performance >= 75 ? 'var(--gradient-warning)' : 'var(--gradient-danger)' }} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger btn-sm" onClick={() => { onDelete(employee.id); onClose(); }} id={`delete-emp-${employee.id}`}>🗑️ Delete</button>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          <button className="btn btn-primary btn-sm" onClick={() => { onEdit(employee); onClose(); }} id={`edit-emp-${employee.id}`}>✏️ Edit</button>
        </div>
      </div>
    </div>
  );
}

export default function EmployeeDB() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const filtered = employees
    .filter(e => {
      const q = search.toLowerCase();
      return (
        (e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)) &&
        (!filterDept || e.department === filterDept) &&
        (!filterStatus || e.status === filterStatus)
      );
    })
    .sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const SortIcon = ({ col }) => sortBy === col ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ↕';

  return (
    <div className="empdb animate-fade-in">
      {/* Header */}
      <div className="empdb-header">
        <div>
          <h1 className="dashboard-title">Employee Database</h1>
          <p className="dashboard-subtitle">{filtered.length} of {employees.length} employees</p>
        </div>
        <button
          id="add-employee-btn"
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add Employee
        </button>
      </div>

      {/* Filters bar */}
      <div className="empdb-filters card">
        <div className="input-group" style={{ flex: 2 }}>
          <span className="input-icon">🔍</span>
          <input
            id="employee-search"
            className="input"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input" style={{ flex: 1 }} value={filterDept} onChange={e => setFilterDept(e.target.value)} id="dept-filter">
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="input" style={{ flex: 1 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)} id="status-filter">
          <option value="">All Statuses</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
        <div className="view-toggle">
          <button
            className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            data-tooltip="Table View"
            id="table-view-btn"
          >☰</button>
          <button
            className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            data-tooltip="Grid View"
            id="grid-view-btn"
          >⊞</button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="empdb-table-wrap card">
          <table className="data-table">
            <thead>
              <tr>
                <th><button className="sort-btn" onClick={() => handleSort('name')}>Employee<SortIcon col="name" /></button></th>
                <th><button className="sort-btn" onClick={() => handleSort('department')}>Department<SortIcon col="department" /></button></th>
                <th>Role</th>
                <th><button className="sort-btn" onClick={() => handleSort('status')}>Status<SortIcon col="status" /></button></th>
                <th>Shift</th>
                <th><button className="sort-btn" onClick={() => handleSort('performance')}>Performance<SortIcon col="performance" /></button></th>
                <th><button className="sort-btn" onClick={() => handleSort('salary')}>Salary<SortIcon col="salary" /></button></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} className="emp-row" onClick={() => setDetailEmployee(emp)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="emp-cell-name">
                      <div className="avatar-placeholder" style={{ background: getAvatarColor(emp.name), width: 36, height: 36, fontSize: 13 }}>
                        {emp.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{emp.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{emp.department}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{emp.role}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={`dot ${statusConfig[emp.status]?.dot}`} />
                      <span className={`badge ${statusConfig[emp.status]?.cls}`}>{emp.status}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{emp.shift}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${emp.performance}%`, background: emp.performance >= 90 ? '#10b981' : '#f59e0b' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{emp.performance}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>${emp.salary?.toLocaleString()}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn-icon"
                        data-tooltip="Edit"
                        id={`edit-btn-${emp.id}`}
                        onClick={() => setEditEmployee(emp)}
                      >✏️</button>
                      <button
                        className="btn-icon"
                        data-tooltip="Delete"
                        id={`del-btn-${emp.id}`}
                        onClick={() => deleteEmployee(emp.id)}
                        style={{ color: 'var(--accent-danger)' }}
                      >🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No employees found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="empdb-grid">
          {filtered.map(emp => (
            <div key={emp.id} className="emp-card card" onClick={() => setDetailEmployee(emp)}>
              <div className="emp-card-header">
                <div className="avatar-placeholder" style={{ background: getAvatarColor(emp.name), width: 52, height: 52, fontSize: 18 }}>
                  {emp.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <span className={`badge ${statusConfig[emp.status]?.cls}`}>{emp.status}</span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{emp.id}</div>
                </div>
              </div>
              <h3 className="emp-card-name">{emp.name}</h3>
              <p className="emp-card-role">{emp.role}</p>
              <span className="badge badge-primary">{emp.department}</span>
              <div className="emp-card-stats">
                <div className="emp-stat">
                  <span className="emp-stat-label">Shift</span>
                  <span className="emp-stat-val">{emp.shift}</span>
                </div>
                <div className="emp-stat">
                  <span className="emp-stat-label">Performance</span>
                  <span className="emp-stat-val">{emp.performance}%</span>
                </div>
                <div className="emp-stat">
                  <span className="emp-stat-label">Location</span>
                  <span className="emp-stat-val">{emp.location}</span>
                </div>
              </div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div className="progress-fill" style={{ width: `${emp.performance}%`, background: 'var(--gradient-primary)' }} />
              </div>
              <div className="emp-card-actions" onClick={e => e.stopPropagation()}>
                <button className="btn btn-secondary btn-sm" id={`grid-edit-${emp.id}`} onClick={() => setEditEmployee(emp)}>✏️ Edit</button>
                <button className="btn btn-danger btn-sm" id={`grid-del-${emp.id}`} onClick={() => deleteEmployee(emp.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <EmployeeModal mode="add" onClose={() => setShowAddModal(false)} onSave={addEmployee} />
      )}
      {editEmployee && (
        <EmployeeModal mode="edit" initialData={editEmployee} onClose={() => setEditEmployee(null)}
          onSave={(data) => { updateEmployee(editEmployee.id, data); setEditEmployee(null); }} />
      )}
      {detailEmployee && (
        <EmployeeDetailModal
          employee={detailEmployee}
          onClose={() => setDetailEmployee(null)}
          onEdit={(emp) => setEditEmployee(emp)}
          onDelete={deleteEmployee}
        />
      )}
    </div>
  );
}
