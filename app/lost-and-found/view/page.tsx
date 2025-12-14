"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { lostFoundAPI } from "@/lib/api"
import RequireAuth from "@/components/auth/require-auth"
import { Shield } from "lucide-react"

interface Item {
  id: number
  title: string
  description: string
  location: string
  category: string
  status: "LOST" | "FOUND"
  imageUrl?: string
  createdAt: string
  user?: { 
    userId: number
    name: string
    email: string
    role?: string
    profileImageUrl?: string
    isOnline?: boolean
  }
  isUrgent?: boolean
}

const UserAvatar = ({ name, src }: { name: string; src?: string }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={48}
        height={48}
        className="rounded-full object-cover w-12 h-12 border border-gray-200"
        unoptimized
      />
    );
  }
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-blue-100 text-blue-700 ring-4 ring-white shadow-sm">
      {initial}
    </div>
  );
};

export default function LostItemViewPage() {
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id")
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!itemId) return

    const fetchItem = async () => {
      try {
        const data = await lostFoundAPI.getById(Number.parseInt(itemId))
        setItem(data)
      } catch (err) {
        console.error("Error fetching item:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [itemId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8a252c]"></div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500 font-medium">Item not found.</p>
        <Link href="/lost-and-found" className="text-[#8A252C] hover:underline font-bold">Back to Lost & Found</Link>
      </div>
    )
  }

  const isOwnerOnline = item.user?.isOnline === true;

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2">
          <Link 
              href="/lost-and-found" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8A252C] hover:text-[#701e23] transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
          >
              <span>←</span> Back to Lost & Found
          </Link>
        </div>

        <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-8 px-6 mb-20">
          
          {/* LEFT COLUMN: ITEM DETAILS */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              
              {/* Header Section */}
              <div className="p-8 border-b border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                          item.status === "LOST" ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"
                          }`}
                      >
                          {item.status}
                      </span>
                      {item.isUrgent && (
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-bold uppercase tracking-wide">
                              URGENT
                          </span>
                      )}
                      <span className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                          {item.category}
                      </span>
                  </div>

                  <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{item.title}</h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                          </div>
                          <span className="font-medium text-gray-700">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                          </div>
                          <span className="font-medium text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                  </div>
              </div>

              {/* Image Section - REPLACED WITH YOUR SNIPPET */}
              {item.imageUrl && (
                  <div className="w-full bg-gray-100 border-y border-gray-200 relative aspect-video sm:aspect-[2/1] group cursor-pointer" onClick={() => setIsFullScreen(true)}>
                      <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-contain hover:scale-[1.01] transition-transform duration-300"
                          unoptimized
                      />
                      
                      <button 
                          onClick={() => setIsFullScreen(true)}
                          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg shadow-md backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-0 group-hover:visible"
                          title="View Full Screen"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                      </button>

                      {isFullScreen && item.imageUrl && (
                        <div 
                            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
                            onClick={() => setIsFullScreen(false)}
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setIsFullScreen(false)}
                                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Large Image */}
                            <div 
                                className="relative w-full h-full max-w-7xl max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>
                      )}
                  </div>
              )}

              {/* Description */}
              <div className="p-8">
                  <h3 className="text-lg font-bold text-[#8A252C] mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {item.description}
                  </p>
              </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="w-full lg:w-[360px] flex flex-col gap-6">
            
            {/* Owner Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Posted By</h3>
              <div className="flex items-center gap-4 mb-6">
                <UserAvatar name={item.user?.name || "Anonymous"} src={item.user?.profileImageUrl} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-lg">{item.user?.name || "Anonymous"}</p>
                    
                    {/* Admin Badge */}
                    {(item.user?.role === "ADMIN" || item.user?.role === "admin") && (
                      <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                  
                  {/* Status Indicator */}
                  {isOwnerOnline ? (
                      <p className="text-xs text-green-700 font-bold bg-green-100 border border-green-200 px-2 py-0.5 rounded-full inline-block mt-1">
                          ● Online
                      </p>
                  ) : (
                      <p className="text-xs text-gray-500 font-medium bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full inline-block mt-1">
                          ○ Offline
                      </p>
                  )}
                  
                </div>
              </div>
              
              <Link href={`/lost-and-found/contact?id=${item.id}`}>
                  <button className="w-full bg-[#8A252C] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#701e23] transition-all transform active:scale-[0.98]">
                      Chat with Owner
                  </button>
              </Link>

            </div>

            {/* Safety Tips Sidebar */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#8A252C] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Guidelines
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Meet in busy, public campus areas.
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Bring a friend if possible.
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Verify item details before handing over.
                </li>
              </ul>
            </div>

          </aside>
        </main>
      </div>
    </RequireAuth>
  )
}