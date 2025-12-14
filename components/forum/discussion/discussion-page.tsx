"use client"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { forumAPI, discussionAPI } from "@/lib/api"
import { getUserFromToken } from "@/lib/auth"
import { BackNavigation } from "./back-navigation"
import { PostHeader } from "./post-header"
import { PostContent } from "./post-content"
import { PostMetadata } from "./post-metadata"
import { PostActions } from "./post-actions"
import { RepliesSection } from "./replies-section"
import { ReplyForm } from "./reply-form"
import { TopContributorsSidebar } from "./top-contributors-sidebar"
import axios from "axios" // ✅ Import axios

interface DiscussionPageProps {
  data?: any 
}

export default function DiscussionPage({ data }: DiscussionPageProps) {
  const searchParams = useSearchParams()
  
  const id = searchParams.get("id") || data?.id

  const [post, setPost] = useState<any | null>(data || null)
  const [replies, setReplies] = useState<any[]>([]) 
  const [loading, setLoading] = useState(!data) 

  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  
  const [replyingTo, setReplyingTo] = useState<{ id: number; name: string } | null>(null)

  const [isPostLiked, setIsPostLiked] = useState(false)
  const [postLikeCount, setPostLikeCount] = useState(0)
  const [likedReplies, setLikedReplies] = useState<Record<number, boolean>>({})
  const [replyLikeCounts, setReplyLikeCounts] = useState<Record<number, number>>({})
  const [currentUser, setCurrentUser] = useState<any>(null)

  const replyFormRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const u = getUserFromToken()
    if (u) setCurrentUser(u)
  }, [])

  // ✅ NEW EFFECT: Trigger View Count on Mount
  useEffect(() => {
    if (!id) return;

    const incrementView = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
            const token = localStorage.getItem("authToken");
            
            // Calls the PUT endpoint to increment view by 1
            await axios.put(`${baseUrl}/forum/${id}/view`, {}, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" 
                }
            });
        } catch (error) {
            console.error("Failed to increment view count:", error);
        }
    };

    incrementView();
  }, [id]); // Only runs when 'id' changes (page load)

  // Fetch Post Data & Replies
  useEffect(() => {
    if (!id) return
    let mounted = true

    const fetch = async () => {
      if (!post) setLoading(true)
        
      try {
        const promises = []
        
        if (!data) {
            promises.push(forumAPI.getById(Number(id)))
        } else {
            promises.push(Promise.resolve(data))
        }

        promises.push(discussionAPI.getByForumId(Number(id)))

        const [pRes, rRes] = await Promise.allSettled(promises)

        if (!mounted) return

        if (pRes.status === "fulfilled" && pRes.value) {
            setPost(pRes.value)
        }
        
        if (rRes.status === "fulfilled" && Array.isArray(rRes.value)) {
            setReplies(rRes.value)
        }
      } catch (err) {
        console.error("[Discussion] Error fetching:", err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
    return () => { mounted = false }
  }, [id, data]) 

  const rootReplies = useMemo(() => {
    const replyMap = new Map(replies.map(r => [r.id, { ...r, children: [] }]))
    const roots: any[] = []

    replies.forEach(r => {
        if (r.parent && replyMap.has(r.parent.id)) {
            replyMap.get(r.parent.id).children.push(replyMap.get(r.id))
        } else {
            roots.push(replyMap.get(r.id))
        }
    })
    
    return roots.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [replies])


  useEffect(() => {
    const loadLikeStatuses = async () => {
      if (!post?.id && replies.length === 0) return
      if (!currentUser?.userId) return

      try {
        if (post?.id) {
          const postStatus = await forumAPI.getLikeStatus(post.id, currentUser.userId)
          setIsPostLiked(postStatus.isLiked)
          setPostLikeCount(postStatus.likeCount)
        }
        for (const reply of replies) {
           try {
             const replyStatus = await discussionAPI.getLikeStatus(reply.id, currentUser.userId)
             setLikedReplies(prev => ({ ...prev, [reply.id]: replyStatus.isLiked }))
             setReplyLikeCounts(prev => ({ ...prev, [reply.id]: replyStatus.likeCount }))
           } catch {}
        }
      } catch (err) { console.error(err) }
    }
    loadLikeStatuses()
  }, [post?.id, replies, currentUser?.userId])

  const handleToggleLikePost = useCallback(async () => {
    if (!currentUser?.userId) { router.push("/login"); return; }
    if (!post?.id) return
    try {
      const result = await forumAPI.like(post.id, currentUser.userId)
      setIsPostLiked(result.isLiked)
      setPostLikeCount(result.likeCount)
    } catch (err) { console.error(err) }
  }, [post?.id, currentUser?.userId, router])

  const handleLikeReply = useCallback(async (replyId: number) => {
    if (!currentUser?.userId) { router.push("/login"); return; }
    try {
      const result = await discussionAPI.like(replyId, currentUser.userId)
      setLikedReplies(prev => ({ ...prev, [replyId]: result.isLiked }))
      setReplyLikeCounts(prev => ({ ...prev, [replyId]: result.likeCount }))
    } catch (err) { console.error(err) }
  }, [currentUser?.userId, router])


  const handleReplyTo = useCallback((replyId: number, username: string) => {
    setReplyingTo({ id: replyId, name: username })
    setShowReplyForm(true)
    setReplyMessage(`@${username} `)
    
    setTimeout(() => {
        replyFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }, [])

  const handleSendReply = useCallback(async (e?: any) => {
      if (e?.preventDefault) e.preventDefault()
      if (!replyMessage.trim()) return
      const user = getUserFromToken()
      if (!user?.userId || !post?.id) {
        if(!user?.userId) router.push("/login")
        return
      }

      setSendingReply(true)
      try {
        const payload: any = {
          forum: { id: post.id },
          user: { userId: user.userId },
          content: replyMessage.trim(),
        }

        if (replyingTo) {
            payload.parent = { id: replyingTo.id }
        }

        const created = await discussionAPI.create(payload)

        if (created?.id) {
          setReplies((r) => [created, ...r]) 
        } else {
          const fresh = await discussionAPI.getByForumId(post.id)
          setReplies(Array.isArray(fresh) ? fresh : [])
        }
        
        setReplyMessage("")
        setShowReplyForm(false)
        setReplyingTo(null)
      } catch (err) {
        console.error("Reply failed:", err)
        alert("Failed to send reply")
      } finally {
        setSendingReply(false)
      }
    },
    [replyMessage, post, router, replyingTo],
  )

  const topContributors = useCallback(() => {
    if (!post && replies.length === 0) return []
    const counts: Record<string, any> = {}

    if (post?.user?.name) {
      counts[post.user.name] = {
        count: 1,
        profileImageUrl: post.user.profileImageUrl || "/profile.png",
      }
    }

    replies.forEach((r) => {
      const name = r.user?.name || "Anonymous"
      if (!counts[name]) {
        counts[name] = {
          count: 1,
          profileImageUrl: r.user?.profileImageUrl || "/profile.png",
        }
      } else {
        counts[name].count += 1
      }
    })

    return Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([name, data]) => ({ name, count: data.count, profileImageUrl: data.profileImageUrl }))
  }, [post, replies])

  if (loading && !post) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>
  if (!post && !loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Post not found</div>

  const contributors = topContributors()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <BackNavigation />

      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 mb-20 px-6">
        <div className="flex-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                <PostHeader post={post} />
                <PostContent post={post} />
                <PostMetadata post={post} repliesCount={replies.length} likeCount={postLikeCount} />
                <PostActions isLiked={isPostLiked} onLike={handleToggleLikePost} />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Replies <span className="text-gray-400 text-lg font-normal ml-1">({replies.length})</span>
                    </h2>
                    
                    {!showReplyForm && (
                        <button
                            onClick={() => {
                                setShowReplyForm(true)
                                setReplyingTo(null)
                                setReplyMessage("")
                            }}
                            className="bg-[#FFD700] text-black text-sm font-bold py-2 px-5 rounded-lg shadow-sm hover:opacity-90"
                        >
                            + Add Reply
                        </button>
                    )}
                </div>

                <div className="mb-8" ref={replyFormRef}>
                    {replyingTo && (
                        <div className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-t-lg border-b border-blue-100 text-sm text-blue-800">
                            <span>Replying to <b>{replyingTo.name}</b></span>
                            <button onClick={() => { setReplyingTo(null); setReplyMessage(""); }} className="text-blue-500 hover:text-blue-700">Cancel</button>
                        </div>
                    )}
                    <ReplyForm
                        isOpen={showReplyForm}
                        message={replyMessage}
                        isSending={sendingReply}
                        onMessageChange={setReplyMessage}
                        onSubmit={handleSendReply}
                        onCancel={() => { setShowReplyForm(false); setReplyingTo(null); setReplyMessage(""); }}
                        onToggle={() => setShowReplyForm(!showReplyForm)}
                    />
                </div>

                <RepliesSection 
                    replies={rootReplies} 
                    likedReplies={likedReplies} 
                    replyLikeCounts={replyLikeCounts} 
                    onLikeReply={handleLikeReply}
                    onReplyTo={handleReplyTo} 
                />
            </div>
        </div>
        
        {/* Sidebar */}
        <TopContributorsSidebar contributors={contributors} />
      </main>
    </div>
  )
}