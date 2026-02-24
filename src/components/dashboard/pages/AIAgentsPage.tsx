import React, { useState } from 'react';
import { useSetupStore } from '../../../store/useSetupStore';

/* ─── Types ─── */

interface AgentItem {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

interface AgentCategory {
  id: string;
  label: string;
  desc: string;
  image: React.ReactNode;
  agents: AgentItem[];
}

/* ─── Category SVG Icons ─── */

const AccFinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
    <line x1="8" y1="18" x2="10" y2="18" />
  </svg>
);

const OperationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SalesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const MarketingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
    <path d="M3 8l4-4 4 4" />
    <path d="M13 8l4-4 4 4" />
  </svg>
);

const ProductDevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const LogisticsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ─── Constants ─── */

const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: 'operation',
    label: 'Operation',
    desc: 'Efficiency & compliance agents',
    image: <OperationIcon />,
    agents: [
      { id: 'process-automation', icon: '🔄', label: 'Process Automation', desc: 'Workflow & process optimization' },
      { id: 'support', icon: '🎧', label: 'Support', desc: 'Customer support agent' },
      { id: 'front-desk', icon: '🏢', label: 'Front Desk', desc: 'Reception & visitor management' },
      { id: 'legal', icon: '⚖️', label: 'Legal', desc: 'Legal compliance & contracts' },
      { id: 'it', icon: '🖥️', label: 'IT', desc: 'IT support & infrastructure' },
      { id: 'hr', icon: '🤝', label: 'HR', desc: 'Human resources assistant' },
      { id: 'executive-assistant', icon: '👔', label: 'Executive Assistant', desc: 'Scheduling & task management' },
    ],
  },
  {
    id: 'acc-fin',
    label: 'Acc & Fin',
    desc: 'Accounting & financial agents',
    image: <AccFinIcon />,
    agents: [
      { id: 'accounting', icon: '🧾', label: 'Accounting', desc: 'Bookkeeping & financial records' },
      { id: 'finance', icon: '💵', label: 'Finance', desc: 'Financial planning & analysis' },
      { id: 'tax', icon: '📑', label: 'Tax', desc: 'Tax preparation & compliance' },
      { id: 'payroll', icon: '💳', label: 'Payroll', desc: 'Payroll processing & management' },
      { id: 'audit', icon: '🔎', label: 'Audit', desc: 'Internal audit & compliance' },
      { id: 'budgeting', icon: '📊', label: 'Budgeting', desc: 'Budget planning & forecasting' },
      { id: 'analysis', icon: '📈', label: 'Analysis', desc: 'Financial analysis & insights' },
      { id: 'report', icon: '📄', label: 'Report', desc: 'Financial reporting & statements' },
      { id: 'planning', icon: '🗓️', label: 'Planning', desc: 'Strategic financial planning' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    desc: 'Revenue generation agents',
    image: <SalesIcon />,
    agents: [
      { id: 'sales', icon: '💰', label: 'Sales', desc: 'Sales assistant agent' },
      { id: 'lead-gen', icon: '🎯', label: 'Lead Generation', desc: 'Prospect discovery & outreach' },
      { id: 'account-mgmt', icon: '🤝', label: 'Account Management', desc: 'Client relationship & retention' },
      { id: 'crm', icon: '📇', label: 'CRM', desc: 'Customer relationship management' },
      { id: 'amazon', icon: '📦', label: 'Amazon', desc: 'Amazon marketplace sales' },
      { id: 'ebay', icon: '🏷️', label: 'eBay', desc: 'eBay marketplace sales' },
      { id: 'other-estores', icon: '🛒', label: 'Other eStores', desc: 'Other online store platforms' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    desc: 'Brand awareness & growth agents',
    image: <MarketingIcon />,
    agents: [
      { id: 'marketing', icon: '📣', label: 'Marketing', desc: 'Marketing automation agent' },
      { id: 'social-media', icon: '📱', label: 'Social Media', desc: 'Social media management' },
      { id: 'content', icon: '✍️', label: 'Content', desc: 'Content creation & strategy' },
      { id: 'seo', icon: '🔍', label: 'SEO', desc: 'Search engine optimization' },
      { id: 'production-contents', icon: '📝', label: 'Production (Contents)', desc: 'Content production & publishing' },
      { id: 'production-video', icon: '🎬', label: 'Production (Video)', desc: 'Video production & editing' },
      { id: 'ads-campaign', icon: '📢', label: 'Ads Campaign', desc: 'Ad campaign management & optimization' },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    desc: 'Supply chain & fulfillment agents',
    image: <LogisticsIcon />,
    agents: [
      { id: 'po', icon: '📝', label: 'PO', desc: 'Purchase order management' },
      { id: 'inventory', icon: '📦', label: 'Inventory', desc: 'Stock tracking & management' },
      { id: 'shipping', icon: '🚚', label: 'Shipping', desc: 'Shipment tracking & coordination' },
      { id: 'receiving', icon: '📥', label: 'Receiving', desc: 'Incoming goods & inspection' },
      { id: 'rma', icon: '🔁', label: 'RMA', desc: 'Return merchandise authorization' },
    ],
  },
  {
    id: 'product-dev',
    label: 'Product Dev',
    desc: 'Building & maintenance agents',
    image: <ProductDevIcon />,
    agents: [
      { id: 'vibe-coding', icon: '🧑‍💻', label: 'Vibe Coding', desc: 'AI-assisted development' },
      { id: 'qa', icon: '🧪', label: 'QA', desc: 'Quality assurance & testing' },
      { id: 'design', icon: '🎨', label: 'Design', desc: 'UI/UX design assistant' },
      { id: 'red-team', icon: '🛡️', label: 'Security', desc: 'Security testing & protection' },
    ],
  },
];


/* ─── Component ─── */

interface AIAgentsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onSelectAgent?: (agent: { label: string; icon: string; desc: string }) => void;
}

export function AIAgentsPage({ onBack, onNavigate, onSelectAgent }: AIAgentsPageProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const [activeCategory, setActiveCategory] = useState('operation');

  const handleAgentClick = (agentId: string) => {
    const cat = AGENT_CATEGORIES.find((c) => c.id === activeCategory);
    const agent = cat?.agents.find((a) => a.id === agentId);
    if (agent && onSelectAgent) {
      onSelectAgent({ label: agent.label, icon: agent.icon, desc: agent.desc });
    }
    onNavigate('agent-definition');
  };

  const currentCategory = AGENT_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray hover:text-dark bg-transparent border-none cursor-pointer mb-4"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: brandColor + '20', color: brandColor }}
          >
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark leading-tight">AI Agents</h1>
            <p className="text-sm text-gray">Choose a category and select an agent</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 border-b border-border pb-0">
          {AGENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm cursor-pointer border-none transition-colors rounded-t-lg ${
                activeCategory === cat.id
                  ? 'bg-[#1a2e22] text-[#7ee8a8] font-semibold'
                  : 'bg-transparent text-gray hover:bg-[#1a1a1a] hover:text-dark'
              }`}
            >
              <span className={`flex-shrink-0 ${activeCategory === cat.id ? 'text-[#7ee8a8]' : 'text-gray'}`}>
                {cat.image}
              </span>
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          ))}

          {/* + Add tab */}
          <button
            className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer border-none transition-colors rounded-t-lg bg-transparent text-gray hover:bg-[#1a1a1a] hover:text-dark"
          >
            <span className="text-lg font-bold" style={{ color: brandColor }}>+</span>
          </button>
        </div>
      </div>

      {/* Content — Agents for selected category */}
      <div className="flex-1 overflow-y-auto pb-10 pt-4">
        {currentCategory && (
          <>
            <p className="text-sm text-gray mb-4">{currentCategory.desc}</p>

            <div className="grid grid-cols-2 gap-3 max-w-[700px]">
              {currentCategory.agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-[#252525] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                >
                  <span className="text-2xl">{agent.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-dark">{agent.label}</div>
                    <div className="text-xs text-gray mt-0.5 truncate">{agent.desc}</div>
                  </div>
                  <span className="text-gray text-sm flex-shrink-0">→</span>
                </button>
              ))}

              {/* + Add custom agent */}
              <button
                className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border bg-transparent hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
              >
                <span className="text-2xl font-bold" style={{ color: brandColor }}>+</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-dark">Add Custom</div>
                  <div className="text-xs text-gray mt-0.5">Create a new agent</div>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
