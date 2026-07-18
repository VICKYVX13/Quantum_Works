import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mail, MapPin, Building2, Phone } from 'lucide-react';

const getAvatarColor = (name) => {
  const colors = ['#2563EB', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function ESSDirectory() {
  const { employees } = useApp();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const departments = useMemo(() => {
    return [...new Set(employees.map(e => e.department))].sort();
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const q = search.toLowerCase();
      const matchSearch = e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
      const matchDept = !filterDept || e.department === filterDept;
      return matchSearch && matchDept;
    });
  }, [employees, search, filterDept]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ marginBottom: 4 }}>
        <h2 className="dashboard-title" style={{ margin: 0 }}>Company Directory</h2>
        <p className="dashboard-subtitle">Find and connect with colleagues across departments</p>
      </div>

      {/* Filters Bar */}
      <div className="empdb-filters card">
        <div className="input-group" style={{ flex: 2 }}>
          <span className="input-icon"><Search size={16} /></span>
          <input
            className="input"
            placeholder="Search colleagues by name, role, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input" style={{ flex: 1 }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Directory Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(emp => (
          <div key={emp.id} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', background: getAvatarColor(emp.name),
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700,
              marginBottom: 12
            }}>
              {emp.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>{emp.name}</h3>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{emp.role}</span>
            <span className="badge badge-primary" style={{ marginBottom: 16 }}>{emp.department}</span>

            <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: 12, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                <Mail size={14} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                <Phone size={14} />
                <span>{emp.phone || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                <MapPin size={14} />
                <span>{emp.location || 'Remote'}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            No colleagues found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
