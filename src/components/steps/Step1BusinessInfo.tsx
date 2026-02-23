import { useCallback, useState } from 'react';
import { useSetupStore } from '../../store/useSetupStore';
import { businessInfoSchema } from '../../schemas/businessInfo';
import { INDUSTRIES } from '../../constants/industries';
import { US_STATES } from '../../constants/states';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { RadioCard } from '../ui/RadioCard';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { StepCard } from '../layout/StepCard';
import type { CompanySize } from '../../types/setup';

const SIZES: { value: CompanySize; icon: string; label: string; desc: string }[] = [
  { value: 'starting', icon: '🚀', label: 'Starting', desc: 'New business' },
  { value: 'just-me', icon: '👤', label: 'Just Me', desc: 'Sole proprietor' },
  { value: '2-10', icon: '👥', label: '2–10', desc: 'Small team' },
  { value: '11-50', icon: '👥', label: '11–50', desc: 'Mid-size team' },
  { value: '50-plus', icon: '🏢', label: 'Over 50', desc: 'Large organization' },
];

export function Step1BusinessInfo() {
  const { businessInfo, updateBusinessInfo, setStep } = useSetupStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const handleNext = useCallback(() => {
    const result = businessInfoSchema.safeParse(businessInfo);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const missing: string[] = [];
      result.error.issues.forEach((e) => {
        const field = String(e.path[0]);
        fieldErrors[field] = e.message;
        missing.push(field.charAt(0).toUpperCase() + field.slice(1));
      });
      setErrors(fieldErrors);
      setToast(`Please fill in: ${missing.join(', ')}`);
      return;
    }
    setErrors({});
    setStep(2);
  }, [businessInfo, setStep]);

  return (
    <StepCard>
      <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />

      <h2 className="text-2xl font-bold text-dark mb-1.5">Tell us about your business</h2>
      <p className="text-gray text-[0.95rem] mb-5">We'll use this to customize your Agilon experience.</p>

      <Input
        label="Business Name"
        required
        placeholder="e.g. Smith Consulting LLC"
        value={businessInfo.name}
        onChange={(e) => {
          updateBusinessInfo({ name: e.target.value });
          if (errors.name) setErrors((p) => ({ ...p, name: '' }));
        }}
        error={errors.name}
      />

      <div className="mb-4">
        <label className="block font-semibold text-sm text-dark mb-1.5">
          Company Size <span className="text-red">*</span>
        </label>
        <div className={`flex justify-center gap-[30px] ${errors.size ? 'border-2 border-red rounded-lg p-0.5' : ''}`}>
          {SIZES.map((s) => (
            <div key={s.value}>
              <RadioCard
                icon={s.icon}
                label={s.label}
                description={s.desc}
                selected={businessInfo.size === s.value}
                onClick={() => {
                  updateBusinessInfo({ size: s.value });
                  if (errors.size) setErrors((p) => ({ ...p, size: '' }));
                }}
              />
            </div>
          ))}
        </div>
        {errors.size && <p className="text-red text-xs mt-1 text-center">{errors.size}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Type of Company"
          options={[...INDUSTRIES]}
          placeholder="Select type..."
          value={businessInfo.industry}
          onChange={(e) => updateBusinessInfo({ industry: e.target.value })}
        />
        <Select
          label="State"
          options={[...US_STATES]}
          placeholder="Select state..."
          value={businessInfo.state}
          onChange={(e) => updateBusinessInfo({ state: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-sm text-dark mb-1.5">
          Brief Description <span className="text-gray-light font-normal">(optional)</span>
        </label>
        <textarea
          className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-[0.95rem] text-dark bg-[#252525] placeholder:text-gray-light resize-y min-h-[64px] focus:outline-none focus:border-[#7ee8a8] focus:shadow-[0_0_0_3px_rgba(126,232,168,0.15)]"
          placeholder="Tell us a bit about what your business does..."
          value={businessInfo.description}
          onChange={(e) => updateBusinessInfo({ description: e.target.value })}
        />
      </div>

      <div className="flex justify-end mt-6 pt-4">
        <Button onClick={handleNext}>Continue &rarr;</Button>
      </div>

      {/* AI Conversation Box */}
      <div className="mt-3 pt-3 w-3/4 mx-auto">
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-70">{'\uD83E\uDD16'}</span>
          <input
            type="text"
            placeholder="If you are not sure about your company type, ask me"
            className="w-full pl-9 pr-3 py-2 bg-[#252525] border border-border rounded-lg text-xs text-dark placeholder:text-gray-light focus:outline-none focus:border-[#7ee8a8] focus:bg-[#2a2a2a] focus:shadow-[0_0_0_3px_rgba(126,232,168,0.15)] transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </StepCard>
  );
}
