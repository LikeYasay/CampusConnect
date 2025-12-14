"use client"

import Image from "next/image"
import { useState } from "react"

interface PostContentProps {
  post: any
}

export function PostContent({ post }: PostContentProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  if (!post) return null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#8A252C] mb-4 leading-tight">{post.title}</h1>
        
        <div className="prose max-w-none text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
          {post.content || post.description}
        </div>

        {post.imageUrl && (
          <div className="group relative w-full h-[400px] rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            
            {/* Expand / Full Screen Button */}
            <button 
                onClick={() => setIsFullScreen(true)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg shadow-md backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-0 group-hover:visible"
                title="View Full Screen"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Modal Overlay */}
      {isFullScreen && post.imageUrl && (
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
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>
        </div>
      )}
    </>
  )
}