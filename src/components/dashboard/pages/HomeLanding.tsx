import { useSetupStore } from '../../../store/useSetupStore';

/* ─────────────────── HomeLanding ─────────────────── */

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
  // Actually for Monday start Feb 2026: Feb 1 = Sunday → col 7 (index 6)
  // Week 1: _, _, _, _, _, _, 1
  // Week 2: 2, 3, 4, 5, 6, 7, 8
  // etc. — same layout since Feb 1 2026 is a Sunday
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

/* ─── Performance Chart ─── */

function PerformanceChart() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5 h-full">
      <h3 className="text-sm font-bold text-[#22c55e] mb-4">My Performance</h3>
      <svg width="100%" height="100" viewBox="0 0 200 100" preserveAspectRatio="none">
        {/* Axes */}
        <line x1="20" y1="10" x2="20" y2="85" stroke="#333" strokeWidth="0.5" />
        <line x1="20" y1="85" x2="190" y2="85" stroke="#333" strokeWidth="0.5" />
        {/* Curve */}
        <path
          d="M 20 80 C 40 75, 60 65, 80 55 C 100 45, 120 30, 140 25 C 155 22, 165 28, 175 35 L 190 40"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ─── Data ─── */

const TODO_ITEMS = [
  { label: 'Payment', value: 'Approval', color: 'text-[#f59e0b]' },
  { label: 'Next Appoint', value: '3:30 PM', color: 'text-dark' },
  { label: 'Messages', value: '2, 8', color: 'text-dark', splitValues: { urgent: '2', normal: '8' } },
];

const NEWS_ITEMS = ['Financial Updates', 'Freelance News', 'Global Tech'];
const EVENT_ITEMS = ["Dad's Birthday", 'Golf with Dr. Wan', 'Illini Game'];

/* ─── Component ─── */

export function HomeLanding() {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const template = useSetupStore((s) => s.branding.template);
  const size = useSetupStore((s) => s.businessInfo.size);
  const isSidebar = template === 'classic';
  const isSmallTeam = size === '2-10';

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
          {/* To Do List */}
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
              {/* + Card */}
              <div className="w-[120px] flex-shrink-0 bg-[#1a1a1a] rounded-2xl border border-border px-4 py-4 flex items-center justify-center cursor-pointer transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
                <span className="text-2xl" style={{ color: brandColor }}>+</span>
              </div>
            </div>
          </div>

          {/* Financial Summary — hidden in sidebar mode (shown in sidebar), beside cards in default */}
          {!isSidebar && <div className="w-[260px] flex-shrink-0 mt-[36px]">
            <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray">Balance:</span>
                  <span className="text-dark font-semibold">$12,715.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Payments:</span>
                  <span className="text-dark font-semibold">$2,700.50</span>
                </div>
                <div className="text-[10px] text-gray text-right">(EOM)</div>
                <div className="flex justify-between">
                  <span className="text-gray">Exp. Receiving:</span>
                  <span className="text-dark font-semibold">$3,758.25</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-gray">Net Balance:</span>
                  <span className="text-[#22c55e] font-bold">$13,773.25</span>
                </div>
              </div>
            </div>
          </div>}
        </div>

        {/* ═══════════ ROW 2: What's New Today + Calendar ═══════════ */}
        <div className="flex gap-6 mb-24 mt-[15px]">
          {/* Left — What's New Today */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-dark mb-4">What's New Today?</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Subscribed News */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-[#22c55e] mb-4">Subscribed News</h3>
                <div className="space-y-3">
                  {NEWS_ITEMS.map((item) => (
                    <div key={item} className="text-sm text-dark flex items-start gap-2">
                      <span className="text-xs mt-0.5">📰</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* My Events */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-[#f59e0b] mb-4">My Events</h3>
                <div className="space-y-3">
                  {EVENT_ITEMS.map((item) => (
                    <div key={item} className="text-sm text-dark flex items-start gap-2">
                      <span className="text-xs mt-0.5">📰</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* My Performance */}
              <PerformanceChart />
            </div>
          </div>

          {/* Right — Calendar (hidden in sidebar mode) */}
          {!isSidebar && (
            <div className="w-[260px] flex-shrink-0 mt-[40px]">
              <MiniCalendar />
            </div>
          )}
        </div>

        {/* ═══════════ ROW 3: Appointments ═══════════ */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-dark mb-4">Appointments</h2>
          <div className="flex gap-4">
            {/* Project 1 */}
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
            {/* Project 2 */}
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
            {/* Front Desk — 2-10 only */}
            {isSmallTeam && (
              <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
                <div className="h-[70px] flex items-center justify-center">
                  <svg width="56" height="42" viewBox="0 0 80 60">
                    <rect x="10" y="30" width="60" height="20" rx="4" fill="#3b82f6" opacity="0.5" />
                    <rect x="20" y="20" width="15" height="15" rx="2" fill="#22c55e" opacity="0.7" />
                    <circle cx="55" cy="18" r="10" fill="#f59e0b" opacity="0.6" />
                  </svg>
                </div>
                <div className="px-3 py-2 text-xs font-semibold text-dark">Front Desk</div>
              </div>
            )}
            {/* Massages — 2-10 only */}
            {isSmallTeam && (
              <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
                <div className="h-[70px] flex items-center justify-center">
                  <svg width="56" height="42" viewBox="0 0 80 60">
                    <rect x="15" y="8" width="50" height="35" rx="4" fill="#7c3aed" opacity="0.4" />
                    <rect x="20" y="14" width="35" height="4" rx="2" fill="#a78bfa" opacity="0.7" />
                    <rect x="20" y="22" width="28" height="4" rx="2" fill="#a78bfa" opacity="0.7" />
                    <rect x="20" y="30" width="20" height="4" rx="2" fill="#a78bfa" opacity="0.7" />
                    <circle cx="60" cy="48" r="8" fill="#22c55e" opacity="0.6" />
                  </svg>
                </div>
                <div className="px-3 py-2 text-xs font-semibold text-dark">Message</div>
              </div>
            )}
            {/* + Card */}
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border flex flex-col items-center justify-center cursor-pointer transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
              <span className="text-3xl mb-1" style={{ color: brandColor }}>+</span>
              <span className="text-xs text-gray">More Projects</span>
            </div>
          </div>
        </div>

        {/* ═══════════ ROW 4: Department & Projects ═══════════ */}
        <div className="mb-24">
          <h2 className="text-lg font-bold text-dark mb-4">Department  &  Projects</h2>
          <div className="flex gap-4">
            {/* Project 1 */}
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
            {/* Project 2 */}
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
            {/* More Projects */}
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
