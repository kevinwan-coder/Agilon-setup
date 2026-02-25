export type CompanySize = 'starting' | 'just-me' | '2-10' | '11-50' | '50-plus';

export type TemplateName = 'classic' | 'modern';

export type SkillId = 'accounting' | 'hr' | 'tax' | 'scheduling' | 'vdr' | 'it' | 'legal';

export interface BusinessInfo {
  name: string;
  industry: string;
  state: string;
  size: CompanySize | '';
  description: string;
}

export interface Branding {
  template: TemplateName | '';
  logoFile: File | null;
  logoName: string;
  color: string;
  bgColor: string;
}

export interface SetupData {
  businessInfo: BusinessInfo;
  branding: Branding;
}

export interface CreatedProject {
  id: string;
  name: string;
  icon: string;
  label: string;
  desc: string;
  position: 'department' | 'projects';
  status: 'live' | 'activate';
  createdAt: string;
}

export type ProvisioningStep = 'bot' | 'storage' | 'branding' | 'finalizing' | 'complete';

export interface ProvisioningStatus {
  step: ProvisioningStep;
  progress: number;
  error?: string;
}
