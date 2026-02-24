import { BG_COLORS } from '../../constants/colors';

interface ColorPickerProps {
  selected: string;
  onSelect: (color: string) => void;
  error?: string;
}

export function ColorPicker({ selected, onSelect, error }: ColorPickerProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-sm text-dark mb-1.5">
        Background Color <span className="text-red">*</span>
      </label>
      <p className="text-xs text-gray-light mb-2">Choose a background tone for your workspace</p>
      <div className={`flex gap-3 ${error ? 'border-2 border-red rounded-lg p-1' : ''}`}>
        {BG_COLORS.map((bg) => (
          <button
            key={bg.value}
            type="button"
            onClick={() => onSelect(bg.value)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg cursor-pointer border-2 transition-all hover:scale-105 ${
              selected === bg.value
                ? 'border-[#7ee8a8]'
                : 'border-border hover:border-[#7ee8a8]'
            }`}
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <div
              className="w-8 h-8 rounded-md flex-shrink-0"
              style={{
                backgroundColor: bg.value,
                border: bg.value === '#ffffff' ? '1px solid #444' : '1px solid #333',
              }}
            />
            <span className="text-sm text-dark font-medium">{bg.label}</span>
          </button>
        ))}
      </div>
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
}
