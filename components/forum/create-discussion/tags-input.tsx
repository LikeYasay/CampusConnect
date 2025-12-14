interface TagsInputProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function TagsInput({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: TagsInputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tags</label>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 relative">
            <span className="absolute left-3 top-3 text-gray-400">#</span>
            <input
            type="text"
            value={tagInput}
            onChange={(e) => onTagInputChange(e.target.value)}
            placeholder="Add relevant tags..."
            className="w-full border border-gray-300 bg-gray-50 rounded-xl py-3 pl-7 pr-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
            />
        </div>
        <button
          type="button"
          onClick={onAddTag}
          className="bg-[#8A252C] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#701e23] transition-colors shadow-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {tags.length === 0 && <p className="text-xs text-gray-400 italic">No tags added yet.</p>}
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            #{tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-gray-400 hover:text-red-500 transition-colors w-4 h-4 flex items-center justify-center rounded-full"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}