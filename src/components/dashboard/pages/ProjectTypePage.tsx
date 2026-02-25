import React, { useState } from 'react';
import { useSetupStore } from '../../../store/useSetupStore';

/* ─── Types ─── */

interface ProjectItem {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

interface ProjectCategory {
  id: string;
  label: string;
  desc: string;
  image: React.ReactNode;
  projects: ProjectItem[];
}

/* ─── Category SVG Icons ─── */

const RndIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v4H9z" />
    <path d="M12 7v4" />
    <circle cx="12" cy="14" r="3" />
    <path d="M9.5 16.5L7 21" />
    <path d="M14.5 16.5L17 21" />
    <path d="M5 21h14" />
  </svg>
);

const SalesLeadsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MarketingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const FundingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EventsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ─── Constants ─── */

const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: 'rnd',
    label: 'R&D',
    desc: 'Research & development projects',
    image: <RndIcon />,
    projects: [
      { id: 'product-research', icon: '🔬', label: 'Product Research', desc: 'New product exploration & validation' },
      { id: 'prototype', icon: '🛠️', label: 'Prototype', desc: 'Proof of concept & prototype development' },
      { id: 'innovation', icon: '💡', label: 'Innovation', desc: 'Innovation pipeline & ideation' },
      { id: 'tech-eval', icon: '⚙️', label: 'Tech Evaluation', desc: 'Technology assessment & feasibility' },
      { id: 'patent', icon: '📜', label: 'Patent', desc: 'Patent research & IP management' },
    ],
  },
  {
    id: 'sales-leads',
    label: 'Sales & Leads',
    desc: 'Sales pipeline & lead tracking',
    image: <SalesLeadsIcon />,
    projects: [
      { id: 'pipeline', icon: '📊', label: 'Pipeline', desc: 'Sales pipeline management' },
      { id: 'lead-tracking', icon: '🎯', label: 'Lead Tracking', desc: 'Lead capture & follow-up' },
      { id: 'proposal', icon: '📋', label: 'Proposal', desc: 'Proposal creation & tracking' },
      { id: 'client-onboarding', icon: '🤝', label: 'Client Onboarding', desc: 'New client setup & onboarding' },
      { id: 'territory', icon: '🗺️', label: 'Territory', desc: 'Territory planning & assignment' },
      { id: 'amazon-promotion', icon: '🛒', label: 'Amazon Promotion', desc: 'Amazon ads, deals & promotional campaigns' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    desc: 'Marketing campaigns & outreach',
    image: <MarketingIcon />,
    projects: [
      { id: 'campaign', icon: '📢', label: 'Campaign', desc: 'Marketing campaign management' },
      { id: 'content-plan', icon: '✍️', label: 'Content Plan', desc: 'Content calendar & strategy' },
      { id: 'brand', icon: '🎨', label: 'Brand', desc: 'Brand identity & guidelines' },
      { id: 'launch', icon: '🚀', label: 'Product Launch', desc: 'Go-to-market & launch planning' },
      { id: 'social', icon: '📱', label: 'Social Media', desc: 'Social media campaign tracking' },
    ],
  },
  {
    id: 'funding',
    label: 'Funding',
    desc: 'Fundraising & investment tracking',
    image: <FundingIcon />,
    projects: [
      { id: 'seed', icon: '🌱', label: 'Seed Round', desc: 'Seed funding & angel investment' },
      { id: 'series', icon: '💰', label: 'Series Round', desc: 'Series A/B/C fundraising' },
      { id: 'grant', icon: '📄', label: 'Grant', desc: 'Grant applications & tracking' },
      { id: 'investor-relations', icon: '🏦', label: 'Investor Relations', desc: 'Investor communication & reporting' },
      { id: 'budget-allocation', icon: '📈', label: 'Budget Allocation', desc: 'Fund allocation & expenditure tracking' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    desc: 'Event planning & management',
    image: <EventsIcon />,
    projects: [
      { id: 'conference', icon: '🎤', label: 'Conference', desc: 'Conference planning & coordination' },
      { id: 'webinar', icon: '💻', label: 'Webinar', desc: 'Online event & webinar management' },
      { id: 'trade-show', icon: '🏪', label: 'Trade Show', desc: 'Trade show booth & logistics' },
      { id: 'team-event', icon: '🎉', label: 'Team Event', desc: 'Internal team events & offsites' },
      { id: 'workshop', icon: '📝', label: 'Workshop', desc: 'Workshop planning & materials' },
    ],
  },
];

/* ─── Component ─── */

interface ProjectTypePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onSelectProject?: (project: { label: string; icon: string; desc: string }) => void;
}

export function ProjectTypePage({ onBack, onNavigate, onSelectProject }: ProjectTypePageProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const [activeCategory, setActiveCategory] = useState('rnd');

  const currentCategory = PROJECT_CATEGORIES.find((c) => c.id === activeCategory);

  const handleProjectClick = (projectId: string) => {
    const cat = PROJECT_CATEGORIES.find((c) => c.id === activeCategory);
    const project = cat?.projects.find((p) => p.id === projectId);
    if (project && onSelectProject) {
      onSelectProject({ label: project.label, icon: project.icon, desc: project.desc });
    }
    onNavigate('project-definition');
  };

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
            📁
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark leading-tight">Project Type</h1>
            <p className="text-sm text-gray">Choose a category and select a project type</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 border-b border-border pb-0">
          {PROJECT_CATEGORIES.map((cat) => (
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

      {/* Content — Projects for selected category */}
      <div className="flex-1 overflow-y-auto pb-10 pt-4">
        {currentCategory && (
          <>
            <p className="text-sm text-gray mb-4">{currentCategory.desc}</p>

            <div className="grid grid-cols-2 gap-3 max-w-[700px]">
              {currentCategory.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-[#252525] hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                >
                  <span className="text-2xl">{project.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-dark">{project.label}</div>
                    <div className="text-xs text-gray mt-0.5 truncate">{project.desc}</div>
                  </div>
                  <span className="text-gray text-sm flex-shrink-0">→</span>
                </button>
              ))}

              {/* + Add custom project */}
              <button
                className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border bg-transparent hover:border-[#7ee8a8] cursor-pointer transition-all text-left"
              >
                <span className="text-2xl font-bold" style={{ color: brandColor }}>+</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-dark">Add Custom</div>
                  <div className="text-xs text-gray mt-0.5">Create a new project type</div>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
