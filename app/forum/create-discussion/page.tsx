import RequireAuth from "@/components/auth/require-auth";
import { CreateDiscussionForm } from "@/components/forum/create-discussion";

export default function CreateDiscussionPage() {
  return (
    <RequireAuth>
      <CreateDiscussionForm />
    </RequireAuth>
  )
}
