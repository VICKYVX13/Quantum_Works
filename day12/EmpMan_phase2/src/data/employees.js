// Mock employee dataset
export const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations', 'Legal'];
export const roles = ['Software Engineer', 'Senior Engineer', 'Team Lead', 'Manager', 'Director', 'Designer', 'Analyst', 'Coordinator', 'Specialist', 'Executive'];

export const initialEmployees = [
  { id: 'EMP001', name: 'Alice Johnson', email: 'alice.johnson@emspro.com', phone: '+1-555-0101', department: 'Engineering', role: 'Senior Engineer', status: 'Active', joinDate: '2021-03-15', salary: 95000, performance: 92, location: 'New York', avatar: null, shift: 'Morning', skills: ['React', 'Node.js', 'Python'] },
  { id: 'EMP002', name: 'Bob Martinez', email: 'bob.martinez@emspro.com', phone: '+1-555-0102', department: 'Marketing', role: 'Manager', status: 'Active', joinDate: '2020-06-01', salary: 85000, performance: 88, location: 'Los Angeles', avatar: null, shift: 'Morning', skills: ['SEO', 'Analytics', 'Branding'] },
  { id: 'EMP003', name: 'Carol Smith', email: 'carol.smith@emspro.com', phone: '+1-555-0103', department: 'HR', role: 'Coordinator', status: 'On Leave', joinDate: '2022-01-20', salary: 65000, performance: 79, location: 'Chicago', avatar: null, shift: 'Evening', skills: ['Recruitment', 'Payroll', 'Compliance'] },
  { id: 'EMP004', name: 'David Chen', email: 'david.chen@emspro.com', phone: '+1-555-0104', department: 'Finance', role: 'Analyst', status: 'Active', joinDate: '2019-11-10', salary: 78000, performance: 95, location: 'San Francisco', avatar: null, shift: 'Morning', skills: ['Excel', 'Power BI', 'SQL'] },
  { id: 'EMP005', name: 'Elena Rodriguez', email: 'elena.r@emspro.com', phone: '+1-555-0105', department: 'Design', role: 'Designer', status: 'Active', joinDate: '2023-02-14', salary: 72000, performance: 91, location: 'Austin', avatar: null, shift: 'Morning', skills: ['Figma', 'Photoshop', 'Illustrator'] },
  { id: 'EMP006', name: 'Frank Wilson', email: 'frank.w@emspro.com', phone: '+1-555-0106', department: 'Sales', role: 'Specialist', status: 'Active', joinDate: '2020-09-05', salary: 68000, performance: 83, location: 'Miami', avatar: null, shift: 'Evening', skills: ['CRM', 'Negotiation', 'Salesforce'] },
  { id: 'EMP007', name: 'Grace Kim', email: 'grace.kim@emspro.com', phone: '+1-555-0107', department: 'Engineering', role: 'Team Lead', status: 'Active', joinDate: '2018-07-22', salary: 110000, performance: 97, location: 'Seattle', avatar: null, shift: 'Morning', skills: ['Java', 'AWS', 'Kubernetes'] },
  { id: 'EMP008', name: 'Henry Brown', email: 'henry.b@emspro.com', phone: '+1-555-0108', department: 'Operations', role: 'Manager', status: 'Inactive', joinDate: '2017-04-18', salary: 88000, performance: 71, location: 'Dallas', avatar: null, shift: 'Night', skills: ['Logistics', 'ERP', 'Process Improvement'] },
  { id: 'EMP009', name: 'Isabella Davis', email: 'isabella.d@emspro.com', phone: '+1-555-0109', department: 'Legal', role: 'Specialist', status: 'Active', joinDate: '2021-10-30', salary: 92000, performance: 89, location: 'Boston', avatar: null, shift: 'Morning', skills: ['Contract Law', 'Compliance', 'Risk'] },
  { id: 'EMP010', name: 'James Taylor', email: 'james.t@emspro.com', phone: '+1-555-0110', department: 'Engineering', role: 'Software Engineer', status: 'Active', joinDate: '2022-06-15', salary: 88000, performance: 86, location: 'Denver', avatar: null, shift: 'Morning', skills: ['TypeScript', 'GraphQL', 'Docker'] },
  { id: 'EMP011', name: 'Karen Lee', email: 'karen.lee@emspro.com', phone: '+1-555-0111', department: 'Marketing', role: 'Coordinator', status: 'On Leave', joinDate: '2023-01-09', salary: 58000, performance: 74, location: 'Phoenix', avatar: null, shift: 'Morning', skills: ['Social Media', 'Content', 'Email Marketing'] },
  { id: 'EMP012', name: 'Liam Nguyen', email: 'liam.n@emspro.com', phone: '+1-555-0112', department: 'Finance', role: 'Director', status: 'Active', joinDate: '2016-12-01', salary: 145000, performance: 98, location: 'New York', avatar: null, shift: 'Morning', skills: ['M&A', 'Budgeting', 'Strategy'] },
];

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const shiftColors = {
  Morning: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
  Evening: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  Night:   { bg: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', border: 'rgba(99,102,241,0.3)' },
  Off:     { bg: 'rgba(148, 163, 184, 0.1)',  color: '#94a3b8', border: 'rgba(148,163,184,0.2)' },
};

export const generateSchedule = (employees) => {
  const schedule = {};
  const shifts = ['Morning', 'Evening', 'Night', 'Off'];
  employees.forEach(emp => {
    schedule[emp.id] = {};
    weekDays.forEach(day => {
      if (day === 'Sat' || day === 'Sun') {
        schedule[emp.id][day] = 'Off';
      } else {
        schedule[emp.id][day] = emp.shift;
      }
    });
  });
  return schedule;
};

export const notifications = [
  { id: 1, type: 'warning', icon: '⚠️', title: 'Leave Request Pending', message: 'Carol Smith has submitted a leave request for 3 days.', time: '10 min ago', read: false },
  { id: 2, type: 'success', icon: '✅', title: 'Onboarding Complete', message: 'James Taylor has completed all onboarding tasks.', time: '1 hour ago', read: false },
  { id: 3, type: 'info', icon: '📊', title: 'Monthly Report Ready', message: 'June 2026 performance report is now available.', time: '3 hours ago', read: true },
  { id: 4, type: 'danger', icon: '🔴', title: 'Policy Violation', message: 'Attendance policy violation detected for 2 employees.', time: '5 hours ago', read: true },
  { id: 5, type: 'success', icon: '🎉', title: 'Work Anniversary', message: 'Liam Nguyen celebrates 10 years with the company today!', time: '1 day ago', read: true },
  { id: 6, type: 'info', icon: '💼', title: 'Interview Scheduled', message: 'New candidate interview scheduled for tomorrow 10 AM.', time: '2 days ago', read: true },
];
