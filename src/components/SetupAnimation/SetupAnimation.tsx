/**
 * Portable "Building Your System" setup animation.
 * Renders animated background (grid, glow, particles) and center content
 * (spinning logo, title, status, progress bar, steps, tip).
 */

import { Sparkles } from 'lucide-react';
import './SetupAnimation.css';

export interface SetupAnimationProps {
  /** Main heading (default: "Building Your System") */
  title?: string;
  /** Status line under title (default: "Initializing your modules...") */
  status?: string;
  /** Which step is active: 0 = Building Up Modules, 1 = Building Dashboard, 2 = Finalizing (default: 0) */
  activeStepIndex?: 0 | 1 | 2;
  /** Tip text at bottom (default: "Your system will be ready in just a moment...") */
  tip?: string;
  /** Number of floating particles (default: 20) */
  particleCount?: number;
  /** Optional className for root wrapper */
  className?: string;
}

const DEFAULT_TITLE = 'Building Your System';
const DEFAULT_STATUS = 'Initializing your modules...';
const DEFAULT_TIP = 'Your system will be ready in just a moment...';

export function SetupAnimation({
  title = DEFAULT_TITLE,
  status = DEFAULT_STATUS,
  activeStepIndex = 0,
  tip = DEFAULT_TIP,
  particleCount = 20,
  className = '',
}: SetupAnimationProps) {
  return (
    <div className={`setup-animation ${className}`.trim()} role="status" aria-live="polite">
      {/* Animated Background (grid + glow + particles) */}
      <div className="setup-animation-bg">
        <div className="setup-animation-grid" />
        <div className="setup-animation-glow" />
        <div className="setup-animation-particles">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="setup-animation-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="setup-animation-main">
        <div className="setup-animation-logo">
          <div className="setup-animation-logo-ring" />
          <div className="setup-animation-logo-ring setup-animation-ring-2" />
          <div className="setup-animation-logo-ring setup-animation-ring-3" />
          <div className="setup-animation-logo-center">
            <Sparkles size={32} />
          </div>
        </div>

        <h1 className="setup-animation-title">{title}</h1>
        <p className="setup-animation-status">{status}</p>

        <div className="setup-animation-progress">
          <div className="setup-animation-progress-bar">
            <div className="setup-animation-progress-fill" />
            <div className="setup-animation-progress-glow" />
          </div>
        </div>

        <div className="setup-animation-steps">
          <div className={`setup-animation-step ${activeStepIndex === 0 ? 'active' : ''}`}>
            <div className="setup-animation-step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Building Up Modules</span>
          </div>
          <div className={`setup-animation-step ${activeStepIndex === 1 ? 'active' : ''}`}>
            <div className="setup-animation-step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <span>Building Dashboard</span>
          </div>
          <div className={`setup-animation-step ${activeStepIndex === 2 ? 'active' : ''}`}>
            <div className="setup-animation-step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span>Finalizing Setup</span>
          </div>
        </div>

        <div className="setup-animation-tip">
          <span className="setup-animation-tip-icon">💡</span>
          <span>{tip}</span>
        </div>
      </div>
    </div>
  );
}

export default SetupAnimation;
