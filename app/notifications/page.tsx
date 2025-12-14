"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notificationAPI } from "@/lib/api";
import RequireAuth from "@/components/auth/require-auth";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "REPLY" | "LIKE" | "INFO" | string;
  isRead: boolean;
  createdAt: string;
  relatedItemId?: number;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const data = await notificationAPI.getAll();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
      );
      
      try {
        await notificationAPI.markAsRead(notification.id);
        window.dispatchEvent(new Event("update-nav-counts"));
      } catch (error) {
        console.error("Failed to mark as read", error);
      }
    }

    if (notification.relatedItemId) {
      router.push(`/forum/discussion?id=${notification.relatedItemId}`);
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/notifications/read-all`, {
         method: "PUT",
         headers: {
             "Authorization": `Bearer ${localStorage.getItem("authToken")}`
         }
      });
      window.dispatchEvent(new Event("update-nav-counts"));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8A252C]"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-[#8A252C] tracking-tight">
                Notifications
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Stay updated with your campus activities
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-bold text-sm">
                {unreadCount} Unread messages
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <FilterButton label="All" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterButton label="Unread" active={filter === "unread"} onClick={() => setFilter("unread")} count={unreadCount} />

            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="ml-auto text-sm text-[#8A252C] font-medium hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-400 text-lg">No notifications found.</p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onClick={() => handleNotificationClick(n)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

// --- Sub Components ---

function FilterButton({ label, active, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-[#8A252C] text-white shadow-md transform scale-105"
          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
      {count > 0 && (
        <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${active ? "bg-white/20" : "bg-gray-100"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function NotificationItem({ notification, onClick }: { notification: Notification; onClick: () => void }) {
  const isUnread = !notification.isRead;
  let icon = "📢";
  let colorClass = "bg-blue-100 text-blue-700";
  let iconBgClass = "bg-blue-50";

  if (notification.type === "LIKE") {
    icon = "❤️";
    colorClass = "text-red-600";
    iconBgClass = "bg-red-50";
  } else if (notification.type === "REPLY") {
    icon = "💬";
    colorClass = "text-green-600";
    iconBgClass = "bg-green-50";
  }

  return (
    <div
      onClick={onClick}
      // ✅ IMPROVED STYLING LOGIC
      className={`relative p-5 rounded-xl border transition-all cursor-pointer group ${
        isUnread
          ? "bg-white border-l-4 border-l-[#8A252C] border-y-gray-200 border-r-gray-200 shadow-md transform hover:-translate-y-0.5"
          : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md" // Read items are now clean cards
      }`}
    >
      <div className="flex gap-4 items-start">
        {/* Icon Circle */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${iconBgClass} ${colorClass}`}>
          {icon}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className={`text-base font-bold truncate pr-2 ${isUnread ? "text-gray-900" : "text-gray-700"}`}>
              {notification.title}
            </h3>
            
            {/* Date and Dot Grouped */}
            <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs whitespace-nowrap ${isUnread ? "text-gray-500 font-medium" : "text-gray-400"}`}>
                    {new Date(notification.createdAt).toLocaleDateString()}
                </span>
                {isUnread && (
                    <span className="w-2.5 h-2.5 bg-[#8A252C] rounded-full animate-pulse shadow-sm"></span>
                )}
            </div>
          </div>
          
          <p className={`mt-1 text-sm leading-relaxed ${isUnread ? "text-gray-800" : "text-gray-500"}`}>
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}