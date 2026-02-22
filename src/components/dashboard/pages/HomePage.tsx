import { useSetupStore } from '../../../store/useSetupStore';
import { HomeLanding } from './HomeLanding';
import { HomeSmallTeam } from './HomeSmallTeam';
import { HomeEnterprise } from './HomeEnterprise';

function BlankPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray text-sm">Coming soon</p>
    </div>
  );
}

export function HomePage() {
  const size = useSetupStore((s) => s.businessInfo.size);

  switch (size) {
    case 'just-me':
      return <HomeLanding />;
    case '2-10':
      return <BlankPage />;
    case '11-50':
      return <HomeSmallTeam />;
    case '50-plus':
      return <HomeEnterprise />;
    default:
      return <HomeLanding />;
  }
}
