import { ClipboardList, Heart, ShieldBan, Target, Flag } from "lucide-react";

export function CommunityGuidelines() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#8A252C] mb-5 flex items-center gap-2">
        <ClipboardList className="w-5 h-5" />
        Guidelines
      </h3>
      <ul className="space-y-4">
        {/* Rule 1 */}
        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          <div className="text-[#8A252C] shrink-0 mt-0.5">
            <Heart className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-700 font-medium">Be respectful to all members.</p>
        </li>

        {/* Rule 2 */}
        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          <div className="text-[#8A252C] shrink-0 mt-0.5">
            <ShieldBan className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-700 font-medium">No spam or self-promotion.</p>
        </li>

        {/* Rule 3 */}
        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          <div className="text-[#8A252C] shrink-0 mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-700 font-medium">Keep discussions on topic.</p>
        </li>

        {/* Rule 4 */}
        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          <div className="text-[#8A252C] shrink-0 mt-0.5">
            <Flag className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-700 font-medium">Report inappropriate content.</p>
        </li>
      </ul>
    </div>
  );
}