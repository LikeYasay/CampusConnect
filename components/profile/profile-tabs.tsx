import Link from "next/link"
import { format } from "date-fns"
import { TabButtons } from "@/components/shared/tab-buttons"

interface Activity {
  id: number
  type: "forum" | "lostfound"
  title: string
  date: string
  status?: string
}

interface ProfileTabsProps {
  activeTab: "overview" | "activity" | "forum" | "lostfound"
  onTabChange: (tab: "overview" | "activity" | "forum" | "lostfound") => void
  user: any
  activities: Activity[]
}

export function ProfileTabs({ activeTab, onTabChange, user, activities }: ProfileTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Recent Activity" },
    { id: "forum", label: "Forum Posts" },
    { id: "lostfound", label: "Lost & Found" },
  ]

  return (
    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <TabButtons tabs={tabs} activeTab={activeTab} onTabChange={(tab) => onTabChange(tab as any)} />

      {activeTab === "overview" && (
        <>
          <section className="mb-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-2">About</h3>
            <p className="text-gray-800 leading-relaxed">{user.bio || "No bio added yet."}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-3">Contact Information</h3>
            <div className="flex flex-col gap-2 text-gray-800">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16.667 3.333H3.333A1.667 1.667 0 0 0 1.667 5v10a1.667 1.667 0 0 0 1.666 1.667h13.334A1.667 1.667 0 0 0 18.333 15V5A1.667 1.667 0 0 0 16.667 3.333Zm0 3.334L10 10.833 3.333 6.667V5L10 9.167l6.667-4.167v1.667Z" fill="#000" />
                </svg>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5c0 4.375 5.833 10.833 5.833 10.833S15.833 11.875 15.833 7.5A5.833 5.833 0 0 0 10 1.667ZM10 9.583A2.083 2.083 0 1 1 10 5.417a2.083 2.083 0 0 1 0 4.166Z" fill="#000" />
                </svg>
                <span>Cebu Institute of Technology University</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#8A252C] mb-3">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Course</p>
                <p className="font-bold text-black">{user.course || "Not set"}</p>
              </div>
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Year Level</p>
                <p className="font-bold text-black">{user.yearLevel || "Not set"}</p>
              </div>
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Student ID</p>
                <p className="font-bold text-black">{user.studentId || "Not set"}</p>
              </div>
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="font-bold text-black">
                  {user.dateRegistered ? format(new Date(user.dateRegistered), "MMMM yyyy") : "N/A"}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "activity" && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#8A252C] mb-4">Recent Activity</h3>
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity yet.</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 bg-[#F8F9FA] rounded-lg hover:bg-gray-100 transition">
                <div className={`w-2 h-2 rounded-full mt-2 ${act.type === "forum" ? "bg-blue-500" : "bg-green-500"}`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{act.title}</p>
                  <p className="text-xs text-gray-500">{format(new Date(act.date), "MMM d, yyyy 'at' h:mm a")}</p>
                  {act.status && <span className="text-xs text-green-600 font-medium">{act.status}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "forum" && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#8A252C] mb-4">Forum Activity</h3>
          {activities.filter((a) => a.type === "forum").length === 0 ? (
            <p className="text-gray-500 text-center py-8">No forum activity yet.</p>
          ) : (
            activities
              .filter((a) => a.type === "forum")
              .map((post) => (
                <div
                  key={post.id}
                  className="block p-4 bg-[#F8F9FA] rounded-lg hover:bg-gray-100 transition border-l-4 border-[#8A252C]"
                >
                  <p className="font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">{format(new Date(post.date), "MMM d, yyyy 'at' h:mm a")}</p>
                </div>
              ))
          )}
        </div>
      )}

      {activeTab === "lostfound" && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#8A252C] mb-4">Lost & Found</h3>
          {activities.filter((a) => a.type === "lostfound").length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items yet.</p>
          ) : (
            activities
              .filter((a) => a.type === "lostfound")
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/lost-and-found/view?id=${item.id}`}
                  className="block p-4 bg-[#F8F9FA] rounded-lg hover:bg-gray-100 transition border-l-4 border-green-500"
                >
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">{format(new Date(item.date), "MMM d, yyyy")}</span>
                    {item.status && <span className="text-green-600 font-medium">• {item.status}</span>}
                  </div>
                </Link>
              ))
          )}
        </div>
      )}
    </div>
  )
}
