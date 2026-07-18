import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, FileText, FileSpreadsheet, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import './ReportsModule.css';

const reportTypes = [
  { id: 'employee', label: 'Employee Report', desc: 'Full employee directory with all details', icon: <FileText size={24} /> },
  { id: 'attendance', label: 'Attendance Report', desc: 'Daily/monthly attendance data', icon: <FileText size={24} /> },
  { id: 'payroll', label: 'Payroll Report', desc: 'Salary, deductions, and net pay summary', icon: <FileText size={24} /> },
  { id: 'leave', label: 'Leave Report', desc: 'Leave balances and requests overview', icon: <FileText size={24} /> },
  { id: 'department', label: 'Department Report', desc: 'Headcount and performance by department', icon: <FileText size={24} /> },
  { id: 'performance', label: 'Performance Report', desc: 'Employee performance scores and reviews', icon: <FileText size={24} /> },
];

export default function ReportsModule() {
  const { employees, attendance } = useApp();
  const [selected, setSelected] = useState('employee');
  const [search, setSearch] = useState('');

  // ---- Employee Report Data ----
  const employeeRows = employees
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase()))
    .map(e => ({
      'ID': e.id,
      'Name': e.name,
      'Email': e.email,
      'Department': e.department,
      'Role': e.role,
      'Status': e.status,
      'Join Date': e.joinDate,
      'Location': e.location,
      'Salary': e.salary,
    }));

  // ---- Attendance Report Data ----
  const attendanceRows = employees.map(e => {
    const rec = attendance[e.id] || {};
    return {
      'ID': e.id,
      'Name': e.name,
      'Department': e.department,
      'Status': rec.status || 'Absent',
      'Check-in': rec.checkInTime || 'N/A',
      'Reason': rec.reason || 'N/A',
    };
  });

  // ---- Department Report Data ----
  const deptMap = {};
  employees.forEach(e => {
    if (!deptMap[e.department]) deptMap[e.department] = { headcount: 0, avgSalary: 0, totalSalary: 0, active: 0 };
    deptMap[e.department].headcount += 1;
    deptMap[e.department].totalSalary += e.salary;
    if (e.status === 'Active') deptMap[e.department].active += 1;
  });
  const departmentRows = Object.entries(deptMap).map(([dept, data]) => ({
    'Department': dept,
    'Headcount': data.headcount,
    'Active': data.active,
    'Avg Salary': Math.round(data.totalSalary / data.headcount),
    'Total Payroll': data.totalSalary,
  }));

  // ---- Performance Report Data ----
  const performanceRows = employees.map(e => ({
    'ID': e.id,
    'Name': e.name,
    'Department': e.department,
    'Performance Score': `${e.performance}%`,
    'Status': e.performance >= 90 ? 'Excellent' : e.performance >= 75 ? 'Good' : 'Needs Improvement',
  }));

  // ---- Leave Report Data ----
  const leaveRows = [
    { 'Employee': 'Alice Smith', 'Type': 'Annual', 'From': '2026-07-15', 'To': '2026-07-20', 'Days': 5, 'Status': 'Pending' },
    { 'Employee': 'Bob Jones', 'Type': 'Sick', 'From': '2026-07-14', 'To': '2026-07-15', 'Days': 2, 'Status': 'Approved' },
  ];

  // ---- Payroll Report Data ----
  const payrollRows = employees.map(e => {
    const basic = e.salary;
    const hra = Math.round(basic * 0.2);
    const tax = Math.round(basic * 0.12);
    const pf = Math.round(basic * 0.12);
    const net = basic + hra - tax - pf - 500;
    return {
      'ID': e.id,
      'Name': e.name,
      'Department': e.department,
      'Basic Salary': basic,
      'HRA': hra,
      'Tax': tax,
      'PF': pf,
      'Net Salary': net,
      'Status': 'Paid',
    };
  });

  const dataMap = {
    employee: employeeRows,
    attendance: attendanceRows,
    department: departmentRows,
    performance: performanceRows,
    leave: leaveRows,
    payroll: payrollRows,
  };

  const currentData = dataMap[selected] || [];
  const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const reportLabel = reportTypes.find(r => r.id === selected)?.label || 'Report';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`EMS Pro — ${reportLabel}`, 14, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    const colW = Math.floor((275) / columns.length);
    let y = 30;

    // Header row
    doc.setFont('helvetica', 'bold');
    columns.forEach((col, i) => {
      doc.text(String(col), 14 + i * colW, y);
    });
    doc.setFont('helvetica', 'normal');
    y += 8;

    currentData.slice(0, 40).forEach(row => {
      if (y > 190) { doc.addPage(); y = 20; }
      columns.forEach((col, i) => {
        doc.text(String(row[col] ?? ''), 14 + i * colW, y);
      });
      y += 7;
    });

    doc.save(`${reportLabel.replace(/\s+/g, '_')}.pdf`);
  };

  // Export Excel
  const exportExcel = () => {
    const reportLabel = reportTypes.find(r => r.id === selected)?.label || 'Report';
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(currentData);
    XLSX.utils.book_append_sheet(wb, ws, reportLabel);
    XLSX.writeFile(wb, `${reportLabel.replace(/\s+/g, '_')}.xlsx`);
  };

  return (
    <div className="reports-module">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Reports</h1>
          <p className="dashboard-subtitle">Generate, preview, and export business reports</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={exportPDF}><FileText size={16} /> Export PDF</button>
          <button className="btn btn-primary" onClick={exportExcel}><FileSpreadsheet size={16} /> Export Excel</button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="report-type-grid">
        {reportTypes.map(r => (
          <button
            key={r.id}
            className={`report-type-card ${selected === r.id ? 'active' : ''}`}
            onClick={() => setSelected(r.id)}
          >
            <div className={`report-type-icon ${selected === r.id ? 'text-primary' : 'text-muted'}`}>{r.icon}</div>
            <div className="report-type-label">{r.label}</div>
            <div className="report-type-desc">{r.desc}</div>
          </button>
        ))}
      </div>

      {/* Report Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <h3 className="chart-title" style={{ margin: 0 }}>
            {reportTypes.find(r => r.id === selected)?.label} — {currentData.length} records
          </h3>
          <div className="input-group">
            <span className="input-icon"><Search size={16} /></span>
            <input
              className="input"
              placeholder="Search in report..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: 240 }}
            />
          </div>
        </div>

        {currentData.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map(col => <th key={col}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {currentData.slice(0, 20).map((row, i) => (
                  <tr key={i}>
                    {columns.map(col => (
                      <td key={col} style={{ fontSize: 13 }}>
                        {col === 'Status' ? (
                          <span className={`badge ${
                            row[col] === 'Active' || row[col] === 'Paid' || row[col] === 'Approved' || row[col] === 'Excellent' ? 'badge-success' :
                            row[col] === 'Pending' || row[col] === 'Good' ? 'badge-warning' :
                            row[col] === 'Inactive' || row[col] === 'Rejected' || row[col] === 'Needs Improvement' ? 'badge-danger' :
                            'badge-info'
                          }`}>{row[col]}</span>
                        ) : (
                          typeof row[col] === 'number' ? row[col].toLocaleString() : String(row[col] ?? '—')
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {currentData.length > 20 && (
              <div style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: 13, borderTop: '1px solid var(--border-color)' }}>
                Showing first 20 rows. Export to see all {currentData.length} records.
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No data available.
          </div>
        )}
      </div>
    </div>
  );
}
