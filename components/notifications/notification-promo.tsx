export function NotificationPromo() {
  return (
    <div className="border border-neutral-300 rounded-xl p-5 bg-white shadow-md text-center">
      <div className="w-12 h-12 mx-auto rounded-lg bg-[#8A252C] flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-6 h-6">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
        </svg>
      </div>
      <h4 className="text-lg font-bold">Stay Connected</h4>
      <p className="text-sm font-medium text-gray-700 mt-1">
        Get instant updates about your campus community activities
      </p>
      <button className="mt-5 bg-[#8A252C] text-white font-bold text-sm px-6 py-2 rounded-lg hover:opacity-90 transition">
        Enable Push Notifications
      </button>
    </div>
  )
}
