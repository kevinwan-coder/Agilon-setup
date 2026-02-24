import { useState, useMemo } from 'react';

/* ─── Function Chips (top row) ─── */
const FUNCTION_CHIPS = [
  { id: 'payroll', label: 'Payroll', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ), color: '#2dca72' },
  { id: 'attendance', label: 'Attendance', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ), color: '#3b82f6' },
  { id: 'kpi', label: 'KPI', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/></svg>
  ), color: '#8b5cf6' },
  { id: 'policies', label: 'Policies & Compliance', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  ), color: '#6366f1' },
  { id: 'job-postings', label: 'Job Postings', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ), color: '#7c3aed' },
];

/* ─── Category Cards (second row) ─── */
const CATEGORY_CARDS = [
  { id: 'people', label: 'People', color: '#2dca72', bgColor: '#0a2a15', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dca72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { id: 'recruitment', label: 'Recruitment', color: '#f59e0b', bgColor: '#2a1f0a', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="1"/></svg>
  )},
  { id: 'hiring', label: 'Hiring', color: '#3b82f6', bgColor: '#0a1a2a', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
  )},
  { id: 'compensation', label: 'Compensation', color: '#8b5cf6', bgColor: '#1a0a2a', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><circle cx="17" cy="10" r="3"/><line x1="17" y1="8" x2="17" y2="12"/></svg>
  )},
];

/* ─── Mock Data ─── */

const EMPLOYEES = [
  { name: 'Sarah Chen', role: 'Engineering Manager', dept: 'Engineering', status: 'active' as const, email: 'sarah.c@company.com' },
  { name: 'Marcus Johnson', role: 'Senior Developer', dept: 'Engineering', status: 'active' as const, email: 'marcus.j@company.com' },
  { name: 'Priya Patel', role: 'UX Designer', dept: 'Design', status: 'on-leave' as const, email: 'priya.p@company.com' },
  { name: 'James Wilson', role: 'Product Manager', dept: 'Product', status: 'active' as const, email: 'james.w@company.com' },
  { name: 'Aisha Rahman', role: 'HR Specialist', dept: 'HR', status: 'active' as const, email: 'aisha.r@company.com' },
  { name: 'David Kim', role: 'DevOps Engineer', dept: 'Engineering', status: 'active' as const, email: 'david.k@company.com' },
  { name: 'Emma Garcia', role: 'Marketing Lead', dept: 'Marketing', status: 'on-leave' as const, email: 'emma.g@company.com' },
  { name: 'Liam O\'Brien', role: 'Sales Representative', dept: 'Sales', status: 'active' as const, email: 'liam.o@company.com' },
];

const INITIAL_LEAVE_REQUESTS = [
  { id: 1, name: 'Priya Patel', type: 'Vacation', dates: 'Mar 3 – Mar 7, 2026', days: 5 },
  { id: 2, name: 'Emma Garcia', type: 'Sick Leave', dates: 'Feb 26 – Feb 27, 2026', days: 2 },
  { id: 3, name: 'Marcus Johnson', type: 'Personal', dates: 'Mar 10 – Mar 11, 2026', days: 2 },
];

const DEPT_BREAKDOWN = [
  { name: 'Engineering', count: 14, color: '#2dca72' },
  { name: 'Design', count: 6, color: '#3b82f6' },
  { name: 'Product', count: 5, color: '#8b5cf6' },
  { name: 'Marketing', count: 7, color: '#f59e0b' },
  { name: 'Sales', count: 8, color: '#ef4444' },
  { name: 'HR', count: 4, color: '#ec4899' },
  { name: 'Finance', count: 3, color: '#06b6d4' },
];

const RECENT_ACTIVITY = [
  { text: 'New hire: David Kim joined Engineering', time: '2 hours ago', color: '#2dca72' },
  { text: 'Priya Patel requested vacation leave', time: '5 hours ago', color: '#f59e0b' },
  { text: 'Updated remote work policy v2.3', time: '1 day ago', color: '#3b82f6' },
  { text: 'Liam O\'Brien resigned from Sales', time: '2 days ago', color: '#ef4444' },
  { text: 'Q1 performance reviews completed', time: '3 days ago', color: '#8b5cf6' },
];

const ALL_DEPTS = ['All', ...new Set(EMPLOYEES.map(e => e.dept))];

/* ─── Attendance Bar Chart ─── */
function AttendanceChart() {
  const bars = [92, 88, 95, 91, 97, 78, 85];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="flex items-end gap-3 h-[120px] px-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray">{h}%</span>
          <div
            className="w-full rounded-t-sm bg-[#2dca72]"
            style={{ height: `${h}%` }}
          />
          <span className="text-[10px] text-gray">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Department Donut Chart ─── */
function DeptDonutChart() {
  const total = DEPT_BREAKDOWN.reduce((s, d) => s + d.count, 0);
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg viewBox="0 0 120 120" className="w-[120px] h-[120px] mx-auto">
      {DEPT_BREAKDOWN.map((seg, i) => {
        const pct = seg.count / total;
        const dash = pct * c;
        const gap = c - dash;
        const currentOffset = offset;
        offset += dash;
        return (
          <circle
            key={i}
            cx="60" cy="60" r={r}
            fill="none" strokeWidth="16"
            stroke={seg.color}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-currentOffset}
            transform="rotate(-90 60 60)"
          />
        );
      })}
      <text x="60" y="56" textAnchor="middle" className="fill-dark text-lg font-bold">{total}</text>
      <text x="60" y="72" textAnchor="middle" className="fill-gray text-[10px]">employees</text>
    </svg>
  );
}

/* ─── Main HR Page ─── */
export function HRPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter(emp => {
      const matchesSearch = searchQuery === '' ||
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All' || emp.dept === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, deptFilter]);

  const handleLeaveAction = (id: number) => {
    setLeaveRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark flex items-center gap-2">
          <span className="w-1 h-6 bg-[#2dca72] rounded-full inline-block" />
          Human Resources
        </h1>
        <p className="text-sm text-gray mt-1 ml-3">Manage your team, track attendance, and handle HR operations</p>
      </div>

      {/* Function Chips */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {FUNCTION_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveChip(activeChip === chip.id ? null : chip.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-all ${
              activeChip === chip.id
                ? 'bg-[#7c3aed] text-white border-[#7c3aed]'
                : 'bg-[#2a1a4a] text-[#c4b5fd] border-[#3b2a5c] hover:bg-[#352060] hover:border-[#7c3aed]'
            }`}
          >
            <span style={{ color: activeChip === chip.id ? '#fff' : chip.color }}>{chip.icon}</span>
            {chip.label}
          </button>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {CATEGORY_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveCategory(activeCategory === card.id ? null : card.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer text-left transition-all ${
              activeCategory === card.id
                ? 'bg-[#1a1a1a] border-[#7c3aed]'
                : 'bg-[#1a1a1a] border-border hover:border-[#444]'
            }`}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.bgColor }}
            >
              {card.icon}
            </div>
            <span className="text-sm font-medium text-dark">{card.label}</span>
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Employee Directory */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
              Employee Directory
            </h2>
            {/* Search & Filter */}
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#111] border border-border rounded-lg px-3 py-2 text-sm text-dark placeholder:text-gray outline-none focus:border-[#2dca72] transition-colors"
              />
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-[#111] border border-border rounded-lg px-3 py-2 text-sm text-dark outline-none focus:border-[#2dca72] transition-colors cursor-pointer"
              >
                {ALL_DEPTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray text-xs border-b border-border">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Role</th>
                    <th className="pb-2 font-medium">Department</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.email} className="border-b border-border/50 hover:bg-[#252525] transition-colors">
                      <td className="py-3 text-dark font-medium">{emp.name}</td>
                      <td className="py-3 text-gray">{emp.role}</td>
                      <td className="py-3 text-gray">{emp.dept}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          emp.status === 'active'
                            ? 'bg-[#0a2a15] text-[#2dca72]'
                            : 'bg-[#2a1f0a] text-[#f59e0b]'
                        }`}>
                          {emp.status === 'active' ? 'Active' : 'On Leave'}
                        </span>
                      </td>
                      <td className="py-3 text-gray">{emp.email}</td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray">No employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leave Management */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
              Leave Management
            </h2>
            {leaveRequests.length === 0 ? (
              <p className="text-sm text-gray text-center py-4">No pending leave requests</p>
            ) : (
              <div className="space-y-3">
                {leaveRequests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between bg-[#111] rounded-lg p-4 border border-border/50">
                    <div>
                      <div className="text-sm font-medium text-dark">{req.name}</div>
                      <div className="text-xs text-gray mt-0.5">{req.type} &middot; {req.dates} &middot; {req.days} day{req.days > 1 ? 's' : ''}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLeaveAction(req.id)}
                        className="px-3 py-1.5 bg-[#0a2a15] text-[#2dca72] text-xs font-medium rounded-lg cursor-pointer border-none hover:bg-[#0f3d1f] transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLeaveAction(req.id)}
                        className="px-3 py-1.5 bg-[#2a0a0a] text-[#ef4444] text-xs font-medium rounded-lg cursor-pointer border-none hover:bg-[#3d0f0f] transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Attendance Chart */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
              Weekly Attendance
            </h2>
            <AttendanceChart />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payroll Overview */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#2dca72] rounded-full inline-block" />
              Payroll Overview
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray">Next Payroll Date</span>
                <span className="text-sm font-medium text-dark">Mar 13, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray">Total Monthly Cost</span>
                <span className="text-sm font-medium text-dark">$284,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray">Last Processed</span>
                <span className="text-sm font-medium text-dark">Feb 13, 2026</span>
              </div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#2dca72] rounded-full inline-block" />
              Department Breakdown
            </h2>
            <DeptDonutChart />
            <div className="mt-4 space-y-2">
              {DEPT_BREAKDOWN.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-gray">{dept.name}</span>
                  </div>
                  <span className="text-dark font-medium">{dept.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <h2 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#2dca72] rounded-full inline-block" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full mt-1" style={{ backgroundColor: event.color }} />
                    {i < RECENT_ACTIVITY.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-1">
                    <div className="text-xs text-dark">{event.text}</div>
                    <div className="text-[10px] text-gray mt-0.5">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
