import Image from "next/image"

interface Contributor {
  name: string
  count: number
  profileImageUrl: string
}

export function TopContributorsSidebar({ contributors }: { contributors: Contributor[] }) {
  return (
    <aside className="w-full lg:w-[350px]">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
        <h3 className="text-lg font-bold text-[#8A252C] mb-4 flex items-center gap-2">
            <span>🏆</span> Top Contributors
        </h3>
        
        {contributors.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No data yet.</p>
        ) : (
          <div className="space-y-1">
            {contributors.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative">
                    <Image
                    src={c.profileImageUrl || "/profile.png"}
                    alt={c.name}
                    fill
                    className="object-cover"
                    unoptimized
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate" title={c.name}>{c.name}</p>
                    <p className="text-xs text-gray-500">{c.count} contributions</p>
                </div>
                <div className="text-lg">{["🥇", "🥈", "🥉"][i]}</div>
                </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}