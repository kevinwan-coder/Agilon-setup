interface RadioCardProps {
  icon: string;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function RadioCard({ icon, label, description, selected, onClick }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[153px] h-[85px] border-2 rounded-lg p-2 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
        selected ? 'border-[#7ee8a8]' : 'border-border hover:border-[#7ee8a8]'
      }`}
      style={{
        background: selected
          ? 'linear-gradient(145deg, #1a3a28 0%, #1a2e22 40%, #162620 100%)'
          : 'linear-gradient(145deg, #2e2e2e 0%, #252525 40%, #1a1a1a 100%)',
      }}
    >
      <div className="text-[1.2rem] mb-1">{icon}</div>
      <div className="font-semibold text-xs text-dark">{label}</div>
      <div className="text-[0.65rem] text-gray mt-0.5">{description}</div>
    </button>
  );
}
