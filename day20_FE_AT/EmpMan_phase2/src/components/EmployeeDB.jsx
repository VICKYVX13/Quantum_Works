import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { departments, roles } from '../data/employees';
import { 
  Search, Filter, LayoutGrid, List, Plus, Edit2, 
  Trash2, Eye, Download, CreditCard, ChevronLeft, 
  ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, X, Building2, MapPin, Mail, Phone, Calendar
} from 'lucide-react';
import jsPDF from 'jspdf';
import './EmployeeDB.css';

const getAvatarColor = (name) => {
  const colors = ['#2563EB','#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#06B6D4'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const statusConfig = {
  Active:    { cls: 'badge-success', dot: 'bg-success' },
  'On Leave':{ cls: 'badge-warning', dot: 'bg-warning' },
  Inactive:  { cls: 'badge-danger',  dot: 'bg-danger'  },
};

const emptyForm = {
  name: '', email: '', phone: '', department: '', role: '',
  status: 'Active', joinDate: '', salary: '', location: '', shift: 'Morning', 
  skills: '', manager: '', employmentType: 'Full-time'
};

const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

function EmployeeModal({ mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState(mode === 'edit' ? {
    ...initialData,
    skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : '',
    manager: initialData.manager || '',
    employmentType: initialData.employmentType || 'Full-time'
  } : emptyForm);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ 
      ...form, 
      salary: Number(form.salary), 
      skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean) 
    });
    onClose();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 700 }}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'add' ? 'Add New Employee' : 'Edit Employee'}</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close"><X size={20} /></button>
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
              <label className="form-label">Designation / Role *</label>
              <select className="input" name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select Designation</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Employment Type</label>
              <select className="input" name="employmentType" value={form.employmentType} onChange={handleChange}>
                {employmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Manager</label>
              <input className="input" name="manager" placeholder="Manager Name" value={form.manager} onChange={handleChange} />
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
              <label className="form-label">Join Date</label>
              <input className="input" type="date" name="joinDate" value={form.joinDate} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
             <div className="form-group">
              <label className="form-label">Shift</label>
              <select className="input" name="shift" value={form.shift} onChange={handleChange}>
                <option>Morning</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
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
              {mode === 'add' ? 'Add Employee' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EmployeeDetailModal({ employee, onClose, onEdit, onDelete }) {
  const { setActiveView } = useApp();
  const color = getAvatarColor(employee.name);

  const downloadProfile = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Employee Profile", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const lines = [
      `Name: ${employee.name}`,
      `ID: ${employee.id}`,
      `Department: ${employee.department}`,
      `Designation: ${employee.role}`,
      `Employment Type: ${employee.employmentType || 'Full-time'}`,
      `Manager: ${employee.manager || 'N/A'}`,
      `Email: ${employee.email}`,
      `Phone: ${employee.phone}`,
      `Location: ${employee.location}`,
      `Join Date: ${employee.joinDate}`,
      `Status: ${employee.status}`,
      `Salary: $${employee.salary?.toLocaleString()}`
    ];
    
    lines.forEach((line, i) => {
      doc.text(line, 20, 40 + (i * 10));
    });
    
    doc.save(`${employee.name.replace(/\s+/g, '_')}_Profile.pdf`);
  };

  return (
    <div className="overlay">
      <div className="modal" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h2 className="modal-title">Employee Profile</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="emp-profile-card">
          <div className="emp-profile-top" style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
            <div className="avatar-placeholder" style={{ background: color, width: 80, height: 80, fontSize: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              {employee.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{employee.name}</h3>
              <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>{employee.role} at {employee.department}</p>
              <span className={`badge ${statusConfig[employee.status]?.cls}`}>{employee.status}</span>
            </div>
          </div>
          
          <div className="form-row">
             <div className="emp-detail-item">
               <span className="emp-detail-label"><Mail size={14}/> Email</span>
               <span className="emp-detail-value">{employee.email}</span>
             </div>
             <div className="emp-detail-item">
               <span className="emp-detail-label"><Phone size={14}/> Phone</span>
               <span className="emp-detail-value">{employee.phone || 'N/A'}</span>
             </div>
          </div>

          <div className="form-row" style={{ marginTop: 16 }}>
             <div className="emp-detail-item">
               <span className="emp-detail-label"><Building2 size={14}/> Department</span>
               <span className="emp-detail-value">{employee.department}</span>
             </div>
             <div className="emp-detail-item">
               <span className="emp-detail-label"><MapPin size={14}/> Location</span>
               <span className="emp-detail-value">{employee.location || 'N/A'}</span>
             </div>
          </div>

          <div className="form-row" style={{ marginTop: 16 }}>
             <div className="emp-detail-item">
               <span className="emp-detail-label"><Calendar size={14}/> Join Date</span>
               <span className="emp-detail-value">{employee.joinDate || 'N/A'}</span>
             </div>
             <div className="emp-detail-item">
               <span className="emp-detail-label">Employment Type</span>
               <span className="emp-detail-value">{employee.employmentType || 'Full-time'}</span>
             </div>
          </div>
          
          <div className="form-row" style={{ marginTop: 16 }}>
             <div className="emp-detail-item">
               <span className="emp-detail-label">Manager</span>
               <span className="emp-detail-value">{employee.manager || 'N/A'}</span>
             </div>
             <div className="emp-detail-item">
               <span className="emp-detail-label">Base Salary</span>
               <span className="emp-detail-value">${employee.salary?.toLocaleString()}</span>
             </div>
          </div>
          
        </div>
        
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            <button className="btn btn-secondary btn-sm" onClick={downloadProfile} title="Download Profile">
              <Download size={16} /> Download
            </button>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 8 }} onClick={() => { onClose(); setActiveView('payroll'); }} title="View Payroll">
              <CreditCard size={16} /> View Payroll
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-danger btn-sm" onClick={() => { onDelete(employee.id); onClose(); }}>
              <Trash2 size={16} /> Delete
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => { onEdit(employee); onClose(); }}>
              <Edit2 size={16} /> Edit
            </button>
          </div>
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
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    return employees
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
  }, [employees, search, filterDept, filterStatus, sortBy, sortDir]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />;
    return sortDir === 'asc' ? <ArrowUp size={12} style={{ marginLeft: 4 }} /> : <ArrowDown size={12} style={{ marginLeft: 4 }} />;
  };

  return (
    <div className="empdb">
      {/* Header */}
      <div className="empdb-header">
        <div>
          <h1 className="dashboard-title">Employee Database</h1>
          <p className="dashboard-subtitle">Manage your workforce ({filtered.length} total)</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* Filters bar */}
      <div className="empdb-filters card">
        <div className="input-group" style={{ flex: 2 }}>
          <span className="input-icon"><Search size={16} /></span>
          <input
            className="input"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <select className="input" style={{ flex: 1 }} value={filterDept} onChange={e => { setFilterDept(e.target.value); setCurrentPage(1); }}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="input" style={{ flex: 1 }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
          <option value="">All Statuses</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
        <div className="view-toggle">
          <button
            className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          ><List size={18} /></button>
          <button
            className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          ><LayoutGrid size={18} /></button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th><div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('name')}>Employee<SortIcon col="name" /></div></th>
                <th><div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('department')}>Department<SortIcon col="department" /></div></th>
                <th>Designation</th>
                <th><div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('status')}>Status<SortIcon col="status" /></div></th>
                <th>Location</th>
                <th><div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('joinDate')}>Join Date<SortIcon col="joinDate" /></div></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(emp => (
                <tr key={emp.id} className="emp-row">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="avatar-placeholder" style={{ background: getAvatarColor(emp.name), width: 36, height: 36, fontSize: 13, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
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
                    <span className={`badge ${statusConfig[emp.status]?.cls}`}>{emp.status}</span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{emp.location || 'N/A'}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{emp.joinDate || 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon" title="View Profile" onClick={() => setDetailEmployee(emp)}>
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon" title="Edit" onClick={() => setEditEmployee(emp)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon text-danger" title="Delete" onClick={() => deleteEmployee(emp.id)}>
                        <Trash2 size={16} color="var(--accent-danger)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No employees found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 14, fontWeight: 500 }}>
                  {currentPage} / {totalPages}
                </div>
                <button 
                  className="btn btn-secondary btn-sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
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
