import { useState, useRef } from 'react';
import { useSetupStore } from '../../../store/useSetupStore';

/* ─── Types ─── */

interface AgentDefinitionConfig {
  // Profile
  name: string;
  gender: 'female' | 'male' | '';
  voiceType: 'professional' | 'friendly' | 'casual' | '';
  // Features
  features: string[];
  customFeature: string;
  // Duty
  primaryDuty: string;
  responsibilities: string;
  schedule: string;
  escalation: string;
  // Training
  knowledgeBase: string;
  guidelines: string;
  examples: string;
  restrictions: string;
}

/* ─── Constants ─── */

const GENDERS = [
  { value: 'female', label: 'Female', icon: '👩' },
  { value: 'male', label: 'Male', icon: '👨' },
];

const VOICE_TYPES = [
  {
    value: 'professional',
    label: 'Professional',
    desc: 'Formal and business-like',
    phrase: 'Thank you for reaching out. I am your Agilon agent, ready to assist you.',
    pitch: 0.9,
    rate: 0.95,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="8" y1="21" x2="16" y2="21" />
      </svg>
    ),
  },
  {
    value: 'friendly',
    label: 'Friendly',
    desc: 'Warm and welcoming',
    phrase: 'Hi there! I am your Agilon agent. I am excited to help you today!',
    pitch: 1.15,
    rate: 1.0,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <path d="M8 23h8" />
        <path d="M3 10h1" /><path d="M20 10h1" />
        <path d="M5 6l1 .5" /><path d="M18 6l1 .5" />
      </svg>
    ),
  },
  {
    value: 'casual',
    label: 'Casual',
    desc: 'Relaxed and conversational',
    phrase: 'Hey! This is your Agilon agent. What can I do for you?',
    pitch: 1.0,
    rate: 1.1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <path d="M8 23h8" />
      </svg>
    ),
  },
];

/* Play / Stop SVG icons */
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const StopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

/* Microphone input icon */
const MicInputIcon = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#7ee8a8' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);

/* Upload / drop file icon */
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SECTION_TABS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'features', label: 'Features', icon: '⚡' },
  { id: 'tasks', label: 'Tasks', icon: '📋' },
  { id: 'training', label: 'Training', icon: '📚' },
];

const DEFAULT_FEATURES = [
  'Natural Language Understanding',
  'Task Automation',
  'Data Analysis',
  'Report Generation',
  'Email Communication',
  'Calendar Management',
  'Document Processing',
  'Workflow Integration',
];

/* ─── Component ─── */

interface AgentDefinitionPageProps {
  onBack: () => void;
  agentLabel: string;
  agentIcon: string;
  agentDesc: string;
}

export function AgentDefinitionPage({ onBack, agentLabel, agentIcon, agentDesc }: AgentDefinitionPageProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const [activeSection, setActiveSection] = useState('profile');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<'live' | 'activate'>('activate');

  const handlePlayVoice = (voiceValue: string) => {
    if (playingVoice === voiceValue) {
      window.speechSynthesis.cancel();
      setPlayingVoice(null);
      return;
    }

    window.speechSynthesis.cancel();
    const voiceConfig = VOICE_TYPES.find((v) => v.value === voiceValue);
    if (!voiceConfig) return;

    const utterance = new SpeechSynthesisUtterance(voiceConfig.phrase);
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en') && v.localService);
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => setPlayingVoice(null);
    utterance.onerror = () => setPlayingVoice(null);

    setPlayingVoice(voiceValue);
    window.speechSynthesis.speak(utterance);
  };

  const [config, setConfig] = useState<AgentDefinitionConfig>({
    name: '',
    gender: '',
    voiceType: '',
    features: [],
    customFeature: '',
    primaryDuty: '',
    responsibilities: '',
    schedule: '',
    escalation: '',
    knowledgeBase: '',
    guidelines: '',
    examples: '',
    restrictions: '',
  });

  const update = (fields: Partial<AgentDefinitionConfig>) =>
    setConfig((prev) => ({ ...prev, ...fields }));

  const toggleFeature = (feature: string) => {
    if (config.features.includes(feature)) {
      update({ features: config.features.filter((f) => f !== feature) });
    } else {
      update({ features: [...config.features, feature] });
    }
  };

  const addCustomFeature = () => {
    if (config.customFeature.trim() && !config.features.includes(config.customFeature.trim())) {
      update({
        features: [...config.features, config.customFeature.trim()],
        customFeature: '',
      });
    }
  };

  /* ─── Voice Input (Speech-to-Text) ─── */
  const [recordingField, setRecordingField] = useState<string | null>(null);
  const recognitionRef = useRef<unknown>(null);

  const toggleVoiceInput = (fieldKey: keyof AgentDefinitionConfig) => {
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recordingField === fieldKey) {
      // Stop recording
      if (recognitionRef.current) {
        (recognitionRef.current as { stop: () => void }).stop();
      }
      setRecordingField(null);
      return;
    }

    const recognition = new (SpeechRecognition as new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (e: { results: { transcript: string }[][] }) => void;
      onend: () => void;
      onerror: () => void;
      start: () => void;
      stop: () => void;
    })();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (e) => {
      const transcript = Array.from({ length: e.results.length }, (_, i) => e.results[i][0].transcript).join(' ');
      const currentVal = config[fieldKey] as string;
      update({ [fieldKey]: currentVal ? currentVal + ' ' + transcript : transcript });
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

  const inputClass =
    'w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-[0.95rem] text-dark bg-[#252525] placeholder:text-gray-light focus:outline-none focus:border-[#7ee8a8] focus:shadow-[0_0_0_3px_rgba(126,232,168,0.15)]';

  const textareaClass = `${inputClass} resize-y min-h-[100px]`;

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
            {agentIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark leading-tight">{agentLabel} AI Agent</h1>
            <p className="text-sm text-gray">{agentDesc}</p>
          </div>
        </div>

        {/* Section Tabs */}
        <nav className="flex gap-1 border-b border-border pb-0">
          {SECTION_TABS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer border-none transition-colors rounded-t-lg ${
                activeSection === section.id
                  ? 'bg-[#1a2e22] text-[#7ee8a8] font-semibold'
                  : 'bg-transparent text-gray hover:bg-[#1a1a1a] hover:text-dark'
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-10 pt-4">

        {/* ═══ Profile Section ═══ */}
        {activeSection === 'profile' && (
          <div className="space-y-5 max-w-[600px]">
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">Agent Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Sarah, Alex"
                value={config.name}
                onChange={(e) => update({ name: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-dark mb-2">Gender</label>
              <div className="flex gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => update({ gender: g.value as 'female' | 'male' })}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer border-2 transition-all ${
                      config.gender === g.value
                        ? 'border-[#7ee8a8] bg-[#1a2e22]'
                        : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                    }`}
                  >
                    <span className="text-xl">{g.icon}</span>
                    <span className="text-sm text-dark font-medium">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-sm text-dark mb-2">Voice Type</label>
              <div className="space-y-2">
                {VOICE_TYPES.map((v) => (
                  <div key={v.value} className="flex items-center gap-2">
                    <button
                      onClick={() => update({ voiceType: v.value as AgentDefinitionConfig['voiceType'] })}
                      className={`flex-1 flex items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all text-left ${
                        config.voiceType === v.value
                          ? 'border-[#7ee8a8] bg-[#1a2e22]'
                          : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                      }`}
                    >
                      <span className={`flex-shrink-0 ${
                        config.voiceType === v.value ? 'text-[#7ee8a8]' : 'text-gray'
                      }`}>
                        {v.icon}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-dark">{v.label}</div>
                        <div className="text-xs text-gray mt-0.5">{v.desc}</div>
                      </div>
                      {config.voiceType === v.value && (
                        <span className="text-[#7ee8a8]">✓</span>
                      )}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePlayVoice(v.value); }}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 transition-all ${
                        playingVoice === v.value
                          ? 'border-[#7ee8a8] bg-[#1a2e22] text-[#7ee8a8]'
                          : 'border-border bg-[#1a1a1a] text-gray hover:border-[#7ee8a8] hover:text-[#7ee8a8]'
                      }`}
                      title={playingVoice === v.value ? 'Stop preview' : 'Play voice preview'}
                    >
                      {playingVoice === v.value ? <StopIcon /> : <PlayIcon />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ Features Section ═══ */}
        {activeSection === 'features' && (
          <div className="space-y-5 max-w-[600px]">
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">Agent Capabilities</label>
              <p className="text-xs text-gray mb-3">Select the features this agent should have</p>

              <div className="grid grid-cols-2 gap-2">
                {DEFAULT_FEATURES.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border-2 transition-all text-left ${
                      config.features.includes(feature)
                        ? 'border-[#7ee8a8] bg-[#1a2e22]'
                        : 'border-border bg-[#1a1a1a] hover:border-[#7ee8a8]'
                    }`}
                  >
                    <span className={`text-sm ${config.features.includes(feature) ? 'text-[#7ee8a8]' : 'text-gray'}`}>
                      {config.features.includes(feature) ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-dark">{feature}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom features added */}
            {config.features.filter((f) => !DEFAULT_FEATURES.includes(f)).length > 0 && (
              <div>
                <label className="block font-semibold text-sm text-dark mb-2">Custom Features</label>
                <div className="flex flex-wrap gap-2">
                  {config.features
                    .filter((f) => !DEFAULT_FEATURES.includes(f))
                    .map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a2e22] text-[#7ee8a8] text-sm border border-[#7ee8a8]"
                      >
                        {feature}
                        <button
                          onClick={() => toggleFeature(feature)}
                          className="text-[#7ee8a8] hover:text-white bg-transparent border-none cursor-pointer text-xs ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Add custom feature */}
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">Add Custom Feature</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Invoice Processing, Sentiment Analysis..."
                  value={config.customFeature}
                  onChange={(e) => update({ customFeature: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomFeature()}
                />
                <button
                  onClick={addCustomFeature}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none transition-colors flex-shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ Tasks Section ═══ */}
        {activeSection === 'tasks' && (
          <div className="space-y-5 max-w-[700px]">
            {([
              { key: 'primaryDuty' as const, label: 'Primary Duty', hint: 'What is the main purpose of this agent?', placeholder: `e.g. The ${agentLabel} agent is responsible for...` },
              { key: 'responsibilities' as const, label: 'Responsibilities', hint: 'List the specific tasks and responsibilities', placeholder: 'e.g. - Monitor incoming requests\n- Process and categorize data\n- Generate weekly reports' },
              { key: 'schedule' as const, label: 'Schedule & Availability', hint: 'When should this agent be active?', placeholder: 'e.g. 24/7 monitoring, business hours only (9 AM - 5 PM EST)' },
              { key: 'escalation' as const, label: 'Escalation Rules', hint: 'When should the agent escalate to a human?', placeholder: 'e.g. Escalate when confidence is below 80%, or when issues remain unresolved' },
            ]).map((field) => (
              <div key={field.key}>
                <label className="block font-semibold text-sm text-dark mb-1.5">{field.label}</label>
                <p className="text-xs text-gray mb-2">{field.hint}</p>

                {/* Textarea + Mic button row */}
                <div className="flex gap-2 items-start">
                  <textarea
                    className={textareaClass}
                    placeholder={field.placeholder}
                    value={config[field.key]}
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
          </div>
        )}

        {/* ═══ Training Section ═══ */}
        {activeSection === 'training' && (
          <div className="space-y-5 max-w-[700px]">
            {([
              { key: 'knowledgeBase' as const, label: 'Knowledge Base', hint: 'What information should this agent have access to?', placeholder: 'e.g. Company handbook, product catalog, pricing sheets, internal wiki, SOPs...' },
              { key: 'guidelines' as const, label: 'Guidelines & Tone', hint: 'How should the agent communicate and behave?', placeholder: 'e.g. Always maintain a professional tone. Use the customer\'s first name...' },
              { key: 'examples' as const, label: 'Example Interactions', hint: 'Provide sample conversations or scenarios for the agent to learn from', placeholder: 'e.g. Q: What are your business hours?\nA: Monday through Friday, 9 AM to 5 PM EST...' },
              { key: 'restrictions' as const, label: 'Restrictions', hint: 'What should the agent never do?', placeholder: 'e.g. Never share internal pricing formulas. Do not disclose employee personal information...' },
            ]).map((field) => (
              <div key={field.key}>
                <label className="block font-semibold text-sm text-dark mb-1.5">{field.label}</label>
                <p className="text-xs text-gray mb-2">{field.hint}</p>

                {/* Textarea + Mic button row */}
                <div className="flex gap-2 items-start">
                  <textarea
                    className={textareaClass}
                    placeholder={field.placeholder}
                    value={config[field.key]}
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

            {/* Activate / Live cards */}
            <div className="pt-4 border-t border-border">
              <label className="block font-semibold text-sm text-dark mb-3">Agent Status</label>
              <div className="flex gap-4">
                {/* Activate card — clicking it makes the agent go Live */}
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
                  }`}>
                    ⚡
                  </div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${systemStatus !== 'live' ? 'text-[#3b82f6]' : 'text-gray'}`}>Activate</div>
                    <div className="text-xs text-gray mt-0.5">{systemStatus !== 'live' ? 'Push to make this agent live' : 'Agent is already live'}</div>
                  </div>
                </button>

                {/* Live indicator */}
                <div
                  className={`flex-1 flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                    systemStatus === 'live'
                      ? 'border-[#22c55e] bg-[#0f2a1a]'
                      : 'border-border bg-[#1a1a1a] opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    systemStatus === 'live' ? 'bg-[#22c55e20]' : 'bg-[#252525]'
                  }`}>
                    🟢
                  </div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${systemStatus === 'live' ? 'text-[#22c55e]' : 'text-gray'}`}>Live</div>
                    <div className="text-xs text-gray mt-0.5">{systemStatus === 'live' ? 'Agent is active & running' : 'Not yet activated'}</div>
                  </div>
                  {systemStatus === 'live' && <span className="ml-auto text-[#22c55e] text-xl">✓</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save & Continue Button */}
        <div className="mt-8 max-w-[700px]">
          <button
            onClick={() => {
              const tabIds = SECTION_TABS.map((t) => t.id);
              const currentIndex = tabIds.indexOf(activeSection);
              if (currentIndex < tabIds.length - 1) {
                setActiveSection(tabIds[currentIndex + 1]);
              } else {
                onBack();
              }
            }}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none transition-colors"
            style={{ backgroundColor: brandColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {activeSection === SECTION_TABS[SECTION_TABS.length - 1].id ? 'Save & Finish' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
