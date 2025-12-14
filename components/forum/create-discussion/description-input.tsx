interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description</label>
        <span className={`text-xs font-medium ${value.length > 450 ? "text-red-500" : "text-gray-400"}`}>
            {value.length}/500 characters
        </span>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 500))}
        placeholder="Provide details about your topic to start the conversation..."
        className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all h-[200px] resize-none leading-relaxed placeholder-gray-400"
        required
      />
    </div>
  );
}