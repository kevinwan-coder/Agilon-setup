import { useRef } from 'react';

interface FileUploadProps {
  logoName: string;
  onFileSelect: (file: File) => void;
}

export function FileUpload({ logoName, onFileSelect }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="mb-4 flex flex-col flex-1">
      <label className="block font-semibold text-sm text-dark mb-1.5">Upload Your Logo</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full flex-1 border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer transition-all bg-light hover:border-[#7ee8a8] hover:bg-[#1a2e22] flex flex-col items-center justify-center"
      >
        <div className="text-2xl text-gray-light">{'\uD83D\uDCE4'}</div>
        <div className="text-sm text-gray mt-2">
          <span className="text-primary font-semibold">Click to upload</span> or drag and drop
          <br />
          SVG, PNG, JPG (max 2MB)
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {logoName && (
        <p className="text-green text-sm mt-2">{'\u2713'} {logoName}</p>
      )}
    </div>
  );
}
