import { useState, useEffect, type ReactNode } from 'react';
import { DashboardTopBar } from './DashboardTopBar';
import { BotChat } from './BotChat';
import { useSetupStore } from '../../store/useSetupStore';

/* ─── Agilon.ai Top Bar ─── */

function AgilonTopBar() {
  return (
    <div className="h-[40px] bg-[#1a1a1a] border-b border-border px-5 flex items-center justify-between flex-shrink-0">
      <span className="text-sm font-bold text-[#22c55e]">Agilon.ai</span>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-[#252525] border border-border rounded text-xs text-dark cursor-pointer hover:bg-[#333] transition-colors">
          &lt;&gt; Code view
        </button>
        <button className="px-3 py-1 bg-[#252525] border border-border rounded text-xs text-dark cursor-pointer hover:bg-[#333] transition-colors">
          Preview
        </button>
        <button className="px-3 py-1 bg-[#22c55e] border-none rounded text-xs text-white font-semibold cursor-pointer hover:bg-[#16a34a] transition-colors">
          Deploy
        </button>
        <button className="px-3 py-1 bg-[#252525] border border-border rounded text-xs text-dark cursor-pointer hover:bg-[#333] transition-colors flex items-center gap-1">
          💾 Save
        </button>
      </div>
    </div>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

/* ─── Sidebar nav items ─── */

const SIDEBAR_NAV_DEFAULT = [
  { id: 'home', label: 'Dashboard', icon: '🏠' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'projects', label: 'Projects', icon: '📋' },
  { id: 'financial', label: 'Acc & Fin', icon: '📊' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const SIDEBAR_NAV_SMALL_TEAM = [
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'projects', label: 'Projects', icon: '📋' },
  { id: 'financial', label: 'Acc & Fin', icon: '📊' },
  { id: 'hr', label: 'HR', icon: '🤖' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const SIDEBAR_NAV_ENTERPRISE = [
  { id: 'financial', label: 'Acc & Fin', icon: '🤖' },
  { id: 'hr', label: 'HR', icon: '🤖' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'it', label: 'IT', icon: '💻' },
  { id: 'legal', label: 'Legal', icon: '⚖️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

/* ─── Sidebar Calendar ─── */

function SidebarCalendar() {
  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const dates = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, null],
  ];
  const today = 22;

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-border p-3">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-dark">February 2026</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center" style={{ fontSize: '10px' }}>
        {days.map((d) => (
          <div key={d} className="text-gray py-0.5 font-medium">{d}</div>
        ))}
        {dates.flat().map((d, i) => (
          <div
            key={i}
            className={`py-0.5 rounded ${
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

/* ─── Chat Input (shared) ─── */

function ChatInput({ chatOpen, setChatOpen, query, setQuery, handleSubmit, bgColor }: {
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  query: string;
  setQuery: (v: string) => void;
  handleSubmit: () => void;
  bgColor?: string;
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 flex justify-center pb-4 pt-6 pointer-events-none"
      style={{ background: `linear-gradient(transparent, ${bgColor || 'var(--color-light)'} 40%)` }}
    >
      <div className="relative flex items-center w-full max-w-[630px] pointer-events-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70">🤖</span>
        <input
          type="text"
          placeholder="Ask Agilon anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          onFocus={() => { if (!chatOpen) setChatOpen(true); }}
          className="w-full pl-12 pr-20 py-3.5 bg-[#1a1a1a] border border-border rounded-2xl text-sm text-dark placeholder:text-gray-light focus:outline-none focus:border-primary focus:shadow-[0_2px_20px_rgba(26,86,219,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold cursor-pointer border-none hover:bg-primary-hover transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

/* ─── Main Layout ─── */

export function DashboardLayout({ children, activePage, onNavigate }: DashboardLayoutProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [query, setQuery] = useState('');
  const template = useSetupStore((s) => s.branding.template);
  const businessInfo = useSetupStore((s) => s.businessInfo);
  const brandColor = useSetupStore((s) => s.branding.color) || '#1a56db';
  const bgColor = useSetupStore((s) => s.branding.bgColor);

  // Dynamically flip text/border colors based on bgColor brightness
  useEffect(() => {
    const root = document.documentElement;
    if (!bgColor) return;
    // Parse hex to brightness (0-255)
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const isLight = brightness > 128;

    if (isLight) {
      root.style.setProperty('--color-dark', '#1a1a1a');
      root.style.setProperty('--color-gray', '#555555');
      root.style.setProperty('--color-gray-light', '#888888');
      root.style.setProperty('--color-border', '#cccccc');
    } else {
      root.style.setProperty('--color-dark', '#e8e8e8');
      root.style.setProperty('--color-gray', '#888888');
      root.style.setProperty('--color-gray-light', '#555555');
      root.style.setProperty('--color-border', '#333333');
    }

    return () => {
      root.style.removeProperty('--color-dark');
      root.style.removeProperty('--color-gray');
      root.style.removeProperty('--color-gray-light');
      root.style.removeProperty('--color-border');
    };
  }, [bgColor]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    if (!chatOpen) setChatOpen(true);
    window.dispatchEvent(new CustomEvent('agilon-chat-message', { detail: query }));
    setQuery('');
  };

  const isSidebar = template === 'classic';
  const size = businessInfo.size;
  const sidebarNav = size === '2-10' ? SIDEBAR_NAV_SMALL_TEAM
    : (size === '11-50' || size === '50-plus') ? SIDEBAR_NAV_ENTERPRISE
    : SIDEBAR_NAV_DEFAULT;

  /* ═══════════ SIDEBAR LAYOUT (Template 2 / Classic) ═══════════ */
  if (isSidebar) {
    return (
      <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: bgColor || 'var(--color-light)' }}>
        <AgilonTopBar />
        <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[264px] flex-shrink-0 border-r border-border flex flex-col" style={{ backgroundColor: bgColor || '#0f1117' }}>
          {/* Brand */}
          <div className="px-5 py-5 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-xl">☁️</span>
            <span className="text-base font-bold" style={{ color: brandColor }}>
              {businessInfo.name || 'Agilon'} EPA
            </span>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3">
            {sidebarNav.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 border-none cursor-pointer transition-colors ${
                  activePage === item.id
                    ? 'bg-[#1a1f2e] text-dark font-semibold'
                    : 'bg-transparent text-gray hover:bg-[#1a1a1a] hover:text-dark'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Financial Summary */}
          <div className="px-3 mb-3">
            <div className="bg-[#1a1a1a] rounded-2xl border border-border p-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray">Balance:</span>
                  <span className="text-dark font-semibold">$12,715.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Payments:</span>
                  <span className="text-dark font-semibold">$2,700.50</span>
                </div>
                <div className="text-[9px] text-gray text-right">(EOM)</div>
                <div className="flex justify-between">
                  <span className="text-gray">Exp. Receiving:</span>
                  <span className="text-dark font-semibold">$3,758.25</span>
                </div>
                <div className="border-t border-border pt-1.5 flex justify-between">
                  <span className="text-gray">Net Balance:</span>
                  <span className="text-[#22c55e] font-bold">$13,773.25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="px-3 mb-4">
            <SidebarCalendar />
          </div>

          {/* Avatar */}
          <div className="px-5 pb-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#252525] border-2 border-[#22c55e] flex items-center justify-center text-sm font-bold text-dark overflow-hidden">
              {(businessInfo.name?.[0] || 'A').toUpperCase()}
            </div>
            <span className="text-xs text-gray font-medium">{businessInfo.name || 'User'}</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="w-full max-w-[1060px] mx-auto p-8">
            {children}
          </div>

          <ChatInput chatOpen={chatOpen} setChatOpen={setChatOpen} query={query} setQuery={setQuery} handleSubmit={handleSubmit} bgColor={bgColor} />
          <BotChat open={chatOpen} onClose={() => setChatOpen(false)} />
        </main>
        </div>
      </div>
    );
  }

  /* ═══════════ TOP BAR LAYOUT (Default) ═══════════ */
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: bgColor || 'var(--color-light)' }}>
      <AgilonTopBar />
      <DashboardTopBar activePage={activePage} onNavigate={onNavigate} />
      <main className="flex-1 overflow-y-auto relative">
        <div className="w-[1280px] mx-auto p-8">
          {children}
        </div>

        <ChatInput chatOpen={chatOpen} setChatOpen={setChatOpen} query={query} setQuery={setQuery} handleSubmit={handleSubmit} bgColor={bgColor} />
        <BotChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </main>
    </div>
  );
}
