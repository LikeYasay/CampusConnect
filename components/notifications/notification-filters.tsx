interface NotificationFiltersProps {
  filter: "all" | "unread" | "urgent"
  onFilterChange: (filter: "all" | "unread" | "urgent") => void
  unreadCount: number
}

export function NotificationFilters({ filter, onFilterChange, unreadCount }: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-center gap-3">
        {(["all", "unread", "urgent"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f ? "bg-[#8A252C] text-white" : "bg-[#F8F9FA] text-black"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-3 lg:mt-0">
        <button className="text-sm font-medium text-[#8A252C] hover:underline">Mark all as read</button>
        <span className="w-px h-5 bg-gray-300"></span>
        <p className="text-sm font-medium text-gray-600">{unreadCount} unread</p>
      </div>
    </div>
  )
}
