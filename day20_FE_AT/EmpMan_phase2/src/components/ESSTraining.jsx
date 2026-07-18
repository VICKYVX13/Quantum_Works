import { useState } from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

export default function ESSTraining() {
  const [courses] = useState([
    {
      id: 1,
      title: 'Advanced React Architecture Patterns',
      instructor: 'Mark Chen',
      type: 'Technical',
      progress: 60,
      status: 'Active',
      startDate: '2026-07-01',
      lessonsCompleted: 6,
      totalLessons: 10,
    },
    {
      id: 2,
      title: 'Data Privacy & GDPR General Compliance',
      instructor: 'Legal Team',
      type: 'Compliance',
      progress: 100,
      status: 'Completed',
      startDate: '2026-06-15',
      lessonsCompleted: 4,
      totalLessons: 4,
    },
    {
      id: 3,
      title: 'Effective Product Leadership & Scrum',
      instructor: 'Dr. Sarah Kim',
      type: 'Management',
      progress: 0,
      status: 'Upcoming',
      startDate: '2026-07-25',
      lessonsCompleted: 0,
      totalLessons: 8,
    }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ marginBottom: 4 }}>
        <h2 className="dashboard-title" style={{ margin: 0 }}>My Training Programs</h2>
        <p className="dashboard-subtitle">Courses enrolled, compliance guidelines, and certifications</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {courses.map(course => (
          <div key={course.id} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span className={`badge ${
                course.type === 'Compliance' ? 'badge-danger' : 
                course.type === 'Technical' ? 'badge-primary' : 'badge-purple'
              }`}>{course.type}</span>
              <span className={`badge ${
                course.status === 'Completed' ? 'badge-success' : 
                course.status === 'Active' ? 'badge-primary' : 'badge-secondary'
              }`}>{course.status}</span>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px 0', minHeight: 40 }}>{course.title}</h3>
            
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
              <div>Instructor: <strong>{course.instructor}</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Calendar size={14} /> Start: {course.startDate}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span>Lessons: {course.lessonsCompleted}/{course.totalLessons}</span>
                <strong>{course.progress}% Completed</strong>
              </div>
              <div className="progress-bar" style={{ marginBottom: 16 }}>
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>

              {course.status === 'Completed' ? (
                <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <Award size={14} /> View Certificate
                </button>
              ) : course.status === 'Active' ? (
                <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <BookOpen size={14} /> Continue Training
                </button>
              ) : (
                <button className="btn btn-secondary btn-sm" disabled style={{ width: '100%', justifyContent: 'center' }}>
                  Upcoming Program
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
