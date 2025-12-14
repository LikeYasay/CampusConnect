interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
}

export function SearchFilters({ search, onSearchChange, categoryFilter, onCategoryChange }: SearchFiltersProps) {
  return (
    <section className="max-w-7xl mx-auto mt-12 px-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Search discussions, topics..."
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {["All", "Academic", "Events", "General", "Tech", "Sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-[#8A252C] text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 font-medium px-1">Filter results by category</p>
    </section>
  );
}