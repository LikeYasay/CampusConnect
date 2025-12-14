import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Heart, Crown } from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
  content: string;
  imageUrl?: string;
  tags: string[];
  user?: {
    userId?: number | string;
    name: string;
    role: string;
    profileImageUrl?: string;
  };

  
}


const UserAvatarPlaceholder = ({ name }: { name: string }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = ["bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-purple-100 text-purple-700"];
  const colorClass = colors[name.length % colors.length];
  
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colorClass} border border-white shadow-sm`}>
      {initial}
    </div>
  );
}

export function PostCard({ id, title, category, createdAt, replies, likes, content, imageUrl, tags, user }: PostCardProps) {
  const categoryColor = category === "Events" ? "bg-yellow-100 text-yellow-800" : "bg-[#8A252C]/10 text-[#8A252C]";
  const summary = content ? (content.slice(0, 180) + (content.length > 180 ? "..." : "")) : "";

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#8A252C]/30 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
      
      {/* IMAGE SECTION (Fixed Width on Desktop) */}
      <div className="sm:w-48 h-48 sm:h-auto relative flex-shrink-0 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="text-gray-300 flex flex-col items-center">
            <MessageCircle className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">Discussion</span>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* USER INFO SECTION */}
          <div className="flex items-center gap-2 mb-3">
            {user?.profileImageUrl ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                    <Image 
                        src={user.profileImageUrl} 
                        alt={user.name} 
                        fill 
                        className="object-cover" 
                        unoptimized 
                    />
                </div>
            ) : (
                <UserAvatarPlaceholder name={user?.name || "A"} />
            )}
            <span className="text-xs font-bold text-gray-700 truncate max-w-[120px] flex items-center gap-1.5">
                {user?.name || "Anonymous"}
                {(user?.role === "ADMIN" || user?.role === "admin") && (
                    <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                        Admin
                    </span>
                )}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">
                {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
            </span>
          </div>

          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-transparent ${categoryColor}`}>
                {category}
              </span>
            </div>
            
            {/* Stats with Lucide Icons */}
            <div className="text-xs text-gray-500 flex gap-4 font-medium">
               <span className="flex items-center gap-1.5">
                 <MessageCircle className="w-3.5 h-3.5" />
                 {replies}
               </span>
               <span className="flex items-center gap-1.5">
                 <Heart className="w-3.5 h-3.5" />
                 {likes}
               </span>
            </div>
          </div>

          <Link href={`/forum/discussion?id=${id}`} className="block">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#8A252C] transition-colors mb-2 line-clamp-1">
              {title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Footer: Tags & Action */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div className="flex flex-wrap gap-2">
            {tags && tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                #{tag.replace(/^#/, "")}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
             <Link href={`/forum/discussion?id=${id}`}>
               <button className="px-4 py-2 text-xs font-bold text-white bg-[#8A252C] hover:bg-[#7a2027] rounded-lg shadow-sm transition-colors">
                 Read Post
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}