import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BadgeDollarSign, Download, FileText, CheckCircle,
  Clock, X, Search, ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import './PayrollModule.css';

const getAvatarColor = (name) => {
  const colors = ['#2563EB', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  let hash = 0;
  for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// Build payroll records from employee list
function buildPayrollData(employees) {
  return employees.map((emp, i) => {
    const basic = emp.salary || 50000;
    const hra = Math.round(basic * 0.2);
    const transport = Math.round(basic * 0.05);
    const bonus = i % 3 === 0 ? Math.round(basic * 0.1) : 0;
    const overtime = i % 5 === 0 ? Math.round(basic * 0.05) : 0;
    const tax = Math.round((basic + hra + transport + bonus + overtime) * 0.12);
    const pf = Math.round(basic * 0.12);
    const insurance = 500;
    const grossSalary = basic + hra + transport + bonus + overtime;
    const netSalary = grossSalary - tax - pf - insurance;
    const statuses = ['Paid', 'Paid', 'Paid', 'Pending', 'Processing'];
    return {
      id: emp.id,
      name: emp.name,
      department: emp.department,
      designation: emp.role,
      basic,
      hra,
      transport,
      bonus,
      overtime,
      tax,
      pf,
      insurance,
      grossSalary,
      netSalary,
      paymentStatus: statuses[i % statuses.length],
      paymentDate: '2026-07-01',
      bankAccount: `****${Math.floor(1000 + Math.random() * 9000)}`,
      month: 'July 2026',
    };
  });
}

function PayslipModal({ record, onClose }) {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('EMS Pro — Payslip', 20, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Employee: ${record.name}`, 20, 40);
    doc.text(`ID: ${record.id}`, 20, 50);
    doc.text(`Department: ${record.department}`, 20, 60);
    doc.text(`Designation: ${record.designation}`, 20, 70);
    doc.text(`Month: ${record.month}`, 20, 80);
    doc.text(`Payment Date: ${record.paymentDate}`, 20, 90);

    doc.setFont('helvetica', 'bold');
    doc.text('Earnings', 20, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(`Basic Salary: $${record.basic.toLocaleString()}`, 30, 120);
    doc.text(`HRA: $${record.hra.toLocaleString()}`, 30, 130);
    doc.text(`Transport Allowance: $${record.transport.toLocaleString()}`, 30, 140);
    doc.text(`Bonus: $${record.bonus.toLocaleString()}`, 30, 150);
    doc.text(`Overtime: $${record.overtime.toLocaleString()}`, 30, 160);

    doc.setFont('helvetica', 'bold');
    doc.text('Deductions', 20, 180);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tax: $${record.tax.toLocaleString()}`, 30, 190);
    doc.text(`Provident Fund: $${record.pf.toLocaleString()}`, 30, 200);
    doc.text(`Insurance: $${record.insurance.toLocaleString()}`, 30, 210);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Net Salary: $${record.netSalary.toLocaleString()}`, 20, 230);

    doc.save(`Payslip_${record.name.replace(/\s+/g, '_')}_${record.month.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="overlay">
      <div className="modal" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <h2 className="modal-title">Payslip — {record.month}</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{record.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{record.designation} &bull; {record.department}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>ID: {record.id} &bull; Bank: {record.bankAccount}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase' }}>Earnings</div>
            {[
              ['Basic Salary', record.basic],
              ['HRA', record.hra],
              ['Transport', record.transport],
              ['Bonus', record.bonus],
              ['Overtime', record.overtime],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>${val.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Gross Salary</span>
              <span>${record.grossSalary.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase' }}>Deductions</div>
            {[
              ['Income Tax', record.tax],
              ['Provident Fund', record.pf],
              ['Insurance', record.insurance],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 500, color: 'var(--accent-danger)' }}>-${val.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: 16, borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-primary)' }}>Net Salary</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent-primary)' }}>${record.netSalary.toLocaleString()}</span>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={downloadPdf}><Download size={16} /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function PayrollModule() {
  const { employees } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const itemsPerPage = 10;

  const payrollData = buildPayrollData(employees);

  const filtered = payrollData.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchStatus = !filterStatus || p.paymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPayroll = payrollData.reduce((sum, p) => sum + p.netSalary, 0);
  const paidCount = payrollData.filter(p => p.paymentStatus === 'Paid').length;
  const pendingCount = payrollData.filter(p => p.paymentStatus === 'Pending').length;

  const exportExcel = () => {
    const data = filtered.map(p => ({
      'Employee ID': p.id,
      'Name': p.name,
      'Department': p.department,
      'Basic': p.basic,
      'HRA': p.hra,
      'Transport': p.transport,
      'Bonus': p.bonus,
      'Overtime': p.overtime,
      'Gross Salary': p.grossSalary,
      'Tax': p.tax,
      'PF': p.pf,
      'Insurance': p.insurance,
      'Net Salary': p.netSalary,
      'Payment Status': p.paymentStatus,
      'Payment Date': p.paymentDate,
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll');
    XLSX.writeFile(wb, 'Payroll_Report.xlsx');
  };

  const statusColor = { Paid: 'badge-success', Pending: 'badge-warning', Processing: 'badge-info' };

  return (
    <div className="payroll-module">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Payroll Management</h1>
          <p className="dashboard-subtitle">Salary details, payslips, and payment processing</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={exportExcel}><Download size={16} /> Export Excel</button>
          <button className="btn btn-primary"><Plus size={16} /> Run Payroll</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Monthly Payroll</span>
            <div className="kpi-icon-wrap text-primary bg-primary-light"><BadgeDollarSign size={20} /></div>
          </div>
          <div className="kpi-body"><span className="kpi-value">${Math.round(totalPayroll / 1000)}K</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Paid</span>
            <div className="kpi-icon-wrap text-success bg-success-light"><CheckCircle size={20} /></div>
          </div>
          <div className="kpi-body"><span className="kpi-value">{paidCount}</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Pending</span>
            <div className="kpi-icon-wrap text-warning bg-warning-light"><Clock size={20} /></div>
          </div>
          <div className="kpi-body"><span className="kpi-value">{pendingCount}</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Avg Net Salary</span>
            <div className="kpi-icon-wrap text-purple bg-purple-light"><FileText size={20} /></div>
          </div>
          <div className="kpi-body">
            <span className="kpi-value">
              ${employees.length > 0 ? Math.round(totalPayroll / employees.length).toLocaleString() : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h3 className="chart-title" style={{ margin: 0 }}>Employee Salary Details — July 2026</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="input-group">
              <span className="input-icon"><Search size={16} /></span>
              <input className="input" placeholder="Search employee..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} style={{ minWidth: 200 }} />
            </div>
            <select className="input" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
              <option value="">All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Processing</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Basic</th>
                <th>Allowances</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar-placeholder" style={{
                        background: getAvatarColor(p.name), width: 32, height: 32, fontSize: 12,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0
                      }}>
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{p.department}</span></td>
                  <td style={{ fontSize: 13, fontWeight: 500 }}>${p.basic.toLocaleString()}</td>
                  <td style={{ fontSize: 13 }}>${(p.hra + p.transport).toLocaleString()}</td>
                  <td style={{ fontSize: 13, color: 'var(--accent-success)' }}>
                    {p.bonus > 0 ? `+$${p.bonus.toLocaleString()}` : '—'}
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--accent-danger)' }}>-${(p.tax + p.pf + p.insurance).toLocaleString()}</td>
                  <td style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-primary)' }}>${p.netSalary.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${statusColor[p.paymentStatus] || 'badge-info'}`}>{p.paymentStatus}</span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedPayslip(p)}>
                      <FileText size={14} /> Payslip
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft size={16} /> Prev
              </button>
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 14, fontWeight: 500 }}>
                {currentPage} / {totalPages}
              </span>
              <button className="btn btn-secondary btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedPayslip && (
        <PayslipModal record={selectedPayslip} onClose={() => setSelectedPayslip(null)} />
      )}
    </div>
  );
}
