import { useSetupStore } from '../../../store/useSetupStore';
import { HomeLanding } from './HomeLanding';
import { HomeSmallTeam } from './HomeSmallTeam';
import { HomeEnterprise } from './HomeEnterprise';

export function HomePage() {
  const size = useSetupStore((s) => s.businessInfo.size);

  switch (size) {
    case 'starting':
      return <HomeLanding />;
    case 'just-me':
      return <HomeLanding />;
    case '2-10':
      return <HomeLanding />;
    case '11-50':
      return <HomeSmallTeam />;
    case '50-plus':
      return <HomeEnterprise />;
    default:
      return <HomeLanding />;
  }
}
