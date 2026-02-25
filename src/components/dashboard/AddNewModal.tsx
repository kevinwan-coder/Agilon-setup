import { useState } from 'react';
import { useSetupStore } from '../../store/useSetupStore';

interface AddNewModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

const CHOICES = [
  {
    id: 'ai-agent',
    icon: '🤖',
    label: 'AI Agent',
    desc: 'Add an AI-powered assistant',
  },
  {
    id: 'project',
    icon: '📋',
    label: 'Project',
    desc: 'Create a new project',
  },
  {
    id: 'other',
    icon: '⚡',
    label: 'Other',
    desc: 'Add something else',
  },
];

/* ─── Agent Categories ─── */

interface AgentItem {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

interface AgentCategory {
  id: string;
  icon: string;
  label: string;
  goal: string;
  agentType: string;
  agents: AgentItem[];
}

const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: 'growth',
    icon: '📈',
    label: 'Growth',
    agentType: 'Sales / Marketing',
    goal: 'Revenue Generation',
    agents: [
      { id: 'sales', icon: '💰', label: 'Sales', desc: 'Sales assistant agent' },
      { id: 'marketing', icon: '📣', label: 'Marketing', desc: 'Marketing automation agent' },
      { id: 'front-desk', icon: '🏢', label: 'Front Desk', desc: 'Reception & visitor management' },
    ],
  },
  {
    id: 'product',
    icon: '💻',
    label: 'Product',
    agentType: 'Vibe Coding / QA',
    goal: 'Building & Maintenance',
    agents: [
      { id: 'vibe-coding', icon: '🧑‍💻', label: 'Vibe Coding', desc: 'AI-assisted development' },
      { id: 'qa', icon: '🧪', label: 'QA', desc: 'Quality assurance & testing' },
    ],
  },
  {
    id: 'foundation',
    icon: '🏛️',
    label: 'Foundation',
    agentType: 'Ops / Finance',
    goal: 'Efficiency & Compliance',
    agents: [
      { id: 'operations', icon: '⚙️', label: 'Operations', desc: 'Business operations automation' },
      { id: 'finance', icon: '💵', label: 'Finance', desc: 'Finance & accounting agent' },
    ],
  },
  {
    id: 'human',
    icon: '👥',
    label: 'Human',
    agentType: 'HR / Culture',
    goal: 'Retention & Morale',
    agents: [
      { id: 'hr', icon: '🤝', label: 'HR', desc: 'Human resources assistant' },
      { id: 'support', icon: '🎧', label: 'Support', desc: 'Customer support agent' },
      { id: 'culture', icon: '🎯', label: 'Culture', desc: 'Team culture & engagement' },
    ],
  },
  {
    id: 'security',
    icon: '🛡️',
    label: 'Security',
    agentType: 'Red-Teaming / Shields',
    goal: 'Protection & Privacy',
    agents: [
      { id: 'red-team', icon: '🔴', label: 'Red-Teaming', desc: 'Security testing & penetration' },
      { id: 'shields', icon: '🔒', label: 'Shields', desc: 'Data protection & privacy' },
    ],
  },
];

/* ─── Chevron Icon ─── */

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 0.2s ease',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── Project / Member constants ─── */

const PROJECT_TYPES = [
  { id: 'rnd', icon: '🔬', label: 'R&D', desc: 'Research & development project' },
  { id: 'sales-leads', icon: '📈', label: 'Sales & Leads', desc: 'Sales pipeline & lead tracking' },
  { id: 'marketing', icon: '📣', label: 'Marketing', desc: 'Marketing campaigns & outreach' },
  { id: 'funding', icon: '💵', label: 'Funding', desc: 'Fundraising & investment tracking' },
  { id: 'events', icon: '🎪', label: 'Events', desc: 'Event planning & management' },
];

const MEMBER_CHOICES = [
  {
    id: 'team-member',
    icon: '👥',
    label: 'Team Member',
    desc: 'Assign a team member to this project',
  },
  {
    id: 'ai-agent-existing',
    icon: '🤖',
    label: 'AI Agent (Existing)',
    desc: 'Use an existing AI agent',
  },
  {
    id: 'ai-agent-new',
    icon: '✨',
    label: 'AI Agent (Create New)',
    desc: 'Create a new AI agent for this project',
  },
];

/* ─── Navigation map for agents that have setup pages ─── */

const AGENT_NAV_MAP: Record<string, string> = {
  'front-desk': 'front-desk-setup',
  'support': 'support-setup',
  'sales': 'sales-setup',
};

/* ─── Component ─── */

export function AddNewModal({ open, onClose, onNavigate }: AddNewModalProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const [view, setView] = useState<'main' | 'ai-agent' | 'project' | 'project-members'>('main');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!open) return null;

  const handleClose = () => {
    setView('main');
    setExpandedCategory(null);
    onClose();
  };

  const handleAgentClick = (agentId: string) => {
    const navPage = AGENT_NAV_MAP[agentId];
    if (navPage && onNavigate) {
      handleClose();
      onNavigate(navPage);
    } else {
      handleClose();
    }
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className={`relative bg-[#1a1a1a] border border-border rounded-2xl p-6 shadow-2xl ${
          view === 'ai-agent' ? 'w-[520px] max-h-[80vh]' : 'w-[400px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          {view !== 'main' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (view === 'project-members') setView('project');
                  else { setView('main'); setExpandedCategory(null); }
                }}
                className="text-gray hover:text-dark bg-transparent border-none cursor-pointer text-sm"
              >
                ← Back
              </button>
              <h3 className="text-lg font-bold text-dark">
                {view === 'ai-agent' && 'AI Agents'}
                {view === 'project' && 'Project Type'}
                {view === 'project-members' && 'Add Members'}
              </h3>
            </div>
          ) : (
            <h3 className="text-lg font-bold text-dark">Add New</h3>
          )}
          <button
            onClick={handleClose}
            className="text-gray hover:text-dark text-xl bg-transparent border-none cursor-pointer leading-none"
          >
            &times;
          </button>
        </div>

        {/* Main choices */}
        {view === 'main' && (
          <div className="space-y-3">
            {CHOICES.map((choice) => (
              <button
                key={choice.id}
                onClick={() => {
                  if (choice.id === 'ai-agent' && onNavigate) {
                    handleClose();
                    onNavigate('ai-agents');
                  } else if (choice.id === 'project' && onNavigate) {
                    handleClose();
                    onNavigate('project-type');
                  } else {
                    handleClose();
                  }
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-[#252525] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <span className="text-2xl">{choice.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-dark">{choice.label}</div>
                  <div className="text-xs text-gray mt-0.5">{choice.desc}</div>
                </div>
                <span className="ml-auto text-gray">→</span>
              </button>
            ))}
          </div>
        )}

        {/* AI Agent categories with dropdowns */}
        {view === 'ai-agent' && (
          <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-1">
            {/* Category header row */}
            <div className="flex items-center gap-3 px-3 pb-2 border-b border-border mb-2">
              <span className="text-xs font-semibold text-gray uppercase tracking-wider w-[100px]">Category</span>
              <span className="text-xs font-semibold text-gray uppercase tracking-wider flex-1">Agent Type</span>
              <span className="text-xs font-semibold text-gray uppercase tracking-wider w-[140px]">Goal</span>
              <span className="w-4" />
            </div>

            {AGENT_CATEGORIES.map((cat) => {
              const isOpen = expandedCategory === cat.id;
              return (
                <div key={cat.id}>
                  {/* Category row — dropdown trigger */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border cursor-pointer transition-all text-left ${
                      isOpen
                        ? 'border-[#7ee8a8] bg-[#1a2e22]'
                        : 'border-border bg-[#252525] hover:border-[#555]'
                    }`}
                  >
                    <div className="flex items-center gap-2 w-[100px] flex-shrink-0">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-bold text-dark">{cat.label}</span>
                    </div>
                    <span className="text-sm text-gray-light flex-1">{cat.agentType}</span>
                    <span className="text-xs text-gray w-[140px] flex-shrink-0">{cat.goal}</span>
                    <span className={`text-gray flex-shrink-0 ${isOpen ? 'text-[#7ee8a8]' : ''}`}>
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  {/* Expanded agents */}
                  {isOpen && (
                    <div className="ml-4 mt-1 mb-2 space-y-1">
                      {cat.agents.map((agent) => (
                        <button
                          key={agent.id}
                          onClick={() => handleAgentClick(agent.id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-[#1a1a1a] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                        >
                          <span className="text-lg">{agent.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-dark">{agent.label}</div>
                            <div className="text-xs text-gray mt-0.5">{agent.desc}</div>
                          </div>
                          <span className="text-gray text-xs">→</span>
                        </button>
                      ))}
                      {/* Add custom agent within category */}
                      <button
                        onClick={() => handleClose()}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed border-border bg-transparent hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                      >
                        <span className="text-lg font-bold" style={{ color: brandColor }}>+</span>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-dark">Add Custom</div>
                          <div className="text-xs text-gray mt-0.5">Create a custom {cat.label.toLowerCase()} agent</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Project type sub-choices */}
        {view === 'project' && (
          <div className="space-y-3">
            {PROJECT_TYPES.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setView('project-members')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-[#252525] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <span className="text-2xl">{proj.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-dark">{proj.label}</div>
                  <div className="text-xs text-gray mt-0.5">{proj.desc}</div>
                </div>
                <span className="ml-auto text-gray">→</span>
              </button>
            ))}
          </div>
        )}
        {/* Project member choices */}
        {view === 'project-members' && (
          <div className="space-y-3">
            {MEMBER_CHOICES.map((member) => (
              <button
                key={member.id}
                onClick={() => handleClose()}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-[#252525] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <span className="text-2xl">{member.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-dark">{member.label}</div>
                  <div className="text-xs text-gray mt-0.5">{member.desc}</div>
                </div>
                <span className="ml-auto text-gray">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
