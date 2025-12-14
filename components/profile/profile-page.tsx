"use client"

import { useState, useEffect } from "react"
import { getToken, getUserFromToken, triggerAuthUpdate } from "@/lib/auth"
import { useRouter } from 'next/navigation'
import api from "@/lib/api"
import { uploadToCloudinary } from "@/lib/upload"
import { BackNavigation } from "@/components/shared/back-navigation"
import { ProfileHeader } from "./profile-header"
import { ProfileTabs } from "./profile-tabs"
import { ProfileEditModal } from "./profile-edit-modal"


export interface User {
  userId: number
  name: string
  email: string
  course?: string
  yearLevel?: string
  studentId?: string
  bio?: string
  profileImageUrl?: string
  dateRegistered?: string
}

interface Activity {
  id: number
  type: "forum" | "lostfound"
  title: string
  date: string
  status?: string
}


interface ProfilePageProps {
  user?: Partial<User> 
}


export function ProfilePage({ user: initialUser }: ProfilePageProps) {
  
  const [user, setUser] = useState<User | null>(initialUser as User || null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "forum" | "lostfound">("overview")
  const [loading, setLoading] = useState(!initialUser) 
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    const decoded = getUserFromToken()

    if (!token || !decoded?.userId) {
      
      
      if (!initialUser) router.push("/login")
      return
    }

    const userId = Number(decoded.userId)

    const load = async () => {
      try {
        
        
        
        const [profile, forums, lostItems, discussions] = await Promise.all([
          api.user.getProfile(userId),
          api.forum.getByUserId(userId),
          api.lostFound.getByUserId(userId),
          api.discussion.getByUserId(userId),
        ])

        setUser({
          userId,
          name: profile.name ?? decoded.name ?? "User",
          email: profile.email ?? decoded.email ?? "",
          course: profile.course ?? "",
          yearLevel: profile.yearLevel ?? "",
          studentId: profile.studentId ?? "",
          bio: profile.bio ?? "",
          profileImageUrl: profile.profileImageUrl ?? null,
          dateRegistered: profile.dateRegistered ?? null,
        })

        const mapped: Activity[] = [
          ...(Array.isArray(forums) ? forums : []).map((f: any) => ({
            id: f.id,
            type: "forum" as const,
            title: `Posted: ${f.title}`,
            date: f.createdAt,
          })),
          ...(Array.isArray(lostItems) ? lostItems : []).map((l: any) => ({
            id: l.id,
            type: "lostfound" as const,
            title: l.title,
            date: l.createdAt,
            status: l.status,
          })),
          ...(Array.isArray(discussions) ? discussions : []).map((d: any) => ({
            id: d.id,
            type: "forum" as const,
            title: `Replied: ${d.content?.slice(0, 60) || "Comment"}${d.content?.length > 60 ? "..." : ""}`,
            date: d.createdAt,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setActivities(mapped)
      } catch (err) {
        console.error("[Profile] load error:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router, initialUser])

  const handleSave = async (editForm: Partial<User>, newImageFile?: File) => {
    if (!user) return
    setSaving(true)
    
    try {
      let finalImageUrl = editForm.profileImageUrl || user.profileImageUrl

      
      if (newImageFile) {
        try {
          finalImageUrl = await uploadToCloudinary(newImageFile)
        } catch (uploadError) {
          console.error("Upload failed:", uploadError)
          alert("Failed to upload image. Saving text data only.")
          finalImageUrl = user.profileImageUrl 
        }
      }

      
      const payload = {
        ...editForm,
        profileImageUrl: finalImageUrl
      }

      
      const updated = await api.user.updateUser(user.userId, payload)
      
      
      setUser((prev) => (prev ? { ...prev, ...updated } : null))
      
      
      triggerAuthUpdate()

      setIsEditing(false)

    } catch (err) {
      console.error("[Profile] update error:", err)
      alert("Could not save changes – please try again.")
    } finally {
      setSaving(false)
    }
  }

  
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8a252c]" />
      </div>
    )
  }

  if (!user) return null

  const stats = {
    itemsReported: activities.filter((a) => a.type === "lostfound").length,
    itemsFound: activities.filter((a) => a.type === "lostfound" && a.status === "FOUND").length,
    forumPosts: activities.filter((a) => a.type === "forum" && a.title.startsWith("Posted:")).length,
    replies: activities.filter((a) => a.type === "forum" && a.title.startsWith("Replied:")).length,
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <BackNavigation href="/" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileHeader user={user} stats={stats} onEditClick={() => setIsEditing(true)} />
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} user={user} activities={activities} />
        </div>
      </div>

      <ProfileEditModal 
        user={user} 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        onSave={handleSave} 
        saving={saving} 
      />
    </div>
  )
}