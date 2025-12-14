"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { messageAPI } from "@/lib/api";
import axios from "axios"; 
import { ConversationListSkeleton, ChatSkeleton } from "@/components/shared/skeleton";
import RequireAuth from "@/components/auth/require-auth";

interface Conversation {
  id: string; 
  participantId: string;
  participantName: string;
  participantRole?: string; 
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean; 
}

interface ActiveUser {
  userId: number;
  name: string;
  role?: string; 
  isOnline: boolean;
  isActive: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            setCurrentUserId(payload.userId?.toString() || "");
        } catch (e) {
            console.error("Token decode error:", e);
        }
    }
  }, []);

  const fetchConversationsData = useCallback(async () => {
    try {
        const token = localStorage.getItem("authToken");
        const [convRes, activeRes] = await Promise.all([
            messageAPI.getConversations(),
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/users/active/list`, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => ({ data: [] })) 
        ]);

        const fetchedConversations: any[] = convRes.data || []; 
        const activeUsers: ActiveUser[] = activeRes.data || [];

        const mergedConversations: Conversation[] = fetchedConversations.map(conv => {
            const isActiveUser = activeUsers.find(
                u => u.userId.toString() === conv.participantId?.toString() && u.isOnline
            );

            
            const role = conv.participantRole 
                      || conv.participant?.role 
                      || isActiveUser?.role 
                      || "USER";

            return {
                id: conv.id,
                participantId: conv.participantId,
                participantName: conv.participantName,
                participantAvatar: conv.participantAvatar,
                participantRole: role, 
                lastMessage: conv.lastMessage,
                lastMessageTime: conv.lastMessageTime,
                unreadCount: conv.unreadCount,
                isOnline: !!isActiveUser 
            };
        });

        setConversations(mergedConversations);
        return mergedConversations;
    } catch (error) {
        console.error("Fetch conversations failed:", error);
        return [];
    }
  }, []);

  const fetchMessages = useCallback(async (participantId: string) => {
    try {
      const response = await messageAPI.getMessages(participantId);
      setMessages(response.data || []);
      
      setConversations(prev => prev.map(c => 
        c.participantId === participantId ? { ...c, unreadCount: 0 } : c
      ));

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("update-nav-counts"));
      }

    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
        const convs = await fetchConversationsData();
        if (loading && convs.length > 0 && !selectedConversation) {
            setSelectedConversation(convs[0]);
        }
        setLoading(false);
    };
    init();

    const interval = setInterval(() => {
        fetchConversationsData();
    }, 5000); 

    return () => clearInterval(interval);
  }, [fetchConversationsData, loading, selectedConversation]);

  useEffect(() => {
    if (!selectedConversation) return;

    fetchMessages(selectedConversation.participantId);

    const interval = setInterval(() => {
        fetchMessages(selectedConversation.participantId);
    }, 3000); 

    return () => clearInterval(interval);
  }, [selectedConversation, fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const tempContent = newMessage;
    setNewMessage(""); 

    try {
      const tempMsg: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: "Me",
        content: tempContent,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, tempMsg]);

      await messageAPI.send(selectedConversation.participantId, tempContent);
      
      fetchMessages(selectedConversation.participantId);
      fetchConversationsData();

    } catch (error) {
      console.error("Failed to send:", error);
      alert("Failed to send message.");
      setNewMessage(tempContent); 
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[88dvh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-4 px-3 py-3 flex-1 min-h-0">
          {/* Left sidebar skeleton */}
          <div className="w-full lg:w-[380px] bg-white/80 rounded-2xl p-5">
            <ConversationListSkeleton />
          </div>
          {/* Right chat skeleton */}
          <div className="flex-1 bg-white/80 rounded-2xl p-6">
            <ChatSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="h-[88dvh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-4 px-4 py-4 flex-1 min-h-0">
          
          {/* LEFT SIDEBAR - Conversations List */}
          <div className="w-full lg:w-[380px] bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl flex flex-col overflow-hidden h-full">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 shrink-0 bg-gradient-to-r from-[#8A252C] to-[#6d1f24] text-white">
              <h1 className="text-xl font-bold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                Messages
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">No conversations found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.participantId}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50/80 transition-all duration-200 ${
                        selectedConversation?.participantId === conv.participantId 
                          ? "bg-gradient-to-r from-[#8A252C]/5 to-transparent border-l-4 border-l-[#8A252C]" 
                          : "border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                          <img 
                            src={conv.participantAvatar || "/profile.png"} 
                            alt={conv.participantName} 
                            className="w-full h-full object-cover bg-gray-200"
                          />
                        </div>
                        {conv.isOnline && (
                          <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-3 border-white shadow-sm"></span>
                        )}
                        {conv.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#8A252C] to-[#6d1f24] text-white text-xs font-bold min-w-[22px] h-[22px] px-1.5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <h3 className="font-bold text-gray-900 truncate text-base">{conv.participantName}</h3>
                            
                            {/* ✅ Admin Badge in List - Now using the correctly mapped role */}
                            {(conv.participantRole === "ADMIN" || conv.participantRole === "admin") && (
                              <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
                                Admin
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-2 font-medium">
                            {new Date(conv.lastMessageTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Chat Window */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl flex flex-col overflow-hidden h-full">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-5 border-b border-gray-100 flex items-center gap-4 bg-gradient-to-r from-white to-gray-50/50 shrink-0">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 shadow-md">
                      <img 
                        src={selectedConversation.participantAvatar || "/profile.png"} 
                        alt="Avatar" 
                        className="w-full h-full object-cover bg-gray-200"
                      />
                    </div>
                    {selectedConversation.isOnline && (
                      <span className="absolute bottom-0 right-0 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-gray-900 text-lg">{selectedConversation.participantName}</h2>
                      
                      {/* ✅ Admin Badge in Header - using correctly mapped role */}
                      {(selectedConversation.participantRole === "ADMIN" || selectedConversation.participantRole === "admin") && (
                        <span className="text-[9px] font-bold bg-[#8A252C] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                          Admin
                        </span>
                      )}
                    </div>
                    
                    {selectedConversation.isOnline ? (
                      <p className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                        Active now
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span> 
                        Offline
                      </p>
                    )}
                  </div>
                  <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
                </div>

                {/* Messages Area */}
                <div 
                  ref={chatContainerRef} 
                  className="flex-1 overflow-y-auto p-6 space-y-3 scroll-smooth"
                  style={{
                    background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)'
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <span className="text-5xl">👋</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-600 mb-1">Start the conversation</p>
                      <p className="text-sm text-gray-400">Send a message to get things started</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isMe = msg.senderId.toString() === currentUserId;
                      return (
                        <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}>
                          <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md transition-all hover:shadow-lg ${
                            isMe 
                              ? "bg-gradient-to-br from-[#8A252C] to-[#6d1f24] text-white rounded-br-sm" 
                              : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                            <p className={`text-[10px] mt-1.5 text-right font-medium ${isMe ? "text-white/70" : "text-gray-400"}`}>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input */}
                <div className="p-5 border-t border-gray-100 bg-white shrink-0">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="w-full pl-5 pr-12 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#8A252C] focus:ring-4 focus:ring-[#8A252C]/10 transition text-sm bg-gray-50/50"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-br from-[#8A252C] to-[#6d1f24] text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:shadow-xl hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-lg group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50/50 to-white">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-gray-600 mb-2">Select a conversation</p>
                <p className="text-sm text-gray-400">Choose from your existing conversations</p>
                <p className="text-sm text-gray-400">or start a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}