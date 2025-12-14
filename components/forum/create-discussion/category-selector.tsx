interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySelector({
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  const categories = ["Academic", "Events", "General", "Lost & Found", "Tech", "Sports"];

  return (
    <div>
      <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#8A252C] text-white border-[#8A252C] shadow-md transform scale-[1.02]"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}