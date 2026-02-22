import { create } from 'zustand';
import type { BusinessInfo, Branding, SkillId } from '../types/setup';

interface SetupState {
  currentStep: number;
  businessInfo: BusinessInfo;
  branding: Branding;
  skills: SkillId[];
  isProvisioning: boolean;
  isComplete: boolean;

  setStep: (step: number) => void;
  updateBusinessInfo: (data: Partial<BusinessInfo>) => void;
  updateBranding: (data: Partial<Branding>) => void;
  toggleSkill: (skill: SkillId) => void;
  setProvisioning: (v: boolean) => void;
  setComplete: (v: boolean) => void;
  reset: () => void;
}

const initialBusinessInfo: BusinessInfo = {
  name: '',
  industry: '',
  state: '',
  size: '',
  description: '',
};

const initialBranding: Branding = {
  template: '',
  logoFile: null,
  logoName: '',
  color: '',
  bgColor: '',
};

export const useSetupStore = create<SetupState>((set) => ({
  currentStep: 0,
  businessInfo: { ...initialBusinessInfo },
  branding: { ...initialBranding },
  skills: [],
  isProvisioning: false,
  isComplete: false,

  setStep: (step) => set({ currentStep: step }),

  updateBusinessInfo: (data) =>
    set((state) => ({
      businessInfo: { ...state.businessInfo, ...data },
    })),

  updateBranding: (data) =>
    set((state) => ({
      branding: { ...state.branding, ...data },
    })),

  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill],
    })),

  setProvisioning: (v) => set({ isProvisioning: v }),
  setComplete: (v) => set({ isComplete: v }),

  reset: () =>
    set({
      currentStep: 0,
      businessInfo: { ...initialBusinessInfo },
      branding: { ...initialBranding },
      skills: [],
      isProvisioning: false,
      isComplete: false,
    }),
}));
