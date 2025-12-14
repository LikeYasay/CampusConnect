interface TabButtonsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabButtons({ tabs, activeTab, onTabChange }: TabButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition ${
            activeTab === tab.id
              ? "bg-[#8A252C] text-white"
              : "bg-[#F8F9FA] text-black hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
