import { useState, useMemo } from 'react';
import { AddNewModal } from '../AddNewModal';

/* ─── Department Tabs ─── */
const DEPARTMENTS = ['Dashboard', 'HR', 'Accounting', 'IT', 'Legal'];

/* ─── KPI Cards ─── */
const KPI_CARDS = [
  { label: 'Total Revenue', value: '$0', icon: '💰' },
  { label: 'Total Payroll', value: '$0', icon: '📋' },
  { label: 'Balance', value: '$0', icon: '🏦' },
  { label: 'Total Expense', value: '$0', icon: '📁' },
];

/* ─── Front Office Departments ─── */
const FRONT_OFFICE = [
  { name: 'Customer Care', icon: '🎧' },
  { name: 'E-Commerce', icon: '🛒' },
  { name: 'Build Your Own Mobile App', icon: '📱' },
];

/* ─── Calendar helpers ─── */
const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayMondayStart(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

/* ─── Mini Bar Chart (Product Sales) ─── */
function BarChart() {
  const bars = [65, 80, 55, 90, 70, 85, 45];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="flex items-end gap-3 h-[120px] px-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
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

/* ─── Mini Line Chart (Performance) ─── */
function LineChart() {
  const points = '0,80 40,60 80,70 120,30 160,45 200,20 240,35';
  return (
    <svg viewBox="0 0 240 100" className="w-full h-[120px]" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="#2dca72"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`0,100 ${points} 240,100`}
        fill="url(#lineGrad)"
        opacity="0.15"
      />
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dca72" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Mini Donut Chart (Sales) ─── */
function DonutChart() {
  const r = 40;
  const c = 2 * Math.PI * r;
  const segments = [
    { pct: 0.55, color: '#f59e0b' },
    { pct: 0.30, color: '#6b7280' },
    { pct: 0.15, color: '#3b82f6' },
  ];
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="w-[120px] h-[120px] mx-auto">
      {segments.map((seg, i) => {
        const dash = seg.pct * c;
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
    </svg>
  );
}

/* ─── Calendar Mini Widget ─── */
function CalendarWidget() {
  const today = new Date(2026, 1, 20); // Feb 20, 2026
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayMondayStart(year, month);

  const cells: (number | null)[] = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [firstDay, daysInMonth]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const todayDate = today.getDate();
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray hover:text-dark cursor-pointer border-none bg-transparent transition-colors">←</button>
        <span className="text-sm font-semibold text-dark">{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray hover:text-dark cursor-pointer border-none bg-transparent transition-colors">→</button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray py-1">{d}</div>
        ))}
      </div>
      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} className="w-8 h-8 mx-auto" />;
          const isToday = isCurrentMonth && day === todayDate;
          return (
            <div
              key={`d-${day}`}
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs ${
                isToday
                  ? 'bg-[#2dca72] text-white font-bold'
                  : 'text-gray hover:text-dark'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Enterprise Dashboard ─── */

interface HomeEnterpriseProps {
  onNavigate?: (page: string) => void;
}

export function HomeEnterprise({ onNavigate }: HomeEnterpriseProps) {
  const [activeDept, setActiveDept] = useState('Dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <AddNewModal open={showAddModal} onClose={() => setShowAddModal(false)} onNavigate={onNavigate} />
      {/* Department Tabs */}
      <div className="flex items-center gap-1 mb-6">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-colors ${
              activeDept === dept
                ? 'bg-[#2dca72] text-white'
                : 'bg-transparent text-gray hover:text-dark hover:bg-[#252525]'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Admin Overview */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-1">
          <h2 className="text-lg font-bold text-dark flex items-center gap-2">
            <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
            Admin Overview
          </h2>
          <div className="px-3 py-1 bg-[#2dca72] text-white text-xs rounded-full font-medium">
            To finish setup your company, <span className="underline cursor-pointer">click here</span> ×
          </div>
        </div>
        <p className="text-xs text-gray mb-4">Current Period: Jan 01-31</p>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Left content */}
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {KPI_CARDS.map((kpi) => (
              <div key={kpi.label} className="bg-[#1a1a1a] rounded-xl border border-border p-5">
                <span className="text-2xl mb-3 block">{kpi.icon}</span>
                <div className="text-xs text-gray mb-1">{kpi.label}</div>
                <div className="text-xl font-bold text-dark">{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Analytics & Statistics */}
          <div>
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
              Analytics & Statistics
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {/* Product Sales */}
              <div className="bg-[#1a1a1a] rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-dark">Product Sales</span>
                  <button className="text-gray bg-transparent border-none cursor-pointer">⋮</button>
                </div>
                <BarChart />
              </div>
              {/* Performance */}
              <div className="bg-[#1a1a1a] rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-dark">Performance</span>
                  <button className="text-gray bg-transparent border-none cursor-pointer">⋮</button>
                </div>
                <LineChart />
              </div>
              {/* Sales Donut */}
              <div className="bg-[#1a1a1a] rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-dark">Sales</span>
                  <button className="text-gray bg-transparent border-none cursor-pointer">⋮</button>
                </div>
                <DonutChart />
              </div>
              {/* Add Analytics */}
              <div className="bg-transparent rounded-xl border-2 border-dashed border-[#2dca72] p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#0a2a15] transition-colors" onClick={() => setShowAddModal(true)}>
                <span className="text-3xl text-[#2dca72] mb-2">+</span>
                <span className="text-sm text-[#2dca72]">Add Analytics</span>
              </div>
            </div>
          </div>

          {/* Front Office */}
          <div>
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2dca72] rounded-full inline-block" />
              Front Office
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {FRONT_OFFICE.map((dept) => (
                <div key={dept.name} className="bg-[#1a1a1a] rounded-xl border border-border p-5 flex items-center justify-between cursor-pointer hover:border-[#7ee8a8] transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-dark">{dept.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-gray bg-transparent border-none cursor-pointer">⋮</button>
                    <span className="text-gray">→</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Department */}
            <div className="w-[200px] bg-transparent rounded-xl border-2 border-dashed border-[#2dca72] p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#0a2a15] transition-colors" onClick={() => setShowAddModal(true)}>
              <span className="text-3xl text-[#2dca72] mb-2">+</span>
              <span className="text-sm text-[#2dca72]">Add Department</span>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Upcoming Payables */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <div className="text-[10px] font-bold text-[#2dca72] uppercase tracking-wider mb-2">Upcoming Payables</div>
            <div className="text-base font-bold text-dark mb-1">Payroll scheduled</div>
            <p className="text-xs text-gray">
              Payroll of <span className="font-semibold text-dark">$0</span> is scheduled for Friday, 03/13/2026.
            </p>
            {/* Dots indicator */}
            <div className="flex gap-1.5 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gray" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray" />
            </div>
          </div>

          {/* Calendar */}
          <CalendarWidget />

          {/* Upcoming Events */}
          <div className="bg-[#1a1a1a] rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📅</span>
              <span className="text-sm font-semibold text-dark">Upcoming Events</span>
            </div>
            <div className="text-xs text-gray text-center py-4">No upcoming events</div>
          </div>
        </div>
      </div>
    </div>
  );
}
