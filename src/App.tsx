import { useSetupStore } from './store/useSetupStore';
import { LandingPage } from './components/LandingPage';
import { TopBar } from './components/layout/TopBar';
import { Step1BusinessInfo } from './components/steps/Step1BusinessInfo';
import { Provisioning } from './components/steps/Provisioning';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const currentStep = useSetupStore((s) => s.currentStep);

  // Landing page
  if (currentStep === 0) {
    return <LandingPage />;
  }

  // Dashboard mode — full screen, no setup chrome
  if (currentStep === 5) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-light">
      <TopBar />

      {currentStep === 1 && <Step1BusinessInfo />}
      {currentStep === 3 && <Provisioning />}
    </div>
  );
}

export default App;
