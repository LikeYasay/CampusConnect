interface Post {
  id: number;
  title: string;
  user?: { name?: string };
  createdAt?: string;
}

interface RelatedDiscussionsProps {
  posts: Post[];
}

export function RelatedDiscussions({ posts }: RelatedDiscussionsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Related Discussions</h3>
      {posts.slice(0, 3).map((f, i) => (
        <div
          key={f.id || i}
          className="border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition"
        >
          <p className="font-bold text-[#8A252C] text-sm">{f.title}</p>
          <p className="text-xs text-gray-700">
            by {f.user?.name || "Anonymous"} •{" "}
            {f.createdAt
              ? new Date(f.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
