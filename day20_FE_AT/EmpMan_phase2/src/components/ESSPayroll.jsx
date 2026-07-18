import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, CreditCard, FileText, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

export default function ESSPayroll() {
  const { currentUser } = useApp();
  const emp = currentUser?.employee || { name: 'Employee', role: 'Staff', department: 'Operations', id: 'EMP000', salary: 75000 };

  const basic = emp.salary || 50000;
  const hra = Math.round(basic * 0.2);
  const transport = Math.round(basic * 0.05);
  const tax = Math.round((basic + hra + transport) * 0.12);
  const pf = Math.round(basic * 0.12);
  const insurance = 500;
  const grossSalary = basic + hra + transport;
  const netSalary = grossSalary - tax - pf - insurance;

  const [history] = useState([
    { month: 'July 2026', gross: grossSalary, net: netSalary, status: 'Paid', date: '2026-07-01' },
    { month: 'June 2026', gross: grossSalary, net: netSalary, status: 'Paid', date: '2026-06-01' },
    { month: 'May 2026', gross: grossSalary, net: netSalary, status: 'Paid', date: '2026-05-01' },
  ]);

  const downloadPdf = (record) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('EMS Pro — Payslip', 20, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Employee: ${emp.name}`, 20, 40);
    doc.text(`ID: ${emp.id}`, 20, 50);
    doc.text(`Month: ${record.month}`, 20, 60);
    doc.text(`Date of payment: ${record.date}`, 20, 70);

    doc.setFont('helvetica', 'bold');
    doc.text('Earnings', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`Basic Salary: $${basic.toLocaleString()}`, 30, 100);
    doc.text(`HRA: $${hra.toLocaleString()}`, 30, 110);
    doc.text(`Transport Allowance: $${transport.toLocaleString()}`, 30, 120);

    doc.setFont('helvetica', 'bold');
    doc.text('Deductions', 20, 140);
    doc.setFont('helvetica', 'normal');
    doc.text(`Income Tax: $${tax.toLocaleString()}`, 30, 150);
    doc.text(`Provident Fund: $${pf.toLocaleString()}`, 30, 160);
    doc.text(`Insurance: $${insurance.toLocaleString()}`, 30, 170);

    doc.setFont('helvetica', 'bold');
    doc.text(`Net Pay: $${netSalary.toLocaleString()}`, 20, 190);

    doc.save(`Payslip_${record.month.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Current Month Breakdown Card */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Salary Breakdown — July 2026</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
          <div>
            <h4 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 12 }}>Earnings</h4>
            {[
              ['Basic Salary', basic],
              ['HRA', hra],
              ['Transport Allowance', transport]
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>${val.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Gross Earnings</span>
              <span>${grossSalary.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 12 }}>Deductions</h4>
            {[
              ['Income Tax', tax],
              ['Provident Fund', pf],
              ['Insurance Group Plan', insurance]
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 500, color: 'var(--accent-danger)' }}>-${val.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: 20, borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block' }}>Net Take-Home Pay</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent-primary)' }}>${netSalary.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary" onClick={() => downloadPdf({ month: 'July 2026', date: '2026-07-01' })}>
            <Download size={16} /> Download Payslip PDF
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 600, padding: 20, margin: 0, borderBottom: '1px solid var(--border-color)' }}>Payment History</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross Salary</th>
              <th>Net Salary</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{record.month}</td>
                <td>${record.gross.toLocaleString()}</td>
                <td style={{ fontWeight: 600 }}>${record.net.toLocaleString()}</td>
                <td>{record.date}</td>
                <td>
                  <span className="badge badge-success">
                    {record.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => downloadPdf(record)}>
                    <Download size={14} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
