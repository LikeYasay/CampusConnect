import { MessageCircle, Heart } from "lucide-react";

interface PostMetadataProps {
  post: any
  repliesCount: number
  likeCount: number
}

export function PostMetadata({ post, repliesCount, likeCount }: PostMetadataProps) {
  const tags = (post.tags || "").split(",").filter(Boolean);
  
  return (
    <div className="border-t border-gray-100 pt-6 mt-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="text-sm text-gray-500 flex gap-4 font-medium">
              <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  {repliesCount} Replies
              </span>
              <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  {likeCount} Likes
              </span>
          </div>
      </div>

      {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t: string, i: number) => (
                <span key={i} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-lg">
                  #{t.trim().replace(/^#/, "")}
                </span>
              ))}
          </div>
      )}
    </div>
  )
}