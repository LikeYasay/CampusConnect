"use client"

import { useEffect, useState } from "react"
import { lostFoundAPI, forumAPI, discussionAPI } from "@/lib/api"
import { getToken } from "@/lib/auth"
import HeroSection from "@/components/home/hero-section"
import LostFoundSection from "@/components/home/lost-found-section"
import ForumSection from "@/components/home/forum-section"
import CTASection from "@/components/home/cta-section"

type LostItem = {
  id: number
  status: "LOST" | "FOUND"
  title: string
  description: string
  location: string
  category: string
  createdAt: string
  imageUrl?: string
}

interface ForumSummary {
  id: number
  title?: string
  createdAt?: string
  user?: { name?: string }
  category?: string
}

export default function HomePage() {
  const [lostItems, setLostItems] = useState<LostItem[]>([])
  const [forumItems, setForumItems] = useState<ForumSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ items: 0, found: 0, posts: 0, users: 0 })
  const [repliesMap, setRepliesMap] = useState<Record<number, number>>({})
  const isLoggedIn = !!getToken()

  useEffect(() => {
    let mounted = true

    const fetchActiveUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/active/list`)
        if (!mounted) return
        if (res.ok) {
          const data = await res.json()
          
          const onlineCount = Array.isArray(data) 
            ? data.filter((u: any) => u.isOnline === true).length 
            : 0;

          setStats((s) => ({ ...s, users: onlineCount }))
        }
      } catch {}
    }

    const fetchForumData = async () => {
      try {
        const [forums, discussions] = await Promise.all([
          forumAPI.getAll().catch(() => []),
          discussionAPI.getAll().catch(() => []),
        ])
        if (!mounted) return

        const forumsArr = Array.isArray(forums) ? forums : []
        setForumItems(forumsArr.slice(0, 3))

        const map: Record<number, number> = {}
        if (Array.isArray(discussions)) {
          discussions.forEach((d: any) => {
            const forumId = d.forum?.id ?? d.forumId
            if (typeof forumId === "number") {
              map[forumId] = (map[forumId] || 0) + 1
            }
          })
        }
        setRepliesMap(map)
      } catch {}
    }

    const fetchAllData = async () => {
      try {
        const [itemsRes, forumsRes] = await Promise.allSettled([
          lostFoundAPI.getAll(),
          forumAPI.getAll(),
        ])

        const items =
          itemsRes.status === "fulfilled" && Array.isArray(itemsRes.value)
            ? itemsRes.value
            : []

        const forums =
          forumsRes.status === "fulfilled" && Array.isArray(forumsRes.value)
            ? forumsRes.value
            : []

        setLostItems(items.slice(0, 3))

        setStats(prev => ({
          ...prev,
          items: items.length,
          found: items.filter((i: any) => i.status === "FOUND").length,
          posts: forums.length,
        }))
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchActiveUsers()
    fetchForumData()
    fetchAllData()

    return () => {
      mounted = false
    }
  }, [])

  
  const STATS = [
    { value: String(stats.items), label: "Items Reported", color: "text-red-600" },
    { value: String(stats.found), label: "Items Found", color: "text-green-600" },
    { value: String(stats.posts), label: "Forum Posts", color: "text-blue-600" },
    { value: String(stats.users), label: "Online Users", color: "text-yellow-600" }, 
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8a252c]"></div>
      </div>
    )
  }

  return (
    <main className="bg-white">
      <HeroSection stats={STATS}/>

      {/* Lost & Found + Forum */}
      <section className="mx-auto max-w-6xl px-4 mt-10 md:mt-14 pb-6">
        <div className="grid gap-6 md:grid-cols-2">
          <LostFoundSection items={lostItems} />
          <ForumSection forums={forumItems} repliesMap={repliesMap} loggedIn={isLoggedIn} />
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && <CTASection />}
    </main>
  )
}