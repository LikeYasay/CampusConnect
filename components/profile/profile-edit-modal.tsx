"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface User {
  userId: number
  name: string
  email: string
  course?: string
  yearLevel?: string
  studentId?: string
  bio?: string
  profileImageUrl?: string
}

interface ProfileEditModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<User>, file?: File) => void
  saving: boolean
}

export function ProfileEditModal({ user, isOpen, onClose, onSave, saving }: ProfileEditModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({})
  
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(user.profileImageUrl)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user.name,
        course: user.course,
        yearLevel: user.yearLevel,
        studentId: user.studentId,
        bio: user.bio,
        profileImageUrl: user.profileImageUrl 
      })
      setPreviewUrl(user.profileImageUrl)
      setSelectedFile(undefined)
    }
  }, [isOpen, user])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    onSave(formData, selectedFile)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">✕</button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto">
          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* --- IMAGE UPLOAD SECTION --- */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 relative">
                        <Image 
                            src={previewUrl || "/profile.png"} 
                            alt="Profile Preview" 
                            fill 
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change</span>
                    </div>
                </div>
                <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-[#8A252C] font-semibold hover:underline"
                >
                    Upload New Picture
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8a252c] outline-none"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8a252c] outline-none"
                    value={formData.course || ""}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8a252c] outline-none bg-white"
                    value={formData.yearLevel || ""}
                    onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5+">5th Year+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8a252c] outline-none"
                  value={formData.studentId || ""}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#8a252c] outline-none h-24 resize-none"
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#8a252c] rounded-xl hover:bg-[#7a2027] transition disabled:opacity-70 flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  )
}