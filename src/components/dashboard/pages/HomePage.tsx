import { useSetupStore } from '../../../store/useSetupStore';
import { HomeLanding } from './HomeLanding';
import { HomeSmallTeam } from './HomeSmallTeam';
import { HomeEnterprise } from './HomeEnterprise';

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const size = useSetupStore((s) => s.businessInfo.size);

  switch (size) {
    case 'starting':
      return <HomeLanding onNavigate={onNavigate} />;
    case 'just-me':
      return <HomeLanding onNavigate={onNavigate} />;
    case '2-10':
      return <HomeLanding onNavigate={onNavigate} />;
    case '11-50':
      return <HomeSmallTeam onNavigate={onNavigate} />;
    case '50-plus':
      return <HomeEnterprise onNavigate={onNavigate} />;
    default:
      return <HomeLanding onNavigate={onNavigate} />;
  }
}
