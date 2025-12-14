interface ReplyFormProps {
  isOpen: boolean
  message: string
  isSending: boolean
  onMessageChange: (value: string) => void
  onSubmit: (e?: any) => void
  onCancel: () => void
  onToggle: () => void
}

export function ReplyForm({ isOpen, message, isSending, onMessageChange, onSubmit, onCancel, onToggle }: ReplyFormProps) {
  if (!isOpen) return null; 

  return (
    <form onSubmit={onSubmit} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#8A252C] focus:border-[#8A252C] outline-none resize-none min-h-[100px] bg-white mb-3"
        required
        autoFocus
      />
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-gray-600 hover:text-gray-800 px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSending}
          className="bg-[#FFD700] text-black font-bold py-2 px-6 rounded-lg shadow-sm hover:opacity-90 disabled:opacity-50 transition"
        >
          {isSending ? "Publishing..." : "Post Reply"}
        </button>
      </div>
    </form>
  )
}