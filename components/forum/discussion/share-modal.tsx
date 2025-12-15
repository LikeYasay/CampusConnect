"use client"

import { useState } from "react"
import { Copy, Check, X } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
}

export function ShareModal({ isOpen, onClose, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Share Discussion</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">Copy the link below to share this discussion with others.</p>
          
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
            <input 
              type="text" 
              readOnly 
              value={url} 
              className="flex-1 bg-transparent text-sm text-gray-600 outline-none px-2"
            />
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                copied 
                  ? "bg-green-100 text-green-700" 
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}