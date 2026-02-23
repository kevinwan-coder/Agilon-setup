import { useSetupStore } from '../../store/useSetupStore';
import { SKILLS } from '../../constants/skills';

interface DashboardTopBarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const LEFT_NAV_DEFAULT = [
  { id: 'home', label: 'Dashboard', icon: '🏠' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'projects', label: 'Projects', icon: '📋' },
  { id: 'financial', label: 'Acc & Fin', icon: '📊' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const LEFT_NAV_SMALL_TEAM = [
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'projects', label: 'Projects', icon: '📋' },
  { id: 'financial', label: 'Acc & Fin', icon: '📊' },
  { id: 'hr', label: 'HR', icon: '🤖' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const LEFT_NAV_ENTERPRISE = [
  { id: 'financial', label: 'Acc & Fin', icon: '🤖' },
  { id: 'hr', label: 'HR', icon: '🤖' },
  { id: 'storage', label: 'Files & Storage', icon: '☁️' },
  { id: 'it', label: 'IT', icon: '💻' },
  { id: 'legal', label: 'Legal', icon: '⚖️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export function DashboardTopBar({ activePage, onNavigate }: DashboardTopBarProps) {
  const businessInfo = useSetupStore((s) => s.businessInfo);
  const branding = useSetupStore((s) => s.branding);
  const skills = useSetupStore((s) => s.skills);
  const size = businessInfo.size;
  const leftNav = size === '2-10' ? LEFT_NAV_SMALL_TEAM
    : (size === '11-50' || size === '50-plus') ? LEFT_NAV_ENTERPRISE
    : LEFT_NAV_DEFAULT;

  const bgColor = branding.bgColor;
  const activeSkills = SKILLS.filter((s) => skills.includes(s.id));

  return (
    <div className="border-b border-border px-6 flex items-center gap-6 flex-shrink-0 h-[56px]" style={{ backgroundColor: bgColor || '#1a1a1a' }}>
      {/* Left — Company Name (click to go home) */}
      <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="text-lg font-bold" style={{ color: branding.color || '#1a56db' }}>
          {businessInfo.name || 'My Business'}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right — Nav Items + Calendar + Alerts + Avatar */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Main nav */}
        {leftNav.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors border-none cursor-pointer ${
              activePage === item.id
                ? 'bg-primary-light text-primary font-semibold'
                : 'bg-transparent text-gray hover:bg-[#252525] hover:text-dark'
            }`}
          >
            <span className="text-sm">{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* Active Skills */}
        {activeSkills.length > 0 && (
          <>
            <div className="w-px h-5 bg-border mx-1 flex-shrink-0" />
            {activeSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => onNavigate(`skill-${skill.id}`)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors border-none cursor-pointer ${
                  activePage === `skill-${skill.id}`
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'bg-transparent text-gray hover:bg-[#252525] hover:text-dark'
                }`}
              >
                <span className="text-sm">{skill.icon}</span>
                {skill.name}
              </button>
            ))}
          </>
        )}

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold cursor-pointer">
          {(businessInfo.name?.[0] || 'A').toUpperCase()}
        </div>
      </div>
    </div>
  );
}
