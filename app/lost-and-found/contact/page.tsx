"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { lostFoundAPI, messageAPI } from "@/lib/api";
import { getUserFromToken } from "@/lib/auth";
import RequireAuth from "@/components/auth/require-auth";
import { Lightbulb, Shield } from "lucide-react";

interface UserType {
  userId: number;
  name: string;
  email: string;
  profileImageUrl?: string;
  isOnline?: boolean;
}

interface Item {
  id: number;
  title: string;
  location: string;
  status: "LOST" | "FOUND";
  imageUrl?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  user?: UserType;
}

export default function LostFoundContactPage() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");

  const [item, setItem] = useState<Item | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  /* Fetch Item */
  useEffect(() => {
    if (!itemId) return;

    const fetchItem = async () => {
      try {
        const data = await lostFoundAPI.getById(Number(itemId));
        setItem(data);
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const loggedUser = getUserFromToken();
  const loggedInUserId = loggedUser?.userId;
  const isOwner =
    loggedInUserId && item?.user?.userId && loggedInUserId === item.user.userId;

  // Check Online Status
  const isUserOnline = item?.user?.isOnline === true;

  /* Send Message */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !item.user) return;
    if (!message.trim()) return;
    if (isOwner) return;

    if (!loggedUser) return;

    setSendingMessage(true);

    try {
      // Send the message using the messageAPI
      await messageAPI.send(item.user.userId, message);

      setMessage("");
      setSuccessPopup(true);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSendingMessage(false);
    }
  };

  /* Loading UI */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8A252C]"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500 font-medium">Item not found.</p>
        <Link
          href="/lost-and-found"
          className="text-[#8A252C] hover:underline font-bold"
        >
          Back to Lost & Found
        </Link>
      </div>
    );
  }

  const ownerPic = item.user?.profileImageUrl || "/profile.png";

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2">
          <Link
            href="/lost-and-found"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8A252C] hover:text-[#701e23] transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
          >
            <span>←</span> Back to Lost & Found
          </Link>
        </div>

        <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-8 px-6 mb-20">
          {/* LEFT SECTION: CONTACT FORM & ITEM PREVIEW */}
          <section className="flex-1 flex flex-col gap-8">
            {/* 1. CONTACT FORM CARD */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
              <div className="border-b border-gray-100 pb-6 mb-6">
                <h1 className="text-2xl font-extrabold text-[#8A252C] mb-1">
                  Contact Owner
                </h1>
                <p className="text-gray-500 text-sm">
                  Send a secure message to arrange a meetup.
                </p>
              </div>

              {/* Recipient Info */}
              <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 relative">
                  <Image
                    src={ownerPic}
                    alt="Owner"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {item.user?.name || "Anonymous"}
                  </p>
                  
                  {/* Dynamic Online Status */}
                  <div className="flex items-center gap-2">
                    <span 
                        className={`w-2 h-2 rounded-full ${isUserOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                    ></span>
                    <p className={`text-xs font-medium ${isUserOnline ? 'text-green-600' : 'text-gray-500'}`}>
                      {isUserOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>

                </div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="space-y-4">
                {isOwner ? (
                  <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 p-6 rounded-xl text-center">
                    <span className="text-2xl block mb-2">⚠️</span>
                    <p className="font-bold">This is your item.</p>
                    <p className="text-sm mt-1">
                      You cannot send a message to yourself.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Hi ${
                          item.user?.name || "there"
                        }, I think I found your item...`}
                        className="w-full border border-gray-300 bg-white rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all h-40 resize-none placeholder-gray-400"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={sendingMessage}
                      className="w-full bg-[#8A252C] text-white font-bold py-4 rounded-xl shadow-md hover:bg-[#701e23] disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.99]"
                    >
                      {sendingMessage ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* 2. ITEM REFERENCED CARD */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              
              {/* ✅ CONDITIONAL IMAGE RENDERING */}
              {item.imageUrl && (
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
              )}
              
              <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          item.status === "LOST" ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"
                      }`}>
                          {item.status}
                      </span>
                      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                          {item.category}
                      </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {item.location}
                  </p>

                  <Link
                    href={`/lost-and-found/view?id=${item.id}`}
                    className="text-sm font-bold text-[#8A252C] hover:underline inline-flex items-center gap-1"
                  >
                    View Full Item Details <span>→</span>
                  </Link>
              </div>
            </div>

          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-[360px] flex flex-col gap-6">

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#8A252C] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tips for Success
              </h3>
              <ul className="space-y-4">
                {[
                    { title: "Be Specific", text: "Mention specific details to verify ownership." },
                    { title: "Act Quickly", text: "Send a message as soon as you can." },
                    { title: "Ask for Proof", text: "If returning an item, ask for photos or unique ID." }
                ].map((tip, i) => (
                    <li key={i} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold text-sm text-gray-900">{tip.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{tip.text}</p>
                    </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#8A252C] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Guidelines
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Meet in busy, public campus areas.
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Bring a friend if possible.
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Verify item details before handing over.
                </li>
              </ul>
            </div>

          </aside>

        </main>

        {/* SUCCESS POPUP */}
        {successPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center w-[300px] animate-popup border border-gray-100">
              
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={3} stroke="#16A34A"
                    className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M5 13l4 4L19 7"/>
                </svg>
              </div>

              <p className="text-xl font-bold text-gray-900">Message Sent!</p>
              <p className="text-sm text-gray-500 mt-2 mb-6">The owner has been notified.</p>

              <button
                onClick={() => setSuccessPopup(false)}
                className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Close
              </button>

            </div>
          </div>
        )}

        <style jsx>{`
          .animate-popup {
            animation: popupAnim 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes popupAnim {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

      </div>
    </RequireAuth>
    
  );
}