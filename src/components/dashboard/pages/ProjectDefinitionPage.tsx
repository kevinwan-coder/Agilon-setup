import { useState, useRef } from 'react';
import { useSetupStore } from '../../../store/useSetupStore';

/* ─── Types ─── */

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface AssignedAgent {
  id: string;
  icon: string;
  label: string;
  role: string;
}

interface Milestone {
  id: string;
  title: string;
  date: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface PhaseConfig {
  // Phase 1: Strategic Initiation
  campaignName: string;
  smartGoals: string;
  stakeholders: string;
  dataAudit: string;
  // Phase 2: Design & Resource Planning
  taskDecomposition: string;
  resourceAllocation: string;
  riskGuardrails: string;
  // Phase 3: Execution & Agentic Deployment
  environmentSetup: string;
  sprintExecution: string;
  feedbackLoops: string;
  // Phase 4: Monitoring & Governance
  healthScoring: string;
  automatedReporting: string;
  changeManagement: string;
  // Phase 5: Closure & Optimization
  knowledgeCapture: string;
  roiVerification: string;
  templateHardening: string;
  // Checklist
  governance: boolean;
  connectivity: boolean;
  observability: boolean;
  scalability: boolean;
}

/* ─── Icons ─── */

const MicInputIcon = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#7ee8a8' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─── Available AI Agents (matching AIAgentsPage) ─── */

const AVAILABLE_AGENTS = [
  { id: 'process-automation', icon: '🔄', label: 'Process Automation' },
  { id: 'support', icon: '🎧', label: 'Support' },
  { id: 'front-desk', icon: '🏢', label: 'Front Desk' },
  { id: 'legal', icon: '⚖️', label: 'Legal' },
  { id: 'it', icon: '🖥️', label: 'IT' },
  { id: 'hr', icon: '🤝', label: 'HR' },
  { id: 'executive-assistant', icon: '👔', label: 'Executive Assistant' },
  { id: 'accounting', icon: '🧾', label: 'Accounting' },
  { id: 'finance', icon: '💵', label: 'Finance' },
  { id: 'sales', icon: '💰', label: 'Sales' },
  { id: 'lead-gen', icon: '🎯', label: 'Lead Generation' },
  { id: 'marketing', icon: '📣', label: 'Marketing' },
  { id: 'social-media', icon: '📱', label: 'Social Media' },
  { id: 'content', icon: '✍️', label: 'Content' },
  { id: 'seo', icon: '🔍', label: 'SEO' },
  { id: 'vibe-coding', icon: '🧑‍💻', label: 'Vibe Coding' },
  { id: 'qa', icon: '🧪', label: 'QA' },
  { id: 'design', icon: '🎨', label: 'Design' },
  { id: 'security', icon: '🛡️', label: 'Security' },
];

/* ─── Milestone status colors ─── */

const MILESTONE_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  'pending': { label: 'Pending', color: '#9ca3af', bg: '#252525' },
  'in-progress': { label: 'In Progress', color: '#3b82f6', bg: '#0f1a2e' },
  'completed': { label: 'Done', color: '#22c55e', bg: '#0f2a1a' },
};

/* ─── Phase Tabs ─── */

const PHASE_TABS = [
  { id: 'initiation', label: 'Initiation', icon: '🎯', num: '1' },
  { id: 'design', label: 'Design', icon: '📐', num: '2' },
  { id: 'execution', label: 'Execution', icon: '🚀', num: '3' },
  { id: 'monitoring', label: 'Monitoring', icon: '📊', num: '4' },
  { id: 'closure', label: 'Created', icon: '✅', num: '5' },
];

/* ─── Phase field definitions ─── */

interface FieldDef {
  key: keyof PhaseConfig;
  step: string;
  label: string;
  hint: string;
  placeholder: string;
}

const PHASE_FIELDS: Record<string, FieldDef[]> = {
  initiation: [
    { key: 'smartGoals', step: 'Step 1', label: 'Outcome & SMART Goal Definition', hint: 'Define success through "North Star" metrics', placeholder: 'e.g. Reduce cycle time by 40%, Increase customer satisfaction to 95%...' },
    { key: 'stakeholders', step: 'Step 2', label: 'Stakeholder Alignment', hint: 'Identify Human-in-the-Loop (HITL) owners who will oversee automated decisions', placeholder: 'e.g. Project Sponsor: VP of Ops\nHITL Owner: Sarah (Operations)\nDecision Approver: CFO for budget > $10K' },
    { key: 'dataAudit', step: 'Step 3', label: 'Feasibility & Data Audit', hint: 'Verify if data is clean, accessible via MCP, and safe for AI processing', placeholder: 'e.g. Data sources: CRM (Salesforce), ERP (SAP)\nMCP connectivity: Verified\nData quality score: 92%\nPII handling: Compliant' },
  ],
  design: [
    { key: 'taskDecomposition', step: 'Step 4', label: 'Task Decomposition', hint: 'Break project into Reflexive (automated) vs. Reasoning (human-led) tasks', placeholder: 'e.g. Reflexive: Data entry, report generation, email triage\nReasoning: Strategy decisions, client negotiations, creative review' },
    { key: 'resourceAllocation', step: 'Step 5', label: 'Resource Allocation (Blended Teams)', hint: 'Assign tasks to team members and AI Agents with IDs and permissions', placeholder: 'e.g. Agent-001 (Data Analyst): Automated reporting\nAgent-002 (Support): Ticket triage\nHuman: Sarah (PM), Alex (Design), Mike (Dev)' },
    { key: 'riskGuardrails', step: 'Step 6', label: 'Risk & Guardrail Setup', hint: 'Establish "No-Go" zones that agents cannot override', placeholder: 'e.g. Budget limit: Agents cannot approve > $5K\nBrand voice: Must follow tone guidelines\nData: No access to employee PII\nEscalation: Auto-escalate after 2 failed attempts' },
  ],
  execution: [
    { key: 'environmentSetup', step: 'Step 7', label: 'Environment Setup', hint: 'Connect agents to tools (CRM, Slack, Databases) using MCP protocols', placeholder: 'e.g. CRM: Salesforce via MCP connector\nComms: Slack webhook integration\nDB: PostgreSQL read-only access\nStorage: S3 bucket for documents' },
    { key: 'sprintExecution', step: 'Step 8', label: 'Sprint Execution', hint: 'Use Predictive Analytics to auto-adjust timelines when bottlenecks are predicted', placeholder: 'e.g. Sprint 1 (Week 1-2): Setup & data pipeline\nSprint 2 (Week 3-4): Agent training & testing\nPredictive alerts: Enabled for resource conflicts' },
    { key: 'feedbackLoops', step: 'Step 9', label: 'Feedback Loops & Drift Tests', hint: 'Human reviewers weekly check 5% of automated outputs for quality', placeholder: 'e.g. Weekly review: 5% sample of agent outputs\nReviewer: Sarah (PM)\nDrift threshold: Alert if accuracy drops below 90%\nCadence: Every Friday 2 PM' },
  ],
  monitoring: [
    { key: 'healthScoring', step: 'Step 10', label: 'Real-time Health Scoring', hint: 'Track Agent Reliability, Error Reduction Rates, and project health', placeholder: 'e.g. Dashboard: Agent reliability score, error rates\nKPIs: Task completion rate, avg response time\nAlert: If health score < 80%\nRefresh: Real-time streaming' },
    { key: 'automatedReporting', step: 'Step 11', label: 'Automated Reporting', hint: 'Generate weekly executive summaries and financial burn reports from live data', placeholder: 'e.g. Weekly exec summary: Auto-generated Monday 9 AM\nBurn report: Daily financial tracking\nStakeholder digest: Bi-weekly to sponsors\nFormat: PDF + Slack notification' },
    { key: 'changeManagement', step: 'Step 12', label: 'Change Management', hint: 'AI re-forecasts impact on downstream dependencies when scope shifts', placeholder: 'e.g. Scope change protocol: Auto-impact analysis\nDependency mapping: All downstream tasks re-forecast\nApproval: HITL owner must approve > 10% scope change\nNotification: All stakeholders within 1 hour' },
  ],
  closure: [
    { key: 'knowledgeCapture', step: 'Step 13', label: 'Knowledge Capture', hint: 'Index all decisions, prompts, and workflows into Internal RAG / Vector Database', placeholder: 'e.g. All agent prompts indexed to vector DB\nDecision logs captured with reasoning\nWorkflow templates saved to knowledge base\nLessons learned documented' },
    { key: 'roiVerification', step: 'Step 14', label: 'ROI Verification', hint: 'Compare actual benefits (time saved, cost reduced) against Phase 1 hypothesis', placeholder: 'e.g. Hypothesis: Reduce cycle time by 40%\nActual: Achieved 47% reduction\nCost savings: $125K annually\nTime saved: 320 hours/month' },
    { key: 'templateHardening', step: 'Step 15', label: 'Template Hardening', hint: 'Turn successful workflow into a repeatable "Agentic Playbook" for future use', placeholder: 'e.g. Playbook name: "Sales Pipeline Automation v1"\nReusable components: 12 agent configs, 5 workflows\nClone time target: < 1 hour for new department\nDocumentation: Complete with examples' },
  ],
};

/* ─── Checklist items ─── */

const CHECKLIST_ITEMS: { key: keyof PhaseConfig; label: string; question: string }[] = [
  { key: 'governance', label: 'Governance', question: 'Does every agent have an assigned human "Supervisor"?' },
  { key: 'connectivity', label: 'Connectivity', question: 'Are all tools connected via a standard protocol (MCP)?' },
  { key: 'observability', label: 'Observability', question: 'Is there a log for why a decision was made, not just the result?' },
  { key: 'scalability', label: 'Scalability', question: 'Can this workflow be cloned for another department in < 1 hour?' },
];

/* ─── Component ─── */

interface ProjectDefinitionPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  projectLabel: string;
  projectIcon: string;
  projectDesc: string;
}

export function ProjectDefinitionPage({ onBack, onNavigate, projectLabel, projectIcon, projectDesc }: ProjectDefinitionPageProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const addProject = useSetupStore((s) => s.addProject);
  const [activePhase, setActivePhase] = useState('initiation');
  const [systemStatus, setSystemStatus] = useState<'live' | 'activate'>('activate');
  const [projectPosition, setProjectPosition] = useState<'department' | 'projects' | null>(null);

  /* ─── Team Members ─── */
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  const addMember = () => {
    if (!newMemberName.trim()) return;
    setTeamMembers((prev) => [...prev, { id: Date.now().toString(), name: newMemberName.trim(), role: newMemberRole.trim() || 'Team Member' }]);
    setNewMemberName('');
    setNewMemberRole('');
    setShowAddMember(false);
  };
  const removeMember = (id: string) => setTeamMembers((prev) => prev.filter((m) => m.id !== id));

  /* ─── AI Agents ─── */
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [agentRole, setAgentRole] = useState('');

  const addAgent = (agent: { id: string; icon: string; label: string }) => {
    if (assignedAgents.some((a) => a.id === agent.id)) return;
    setAssignedAgents((prev) => [...prev, { ...agent, role: agentRole.trim() || agent.label }]);
    setAgentRole('');
    setShowAddAgent(false);
  };
  const removeAgent = (id: string) => setAssignedAgents((prev) => prev.filter((a) => a.id !== id));

  /* ─── Milestones ─── */
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newMilestoneDeadline, setNewMilestoneDeadline] = useState('');

  const addMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    setMilestones((prev) => [...prev, { id: Date.now().toString(), title: newMilestoneTitle.trim(), date: newMilestoneDate, deadline: newMilestoneDeadline, status: 'pending' }]);
    setNewMilestoneTitle('');
    setNewMilestoneDate('');
    setNewMilestoneDeadline('');
    setShowAddMilestone(false);
  };
  const removeMilestone = (id: string) => setMilestones((prev) => prev.filter((m) => m.id !== id));
  const cycleMilestoneStatus = (id: string) => {
    const order: Milestone['status'][] = ['pending', 'in-progress', 'completed'];
    setMilestones((prev) => prev.map((m) => m.id === id ? { ...m, status: order[(order.indexOf(m.status) + 1) % 3] } : m));
  };

  const [config, setConfig] = useState<PhaseConfig>({
    campaignName: '', smartGoals: '', stakeholders: '', dataAudit: '',
    taskDecomposition: '', resourceAllocation: '', riskGuardrails: '',
    environmentSetup: '', sprintExecution: '', feedbackLoops: '',
    healthScoring: '', automatedReporting: '', changeManagement: '',
    knowledgeCapture: '', roiVerification: '', templateHardening: '',
    governance: false, connectivity: false, observability: false, scalability: false,
  });

  const update = (fields: Partial<PhaseConfig>) =>
    setConfig((prev) => ({ ...prev, ...fields }));

  /* ─── Voice Input ─── */
  const [recordingField, setRecordingField] = useState<string | null>(null);
  const recognitionRef = useRef<unknown>(null);

  const toggleVoiceInput = (fieldKey: string) => {
    const SR = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) return;
    if (recordingField === fieldKey) {
      if (recognitionRef.current) (recognitionRef.current as { stop: () => void }).stop();
      setRecordingField(null);
      return;
    }
    const recognition = new (SR as new () => {
      continuous: boolean; interimResults: boolean; lang: string;
      onresult: (e: { results: { transcript: string }[][] }) => void;
      onend: () => void; onerror: () => void; start: () => void; stop: () => void;
    })();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const t = Array.from({ length: e.results.length }, (_, i) => e.results[i][0].transcript).join(' ');
      const cur = config[fieldKey as keyof PhaseConfig] as string;
      update({ [fieldKey]: cur ? cur + ' ' + t : t });
    };
    recognition.onend = () => setRecordingField(null);
    recognition.onerror = () => setRecordingField(null);
    recognitionRef.current = recognition;
    setRecordingField(fieldKey);
    recognition.start();
  };

  /* ─── File Drop ─── */
  const [droppedFiles, setDroppedFiles] = useState<Record<string, string[]>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileDrop = (fieldKey: string, e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setDroppedFiles((prev) => ({ ...prev, [fieldKey]: [...(prev[fieldKey] || []), ...files] }));
  };
  const handleFileSelect = (fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map((f) => f.name);
    setDroppedFiles((prev) => ({ ...prev, [fieldKey]: [...(prev[fieldKey] || []), ...files] }));
  };
  const removeFile = (fieldKey: string, fileName: string) => {
    setDroppedFiles((prev) => ({ ...prev, [fieldKey]: (prev[fieldKey] || []).filter((f) => f !== fileName) }));
  };

  const inputClass = 'w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-[0.95rem] text-dark bg-[#252525] placeholder:text-gray-light focus:outline-none focus:border-[#7ee8a8] focus:shadow-[0_0_0_3px_rgba(126,232,168,0.15)]';
  const textareaClass = `${inputClass} resize-y min-h-[100px]`;

  const currentFields = PHASE_FIELDS[activePhase] || [];

  /* Phase descriptions */
  const PHASE_DESC: Record<string, string> = {
    initiation: 'Strategic Initiation — Identify the "High-Value Interaction Gap" where human-led work is slowing down the business.',
    design: 'Design & Resource Planning — Decide which tasks belong to humans and which to digital agents.',
    execution: 'Execution & Agentic Deployment — Focus on Agentic Task Completion (ATC).',
    monitoring: 'Monitoring, Controlling & Governance — Proactive AI watching the AI.',
    closure: 'Created — Finalize the project and choose where it will be shown in your workspace.',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray hover:text-dark bg-transparent border-none cursor-pointer mb-4"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: brandColor + '20', color: brandColor }}
          >
            {projectIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark leading-tight">{projectLabel} Project</h1>
            <p className="text-sm text-gray">{projectDesc}</p>
          </div>
        </div>

        {/* Phase Tabs */}
        <nav className="flex gap-1 border-b border-border pb-0">
          {PHASE_TABS.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer border-none transition-colors rounded-t-lg ${
                activePhase === phase.id
                  ? 'bg-[#1a2e22] text-[#7ee8a8] font-semibold'
                  : 'bg-transparent text-gray hover:bg-[#1a1a1a] hover:text-dark'
              }`}
            >
              <span>{phase.icon}</span>
              <span className="whitespace-nowrap">{phase.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-10 pt-4">

        {/* Phase description */}
        <p className="text-sm text-gray mb-5 max-w-[700px]">{PHASE_DESC[activePhase]}</p>

        {/* ═══ Initiation: Campaign Name + Team Members (Including AI Agents) ═══ */}
        {activePhase === 'initiation' && (
          <div className="space-y-5 max-w-[700px] mb-6">

            {/* ── Campaign Name ── */}
            <div>
              <label className="font-semibold text-sm text-dark mb-1.5 block">{projectLabel} Name</label>
              <input
                className={inputClass}
                placeholder={`Enter ${projectLabel.toLowerCase()} name...`}
                value={config.campaignName}
                onChange={(e) => update({ campaignName: e.target.value })}
              />
            </div>

            {/* ── Team Members (Including AI Agents) ── */}
            <div>
              <label className="font-semibold text-sm text-dark mb-3 block">Team Members (Including AI Agents)</label>

              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                {/* Human members */}
                {teamMembers.map((m) => (
                  <div key={m.id} className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#252525] border border-border text-xs">
                    <div className="w-8 h-8 rounded-full bg-[#1a2e22] text-[#7ee8a8] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-dark font-medium">{m.name}</div>
                      <div className="text-gray text-[10px]">{m.role}</div>
                    </div>
                    <span className="text-[9px] text-gray bg-[#1a1a1a] px-1.5 py-0.5 rounded ml-1">Human</span>
                    <button onClick={() => removeMember(m.id)} className="opacity-0 group-hover:opacity-100 absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[8px] border-none cursor-pointer transition-opacity">✕</button>
                  </div>
                ))}

                {/* AI agents */}
                {assignedAgents.map((a) => (
                  <div key={a.id} className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0f1a2e] border border-[#3b82f640] text-xs">
                    <span className="text-xl flex-shrink-0">{a.icon}</span>
                    <div className="min-w-0">
                      <div className="text-dark font-medium">{a.label}</div>
                      <div className="text-gray text-[10px]">{a.role}</div>
                    </div>
                    <span className="text-[9px] text-[#3b82f6] bg-[#1a1a1a] px-1.5 py-0.5 rounded ml-1">AI</span>
                    <button onClick={() => removeAgent(a.id)} className="opacity-0 group-hover:opacity-100 absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[8px] border-none cursor-pointer transition-opacity">✕</button>
                  </div>
                ))}

                {teamMembers.length === 0 && assignedAgents.length === 0 && (
                  <span className="text-xs text-gray italic">No team members added yet</span>
                )}
              </div>

              {/* Add buttons row */}
              <div className="flex gap-2 relative">
                <button
                  onClick={() => { setShowAddMember(true); setShowAddAgent(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-border bg-transparent text-gray hover:border-[#7ee8a8] hover:text-[#7ee8a8] cursor-pointer transition-colors text-xs"
                >
                  <span className="text-sm">+</span> Add Person
                </button>
                <button
                  onClick={() => { setShowAddAgent(true); setShowAddMember(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-[#3b82f640] bg-transparent text-gray hover:border-[#3b82f6] hover:text-[#3b82f6] cursor-pointer transition-colors text-xs"
                >
                  <span className="text-sm">+</span> Add AI Agent
                </button>

                {/* Add Person popup */}
                {showAddMember && (
                  <div className="absolute top-full left-0 mt-2 z-20 p-3 rounded-xl bg-[#1a1a1a] border border-border shadow-lg min-w-[240px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-dark">Add Team Member</span>
                      <button onClick={() => setShowAddMember(false)} className="text-gray hover:text-dark bg-transparent border-none cursor-pointer"><CloseIcon /></button>
                    </div>
                    <input
                      className={inputClass + ' mb-2 !text-xs !py-2'}
                      placeholder="Name"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addMember()}
                      autoFocus
                    />
                    <input
                      className={inputClass + ' mb-2 !text-xs !py-2'}
                      placeholder="Role (e.g. Project Manager)"
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addMember()}
                    />
                    <button
                      onClick={addMember}
                      className="w-full py-1.5 rounded-lg text-xs font-semibold text-white border-none cursor-pointer"
                      style={{ backgroundColor: brandColor }}
                    >Add</button>
                  </div>
                )}

                {/* Add AI Agent popup */}
                {showAddAgent && (
                  <div className="absolute top-full left-0 mt-2 z-20 p-3 rounded-xl bg-[#1a1a1a] border border-border shadow-lg min-w-[280px] max-h-[320px]" style={{ left: '120px' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-dark">Assign AI Agent</span>
                      <button onClick={() => setShowAddAgent(false)} className="text-gray hover:text-dark bg-transparent border-none cursor-pointer"><CloseIcon /></button>
                    </div>
                    <input
                      className={inputClass + ' mb-2 !text-xs !py-2'}
                      placeholder="Role / Assignment (optional)"
                      value={agentRole}
                      onChange={(e) => setAgentRole(e.target.value)}
                    />
                    <div className="overflow-y-auto max-h-[200px] space-y-1">
                      {AVAILABLE_AGENTS.filter((a) => !assignedAgents.some((aa) => aa.id === a.id)).map((agent) => (
                        <button
                          key={agent.id}
                          onClick={() => addAgent(agent)}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-transparent border border-transparent hover:bg-[#252525] hover:border-border cursor-pointer transition-all text-left"
                        >
                          <span className="text-base">{agent.icon}</span>
                          <span className="text-xs text-dark font-medium">{agent.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Milestones ── */}
            <div className="relative">
              <label className="font-semibold text-sm text-dark mb-3 block">Milestones</label>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                {milestones.map((m) => {
                  const st = MILESTONE_STATUS[m.status];
                  return (
                    <div key={m.id} className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs" style={{ backgroundColor: st.bg, borderColor: st.color + '40' }}>
                      <button onClick={() => cycleMilestoneStatus(m.id)} className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] bg-transparent cursor-pointer flex-shrink-0 transition-colors" style={{ borderColor: st.color, color: st.color }}>
                        {m.status === 'completed' ? '✓' : m.status === 'in-progress' ? '▶' : '○'}
                      </button>
                      <div className="min-w-0">
                        <div className="text-dark font-medium">{m.title}</div>
                        {m.date && <div className="text-[10px]" style={{ color: st.color }}>Start: {m.date}</div>}
                        {m.deadline && <div className="text-[10px] text-[#f59e0b]">Deadline: {m.deadline}</div>}
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ color: st.color, backgroundColor: '#1a1a1a' }}>{st.label}</span>
                      <button onClick={() => removeMilestone(m.id)} className="opacity-0 group-hover:opacity-100 absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[8px] border-none cursor-pointer transition-opacity">✕</button>
                    </div>
                  );
                })}
                {milestones.length === 0 && (
                  <span className="text-xs text-gray italic">No milestones added yet</span>
                )}
              </div>
              <button
                onClick={() => setShowAddMilestone(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-border bg-transparent text-gray hover:border-[#7ee8a8] hover:text-[#7ee8a8] cursor-pointer transition-colors text-xs"
              >
                <span className="text-sm">+</span> Add Milestone
              </button>

              {/* Add Milestone popup */}
              {showAddMilestone && (
                <div className="absolute bottom-full left-0 mb-2 z-20 p-3 rounded-xl bg-[#1a1a1a] border border-border shadow-lg min-w-[240px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-dark">Add Milestone</span>
                    <button onClick={() => setShowAddMilestone(false)} className="text-gray hover:text-dark bg-transparent border-none cursor-pointer"><CloseIcon /></button>
                  </div>
                  <input
                    className={inputClass + ' mb-2 !text-xs !py-2'}
                    placeholder="Milestone title"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                    autoFocus
                  />
                  <label className="block text-[10px] text-gray mb-1">Start Date</label>
                  <input
                    type="date"
                    className={inputClass + ' mb-2 !text-xs !py-2'}
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                  />
                  <label className="block text-[10px] text-[#f59e0b] mb-1">Deadline (must finish by)</label>
                  <input
                    type="date"
                    className={inputClass + ' mb-2 !text-xs !py-2'}
                    value={newMilestoneDeadline}
                    onChange={(e) => setNewMilestoneDeadline(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                  />
                  <p className="text-[10px] text-gray mb-2 italic">Job needs to be finished at the timeline</p>
                  <button
                    onClick={addMilestone}
                    className="w-full py-1.5 rounded-lg text-xs font-semibold text-white border-none cursor-pointer"
                    style={{ backgroundColor: brandColor }}
                  >Add</button>
                </div>
              )}
            </div>

            <div className="border-b border-border" />
          </div>
        )}

        {/* Phase fields */}
        <div className="space-y-5 max-w-[700px]">
          {currentFields.map((field) => (
            <div key={field.key}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#7ee8a8] bg-[#1a2e22] px-2 py-0.5 rounded">{field.step}</span>
                <label className="font-semibold text-sm text-dark">{field.label}</label>
              </div>
              <p className="text-xs text-gray mb-2">{field.hint}</p>

              {/* Textarea + Mic */}
              <div className="flex gap-2 items-start">
                <textarea
                  className={textareaClass}
                  placeholder={field.placeholder}
                  value={config[field.key] as string}
                  onChange={(e) => update({ [field.key]: e.target.value })}
                />
                <button
                  onClick={() => toggleVoiceInput(field.key)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-3 rounded-lg cursor-pointer border-2 transition-all ${
                    recordingField === field.key
                      ? 'border-[#7ee8a8] bg-[#1a2e22] text-[#7ee8a8]'
                      : 'border-border bg-[#1a1a1a] text-gray hover:border-[#7ee8a8] hover:text-[#7ee8a8]'
                  }`}
                  title={recordingField === field.key ? 'Stop recording' : 'Voice input'}
                >
                  <MicInputIcon active={recordingField === field.key} />
                  <span className="text-[10px] leading-tight whitespace-nowrap">
                    {recordingField === field.key ? 'Stop' : 'Input'}
                  </span>
                  <span className="text-[10px] leading-tight whitespace-nowrap">
                    {recordingField === field.key ? '' : 'by voice'}
                  </span>
                </button>
              </div>

              {/* File drop zone */}
              <div
                className="mt-2 border-2 border-dashed border-border rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:border-[#7ee8a8] transition-colors bg-[#1a1a1a]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleFileDrop(field.key, e)}
                onClick={() => fileInputRefs.current[field.key]?.click()}
              >
                <UploadIcon />
                <span className="text-xs text-gray">Drop files here or click to browse</span>
                <input
                  ref={(el) => { fileInputRefs.current[field.key] = el; }}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(field.key, e)}
                />
              </div>

              {/* Dropped file list */}
              {(droppedFiles[field.key] || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {droppedFiles[field.key].map((file) => (
                    <span key={file} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#252525] border border-border text-xs text-dark">
                      📎 {file}
                      <button onClick={() => removeFile(field.key, file)} className="text-gray hover:text-[#ef4444] bg-transparent border-none cursor-pointer text-xs">✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Show Project Under — shown on Created phase */}
          {activePhase === 'closure' && (
            <div className="pt-4 border-t border-border">
              <label className="block font-semibold text-sm text-dark mb-2">Show Project Under</label>
              <p className="text-xs text-gray mb-3">Choose where this project will appear in your workspace</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setProjectPosition('department')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all text-left ${
                    projectPosition === 'department'
                      ? 'border-[#7ee8a8] bg-[#1a2e22]'
                      : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    projectPosition === 'department' ? 'bg-[#7ee8a820]' : 'bg-[#252525]'
                  }`}>🏢</div>
                  <div>
                    <div className={`text-sm font-semibold ${projectPosition === 'department' ? 'text-[#7ee8a8]' : 'text-dark'}`}>Department</div>
                    <div className="text-[11px] text-gray mt-0.5">Show under a specific department</div>
                  </div>
                  {projectPosition === 'department' && <span className="ml-auto text-[#7ee8a8]">✓</span>}
                </button>

                <button
                  onClick={() => setProjectPosition('projects')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all text-left ${
                    projectPosition === 'projects'
                      ? 'border-[#7ee8a8] bg-[#1a2e22]'
                      : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    projectPosition === 'projects' ? 'bg-[#7ee8a820]' : 'bg-[#252525]'
                  }`}>📁</div>
                  <div>
                    <div className={`text-sm font-semibold ${projectPosition === 'projects' ? 'text-[#7ee8a8]' : 'text-dark'}`}>Projects</div>
                    <div className="text-[11px] text-gray mt-0.5">Show under the Projects section</div>
                  </div>
                  {projectPosition === 'projects' && <span className="ml-auto text-[#7ee8a8]">✓</span>}
                </button>
              </div>
            </div>
          )}

          {/* Checklist — shown on Created phase */}
          {activePhase === 'closure' && (
            <div className="pt-4 border-t border-border">
              <label className="block font-semibold text-sm text-dark mb-3">2026 Workflow Checklist</label>
              <div className="space-y-2">
                {CHECKLIST_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => update({ [item.key]: !config[item.key] })}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition-all text-left ${
                      config[item.key]
                        ? 'border-[#7ee8a8] bg-[#1a2e22]'
                        : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                    }`}
                  >
                    <span className={`text-sm ${config[item.key] ? 'text-[#7ee8a8]' : 'text-gray'}`}>
                      {config[item.key] ? '✓' : '○'}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-dark">{item.label}: </span>
                      <span className="text-sm text-gray">{item.question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activate / Live — shown on Closure phase */}
          {activePhase === 'closure' && (
            <div className="pt-4 border-t border-border">
              <label className="block font-semibold text-sm text-dark mb-3">Project Status</label>
              <div className="flex gap-4">
                <button
                  onClick={() => { if (systemStatus !== 'live') setSystemStatus('live'); }}
                  className={`flex-1 flex items-center gap-4 p-5 rounded-xl cursor-pointer border-2 transition-all ${
                    systemStatus !== 'live'
                      ? 'border-[#3b82f6] bg-[#0f1a2e]'
                      : 'border-border bg-[#1a1a1a] opacity-50 cursor-default'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    systemStatus !== 'live' ? 'bg-[#3b82f620]' : 'bg-[#252525]'
                  }`}>⚡</div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${systemStatus !== 'live' ? 'text-[#3b82f6]' : 'text-gray'}`}>Activate</div>
                    <div className="text-xs text-gray mt-0.5">{systemStatus !== 'live' ? 'Push to deploy this project' : 'Project is already live'}</div>
                  </div>
                </button>

                <div className={`flex-1 flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                  systemStatus === 'live'
                    ? 'border-[#22c55e] bg-[#0f2a1a]'
                    : 'border-border bg-[#1a1a1a] opacity-50'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    systemStatus === 'live' ? 'bg-[#22c55e20]' : 'bg-[#252525]'
                  }`}>🟢</div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${systemStatus === 'live' ? 'text-[#22c55e]' : 'text-gray'}`}>Live</div>
                    <div className="text-xs text-gray mt-0.5">{systemStatus === 'live' ? 'Project is active & running' : 'Not yet activated'}</div>
                  </div>
                  {systemStatus === 'live' && <span className="ml-auto text-[#22c55e] text-xl">✓</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save & Continue */}
        <div className="mt-8 max-w-[700px]">
          <button
            onClick={() => {
              const tabIds = PHASE_TABS.map((t) => t.id);
              const idx = tabIds.indexOf(activePhase);
              if (idx < tabIds.length - 1) {
                setActivePhase(tabIds[idx + 1]);
              } else {
                // Save project to store
                addProject({
                  id: Date.now().toString(),
                  name: config.campaignName || projectLabel,
                  icon: projectIcon,
                  label: projectLabel,
                  desc: projectDesc,
                  position: projectPosition || 'projects',
                  status: systemStatus,
                  createdAt: new Date().toISOString(),
                });
                // Navigate to home so user can see the created project
                if (onNavigate) {
                  onNavigate('home');
                } else {
                  onBack();
                }
              }
            }}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none transition-colors"
            style={{ backgroundColor: brandColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {activePhase === PHASE_TABS[PHASE_TABS.length - 1].id ? 'Save & Finish' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
