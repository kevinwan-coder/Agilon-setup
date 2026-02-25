import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSetupStore } from '../../store/useSetupStore';
import { SetupAnimation } from '../SetupAnimation/SetupAnimation';

const PROV_STEP_COUNT = 3;

/**
 * Provisioning step: shows "Building Your System" setup animation
 * and advances through steps until completion, then transitions to success.
 */
export function Provisioning() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let step = 0;
    let cancelled = false;

    function advance() {
      if (cancelled) return;
      step++;
      if (step <= PROV_STEP_COUNT) {
        setActiveStep(step);
        setTimeout(advance, 2000);
      } else {
        setTimeout(() => {
          if (cancelled) return;
          useSetupStore.getState().setProvisioning(false);
          useSetupStore.getState().setComplete(true);
          useSetupStore.getState().setStep(5);
        }, 800);
      }
    }

    const firstTimer = setTimeout(advance, 2000);
    return () => {
      cancelled = true;
      clearTimeout(firstTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50"
    >
      <SetupAnimation
        title="Building Your System"
        status="Setting up your backoffice system for you..."
        activeStepIndex={Math.min(activeStep, 2) as 0 | 1 | 2}
        tip="Your system will be ready in just a moment..."
      />
    </motion.div>
  );
}
