import { useSetupStore } from '../../store/useSetupStore';

export function TopBar() {
  const setStep = useSetupStore((s) => s.setStep);

  return (
    <nav className="bg-[#0a0a0a] px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <button onClick={() => setStep(0)} className="text-xl font-bold bg-transparent border-none cursor-pointer p-0">
        <span className="text-[#2dca72]">A</span>
        <span className="text-dark">gilon</span>
        <span className="text-gray">.AI</span>
      </button>

      {/* Center nav links */}
      <div className="flex items-center gap-8">
        <a href="#" className="text-sm text-gray hover:text-[#7ee8a8] transition-colors no-underline">About</a>
        <a href="#" className="text-sm text-gray hover:text-[#7ee8a8] transition-colors no-underline">Pricing</a>
        <a href="#" className="text-sm text-gray hover:text-[#7ee8a8] transition-colors no-underline">Partnerships</a>
      </div>

      {/* Right side auth */}
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm text-gray hover:text-[#7ee8a8] transition-colors no-underline">Log in</a>
        <button className="px-4 py-1.5 bg-white text-[#1a1a1a] text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border-none">
          Create account
        </button>
      </div>
    </nav>
  );
}
