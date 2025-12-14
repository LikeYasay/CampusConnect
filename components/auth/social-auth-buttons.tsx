import Image from "next/image"

export function SocialAuthButtons() {
  return (
    <>
      <div className="flex items-center text-gray-400 text-sm">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-gray-500">Or continue with</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 bg-white hover:bg-gray-50"
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 bg-white hover:bg-gray-50"
        >
          <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
          <span className="text-sm font-medium text-gray-700">Facebook</span>
        </button>
      </div>
    </>
  )
}
