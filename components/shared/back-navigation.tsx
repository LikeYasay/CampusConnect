import Link from "next/link"

interface BackNavigationProps {
  href?: string
}

export function BackNavigation({ href = "/home" }: BackNavigationProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Link 
        href={href}
        className="inline-flex items-center text-sm font-bold text-[#8A252C] hover:text-[#701e23] transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
      >
        ← Back to Forum
      </Link>
    </div>
  )
}
