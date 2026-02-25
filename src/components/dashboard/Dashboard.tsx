import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { HomePage } from './pages/HomePage';
import { SkillsPage } from './pages/SkillsPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { StoragePage } from './pages/StoragePage';
import { SettingsPage } from './pages/SettingsPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { CalendarPage } from './pages/CalendarPage';
import { FrontDeskSetupPage } from './pages/FrontDeskSetupPage';
import { SupportSetupPage } from './pages/SupportSetupPage';
import { SalesSetupPage } from './pages/SalesSetupPage';
import { AIAgentsPage } from './pages/AIAgentsPage';
import { AgentDefinitionPage } from './pages/AgentDefinitionPage';
import { ProjectTypePage } from './pages/ProjectTypePage';
import { ProjectDefinitionPage } from './pages/ProjectDefinitionPage';
import { HRPage } from './pages/HRPage';

export function Dashboard() {
  const [page, setPage] = useState('home');
  const [selectedAgent, setSelectedAgent] = useState<{ label: string; icon: string; desc: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<{ label: string; icon: string; desc: string } | null>(null);

  const renderPage = () => {
    if (page.startsWith('skill-')) {
      return <SkillDetailPage skillId={page.replace('skill-', '')} />;
    }
    switch (page) {
      case 'home': return <HomePage onNavigate={setPage} />;
      case 'skills': return <SkillsPage />;
      case 'workflows': return <WorkflowsPage />;
      case 'calendar': return <CalendarPage />;
      case 'storage': return <StoragePage />;
      case 'settings': return <SettingsPage />;
      case 'ai-agents': return <AIAgentsPage onBack={() => setPage('home')} onNavigate={setPage} onSelectAgent={setSelectedAgent} />;
      case 'front-desk-setup': return <FrontDeskSetupPage onBack={() => setPage('ai-agents')} />;
      case 'support-setup': return <SupportSetupPage onBack={() => setPage('ai-agents')} />;
      case 'sales-setup': return <SalesSetupPage onBack={() => setPage('ai-agents')} />;
      case 'agent-definition': return <AgentDefinitionPage onBack={() => setPage('ai-agents')} agentLabel={selectedAgent?.label || 'Agent'} agentIcon={selectedAgent?.icon || '🤖'} agentDesc={selectedAgent?.desc || 'Configure your AI agent'} />;
      case 'project-type': return <ProjectTypePage onBack={() => setPage('home')} onNavigate={setPage} onSelectProject={setSelectedProject} />;
      case 'project-definition': return <ProjectDefinitionPage onBack={() => setPage('project-type')} onNavigate={setPage} projectLabel={selectedProject?.label || 'Project'} projectIcon={selectedProject?.icon || '📁'} projectDesc={selectedProject?.desc || 'Configure your project'} />;
      case 'hr': return <HRPage />;
      default: return <HomePage />;
    }
  };

  return (
    <DashboardLayout activePage={page} onNavigate={setPage}>
      {renderPage()}
    </DashboardLayout>
  );
}
