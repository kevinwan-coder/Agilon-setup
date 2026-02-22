import { useSetupStore } from '../../../store/useSetupStore';

/* ─────────────────── HomeSmallTeam (2-10) ─────────────────── */

/* ─── Team Performance Chart ─── */

function TeamPerformanceChart() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5 h-full">
      <h3 className="text-sm font-bold text-[#22c55e] mb-4">Team Performance</h3>
      <svg width="100%" height="100" viewBox="0 0 200 100" preserveAspectRatio="none">
        <line x1="20" y1="10" x2="20" y2="85" stroke="#333" strokeWidth="0.5" />
        <line x1="20" y1="85" x2="190" y2="85" stroke="#333" strokeWidth="0.5" />
        <path d="M 20 70 C 40 60, 60 50, 80 45 C 100 40, 120 25, 140 20 C 155 18, 165 22, 175 28 L 190 30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <path d="M 20 75 C 40 70, 60 65, 80 55 C 100 50, 120 40, 140 35 C 155 33, 165 38, 175 42 L 190 45" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
      </svg>
      <div className="flex gap-4 mt-2 text-[10px]">
        <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#3b82f6] inline-block" /> Team</div>
        <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#22d3ee] inline-block" /> You</div>
      </div>
    </div>
  );
}

/* ─── Mini Calendar (Monday start) ─── */

function MiniCalendar() {
  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const monDates = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, null],
  ];
  const today = 22;

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5">
      <div className="text-center mb-3">
        <span className="text-sm font-bold text-dark">February 2026</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d) => (
          <div key={d} className="text-gray py-1 font-medium">{d}</div>
        ))}
        {monDates.flat().map((d, i) => (
          <div
            key={i}
            className={`py-1.5 rounded-lg ${
              d === today
                ? 'bg-[#3b82f6] text-white font-bold'
                : d
                  ? 'text-dark hover:bg-[#252525] cursor-pointer'
                  : ''
            }`}
          >
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ─── */

const TEAM_MEMBERS = [
  { name: 'Kevin W.', role: 'Owner', status: 'online', color: '#22c55e' },
  { name: 'Sarah L.', role: 'Manager', status: 'online', color: '#3b82f6' },
  { name: 'Mike R.', role: 'Developer', status: 'away', color: '#f59e0b' },
  { name: 'Anna K.', role: 'Designer', status: 'offline', color: '#7c3aed' },
  { name: 'Tom B.', role: 'Accountant', status: 'online', color: '#ef4444' },
];

const TODO_ITEMS = [
  { label: 'Company Setup', value: 'Unfinished', color: 'text-[#ef4444]' },
  { label: 'Payroll', value: 'Due Mar 1', color: 'text-[#f59e0b]' },
  { label: 'Team Meeting', value: '2:00 PM', color: 'text-dark' },
  { label: 'Messages', value: '5, 12', color: 'text-dark', splitValues: { urgent: '5', normal: '12' } },
];

const DEPARTMENTS = [
  { name: 'Engineering', members: 3, tasks: 12, color: '#3b82f6', icon: '⚙️' },
  { name: 'Sales', members: 2, tasks: 9, color: '#22c55e', icon: '💼' },
  { name: 'Support', members: 2, tasks: 15, color: '#f59e0b', icon: '🎧' },
  { name: 'Shipping', members: 1, tasks: 6, color: '#7c3aed', icon: '📦' },
  { name: 'RMA', members: 1, tasks: 4, color: '#ef4444', icon: '🔄' },
];

const NEWS_ITEMS = ['Industry Updates', 'Tax Deadline Reminder', 'Market Trends'];
const TODAY_NEWS = ['Fed raises interest rates by 0.25%', 'New labor law takes effect March 1', 'Tech sector hiring up 15%'];

/* ─── Component ─── */

export function HomeSmallTeam() {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const template = useSetupStore((s) => s.branding.template);
  const isSidebar = template === 'classic';

  return (
    <div className="overflow-y-auto">
      <div className="pt-2 pb-10">

        {/* ═══════════ Company Setup Banner ═══════════ */}
        <div className="mb-4">
          <div className="bg-[#7c3aed] rounded-xl px-5 py-3 flex items-center justify-between">
            <div className="text-sm text-white">
              To finished setup your company, <a href="#" className="underline font-semibold text-white hover:text-white/80">click here</a>
            </div>
            <button className="text-white/70 hover:text-white text-lg bg-transparent border-none cursor-pointer leading-none">&times;</button>
          </div>
        </div>

        {/* ═══════════ ROW 1: To Do List + Financial Summary ═══════════ */}
        <div className={isSidebar ? 'mb-[15px]' : 'flex gap-6 mb-[15px] items-start'}>
          <div className={isSidebar ? '' : 'flex-1'}>
            <h2 className="text-lg font-bold text-dark mb-4">To Do List</h2>
            <div className="flex gap-4 justify-start">
              {TODO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="w-[160px] flex-shrink-0 bg-[#1a1a1a] rounded-2xl border border-border px-4 py-4 text-center cursor-pointer hover:border-[#444] transition-colors"
                >
                  <div className="text-xs text-gray mb-2">{item.label}</div>
                  <div className="text-sm font-bold">
                    {item.splitValues ? (
                      <><span className="text-[#ef4444]">{item.splitValues.urgent}</span><span className="text-dark">, {item.splitValues.normal}</span></>
                    ) : (
                      <span className={item.color}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="w-[120px] flex-shrink-0 bg-[#1a1a1a] rounded-2xl border border-border px-4 py-4 flex items-center justify-center cursor-pointer transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
                <span className="text-2xl" style={{ color: brandColor }}>+</span>
              </div>
            </div>
          </div>

          {!isSidebar && <div className="w-[260px] flex-shrink-0 mt-[36px]">
            <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray">Balance:</span>
                  <span className="text-dark font-semibold">$48,250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Payroll:</span>
                  <span className="text-dark font-semibold">$18,500.00</span>
                </div>
                <div className="text-[10px] text-gray text-right">(EOM)</div>
                <div className="flex justify-between">
                  <span className="text-gray">Exp. Revenue:</span>
                  <span className="text-dark font-semibold">$32,400.00</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-gray">Net Balance:</span>
                  <span className="text-[#22c55e] font-bold">$62,150.00</span>
                </div>
              </div>
            </div>
          </div>}
        </div>

        {/* ═══════════ ROW 2: Team Overview (60% size) ═══════════ */}
        <div className="flex gap-6 mb-24 mt-[15px]">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-dark mb-3">Team Overview & News Update</h2>
            <div className="grid grid-cols-4 gap-3" style={{ maxWidth: '80%' }}>
              {/* Today's News */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-border p-3">
                <h3 className="text-xs font-bold text-[#f59e0b] mb-3">Today's News</h3>
                <div className="space-y-2">
                  {TODAY_NEWS.map((item) => (
                    <div key={item} className="text-[11px] text-dark flex items-start gap-1.5">
                      <span className="text-[9px] mt-0.5">📰</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-border p-3">
                <h3 className="text-xs font-bold text-[#3b82f6] mb-3">Team Members</h3>
                <div className="space-y-2">
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.name} className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: member.color }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-dark font-medium truncate">{member.name}</div>
                        <div className="text-[8px] text-gray">{member.role}</div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        member.status === 'online' ? 'bg-[#22c55e]' :
                        member.status === 'away' ? 'bg-[#f59e0b]' : 'bg-[#666]'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Company News */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-border p-3">
                <h3 className="text-xs font-bold text-[#22c55e] mb-3">Company News</h3>
                <div className="space-y-2">
                  {NEWS_ITEMS.map((item) => (
                    <div key={item} className="text-[11px] text-dark flex items-start gap-1.5">
                      <span className="text-[9px] mt-0.5">📰</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Performance */}
              <TeamPerformanceChart />
            </div>
          </div>

          {!isSidebar && (
            <div className="w-[260px] flex-shrink-0 mt-[40px]">
              <MiniCalendar />
            </div>
          )}
        </div>

        {/* ═══════════ ROW 3: Departments ═══════════ */}
        <div className="mb-24">
          <h2 className="text-lg font-bold text-dark mb-4">Departments</h2>
          <div className="flex gap-4">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="w-[200px] bg-[#1a1a1a] rounded-2xl border border-border p-5 cursor-pointer hover:border-[#444] transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: dept.color + '20', border: `1.5px solid ${dept.color}40` }}>
                  <span className="text-base">{dept.icon}</span>
                </div>
                <div className="text-sm font-semibold text-dark mb-1">{dept.name}</div>
                <div className="flex gap-3 text-[11px] text-gray">
                  <span>{dept.members} members</span>
                  <span>{dept.tasks} tasks</span>
                </div>
              </div>
            ))}
            <div className="w-[200px] bg-[#1a1a1a] rounded-2xl border border-border flex flex-col items-center justify-center cursor-pointer transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
              <span className="text-3xl mb-1" style={{ color: brandColor }}>+</span>
              <span className="text-xs text-gray">Add Department</span>
            </div>
          </div>
        </div>

        {/* ═══════════ ROW 4: Projects ═══════════ */}
        <div className="mb-24">
          <h2 className="text-lg font-bold text-dark mb-4">Projects</h2>
          <div className="flex gap-4">
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="42" viewBox="0 0 80 60">
                  <rect x="5" y="10" width="30" height="40" rx="3" fill="#3b82f6" opacity="0.6" />
                  <rect x="25" y="5" width="30" height="40" rx="3" fill="#22c55e" opacity="0.6" />
                  <rect x="45" y="15" width="30" height="40" rx="3" fill="#f59e0b" opacity="0.6" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Project 1</div>
            </div>
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="42" viewBox="0 0 80 60">
                  <circle cx="25" cy="30" r="18" fill="#7c3aed" opacity="0.6" />
                  <circle cx="55" cy="25" r="14" fill="#ef4444" opacity="0.6" />
                  <circle cx="45" cy="42" r="12" fill="#22d3ee" opacity="0.6" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Project 2</div>
            </div>
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="42" viewBox="0 0 80 60">
                  <rect x="10" y="8" width="25" height="44" rx="3" fill="#22c55e" opacity="0.5" />
                  <rect x="28" y="14" width="25" height="38" rx="3" fill="#3b82f6" opacity="0.5" />
                  <rect x="46" y="20" width="25" height="32" rx="3" fill="#f59e0b" opacity="0.5" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Project 3</div>
            </div>
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border flex flex-col items-center justify-center cursor-pointer transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
              <span className="text-3xl mb-1" style={{ color: brandColor }}>+</span>
              <span className="text-xs text-gray">More Projects</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
