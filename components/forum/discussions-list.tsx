import { PostCard } from "./post-card";

interface Post {
  id: number;
  title: string;
  category?: string;
  createdAt?: string;
  repliesCount?: number;
  content?: string;
  description?: string;
  likes?: number;
  imageUrl?: string;
  tags?: string;
  user?: {
    userId?: number | string;
    name?: string;
    role?: string;
    profileImageUrl?: string;
  };
}

interface DiscussionsListProps {
  posts: Post[];
  loading: boolean;
  error: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  repliesMap: Record<number, number>;
}

export function DiscussionsList({
  posts,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  repliesMap,
}: DiscussionsListProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8a252c]" />
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg">{error}</div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No discussions found</p>
      ) : (
        posts.map((post) => {
          const replies = repliesMap[post.id] ?? post.repliesCount ?? 0;
          const hashtags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category || "General"}
              createdAt={post.createdAt || ""}
              replies={replies}
              likes={post.likes ?? 0}
              content={post.content || post.description || ""}
              imageUrl={post.imageUrl}
              tags={hashtags}
              
              user={{
                userId: post.user?.userId || "#",
                name: post.user?.name || "Anonymous",
                role: post.user?.role|| "User",
                profileImageUrl: post.user?.profileImageUrl || "/profile.png"
              }}
            />
          );
        })
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${currentPage === pageNum
                ? "bg-[#8A252C] text-white border-[#8A252C]"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}