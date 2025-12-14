"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notificationAPI } from "@/lib/api";


interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "urgent" | "success" | "warning" | string;
  isRead: boolean;
  createdAt: string;
}


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all");

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      
      setNotifications(response.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    try {
      await notificationAPI.markAsRead(id);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handleMarkAllRead = async () => {
     
     setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
     
     try {
       
       
     } catch(e) { console.error(e); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A252C]"></div>
      </div>
    );
  }

  
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  
  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.isRead;
    if (filter === "urgent") return n.type === "urgent";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col">
        
        {/* Back Nav */}
        <Link href="/home" className="text-sm font-medium text-gray-500 hover:text-[#8A252C] mb-6 flex items-center gap-2">
           <span>←</span> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#8A252C] tracking-tight">Notifications</h1>
            <p className="text-lg text-gray-600 mt-2">Stay updated with your campus activities</p>
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
            <FilterButton label="Urgent" active={filter === "urgent"} onClick={() => setFilter("urgent")} />
            
            {/* Mark all read button */}
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
                <NotificationItem key={n.id} notification={n} onRead={() => handleMarkAsRead(n.id)} />
              ))
            )}
        </div>

      </div>
    </div>
  );
}



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
            {count > 0 && <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{count}</span>}
        </button>
    );
}

function NotificationItem({ notification, onRead }: { notification: Notification, onRead: () => void }) {
    const isUnread = !notification.isRead;
    
    
    let icon = "📢";
    let colorClass = "bg-blue-100 text-blue-700";
    
    if (notification.type === "urgent") {
        icon = "⚠️";
        colorClass = "bg-red-100 text-red-700";
    } else if (notification.type === "success") {
        icon = "✅";
        colorClass = "bg-green-100 text-green-700";
    }

    return (
        <div 
            onClick={onRead}
            className={`relative p-5 rounded-xl border transition-all cursor-pointer group ${
                isUnread 
                ? "bg-white border-l-4 border-l-[#8A252C] border-y-gray-200 border-r-gray-200 shadow-md" 
                : "bg-gray-50 border-transparent hover:bg-white hover:shadow-sm"
            }`}
        >
            <div className="flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${colorClass}`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className={`text-base font-bold ${isUnread ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                            {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className={`mt-1 text-sm ${isUnread ? "text-gray-800" : "text-gray-500"}`}>
                        {notification.message}
                    </p>
                </div>
                
                {/* Unread Dot */}
                {isUnread && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-[#8A252C] rounded-full animate-pulse"></div>
                )}
            </div>
        </div>
    );
}