interface SettingItem {
  label: string
  key: string
}

const SETTINGS: SettingItem[] = [
  { label: "Lost & Found Updates", key: "lostFoundUpdates" },
  { label: "Forum Replies", key: "forumReplies" },
  { label: "System Updates", key: "systemUpdates" },
  { label: "Email Notifications", key: "emailNotifications" },
]

export function NotificationSettings() {
  return (
    <div className="border border-neutral-300 rounded-xl p-5 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-[#8A252C] mb-4">Notification Settings</h3>
      <div className="space-y-3">
        {SETTINGS.map((item) => (
          <div key={item.key} className="flex justify-between items-center">
            <p className="text-sm font-medium">{item.label}</p>
            <div
              className="w-11 h-6 rounded-full flex items-center cursor-pointer transition"
              style={{ backgroundColor: Math.random() > 0.5 ? "#8A252C" : "#ccc" }}
            >
              <div
                className="w-5 h-5 bg-white rounded-full transition"
                style={{ transform: Math.random() > 0.5 ? "translateX(20px)" : "translateX(2px)" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
