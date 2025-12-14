"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
      <Skeleton className="sm:w-48 h-48 sm:h-auto" />
      <div className="flex-1 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <Skeleton className={`${i % 2 === 0 ? "w-2/3" : "w-1/2"} h-12 rounded-2xl`} />
        </div>
      ))}
    </div>
  );
}

export function ConversationListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-4 flex items-center gap-3">
          <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2 text-center">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-3">
          {[...Array(cols)].map((_, j) => (
            <Skeleton key={j} className={`h-10 ${j === 0 ? "w-12" : "flex-1"}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DiscussionPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Post Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}


const SharedSkeletons = {
  Skeleton,
  CardSkeleton,
  PostCardSkeleton,
  ChatSkeleton,
  ConversationListSkeleton,
  UserProfileSkeleton,
  TableSkeleton,
  DiscussionPageSkeleton
};

export default SharedSkeletons;