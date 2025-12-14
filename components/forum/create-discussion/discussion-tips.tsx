import { Lightbulb, Search, Tag, MessageSquare, PenLine } from "lucide-react";

export function DiscussionTips() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#8A252C] mb-5 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" /> 
        Tips for a Great Post
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-[#8A252C] rounded-lg shrink-0">
                <PenLine className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 mt-1">Use a concise, descriptive title.</span>
        </li>
        <li className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-[#8A252C] rounded-lg shrink-0">
                <Search className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 mt-1">Check for similar topics before posting.</span>
        </li>
        <li className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-[#8A252C] rounded-lg shrink-0">
                <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 mt-1">Be specific to get better answers.</span>
        </li>
        <li className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-[#8A252C] rounded-lg shrink-0">
                <Tag className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 mt-1">Add relevant tags for visibility.</span>
        </li>
      </ul>
    </div>
  );
}