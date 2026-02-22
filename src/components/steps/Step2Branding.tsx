import { useCallback, useState } from 'react';
import { useSetupStore } from '../../store/useSetupStore';
import { brandingSchema } from '../../schemas/branding';
import { TEMPLATES } from '../../constants/templates';
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

      <div className="mb-4">
        <label className="block font-semibold text-sm text-dark mb-1.5">
          Choose a Template <span className="text-red">*</span>
        </label>
        <div className={`rounded-lg ${errors.template ? 'border-2 border-red p-0.5' : ''}`}>
          <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-2 gap-6">
        <ColorPicker
          selected={branding.color}
          onSelect={(color) => {
            updateBranding({ color });
            if (errors.color) setErrors((p) => ({ ...p, color: '' }));
          }}
          error={errors.color}
        />

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
