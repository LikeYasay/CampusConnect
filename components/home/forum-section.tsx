"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image" 
import { MessageCircle, ArrowRight, Plus, MessageSquare, Crown } from "lucide-react" 


interface Forum {
  id: number
  title?: string
  createdAt?: string
  category?: string
  replies?: number
  user?: { 
    name?: string; 
    role?: string; 
    profileImageUrl?: string 
  }
}

export default function ForumSection({
  forums,
  repliesMap,
  loggedIn,
}: {
  forums: Forum[]
  repliesMap: Record<number, number>
  loggedIn: boolean
}) {
  const router = useRouter()

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between p-7 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 via-gray-50/40 to-transparent">
        <h3 className="text-xl font-black text-[#8A252C] flex items-center gap-3">
          <MessageCircle className="w-7 h-7" />
          <span>Campus Buzz</span>
        </h3>
        <button
          onClick={() => router.push(loggedIn ? "/forum/create-discussion" : "/login")}
          className="text-xs font-bold bg-[#FFD700] text-black px-4 py-2.5 rounded-lg hover:bg-yellow-300 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        {forums.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare className="w-12 h-12 mb-3 text-gray-300" />
            <div className="text-center italic font-medium">No active discussions yet.</div>
          </div>
        ) : (
          forums.map((f) => {
            const replies = repliesMap[f.id] ?? 0

            return (
              <Link key={f.id} href={`/forum/discussion?id=${f.id}`}>
                <div className="group p-5 rounded-xl hover:bg-gray-50/80 border border-gray-100 hover:border-[#8A252C]/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wider border border-blue-200 flex-shrink-0">
                      {f.category || "General"}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold ml-2">
                      {new Date(f.createdAt!).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#8A252C] transition-colors mb-3 line-clamp-2">
                    {f.title}
                  </h4>

                  <div className="flex justify-between items-center text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                    {/* ✅ USER INFO with CROWN */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
                             <Image 
                                src={f.user?.profileImageUrl || "/profile.png"} 
                                alt="User" 
                                fill 
                                className="object-cover"
                                unoptimized
                             />
                        </div>
                        <span className="flex items-center gap-1">
                          <span className="font-bold text-gray-800">{f.user?.name || "Anonymous"}</span>
                          {(f.user?.role === "ADMIN" || f.user?.role === "admin") && (
                              <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                                  Admin
                              </span>
                          )}
                        </span>
                    </div>

                    <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full text-gray-500 font-semibold">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{replies}</span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      <div className="p-5 border-t border-gray-100 bg-gray-50/60 text-center">
        <Link
          href="/forum"
          className="text-sm font-bold text-gray-600 hover:text-[#8A252C] transition-colors inline-flex items-center gap-2 group"
        >
          View All Topics 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}