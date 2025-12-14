import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

interface ReplyCardProps {
  reply: any;
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
  onReply: () => void;
}

export function ReplyCard({ reply, isLiked, likeCount, onLike, onReply }: ReplyCardProps) {
  const isOnline = reply.user?.isOnline === true;

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-transparent hover:bg-gray-50 hover:border-gray-100 transition-colors bg-white">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 relative">
          <Image
            src={reply.user?.profileImageUrl || "/profile.png"}
            alt={reply.user?.name || "Anonymous"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-bold text-gray-900 text-sm flex items-center gap-2">
            {reply.user?.name || "Anonymous"}
            
            {/* ✅ Admin Badge */}
            {(reply.user?.role === "ADMIN" || reply.user?.role === "admin") && (
              <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                Admin
              </span>
            )}
          </span>

          {isOnline ? (
            <span className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </span>
          ) : (
            <span className="text-gray-400 text-[10px] bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 font-medium">
              Offline
            </span>
          )}

          <span className="text-xs text-gray-400 ml-1">•</span>
          <span className="text-xs text-gray-400">
            {reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : ""}
          </span>
        </div>

        <p className="text-sm text-gray-800 leading-relaxed mb-3 whitespace-pre-wrap">
          {reply.content || reply.message || reply.body}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className={`text-xs font-bold flex items-center gap-1.5 transition ${
              isLiked ? "text-[#8A252C]" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
            {likeCount || 0} Likes
          </button>
          
          <button
            onClick={onReply}
            className="text-xs font-bold text-gray-500 hover:text-[#8A252C] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}