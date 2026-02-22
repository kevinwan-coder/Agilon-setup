import { useCallback, useState } from 'react';
import { useSetupStore } from '../../store/useSetupStore';
import { brandingSchema } from '../../schemas/branding';
import { TEMPLATES } from '../../constants/templates';
import { BRAND_COLORS } from '../../constants/colors';
import { TemplateCard } from '../ui/TemplateCard';
import { FileUpload } from '../ui/FileUpload';
import { ColorPicker } from '../ui/ColorPicker';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { StepCard } from '../layout/StepCard';
import type { TemplateName } from '../../types/setup';

export function Step2Branding() {
  const { branding, updateBranding, setStep, setProvisioning } = useSetupStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const handleNext = useCallback(() => {
    const result = brandingSchema.safeParse({
      template: branding.template,
      color: branding.color,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const missing: string[] = [];
      result.error.issues.forEach((e) => {
        const field = String(e.path[0]);
        fieldErrors[field] = e.message;
        missing.push(field.charAt(0).toUpperCase() + field.slice(1));
      });
      setErrors(fieldErrors);
      setToast(`Please select: ${missing.join(', ')}`);
      return;
    }
    setErrors({});
    setProvisioning(true);
    setStep(3);
  }, [branding, setStep, setProvisioning]);

  return (
    <StepCard>
      <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />

      <h2 className="text-2xl font-bold text-dark mb-1.5">Set up your brand</h2>
      <p className="text-gray text-[0.95rem] mb-5">Customize how your Agilon workspace looks and feels.</p>

      {/* Templates + Background Color — same row */}
      <div className="flex gap-6 mb-6 items-start">
        {/* Templates — 40% width */}
        <div className="w-[40%] flex-shrink-0">
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

        {/* Background Color — right side */}
        <div className="flex-1">
          <ColorPicker
            selected={branding.bgColor}
            onSelect={(bgColor) => {
              updateBranding({ bgColor });
            }}
          />
        </div>
      </div>

      {/* Brand Color + Upload Logo — same row */}
      <div className="grid grid-cols-2 gap-6">
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

        <FileUpload
          logoName={branding.logoName}
          onFileSelect={(file) => updateBranding({ logoFile: file, logoName: file.name })}
        />
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-border">
        <Button variant="secondary" onClick={() => setStep(1)}>&larr; Back</Button>
        <Button onClick={handleNext}>Continue &rarr;</Button>
      </div>
    </StepCard>
  );
}
