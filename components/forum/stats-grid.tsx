interface StatsGridProps {
  totalDiscussions: number;
  activeMembers: number | null;
  onlineNow: number | null;
  todaysPosts: number;
}

export function StatsGrid({ totalDiscussions, activeMembers, onlineNow, todaysPosts }: StatsGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {[
          { label: "Discussions", count: totalDiscussions, color: "text-[#8A252C]" },
          { label: "Active Users", count: activeMembers ?? "-", color: "text-blue-600" },
          { label: "Online Now", count: onlineNow ?? "-", color: "text-green-600" },
          { label: "Today's Posts", count: todaysPosts, color: "text-orange-600" },
        ].map((stat, i) => (
          <div key={i} className="text-center border-r last:border-r-0 border-gray-100">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}