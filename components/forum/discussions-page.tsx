import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DiscussionPostProps {
  post: any;
  isLiked: boolean;
  likeCount: number;
  replies: any[];
  onToggleLike: () => void;
  onShowReplyForm: () => void;
}

export function DiscussionPost({
  post,
  isLiked,
  likeCount,
  replies,
  onToggleLike,
  onShowReplyForm,
}: DiscussionPostProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8A252C]">
          <Image
            src={post.user?.profileImageUrl || "/profile.png"}
            alt={post.user?.name || "Anonymous"}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#8A252C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {post.category || "General"}
            </span>
            <p className="text-sm text-gray-600">
              {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-extrabold mb-2">{post.title}</h1>
      <p className="text-gray-800 mb-6 leading-relaxed">{post.content || post.description}</p>

      {post.imageUrl && (
        <div className="w-full max-h-[380px] rounded-xl overflow-hidden border border-gray-200 mb-6">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )}

      <p className="text-sm text-gray-800 mb-4">
        by <span className="font-bold text-[#8A252C]">{post.user?.name || "Anonymous"}</span> • {replies.length} replies • {likeCount} likes
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {(post.tags || "")
          .split(",")
          .filter(Boolean)
          .map((t: string, i: number) => (
            <span key={i} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
              {t.trim()}
            </span>
          ))}
      </div>

      <div className="flex items-center gap-3 mb-8">
        <button className="border-2 border-[#8A252C] text-[#8A252C] font-bold px-5 py-2 rounded-lg hover:bg-[#8A252C]/10 transition">
          Share
        </button>
        <button
          onClick={onToggleLike}
          title={isLiked ? "Unlike post" : "Like post"}
          className={`w-11 h-11 flex items-center justify-center rounded-lg transition ${isLiked ? "bg-yellow-100 text-yellow-400" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          ★
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Replies ({replies.length})</h2>
    </div>
  );
}
