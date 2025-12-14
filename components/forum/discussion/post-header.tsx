import Image from "next/image"

interface PostHeaderProps {
  post: any
}

export function PostHeader({ post }: PostHeaderProps) {
  
  const isOnline = post.user?.isOnline === true;

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shadow-sm relative">
        <Image
          src={post.user?.profileImageUrl || "/profile.png"}
          alt={post.user?.name || "Anonymous"}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-bold text-gray-900 text-lg">{post.user?.name || "Anonymous"}</p>

          {/* ✅ Admin Badge */}
          {(post.user?.role === "ADMIN" || post.user?.role === "admin") && (
            <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
              Admin
            </span>
          )}

          {/* ✅ Status Badge */}
          {isOnline ? (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              Offline
            </span>
          )}

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ml-1 ${
            post.category === "Academic" ? "bg-blue-100 text-blue-700" :
            post.category === "Events" ? "bg-yellow-100 text-yellow-800" :
            "bg-gray-100 text-gray-600"
          }`}>
            {post.category || "General"}
          </span>
        </div>
        <p className="text-xs text-gray-500 font-medium mt-1">
            Posted on {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Unknown date"}
        </p>
      </div>
    </div>
  )
}