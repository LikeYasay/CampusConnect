export function CreateTips() {
  return (
    <aside className="w-full lg:w-[360px] flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4">💡 Discussion Tips</h3>
        <ul className="space-y-2 text-sm text-gray-800">
          <li>• Use clear, descriptive titles that summarize your topic</li>
          <li>• Provide context and details to help others understand</li>
          <li>• Add relevant tags to increase visibility</li>
          <li>• Be respectful and constructive in your posts</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#8A252C] mb-4">📋 Community Guidelines</h3>
        <ul className="space-y-3 text-sm text-gray-800">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
              1
            </div>
            <p>Be respectful and constructive in all discussions</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
              2
            </div>
            <p>Use appropriate categories and tags</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <p>No spam, harassment, or inappropriate content</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
              4
            </div>
            <p>Help maintain a positive learning environment</p>
          </li>
        </ul>
      </div>
    </aside>
  );
}
