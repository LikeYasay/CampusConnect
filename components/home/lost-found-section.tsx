"use client"
import Image from "next/image"
import Link from "next/link"
import { Box, MapPin, Calendar, ArrowRight, Inbox, Crown } from "lucide-react" 


interface LostItem {
  id: number
  status: "LOST" | "FOUND"
  title: string
  location: string
  category: string
  createdAt: string
  imageUrl?: string
  user?: {
    name: string
    role?: string
    profileImageUrl?: string
  }
}

export default function LostFoundSection({ items }: { items: LostItem[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between p-7 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 via-gray-50/40 to-transparent">
        <h3 className="text-xl font-black text-[#8A252C] flex items-center gap-3">
          <Box className="w-6 h-6" />
          <span>Recent Lost & Found</span>
        </h3>
        <Link
          href="/lost-and-found"
          className="text-xs font-bold text-gray-600 hover:text-[#8A252C] uppercase tracking-widest transition-colors flex items-center gap-2 group"
        >
          View All 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-gray-400">
            <Inbox className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-semibold text-gray-500">No items reported recently.</p>
          </div>
        ) : (
          items.map((it) => (
            <Link key={it.id} href={`/lost-and-found/view?id=${it.id}`}>
              <div className="group flex flex-col sm:flex-row gap-4 p-5 rounded-xl hover:bg-gray-50/80 border border-gray-100 hover:border-[#8A252C]/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                {/* IMAGE SECTION */}
                {it.imageUrl && (
                  <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden relative shadow-md border border-gray-200">
                    <Image
                      src={it.imageUrl || "/placeholder.svg"}
                      alt={it.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}

                {/* CONTENT SECTION */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border font-semibold ${
                        it.status === "LOST"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {it.status}
                    </span>
                    <span className="text-xs text-gray-700 font-semibold bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      {it.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#8A252C] transition-colors truncate mb-2">
                    {it.title}
                  </h4>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate max-w-[100px]">{it.location}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{new Date(it.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* ✅ USER INFO with CROWN */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden relative border border-gray-200">
                        <Image 
                            src={it.user?.profileImageUrl || "/profile.png"} 
                            alt="User" 
                            fill 
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                        {it.user?.name || "Anonymous"}
                        {(it.user?.role === "ADMIN" || it.user?.role === "admin") && (
                            <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                                Admin
                            </span>
                        )}
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}