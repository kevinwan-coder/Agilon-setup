interface TemplateCardProps {
  name: string;
  description: string;
  layout: 'sidebar' | 'topbar';
  sidebar: string;
  topbar: string;
  accent: string;
  bg: string;
  cardBg: string;
  textLight: string;
  selected: boolean;
  onClick: () => void;
}

export function TemplateCard({ name, description, layout, sidebar, topbar, accent, bg, cardBg, textLight, selected, onClick }: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all text-left w-full ${
        selected ? 'border-[#7ee8a8] shadow-[0_0_0_2px_rgba(126,232,168,0.2)]' : 'border-border hover:border-[#7ee8a8]'
      }`}
    >
      {/* Dashboard preview */}
      <div className="h-[101px] flex overflow-hidden" style={{ backgroundColor: bg }}>
        {layout === 'sidebar' ? (
          /* ─── Side Menu Layout ─── */
          <>
            {/* Sidebar */}
            <div className="w-[30%] flex flex-col items-center pt-3 gap-2" style={{ backgroundColor: sidebar }}>
              <div className="w-5 h-5 rounded" style={{ backgroundColor: accent }} />
              <div className="w-[60%] space-y-1.5 mt-1">
                <div className="h-1.5 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
                <div className="h-1 rounded-full" style={{ backgroundColor: textLight, opacity: 0.4 }} />
                <div className="h-1 rounded-full" style={{ backgroundColor: textLight, opacity: 0.4 }} />
                <div className="h-1 rounded-full" style={{ backgroundColor: textLight, opacity: 0.4 }} />
                <div className="h-1 rounded-full" style={{ backgroundColor: textLight, opacity: 0.3 }} />
              </div>
            </div>
            {/* Main content area */}
            <div className="flex-1 flex flex-col p-2 gap-1.5">
              {/* Stat cards row */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-5 rounded"
                    style={{
                      backgroundColor: i === 0 ? accent : cardBg,
                      opacity: i === 0 ? 0.15 : 1,
                      border: i === 0 ? `1.5px solid ${accent}` : `1px solid ${textLight}25`,
                    }}
                  />
                ))}
              </div>
              {/* Content area */}
              <div
                className="flex-1 rounded"
                style={{ backgroundColor: cardBg, border: `1px solid ${textLight}25` }}
              />
            </div>
          </>
        ) : (
          /* ─── Top Menu Layout ─── */
          <div className="flex-1 flex flex-col">
            {/* Top navigation bar */}
            <div className="h-7 flex items-center px-2.5 gap-2" style={{ backgroundColor: topbar, borderBottom: `1px solid ${textLight}25` }}>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: accent }} />
              <div className="flex gap-1.5 flex-1">
                <div className="h-1.5 w-[12%] rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
                <div className="h-1 w-[10%] rounded-full mt-px" style={{ backgroundColor: textLight, opacity: 0.3 }} />
                <div className="h-1 w-[10%] rounded-full mt-px" style={{ backgroundColor: textLight, opacity: 0.3 }} />
                <div className="h-1 w-[10%] rounded-full mt-px" style={{ backgroundColor: textLight, opacity: 0.3 }} />
              </div>
            </div>
            {/* Main content area */}
            <div className="flex-1 p-2 flex flex-col gap-1.5">
              {/* Stat cards row */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-5 rounded"
                    style={{
                      backgroundColor: i === 0 ? accent : cardBg,
                      opacity: i === 0 ? 0.15 : 1,
                      border: i === 0 ? `1.5px solid ${accent}` : `1px solid ${textLight}25`,
                    }}
                  />
                ))}
              </div>
              {/* Content area */}
              <div
                className="flex-1 rounded"
                style={{ backgroundColor: cardBg, border: `1px solid ${textLight}25` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="px-2.5 py-2 border-t border-border">
        <div className="font-semibold text-sm text-dark">{name}</div>
        <div className="text-xs text-gray">{description}</div>
      </div>
    </button>
  );
}
