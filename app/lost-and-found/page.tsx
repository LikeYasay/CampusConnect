"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { lostFoundAPI } from "@/lib/api";
import { ShieldCheck, MapPin, Zap } from "lucide-react";
import RequireAuth from "@/components/auth/require-auth";
import axios from "axios"; // ✅ Added axios for fetching active users

// --- TYPES ---
interface LostItem {
  id: number;
  status: "LOST" | "FOUND";
  title: string;
  description: string;
  location: string;
  category: string;
  createdAt: string;
  imageUrl?: string | null;
  user?: {
    userId: number;
    name: string;
    profileImageUrl?: string;
  };
}

// --- HELPER COMPONENT: User Avatar ---
const UserAvatar = ({ name, src }: { name: string; src?: string }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={40}
        height={40}
        className="rounded-full object-cover w-10 h-10 border border-gray-200"
        unoptimized
      />
    );
  }
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700"
  ];
  const colorClass = colors[name.length % colors.length];

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${colorClass} ring-2 ring-white`}>
      {initial}
    </div>
  );
};

export default function LostAndFoundPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ New State for Online Count
  const [onlineCount, setOnlineCount] = useState(0);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // 1. Fetch Items
        const data = await lostFoundAPI.getAll();
        const allItems = Array.isArray(data) ? data : [];
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setItems(sortedItems);
        setFilteredItems(sortedItems);

        // 2. Fetch Real Online Users Count
        try {
            const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/users/active/list`, {
                 headers: { Authorization: `Bearer ${token}` }
            });
            // If the API returns a list, count the length
            setOnlineCount(Array.isArray(usersRes.data) ? usersRes.data.length : 0);
        } catch (e) {
            console.log("Could not fetch active users, defaulting to 1");
            setOnlineCount(1);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    let result = items;
    if (search) {
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter !== "All Categories") {
      result = result.filter((i) => i.category === categoryFilter);
    }
    if (statusFilter !== "All Status") {
      result = result.filter((i) => i.status === statusFilter);
    }
    setFilteredItems(result);
    setCurrentPage(1);
  }, [search, categoryFilter, statusFilter, items]);

  const totalPages = Math.ceil(filteredItems.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Updated Stats Logic
  const itemsFound = items.filter((i) => i.status === "FOUND").length;
  const itemsLost = items.filter((i) => i.status === "LOST").length; // Replaced Active Users with Items Lost
  const itemsReported = items.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8A252C]"></div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-[550px] flex flex-col items-center justify-center text-center overflow-hidden">
          <Image
            src="/CIT_GLE_HALLWAY.jpg"
            alt="CIT-U Hallway"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 px-4">
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight">
              <span className="text-[#FFD700]">Lost</span>
              <span className="text-white"> &amp; </span>
              <span className="text-[#8A252C]">Found</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
              Help reunite items with their owners within the campus.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href="/lost-and-found/report" className="bg-[#FFD700] text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1">
                REPORT ITEM
              </Link>
              <button
                onClick={() => document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-white/20 transition transform hover:-translate-y-1"
              >
                BROWSE ITEMS
              </button>
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            {[
              { label: "Items Found", count: itemsFound, color: "text-green-600" },
              { label: "Items Lost", count: itemsLost, color: "text-[#8A252C]" }, // ✅ Changed from Active Users to Items Lost
              { label: "Online Now", count: onlineCount, color: "text-orange-600" }, // ✅ Now uses real data
              { label: "Total Reports", count: itemsReported, color: "text-blue-600" },
            ].map((stat, i) => (
              <div key={i} className="text-center border-r last:border-r-0 border-gray-100">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-gray-500 uppercase font-semibold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- FILTER BAR --- */}
        <section className="max-w-7xl mx-auto mt-12 px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex-1 w-full md:w-auto flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8A252C] outline-none cursor-pointer">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Bags</option>
                <option>Personal Items</option>
                <option>Keys</option>
                <option>Documents</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8A252C] outline-none cursor-pointer">
                <option>All Status</option>
                <option>LOST</option>
                <option>FOUND</option>
              </select>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 font-medium px-1">Showing {filteredItems.length} results</p>
        </section>

        {/* --- ITEMS LIST --- */}
        <section id="browse-section" className="max-w-7xl mx-auto mt-6 px-6 space-y-6 pb-20">
          {currentItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">No items match your search.</p>
            </div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#8A252C]/30 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row min-h-[220px]"
              >
                {/* CARD IMAGE (Left Side) */}
                <div className="sm:w-56 h-56 sm:h-auto relative flex-shrink-0 bg-gray-100 flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="text-gray-300 flex flex-col items-center">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className="text-xs font-medium">No Image</span>
                    </div>
                  )}

                  {/* Status Badge (Mobile) */}
                  <div className="absolute top-2 left-2 sm:hidden">
                    <span className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${item.status === "LOST" ? "bg-white text-[#8A252C]" : "bg-white text-green-700"}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENT (Right Side) */}
                <div className="flex-1 p-6 flex flex-col">

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={item.user?.name || "A"} src={item.user?.profileImageUrl} />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.user?.name || "Anonymous"}</p>
                        <p className="text-xs text-gray-500">
                          Posted on {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* Status Badge (Desktop) */}
                    <div className="hidden sm:block">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${item.status === "LOST" ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Main Details */}
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8A252C] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {item.location}
                      </div>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Footer Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <Link href={`/lost-and-found/view?id=${item.id}`}>
                      <button className="px-5 py-2 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        View Details
                      </button>
                    </Link>
                    <Link href={`/lost-and-found/contact?id=${item.id}`}>
                      <button className="px-5 py-2 text-sm font-bold text-white bg-[#8A252C] hover:bg-[#7a2027] rounded-lg shadow-sm transition-colors">
                        Contact Owner
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${currentPage === page
                        ? "bg-[#8A252C] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </section>

        {/* --- FOOTER TIPS --- */}
        <section className="py-24 bg-white relative overflow-hidden mt-auto border-t border-gray-100">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#8A252C]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A252C]/10 text-[#8A252C] text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Community Guidelines
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
                Safety comes first. <span className="text-[#8A252C]">Always.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                We want to ensure every lost item finds its way home safely. Please follow these essential guidelines when connecting with others.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: ShieldCheck, 
                  title: "Verify Ownership", 
                  text: "Before meeting, ask for specific details like lock screen wallpapers, scratches, or unique markings." 
                },
                { 
                  icon: MapPin, 
                  title: "Public Meeting Spots", 
                  text: "Always meet in busy campus areas like the Main Library, Admin Office, or the GLE Building lobby." 
                },
                { 
                  icon: Zap, 
                  title: "Act & Reply Quickly", 
                  text: "Lost items are urgent. Respond promptly to messages to increase the chances of a successful return." 
                },
              ].map((tip, i) => (
                <div key={i} className="group relative bg-gray-50 hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gray-100">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A252C] to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl"></div>
                  <div className="w-14 h-14 bg-white group-hover:bg-[#8A252C] rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:border-[#8A252C] transition-colors duration-300">
                    <tip.icon className="w-7 h-7 text-[#8A252C] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}