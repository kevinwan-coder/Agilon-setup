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
      className={`card-orbit w-[153px] h-[85px] border-2 rounded-lg p-2 text-center cursor-pointer transition-all bg-[#252525] flex flex-col items-center justify-center ${
        selected ? 'border-[#7ee8a8] bg-[#1a2e22]' : 'border-border hover:border-[#7ee8a8] hover:bg-[#1a2e22]'
      }`}
    >
      <div className="text-[1.2rem] mb-1">{icon}</div>
      <div className="font-semibold text-xs text-dark">{label}</div>
      <div className="text-[0.65rem] text-gray mt-0.5">{description}</div>
    </button>
  );
}
