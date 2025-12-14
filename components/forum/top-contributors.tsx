import Image from "next/image";

interface Contributor {
  name: string;
  count: number;
  profileImageUrl?: string;
}

export function TopContributors({ contributors }: { contributors: Contributor[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4 text-[#8A252C] flex items-center gap-2">
         <span>🏆</span> Top Contributors
      </h3>
      {contributors.length === 0 ? (
        <p className="text-gray-500 text-sm">No contributors yet</p>
      ) : (
        contributors.map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-2 mb-2 rounded-lg hover:bg-gray-50 transition">
            <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative">
              <Image
                src={c.profileImageUrl || "/profile.png"}
                alt={c.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-500">{c.count} posts</p>
            </div>
            <div className="ml-auto text-lg">{["🥇", "🥈", "🥉"][i]}</div>
          </div>
        ))
      )}
    </div>
  );
}