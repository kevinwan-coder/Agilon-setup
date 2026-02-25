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
      <div className={`flex gap-2.5 flex-wrap ${error ? 'border-2 border-red rounded-lg p-1' : ''}`}>
        {BG_COLORS.map((bg) => (
          <button
            key={bg.value}
            type="button"
            onClick={() => onSelect(bg.value)}
            className={`w-11 h-11 rounded-lg cursor-pointer border-3 transition-all hover:scale-110 ${
              selected === bg.value
                ? 'border-white shadow-[0_0_0_2px_#1a1a1a,0_0_0_4px_white]'
                : 'border-transparent'
            }`}
            style={{
              backgroundColor: bg.value,
              border:
                selected !== bg.value
                  ? bg.value === '#ffffff'
                    ? '1px solid #666'
                    : '1px solid #666'
                  : undefined,
            }}
            aria-label={`Select background color ${bg.label}`}
          />
        ))}
      </div>
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
}
