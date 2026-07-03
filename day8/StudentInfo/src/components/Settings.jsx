import React, { useRef } from 'react';
import { DatabaseIcon, ShieldIcon } from './Icons';

export default function Settings({ 
  students, 
  onSeedDatabase, 
  onClearDatabase, 
  onImportDatabase, 
  addNotification 
}) {
  const fileInputRef = useRef(null);

  // Export to JSON
  const handleExportJSON = () => {
    try {
      const dataStr = JSON.stringify(students, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `edupulse_students_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      addNotification('Roster directory exported as JSON successfully.', 'success');
    } catch (err) {
      addNotification('Export to JSON failed.', 'error');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    try {
      if (students.length === 0) {
        addNotification('No student records to export.', 'error');
        return;
      }

      const headers = ['ID', 'Student ID', 'Name', 'Department', 'Status'];
      const csvRows = [headers.join(',')];

      students.forEach(student => {
        const values = [
          student.id,
          `"${student.studentId}"`,
          `"${student.name.replace(/"/g, '""')}"`,
          `"${student.department}"`,
          `"${student.status}"`
        ];
        csvRows.push(values.join(','));
      });

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `edupulse_students_attendance_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addNotification('Roster directory exported as CSV successfully.', 'success');
    } catch (err) {
      addNotification('Export to CSV failed.', 'error');
    }
  };

  // Import JSON file
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImportChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target?.result);
        
        // Simple schema validation
        if (!Array.isArray(parsedData)) {
          throw new Error('Data must be an array of students');
        }

        const isValid = parsedData.every(item => 
          item.id && 
          item.name && 
          item.studentId && 
          item.department && 
          item.status
        );

        if (!isValid) {
          throw new Error('Some records are missing required student properties.');
        }

        onImportDatabase(parsedData);
        addNotification(`Successfully imported ${parsedData.length} student records.`, 'success');
      } catch (err) {
        addNotification(`Import failed: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
    // Clear input so same file can be re-uploaded if modified
    e.target.value = '';
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="grid-2">
        {/* Export Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ color: 'var(--primary-color)' }}><DatabaseIcon size={24} /></div>
            <h3>Backup & Export Roster</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Export the current student registry directory to store as a local spreadsheet or backup database file format. You can re-import this data anytime.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleExportCSV} style={{ flexGrow: 1 }}>
              📥 Export as CSV (.csv)
            </button>
            <button className="btn btn-secondary" onClick={handleExportJSON} style={{ flexGrow: 1 }}>
              📄 Export as JSON (.json)
            </button>
          </div>
        </div>

        {/* Import Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ color: 'var(--success-color)' }}><DatabaseIcon size={24} /></div>
            <h3>Import Roster Database</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Upload a previously exported student directory JSON file to merge or restore your current roster logs. Note that records must follow the schema template.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImportChange}
            accept=".json"
            style={{ display: 'none' }}
          />

          <button className="btn btn-success" onClick={handleImportClick} style={{ width: '100%' }}>
            📤 Upload Backup JSON
          </button>
        </div>
      </div>

      {/* Database Controls Card */}
      <div className="glass-card" style={{ maxWidth: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ color: 'var(--danger-color)' }}><ShieldIcon size={24} /></div>
          <h3>Portal System Administration</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Use these commands to manage the state of the client-side database. These operations modify the records saved under your browser's local cache.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ flexGrow: 1, minWidth: '220px' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Reset Database</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Wipes active records and inserts the standard 8 academic demo profiles.
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onSeedDatabase} style={{ alignSelf: 'center' }}>
            Seed Default Demo Data
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '1.25rem',
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.1)',
          marginTop: '1rem'
        }}>
          <div style={{ flexGrow: 1, minWidth: '220px' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--danger-color)' }}>Factory Reset (Wipe All)</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Deletes all registered student roster profiles. This sets the database count to 0.
            </p>
          </div>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={onClearDatabase} 
            style={{ alignSelf: 'center', backgroundColor: 'var(--danger-color)' }}
          >
            Wipe Active Database
          </button>
        </div>
      </div>

    </div>
  );
}
