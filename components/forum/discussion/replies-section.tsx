import { ReplyCard } from "./reply-card"

interface RepliesSectionProps {
  replies: any[] 
  likedReplies: Record<number, boolean>
  replyLikeCounts: Record<number, number>
  onLikeReply: (replyId: number) => void
  onReplyTo: (replyId: number, username: string) => void
}

export function RepliesSection({ replies, likedReplies, replyLikeCounts, onLikeReply, onReplyTo }: RepliesSectionProps) {
  if (replies.length === 0) {
      return null; 
  }

  return (
    <div className="space-y-6">
      {replies.map((r) => (
        <div key={r.id}>
            {/* 1. Render the Parent Reply */}
            <ReplyCard
                reply={r}
                isLiked={likedReplies[r.id] || false}
                likeCount={replyLikeCounts[r.id] || 0}
                onLike={() => onLikeReply(r.id)}
                onReply={() => onReplyTo(r.id, r.user?.name || "User")}
            />

            {/* 2. Render Children (if any) with Indentation */}
            {r.children && r.children.length > 0 && (
                <div className="ml-8 mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                    <RepliesSection 
                        replies={r.children}
                        likedReplies={likedReplies}
                        replyLikeCounts={replyLikeCounts}
                        onLikeReply={onLikeReply}
                        onReplyTo={onReplyTo}
                    />
                </div>
            )}
        </div>
      ))}
    </div>
  )
}