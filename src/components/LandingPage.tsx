import { useSetupStore } from '../store/useSetupStore';
import { TopBar } from './layout/TopBar';

export function LandingPage() {
  const setStep = useSetupStore((s) => s.setStep);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <TopBar />

      {/* Green radial glow background */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(45,202,114,0.12) 0%, rgba(45,202,114,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1a1a1a] border border-[#333333] mb-10">
          <span className="text-sm text-gray">Introducing Agilon BPA</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16 10,8" fill="#888" stroke="none" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-semibold text-white mb-3 leading-tight">
          Build your complete
        </h1>
        <h2 className="text-6xl font-bold text-[#1fa855] mb-3 leading-tight">
          Business Automation Platform
        </h2>
        <p className="text-4xl font-semibold text-white mb-12">
          In minutes — Zero coding required
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setStep(1)}
          className="btn-flash px-10 py-4 bg-[#1fa855] text-white text-lg font-semibold rounded-xl cursor-pointer border-none hover:bg-[#178a45] transition-colors shadow-[0_4px_30px_rgba(45,202,114,0.3)] hover:shadow-[0_4px_40px_rgba(45,202,114,0.5)] mb-12"
        >
          Start Building
        </button>

        {/* Trust badges */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fa855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-sm text-gray">No coding required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fa855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm text-gray">Ready in minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fa855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm text-gray">Enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
