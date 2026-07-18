import { useState } from 'react';
import { FileText, Download, Upload, ShieldCheck, X } from 'lucide-react';

export default function ESSDocuments() {
  const [personalDocs, setPersonalDocs] = useState([
    { id: 1, name: 'Passport_Copy.pdf', size: '1.2 MB', category: 'Identification', date: '2025-01-12' },
    { id: 2, name: 'Resume_Updated.pdf', size: '420 KB', category: 'Resume/CV', date: '2025-01-10' },
    { id: 3, name: 'Tax_Declaration_2026.pdf', size: '890 KB', category: 'Tax Documents', date: '2026-04-05' },
  ]);

  const companyPolicies = [
    { name: 'Employee_Handbook_2026.pdf', size: '3.4 MB', type: 'Policy' },
    { name: 'Information_Security_Policy.pdf', size: '1.1 MB', type: 'Security' },
    { name: 'Leave_and_Holiday_Policy.pdf', size: '750 KB', type: 'Benefits' },
  ];

  const [uploadModal, setUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', category: 'Identification' });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDoc.name) return;
    const added = {
      id: Date.now(),
      name: newDoc.name.endsWith('.pdf') ? newDoc.name : `${newDoc.name}.pdf`,
      size: '250 KB',
      category: newDoc.category,
      date: new Date().toISOString().split('T')[0],
    };
    setPersonalDocs([...personalDocs, added]);
    setNewDoc({ name: '', category: 'Identification' });
    setUploadModal(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
      {/* Personal Documents */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Personal Documents</h3>
          <button className="btn btn-primary" onClick={() => setUploadModal(true)}>
            <Upload size={16} /> Upload Document
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Category</th>
              <th>File Size</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {personalDocs.map(doc => (
              <tr key={doc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={18} color="var(--accent-primary)" />
                    <span style={{ fontWeight: 500 }}>{doc.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-secondary">{doc.category}</span></td>
                <td>{doc.size}</td>
                <td>{doc.date}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${doc.name}...`)}>
                    <Download size={14} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Company Policies */}
      <div className="card" style={{ height: 'fit-content' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, padding: 20, margin: 0, borderBottom: '1px solid var(--border-color)' }}>Company Policies</h3>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {companyPolicies.map((policy, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: i < companyPolicies.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: 13, display: 'block' }}>{policy.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{policy.size} &bull; {policy.type}</span>
              </div>
              <button className="btn-icon" onClick={() => alert(`Downloading ${policy.name}...`)}>
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: 450 }}>
            <div className="modal-header">
              <h2 className="modal-title">Upload Document</h2>
              <button className="btn-icon" onClick={() => setUploadModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label className="form-label">Document Name *</label>
                <input 
                  className="input" 
                  placeholder="e.g. Passport Copy" 
                  value={newDoc.name} 
                  onChange={e => setNewDoc({...newDoc, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="input" 
                  value={newDoc.category} 
                  onChange={e => setNewDoc({...newDoc, category: e.target.value})}
                >
                  <option>Identification</option>
                  <option>Resume/CV</option>
                  <option>Tax Documents</option>
                  <option>Certificates</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setUploadModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
