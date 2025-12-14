import Link from "next/link";

export function BackNavigation() {
  return (
    <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2">
      <Link 
        href="/forum" 
        className="inline-flex items-center gap-2 text-sm font-bold text-[#8A252C] hover:text-[#701e23] transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
      >
        <span>←</span> Back to Forum
      </Link>
    </div>
  );
}