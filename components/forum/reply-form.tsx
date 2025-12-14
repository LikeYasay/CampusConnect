import { useState } from "react";

interface ReplyFormProps {
  isShowing: boolean;
  loading: boolean;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}

export function ReplyForm({ isShowing, loading, onSubmit, onCancel }: ReplyFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e?: any) => {
    if (e?.preventDefault) e.preventDefault();
    if (!message.trim()) return;
    onSubmit(message.trim());
    setMessage("");
  };

  if (!isShowing) return null;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a reply..."
        className="rounded-xl border border-gray-200 p-3 resize-none w-[420px] h-20"
        required
      />
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FFD700] text-black font-bold py-3 px-4 rounded-xl shadow-md hover:opacity-90"
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
