interface TrendingTopicsProps {
  topics: string[];
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4 text-[#8A252C] flex items-center gap-2">
        <span>🔥</span> Trending Topics
      </h3>
      <ul className="space-y-2">
        {topics.length === 0 ? (
          <p className="text-gray-500 text-sm">No topics yet</p>
        ) : (
          topics.map((t, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-2 cursor-pointer">
              <span className="font-medium text-sm text-gray-800">#{t.replace(/^#/, "")}</span>
              <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">#{i + 1}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}