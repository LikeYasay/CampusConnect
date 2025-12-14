interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Discussion Title</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Tips for Final Exams..."
        className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-base outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all placeholder-gray-400 font-medium"
        required
      />
    </div>
  );
}