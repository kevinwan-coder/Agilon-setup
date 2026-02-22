import type { TemplateName } from '../types/setup';

export interface TemplateConfig {
  id: TemplateName;
  name: string;
  description: string;
  layout: 'sidebar' | 'topbar';
  sidebar: string;
  topbar: string;
  accent: string;
  bg: string;
  cardBg: string;
  textLight: string;
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'classic', name: 'Side Menu', description: 'Navigation on the left sidebar', layout: 'sidebar', sidebar: '#1e3a5f', topbar: '#ffffff', accent: '#2d5a87', bg: '#f5f7fa', cardBg: '#ffffff', textLight: '#8da4bf' },
  { id: 'modern', name: 'Top Menu', description: 'Navigation on the top bar', layout: 'topbar', sidebar: '#1e293b', topbar: '#ffffff', accent: '#1a56db', bg: '#f8fafc', cardBg: '#ffffff', textLight: '#94a3b8' },
];
