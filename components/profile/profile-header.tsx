import Image from "next/image"
import { format } from "date-fns"

interface User {
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

interface ProfileHeaderProps {
  user: User
  stats: {
    itemsReported: number
    itemsFound: number
    forumPosts: number
    replies: number
  }
  onEditClick: () => void
}

export function ProfileHeader({ user, stats, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-200">
          <Image
            src={user.profileImageUrl || "/profile.png"}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-[#8A252C]">{user.name}</h2>
        <p className="text-gray-600 text-sm">
          {user.course || "Not set"} – {user.yearLevel || "Not set"}
        </p>
        <p className="text-gray-600 text-sm">ID: {user.studentId || "Not set"}</p>
        <p className="text-gray-500 text-xs">
          Member since {user.dateRegistered ? format(new Date(user.dateRegistered), "MMMM yyyy") : "N/A"}
        </p>

        <div className="flex gap-3 mt-4 w-full">
          <button
            onClick={onEditClick}
            className="flex-1 bg-[#FFD700] text-black font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Edit Profile
          </button>
          {/* <button className="flex-1 border border-[#8A252C] text-[#8A252C] px-4 py-2 rounded-lg text-sm hover:bg-[#8A252C]/10 transition">
            Message
          </button> */}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-[#8A252C] mb-2">Achievements</h3>
        <p className="text-gray-500 text-sm italic">No achievements yet.</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-[#8A252C] mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8F9FA] rounded-lg text-center py-3">
            <p className="text-2xl font-bold text-[#8A252C]">{stats.itemsReported}</p>
            <p className="text-xs text-gray-600">Items Reported</p>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg text-center py-3">
            <p className="text-2xl font-bold text-[#8A252C]">{stats.itemsFound}</p>
            <p className="text-xs text-gray-600">Items Found</p>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg text-center py-3">
            <p className="text-2xl font-bold text-[#8A252C]">{stats.forumPosts}</p>
            <p className="text-xs text-gray-600">Forum Posts</p>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg text-center py-3">
            <p className="text-2xl font-bold text-[#8A252C]">{stats.replies}</p>
            <p className="text-xs text-gray-600">Replies</p>
          </div>
        </div>
      </div>
    </div>
  )
}
