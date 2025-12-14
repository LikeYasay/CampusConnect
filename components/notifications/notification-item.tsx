interface NotificationItemProps {
  id: number
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
  onMarkAsRead?: () => void
  onDelete?: () => void
}

export function NotificationItem({
  id,
  title,
  message,
  type,
  isRead,
  createdAt,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const getIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      view: "🔍",
      reply: "💬",
      match: "✅",
      system: "🔔",
      like: "👍",
      claim: "🏷️",
      update: "📢",
    }
    return iconMap[type] || "🔔"
  }

  const getColor = (type: string) => {
    const colorMap: Record<string, string> = {
      view: "#8A252C",
      reply: "#FFD700",
      match: "#2D5016",
      system: "#666",
      like: "#FFD700",
      claim: "#8A252C",
      update: "#666",
    }
    return colorMap[type] || "#666"
  }

  return (
    <div
      className={`flex justify-between items-start border border-gray-200 rounded-lg p-4 mb-3 transition ${
        !isRead ? "bg-[#FFF9E6]" : "bg-white hover:bg-[#F8F9FA]"
      }`}
    >
      <div className="flex gap-3">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: `${getColor(type)}20` }}
        >
          <span className="text-2xl">{getIcon(type)}</span>
        </div>
        <div>
          <p className="font-bold text-base">{title}</p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {!isRead && (
          <button
            onClick={onMarkAsRead}
            className="bg-[#8A252C] text-white text-xs font-medium px-4 py-1.5 rounded-md hover:opacity-90 transition"
          >
            Mark as read
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-1 hover:opacity-70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            strokeWidth="1.5"
            stroke="#000"
            className="w-4 h-4 cursor-pointer"
          >
            <path
              d="M2 4h12M6 4V2h4v2m-7 0v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4H3z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
