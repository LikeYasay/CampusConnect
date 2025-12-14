"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { getToken, removeToken, subscribeToAuth, getUserFromToken, fetchUserData } from "@/lib/auth";
import { messageAPI } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Bell, MessageCircle, Shield } from "lucide-react"; 

interface UserData {
  name?: string;
  profileImageUrl?: string;
  role?: string;
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [unreadMsgCount, setUnreadMsgCount] = useState(0); 
  const [unreadNotifCount, setUnreadNotifCount] = useState(0); 

  const router = useRouter();
  const pathname = usePathname();

  const updateUser = useCallback(async () => {
    const decoded = getUserFromToken();
    if (decoded?.userId) {
      const fullUser = await fetchUserData(decoded.userId).catch(() => null);
      setUser({
        name: fullUser?.name || decoded.name || "User",
        profileImageUrl: fullUser?.profileImageUrl || decoded.profileImageUrl || "/profile.png",
        role: fullUser?.role || decoded.role || "USER",
      });
    } else {
      setUser(null);
    }
  }, []);

  const fetchCounts = useCallback(async () => {
    const token = getToken();
    if (!token) {
        setUnreadMsgCount(0);
        setUnreadNotifCount(0);
        return;
    }

    try {
      const msgCount = await messageAPI.getUnreadCount();
      setUnreadMsgCount(msgCount);

      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
      const notifRes = await fetch(`${API_URL}/notifications/unread-count`, {
          headers: { "Authorization": `Bearer ${token}` }
      });
      if (notifRes.ok) {
          const data = await notifRes.json();
          setUnreadNotifCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  }, []);

  useEffect(() => {
    const sendHeartbeat = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
        await fetch(`${API_URL}/users/heartbeat`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        });
      } catch (err) { console.error("Heartbeat failed:", err); }
    };

    if (getToken()) {
        sendHeartbeat();
        fetchCounts();
    }

    const intervalId = setInterval(() => {
        if (getToken()) {
            sendHeartbeat();
            fetchCounts();
        }
    }, 60000);

    const handleUpdateEvent = () => fetchCounts();
    window.addEventListener("update-nav-counts", handleUpdateEvent);

    return () => {
        clearInterval(intervalId);
        window.removeEventListener("update-nav-counts", handleUpdateEvent);
    };
  }, [fetchCounts]);

  useEffect(() => {
    setMounted(true);
    updateUser();
    
    const unsubscribe = subscribeToAuth(() => {
      updateUser();
      fetchCounts();
    });

    return () => unsubscribe();
  }, [updateUser, fetchCounts]);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    router.push("/login");
  };

  const formatDisplayName = (fullName = "User") => {
    const first = fullName.trim().split(" ")[0];
    return first.length > 12 ? first.slice(0, 12) + "…" : first;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || (pathname === "/" && !!getToken());
    return pathname.startsWith(href);
  };

  const linkClasses = (href: string) =>
    `transition ${
      isActive(href) ? "text-[#8a252c] font-bold border-b-2 border-[#8a252c] pb-1" : "hover:text-[#8a252c]"
    }`;

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2">
          <div className="flex items-center gap-3">
            <Image src="/CIT_LOGO.png" alt="CIT-U Logo" width={48} height={48} priority />
            <div className="leading-tight">
              <p className="text-[#8a252c] font-bold text-base sm:text-lg">CAMPUS CONNECT</p>
              <p className="text-[#ffcf01] text-[11px] sm:text-xs font-semibold -mt-0.5">WILDCAT Community</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const isLoggedIn = !!user;
  const displayName = user?.name ? formatDisplayName(user.name) : "User";
  const profileImg = user?.profileImageUrl || "/profile.png";
  const isAdmin = user?.role === "ADMIN" || user?.role === "admin";
  const isAdminActive = pathname.startsWith("/admin");

  
  const isNotifActive = pathname.startsWith("/notifications");
  const isMsgActive = pathname.startsWith("/messages");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex items-center gap-3">
          <Image src="/CIT_LOGO.png" alt="CIT-U Logo" width={48} height={48} priority />
          <div className="leading-tight">
            <p className="text-[#8a252c] font-bold text-base sm:text-lg">CAMPUS CONNECT</p>
            <p className="text-[#ffcf01] text-[11px] sm:text-xs font-semibold -mt-0.5">WILDCAT Community</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm lg:text-base">
            <Link href="/" className={linkClasses("/")}>Home</Link>
            
            {/* ✅ REDESIGNED ADMIN BUTTON */}
            
            {isLoggedIn && (
              <>
                <Link href="/forum" className={linkClasses("/forum")}>Forum</Link>
                <Link href="/lost-and-found" className={linkClasses("/lost-and-found")}>Lost & Found</Link>
              </>
            )}
            <Link href="/team" className={linkClasses("/team")}>Our Team</Link>
            <Link href="/contact" className={linkClasses("/contact")}>Contact Us</Link>

            {isAdmin && (
              <Link 
                href="/admin/dashboard" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isAdminActive 
                    ? "bg-[#8A252C] text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

          </nav>

          {isLoggedIn && (
            <div className="flex items-center gap-4">
                
                {/* 1. NOTIFICATIONS ICON */}
                <Link href="/notifications" className="relative hover:opacity-80 transition group">
                    <Bell 
                        className={`w-6 h-6 transition-transform group-hover:scale-105 ${
                            isNotifActive ? "text-[#8A252C] fill-[#8A252C]" : "text-[#8A252C]"
                        }`} 
                        strokeWidth={isNotifActive ? 0 : 2}
                    />
                    {unreadNotifCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center border-2 border-white">
                            <p className="text-[10px] font-bold text-white">{unreadNotifCount > 9 ? '9+' : unreadNotifCount}</p>
                        </div>
                    )}
                </Link>

                {/* 2. MESSAGES ICON */}
                <Link href="/messages" className="relative hover:opacity-80 transition group">
                    <MessageCircle 
                        className={`w-6 h-6 transition-transform group-hover:scale-105 ${
                            isMsgActive ? "text-[#8A252C] fill-[#8A252C]" : "text-[#8A252C]"
                        }`} 
                        strokeWidth={isMsgActive ? 0 : 2}
                    />
                    {unreadMsgCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center border-2 border-white">
                            <p className="text-[10px] font-bold text-black">{unreadMsgCount > 9 ? '9+' : unreadMsgCount}</p>
                        </div>
                    )}
                </Link>
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition group">
                <div className="w-9 h-9 rounded-full border-2 border-gray-100 overflow-hidden ring-2 ring-transparent group-hover:ring-[#8A252C]/10 transition-all">
                  <Image src={profileImg} alt="Profile" width={36} height={36} className="w-full h-full object-cover" unoptimized />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 leading-none">{displayName}</span>
                  <span className="text-[10px] text-gray-400 font-medium">View Profile</span>
                </div>
              </Link>
              
              {/* LOGOUT BUTTON */}
              <button 
                onClick={handleLogout} 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors group relative"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/register" className="bg-[#8a252c] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-sm">Join Community</Link>
              <Link href="/login" className="bg-[#ffd700] text-black px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-sm">Login</Link>
            </div>
          )}
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setOpen((v) => !v)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white shadow-lg absolute w-full left-0 top-full">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="/" className={`py-2 px-2 rounded-md ${linkClasses("/")}`}>Home</Link>
            
            
            {isLoggedIn && (
              <>
                <Link href="/forum" className={`py-2 px-2 rounded-md ${linkClasses("/forum")}`}>Forum</Link>
                <Link href="/lost-and-found" className={`py-2 px-2 rounded-md ${linkClasses("/lost-and-found")}`}>Lost & Found</Link>
                <Link href="/notifications" className={`py-2 px-2 rounded-md ${linkClasses("/notifications")} flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                        <Bell className={`w-4 h-4 ${isNotifActive ? "fill-[#8A252C] text-[#8A252C]" : ""}`} />
                        Notifications
                    </div>
                    {unreadNotifCount > 0 && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadNotifCount}</span>}
                </Link>
                <Link href="/messages" className={`py-2 px-2 rounded-md ${linkClasses("/messages")} flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                        <MessageCircle className={`w-4 h-4 ${isMsgActive ? "fill-[#8A252C] text-[#8A252C]" : ""}`} />
                        Messages
                    </div>
                    {unreadMsgCount > 0 && <span className="bg-[#FFD700] text-black text-xs font-bold px-2 py-0.5 rounded-full">{unreadMsgCount}</span>}
                </Link>
              </>
            )}
            <Link href="/team" className={`py-2 px-2 rounded-md ${linkClasses("/team")}`}>Our Team</Link>
            <Link href="/contact" className={`py-2 px-2 rounded-md ${linkClasses("/contact")}`}>Contact Us</Link>

            {isAdmin && (
                <Link href="/admin/dashboard" className="flex items-center gap-2 py-2 px-2 rounded-md text-gray-700 font-bold bg-gray-50">
                    <Shield className="w-4 h-4 text-[#8A252C]" />
                    Admin Panel
                </Link>
            )}


            {isLoggedIn && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/profile" className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden">
                    <Image src={profileImg} alt="Profile" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </Link>
                
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg font-semibold hover:bg-red-100 transition">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}

            {!isLoggedIn && (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2">
                <Link href="/register" className="w-full bg-[#8a252c] text-white text-center py-2.5 rounded-lg font-bold shadow-sm">Join Community</Link>
                <Link href="/login" className="w-full bg-[#ffd700] text-black text-center py-2.5 rounded-lg font-bold shadow-sm">Login</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}