import { useSetupStore } from '../../../store/useSetupStore';

/* ─────────────────── HomeLanding ─────────────────── */

/* ─── Mini Calendar (Monday start) ─── */

function MiniCalendar() {
  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const dates = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, null],
  ];
  // Feb 2026 starts on Sunday. Monday-start: shift so Sun=last
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
  { label: 'Company Setup', value: 'Unfinished', color: 'text-[#ef4444]' },
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
  const isSidebar = template === 'classic';

  return (
    <div className="overflow-y-auto">
      <div className="pt-2 pb-10">

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

        {/* ═══════════ ROW 3: Projects ═══════════ */}
        <div className="mb-24">
          <div className="flex gap-4">
            {/* Projects */}
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="50" viewBox="0 0 56 50" fill="none">
                  {/* Clipboard / Kanban board */}
                  <rect x="8" y="4" width="40" height="44" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
                  <rect x="8" y="4" width="40" height="10" rx="4" fill="#3b82f6" opacity="0.3" />
                  <rect x="14" y="19" width="12" height="3" rx="1.5" fill="#22c55e" opacity="0.8" />
                  <rect x="14" y="26" width="18" height="3" rx="1.5" fill="#f59e0b" opacity="0.8" />
                  <rect x="14" y="33" width="10" height="3" rx="1.5" fill="#3b82f6" opacity="0.8" />
                  <rect x="14" y="40" width="15" height="3" rx="1.5" fill="#22c55e" opacity="0.6" />
                  {/* Checkmarks */}
                  <path d="M34 20 L36 22 L40 18" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                  <path d="M34 27 L36 29 L40 25" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Projects</div>
            </div>
            {/* Clients */}
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="50" viewBox="0 0 56 50" fill="none">
                  {/* Person 1 */}
                  <circle cx="20" cy="16" r="7" fill="#3b82f6" opacity="0.7" />
                  <path d="M8 42 C8 32 14 28 20 28 C26 28 32 32 32 42" fill="#3b82f6" opacity="0.5" />
                  {/* Person 2 */}
                  <circle cx="36" cy="16" r="7" fill="#22c55e" opacity="0.7" />
                  <path d="M24 42 C24 32 30 28 36 28 C42 28 48 32 48 42" fill="#22c55e" opacity="0.5" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Clients</div>
            </div>
            {/* Storage */}
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-[#444] transition-colors">
              <div className="h-[70px] flex items-center justify-center">
                <svg width="56" height="50" viewBox="0 0 56 50" fill="none">
                  {/* Cloud */}
                  <path d="M14 32 C8 32 4 28 4 23 C4 18 8 14 13 14 C14 8 20 4 27 4 C34 4 40 8 41 14 C46 14 52 18 52 24 C52 30 47 32 42 32 Z" fill="#7c3aed" opacity="0.4" stroke="#7c3aed" strokeWidth="1.5" opacity="0.7" />
                  {/* Upload arrow */}
                  <path d="M28 38 L28 22" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                  <path d="M22 28 L28 22 L34 28" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                </svg>
              </div>
              <div className="px-3 py-2 text-xs font-semibold text-dark">Storage</div>
            </div>
            {/* + Card */}
            <div className="w-[140px] bg-[#1a1a1a] rounded-2xl border border-border flex items-center justify-center cursor-pointer transition-colors" style={{ borderColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
              <span className="text-5xl" style={{ color: brandColor }}>+</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
