import { Heart, Share2 } from "lucide-react";

interface PostActionsProps {
  isLiked: boolean
  onLike: () => void
}

export function PostActions({ isLiked, onLike }: PostActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLike}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
            isLiked 
            ? "bg-[#8A252C] text-white shadow-md transform scale-105" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {/* Fill the heart if liked, outline otherwise */}
        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        <span>{isLiked ? "Liked" : "Like"}</span>
      </button>
      
      <button className="flex items-center gap-2 border border-gray-300 text-gray-700 bg-white font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm shadow-sm">
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  )
}