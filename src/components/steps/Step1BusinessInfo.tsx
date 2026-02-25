import { useCallback, useState } from 'react';
import { useSetupStore } from '../../store/useSetupStore';
import { businessInfoSchema } from '../../schemas/businessInfo';
import { brandingSchema } from '../../schemas/branding';
import { TEMPLATES } from '../../constants/templates';
import { BRAND_COLORS } from '../../constants/colors';
import { Input } from '../ui/Input';
import { RadioCard } from '../ui/RadioCard';
import { TemplateCard } from '../ui/TemplateCard';
import { FileUpload } from '../ui/FileUpload';
import { ColorPicker } from '../ui/ColorPicker';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { StepCard } from '../layout/StepCard';
import type { CompanySize, TemplateName } from '../../types/setup';

const SIZES: { value: CompanySize; icon: string; label: string; desc: string }[] = [
  { value: 'starting', icon: '🚀', label: 'Starting', desc: 'New business' },
  { value: 'just-me', icon: '👤', label: 'Just Me', desc: 'Sole proprietor' },
  { value: '2-10', icon: '👥', label: '2–10', desc: 'Small team' },
  { value: '11-50', icon: '👥', label: '11–50', desc: 'Mid-size team' },
  { value: '50-plus', icon: '🏢', label: 'Over 50', desc: 'Large organization' },
];

export function Step1BusinessInfo() {
  const { businessInfo, updateBusinessInfo, branding, updateBranding, setStep, setProvisioning } = useSetupStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const handleNext = useCallback(() => {
    // Validate business info
    const bizResult = businessInfoSchema.safeParse(businessInfo);
    const brandResult = brandingSchema.safeParse({
      template: branding.template,
      color: branding.color,
    });

    const fieldErrors: Record<string, string> = {};
    const missing: string[] = [];

    if (!bizResult.success) {
      bizResult.error.issues.forEach((e) => {
        const field = String(e.path[0]);
        fieldErrors[field] = e.message;
        missing.push(field.charAt(0).toUpperCase() + field.slice(1));
      });
    }
    if (!brandResult.success) {
      brandResult.error.issues.forEach((e) => {
        const field = String(e.path[0]);
        fieldErrors[field] = e.message;
        missing.push(field.charAt(0).toUpperCase() + field.slice(1));
      });
    }

    if (missing.length > 0) {
      setErrors(fieldErrors);
      setToast(`Please fill in: ${missing.join(', ')}`);
      return;
    }

    setErrors({});
    setProvisioning(true);
    setStep(3);
  }, [businessInfo, branding, setStep, setProvisioning]);

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


      {/* ─── Branding Section ─── */}
      <div className="mt-6 pt-6 border-t border-border">
        {/* Templates + Upload Logo — same row */}
        <div className="grid grid-cols-2 gap-6 mb-6 items-stretch">
          {/* Templates */}
          <div>
            <label className="block font-semibold text-sm text-dark mb-1.5">
              Choose a Template <span className="text-red">*</span>
            </label>
            <div className={`rounded-lg ${errors.template ? 'border-2 border-red p-0.5' : ''}`}>
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((t) => (
                  <TemplateCard
                    key={t.id}
                    name={t.name}
                    description={t.description}
                    layout={t.layout}
                    sidebar={t.sidebar}
                    topbar={t.topbar}
                    accent={t.accent}
                    bg={t.bg}
                    cardBg={t.cardBg}
                    textLight={t.textLight}
                    selected={branding.template === t.id}
                    onClick={() => {
                      updateBranding({ template: t.id as TemplateName });
                      if (errors.template) setErrors((p) => ({ ...p, template: '' }));
                    }}
                  />
                ))}
              </div>
            </div>
            {errors.template && <p className="text-red text-xs mt-1">{errors.template}</p>}
          </div>

          {/* Upload Logo — right side */}
          <div className="flex flex-col">
            <FileUpload
              logoName={branding.logoName}
              onFileSelect={(file) => updateBranding({ logoFile: file, logoName: file.name })}
            />
          </div>
        </div>

        {/* Background Color + Brand Color — same row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Background Color — left */}
          <ColorPicker
            selected={branding.bgColor}
            onSelect={(bgColor) => {
              updateBranding({ bgColor });
            }}
          />

          {/* Brand Color — right */}
          <div>
            <label className="block font-semibold text-sm text-dark mb-1.5">
              Brand Color <span className="text-red">*</span>
            </label>
            <p className="text-xs text-gray-light mb-2">Choose a primary color for your workspace</p>
            <div className={`flex gap-2.5 flex-wrap ${errors.color ? 'border-2 border-red rounded-lg p-1' : ''}`}>
              {BRAND_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    updateBranding({ color });
                    if (errors.color) setErrors((p) => ({ ...p, color: '' }));
                  }}
                  className={`w-11 h-11 rounded-lg cursor-pointer border-3 transition-all hover:scale-110 ${
                    branding.color === color
                      ? 'border-white shadow-[0_0_0_2px_#1a1a1a,0_0_0_4px_white]'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select brand color ${color}`}
                />
              ))}
            </div>
            {errors.color && <p className="text-red text-xs mt-1">{errors.color}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-border">
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
