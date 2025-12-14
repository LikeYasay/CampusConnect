import Image from "next/image";

interface ReplyCardProps {
  reply: any;
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
}

export function ReplyCard({ reply, isLiked, likeCount, onLike }: ReplyCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8A252C]">
          <Image
            src={reply.user?.profileImageUrl || "/profile.png"}
            alt={reply.user?.name || "Anonymous"}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <p className="font-bold">{reply.user?.name || "Anonymous"}</p>
          <p className="text-xs text-gray-500">{reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : ""}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 mb-3">{reply.content || reply.message || reply.body}</p>
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={onLike}
          className={`hover:text-[#8A252C] transition ${isLiked ? "text-yellow-400" : "text-gray-600"}`}
        >
          ★ Like ({likeCount})
        </button>
      </div>
    </div>
  );
}
