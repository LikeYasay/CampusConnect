"use client"
import { useEffect, useState } from "react"
import { lostFoundAPI, forumAPI, userAPI, discussionAPI } from "@/lib/api"
import { getToken } from "@/lib/auth"
import HeroSection from "@/components/home/hero-section"
import ActionCardsSection from "@/components/home/action-cards-section"
import LostFoundSection from "@/components/home/lost-found-section"
import ForumSection from "@/components/home/forum-section"
import CTASection from "@/components/home/cta-section"

export default function HomePage() {
  const [lostItems, setLostItems] = useState<any[]>([])
  const [forumItems, setForumItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ items: 0, found: 0, posts: 0, users: 0 })
  const [repliesMap, setRepliesMap] = useState<Record<number, number>>({})

  const isLoggedIn = !!getToken()

  useEffect(() => {
    let mounted = true

    const fetchAllData = async () => {
      try {
        const [itemsRes, forumsRes, usersRes, activeRes, discussions] = await Promise.allSettled([
          lostFoundAPI.getAll(),
          forumAPI.getAll(),
          userAPI.getAllUsers(),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/active/list`).then((r) => r.json()),
          discussionAPI.getAll().catch(() => []),
        ])

        if (!mounted) return

        
        const items = itemsRes.status === "fulfilled" && Array.isArray(itemsRes.value) ? itemsRes.value : []
        setLostItems(items.slice(0, 3))

        
        const forums = forumsRes.status === "fulfilled" && Array.isArray(forumsRes.value) ? forumsRes.value : []
        setForumItems(forums.slice(0, 3))

        
        let usersCount = 0
        if (usersRes.status === "fulfilled") {
          const u = usersRes.value
          usersCount = Array.isArray(u) ? u.length : typeof u === "number" ? u : 0
        }

        
        const activeUsersCount =
          activeRes.status === "fulfilled" && Array.isArray(activeRes.value) ? activeRes.value.length : 0

        
        setStats({
          items: items.length,
          found: items.filter((i: any) => i.status === "FOUND").length,
          posts: forums.length,
          users: activeUsersCount || usersCount,
        })

        
        const map: Record<number, number> = {}
        if (Array.isArray(discussions)) {
          discussions.forEach((d: any) => {
            const forumId = d.forum?.id ?? d.forumId
            if (typeof forumId === "number") map[forumId] = (map[forumId] || 0) + 1
          })
        }
        setRepliesMap(map)
      } catch (err) {
        console.error("Error loading home data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
    return () => {
      mounted = false
    }
  }, [])

  
  const formattedStats = [
    { value: String(stats.found), label: "Items Found", color: "text-green-600" },
    { value: String(stats.users), label: "Active Users", color: "text-blue-600" },
    { value: String(stats.users), label: "Online Now", color: "text-orange-600" },
    { value: String(stats.items), label: "Total Reports", color: "text-[#8A252C]" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#8A252C]"></div>
          <p className="text-gray-600 font-medium">Loading campus community...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* 1. Hero Section (Overlapping Stats Bar) */}
      <HeroSection stats={formattedStats} />

      {/* 2. Action Cards */}
      <section className="max-w-7xl mx-auto px-6 mt-16 mb-20">
        <ActionCardsSection />
      </section>

      {/* 3. Main Content Grid (Lists) */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Lost Items */}
          <LostFoundSection items={lostItems} />

          {/* Latest Forum Discussions */}
          <ForumSection forums={forumItems} repliesMap={repliesMap} loggedIn={isLoggedIn} />
        </div>
      </section>

      {/* 4. CTA (Only if not logged in) */}
      {!isLoggedIn && <CTASection />}
    </main>
  )
}
