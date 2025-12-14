import Link from "next/link";

interface FormButtonsProps {
  loading: boolean;
}

export function FormButtons({ loading }: FormButtonsProps) {
  return (
    <div className="flex gap-4">
      <Link href="/forum" className="flex-1">
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-700 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </Link>
      
      <button
        type="submit"
        disabled={loading}
        className="flex-[2] bg-[#FFD700] text-black font-bold px-6 py-3.5 rounded-xl shadow-md hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
      >
        {loading ? (
            <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Publishing...
            </span>
        ) : "Post Discussion"}
      </button>
    </div>
  );
}