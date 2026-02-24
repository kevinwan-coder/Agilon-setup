import { useState, useRef } from 'react';
import { useSetupStore } from '../../../store/useSetupStore';

/* ─── Types ─── */

interface SupportConfig {
  name: string;
  gender: 'female' | 'male' | '';
  voiceType: 'professional' | 'friendly' | 'casual' | '';
  phone: string;
  email: string;
  socialMedia: { platform: string; handle: string }[];
  websiteUrl: string;
  uploadedFiles: { name: string; size: string }[];
  otherNotes: string;
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
    phrase: 'Thank you for reaching Agilon support. How may I assist you today?',
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
    phrase: 'Hi there! Welcome to Agilon support. I would love to help you out today!',
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
    phrase: 'Hey! Agilon support here. What can I help you with?',
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

const SOCIAL_PLATFORMS = ['LinkedIn', 'Twitter/X', 'Facebook', 'Instagram', 'WhatsApp'];

const SIDEBAR_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'contact', label: 'Contact Info', icon: '📞' },
  { id: 'social', label: 'Social Media', icon: '🌐' },
  { id: 'training', label: 'Training Materials', icon: '📚' },
];

/* ─── Component ─── */

interface SupportSetupPageProps {
  onBack: () => void;
}

export function SupportSetupPage({ onBack }: SupportSetupPageProps) {
  const brandColor = useSetupStore((s) => s.branding.color) || '#2dca72';
  const [activeSection, setActiveSection] = useState('profile');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [config, setConfig] = useState<SupportConfig>({
    name: '',
    gender: '',
    voiceType: '',
    phone: '',
    email: '',
    socialMedia: [],
    websiteUrl: '',
    uploadedFiles: [],
    otherNotes: '',
  });

  const update = (fields: Partial<SupportConfig>) =>
    setConfig((prev) => ({ ...prev, ...fields }));

  const addSocial = (platform: string) => {
    if (!config.socialMedia.find((s) => s.platform === platform)) {
      update({ socialMedia: [...config.socialMedia, { platform, handle: '' }] });
    }
  };

  const updateSocial = (platform: string, handle: string) => {
    update({
      socialMedia: config.socialMedia.map((s) =>
        s.platform === platform ? { ...s, handle } : s
      ),
    });
  };

  const removeSocial = (platform: string) => {
    update({ socialMedia: config.socialMedia.filter((s) => s.platform !== platform) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({
      name: f.name,
      size: f.size < 1024 * 1024
        ? `${(f.size / 1024).toFixed(1)} KB`
        : `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    }));
    update({ uploadedFiles: [...config.uploadedFiles, ...newFiles] });
    e.target.value = '';
  };

  const removeFile = (name: string) => {
    update({ uploadedFiles: config.uploadedFiles.filter((f) => f.name !== name) });
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
            🎧
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark leading-tight">Support AI Agent</h1>
            <p className="text-sm text-gray">Configure your customer care assistant</p>
          </div>
        </div>

        {/* Section Tabs */}
        <nav className="flex gap-1 border-b border-border pb-0">
          {SIDEBAR_SECTIONS.map((section) => (
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
                placeholder="e.g. Maya, Jordan"
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
                      onClick={() => update({ voiceType: v.value as SupportConfig['voiceType'] })}
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

        {/* ═══ Contact Info Section ═══ */}
        {activeSection === 'contact' && (
          <div className="space-y-5 max-w-[600px]">
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">Phone Number</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="e.g. +1 (555) 123-4567"
                value={config.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
              <p className="text-xs text-gray mt-1">The phone number for customer support calls</p>
            </div>

            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">Email Address</label>
              <input
                type="email"
                className={inputClass}
                placeholder="e.g. support@yourcompany.com"
                value={config.email}
                onChange={(e) => update({ email: e.target.value })}
              />
              <p className="text-xs text-gray mt-1">Email address for customer support inquiries</p>
            </div>
          </div>
        )}

        {/* ═══ Social Media Section ═══ */}
        {activeSection === 'social' && (
          <div className="space-y-5 max-w-[600px]">
            <div>
              <label className="block font-semibold text-sm text-dark mb-2">Connected Platforms</label>
              <p className="text-xs text-gray mb-3">Add social media accounts the agent can reference or manage</p>

              {config.socialMedia.length > 0 && (
                <div className="space-y-2 mb-4">
                  {config.socialMedia.map((s) => (
                    <div key={s.platform} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-border">
                      <span className="text-sm font-medium text-dark w-[100px]">{s.platform}</span>
                      <input
                        type="text"
                        className="flex-1 px-3 py-1.5 border border-border rounded-lg text-sm text-dark bg-[#252525] placeholder:text-gray-light focus:outline-none focus:border-[#7ee8a8]"
                        placeholder="@yourhandle"
                        value={s.handle}
                        onChange={(e) => updateSocial(s.platform, e.target.value)}
                      />
                      <button
                        onClick={() => removeSocial(s.platform)}
                        className="text-gray hover:text-[#ef4444] bg-transparent border-none cursor-pointer text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {SOCIAL_PLATFORMS.filter(
                  (p) => !config.socialMedia.find((s) => s.platform === p)
                ).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => addSocial(platform)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-[#252525] text-sm text-gray hover:text-dark hover:border-[#7ee8a8] cursor-pointer transition-colors"
                  >
                    + {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ Training Materials Section ═══ */}
        {activeSection === 'training' && (
          <div className="space-y-6 max-w-[600px]">
            {/* Website URL */}
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">
                Website URL
              </label>
              <p className="text-xs text-gray mb-2">The agent will crawl and learn from your website content</p>
              <input
                type="url"
                className={inputClass}
                placeholder="e.g. https://www.yourcompany.com"
                value={config.websiteUrl}
                onChange={(e) => update({ websiteUrl: e.target.value })}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">
                Upload Files
              </label>
              <p className="text-xs text-gray mb-2">Upload FAQs, product manuals, knowledge base docs, or any training materials</p>

              {/* Uploaded files list */}
              {config.uploadedFiles.length > 0 && (
                <div className="space-y-2 mb-3">
                  {config.uploadedFiles.map((file) => (
                    <div key={file.name} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📄</span>
                        <span className="text-sm text-dark">{file.name}</span>
                        <span className="text-xs text-gray">({file.size})</span>
                      </div>
                      <button
                        onClick={() => removeFile(file.name)}
                        className="text-gray hover:text-[#ef4444] bg-transparent border-none cursor-pointer text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload area */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.md"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer transition-all bg-transparent hover:border-[#7ee8a8] hover:bg-[#1a2e22]"
              >
                <div className="text-2xl mb-1">📁</div>
                <div className="text-sm">
                  <span style={{ color: brandColor }} className="font-semibold">Click to upload</span>
                  <span className="text-gray"> or drag and drop</span>
                </div>
                <div className="text-xs text-gray mt-1">PDF, DOC, TXT, CSV, XLSX (max 10MB each)</div>
              </button>
            </div>

            {/* Others */}
            <div>
              <label className="block font-semibold text-sm text-dark mb-1.5">
                Others
              </label>
              <p className="text-xs text-gray mb-2">Any additional training instructions or notes for the agent</p>
              <textarea
                className={textareaClass}
                placeholder="e.g. Always greet customers by name when possible. Escalate billing issues to the finance team. Use a friendly tone..."
                value={config.otherNotes}
                onChange={(e) => update({ otherNotes: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 max-w-[600px]">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none transition-colors"
            style={{ backgroundColor: brandColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
