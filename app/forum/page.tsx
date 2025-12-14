"use client";
import React, { useEffect, useState, useMemo } from "react";
import { forumAPI, userAPI, lostFoundAPI, discussionAPI } from "@/lib/api";

import { HeroSection } from "@/components/forum/hero-section";
import { StatsGrid } from "@/components/forum/stats-grid";
import { SearchFilters } from "@/components/forum/search-filters";
import { DiscussionsList } from "@/components/forum/discussions-list";
import { TrendingTopics } from "@/components/forum/trending-topics";
import { TopContributors } from "@/components/forum/top-contributors";
import { RelatedDiscussions } from "@/components/forum/related-discussions";
import { TipsSection } from "@/components/forum/tips-section";
import RequireAuth from "@/components/auth/require-auth";

interface Post {
  id: number;
  title: string;
  repliesCount?: number;
  description?: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  likes?: number;
  views?: number;
  tags?: string;
  createdAt?: string;
  user?: { name?: string; profileImageUrl?: string };
}

type ForumItem = Post;

export default function StudentForumPage() {
  const [forumItems, setForumItems] = useState<ForumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeMembers, setActiveMembers] = useState<number | null>(null);
  const [onlineNow, setOnlineNow] = useState<number | null>(null);
  const [itemsCount, setItemsCount] = useState<number | null>(null);
  const [repliesMap, setRepliesMap] = useState<Record<number, number>>({});

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    let mounted = true;
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [forumsRes, itemsRes, usersRes, discussionsRes, activeListRes] =
          await Promise.allSettled([
            forumAPI.getAll(),
            lostFoundAPI.getAll(),
            userAPI.getAllUsers(),
            discussionAPI.getAll(),
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/active/list`).then((r) =>
              r.ok ? r.json() : []
            ),
          ]);

        if (!mounted) return;

        // ... (Keep existing data processing logic exactly as is) ...
        const forums = forumsRes.status === "fulfilled" && Array.isArray(forumsRes.value) ? forumsRes.value : [];
        const sortedForums = forums.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
        setForumItems(sortedForums);

        const items = itemsRes.status === "fulfilled" && Array.isArray(itemsRes.value) ? itemsRes.value : [];
        setItemsCount(items.length);

        let totalUsers = 0;
        let onlineFromList = 0;
        if (usersRes.status === "fulfilled") {
           const u = usersRes.value;
           if (Array.isArray(u)) {
             totalUsers = u.length;
             onlineFromList = u.length; // Simplified for demo
           }
        }
        if (activeListRes.status === "fulfilled" && Array.isArray(activeListRes.value)) {
           onlineFromList = activeListRes.value.length;
        }

        setActiveMembers(totalUsers);
        setOnlineNow(onlineFromList);

        const discussions = discussionsRes.status === "fulfilled" && Array.isArray(discussionsRes.value) ? discussionsRes.value : [];
        const map: Record<number, number> = {};
        discussions.forEach((d: any) => {
          const forumId = d.forum?.id ?? d.forumId;
          if (typeof forumId === "number") map[forumId] = (map[forumId] || 0) + 1;
        });
        setRepliesMap(map);

      } catch (err: any) {
        console.error("Error loading forum data:", err);
        setError(err?.message || "Failed to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAllData();
    return () => { mounted = false; };
  }, []);

  // Filter Logic
  const filtered = useMemo(() => {
    return forumItems.filter((post) => {
      if (categoryFilter !== "All" && (post.category || "General") !== categoryFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (post.title || "").toLowerCase().includes(q) ||
        (post.content || post.description || "").toLowerCase().includes(q) ||
        (post.user?.name || "").toLowerCase().includes(q) ||
        (post.tags || "").toLowerCase().includes(q)
      );
    });
  }, [forumItems, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const currentPosts = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handlePageChange = (num: number) => {
    setCurrentPage(num);
    document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const totalDiscussions = forumItems.length;
  const todaysPosts = forumItems.filter(f => f.createdAt && new Date(f.createdAt).toDateString() === new Date().toDateString()).length;

  // Sidebar Helpers
  const trendingTopics = useMemo(() => {
     const counts = new Map<string, number>();
     forumItems.forEach(f => f.tags?.split(",").forEach(t => counts.set(t.trim(), (counts.get(t.trim()) || 0) + 1)));
     return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t);
  }, [forumItems]);

  const topContributors = useMemo(() => {
     const counts: Record<string, { count: number; profileImageUrl?: string }> = {};
     forumItems.forEach(f => {
       const name = f.user?.name || "Anonymous";
       if (!counts[name]) counts[name] = { count: 0, profileImageUrl: f.user?.profileImageUrl };
       counts[name].count++;
     });
     return Object.entries(counts).sort((a, b) => b[1].count - a[1].count).slice(0, 3).map(([name, data]) => ({ name, ...data }));
  }, [forumItems]);

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <HeroSection 
          totalDiscussions={totalDiscussions}
          activeMembers={activeMembers}
          onlineNow={onlineNow}
        />

        <StatsGrid
          totalDiscussions={totalDiscussions}
          activeMembers={activeMembers}
          onlineNow={onlineNow}
          todaysPosts={todaysPosts}
        />

        <SearchFilters
          search={search}
          onSearchChange={setSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={(cat) => { setCategoryFilter(cat); setCurrentPage(1); }}
        />

        <section
          id="browse-section"
          className="max-w-7xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
        >
          <DiscussionsList
            posts={currentPosts}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            repliesMap={repliesMap}
          />

          <aside className="space-y-6">
            {/* <TrendingTopics topics={trendingTopics} /> */}
            <TopContributors contributors={topContributors} />
            <RelatedDiscussions posts={forumItems} />
          </aside>
        </section>

        <TipsSection />
      </div>
    </RequireAuth>
    
  );
}