import RequireAuth from "@/components/auth/require-auth"
import DiscussionPage from "@/components/forum/discussion/discussion-page"

export default function Page() {
  return (
    <RequireAuth>
      <DiscussionPage />
    </RequireAuth>
  )
}
