import type React from "react";
import Link from "next/link";
import { useState, useRef } from "react";

interface CreateFormProps {
  onSubmit: (data: CreateFormData) => Promise<void>;
  loading: boolean;
  error: string;
}

export interface CreateFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageFile: File | null;
}

export function CreateForm({ onSubmit, loading, error }: CreateFormProps) {
  const [selectedCategory, setSelectedCategory] = useState("Academic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      category: selectedCategory,
      tags,
      imageFile,
    });
  };

  return (
    <section className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <h1 className="text-3xl font-bold mb-2">Start a New Discussion</h1>
      <p className="text-gray-600 mb-6">
        Share your thoughts, ask questions, or start a conversation with the CIT-U community.
      </p>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CATEGORY */}
        <div>
          <h2 className="text-base font-bold mb-2">Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Academic", "Events", "General", "Lost & Found", "Tech", "Sports"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 rounded-xl border text-sm font-bold transition ${
                  selectedCategory === cat
                    ? "bg-[#8A252C] text-white border-[#8A252C]"
                    : "bg-white border-gray-300 text-black hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-base font-bold mb-2">Discussion Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a clear and descriptive title..."
            className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#8A252C]/40"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-base font-bold mb-2">Upload Image (Optional)</label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <div
            className="border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center h-[120px] mb-6 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#666"
              className="w-12 h-12 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25v8.25m-18 0A2.25 2.25 0 0 0 5.25 18h13.5A2.25 2.25 0 0 0 21 16.5m-18 0v1.5A2.25 2.25 0 0 0 5.25 20.25h13.5A2.25 2.25 0 0 0 21 18v-1.5M3 16.5l4.5-4.5a1.5 1.5 0 0 1 2.121 0l1.879 1.879a1.5 1.5 0 0 0 2.121 0L15 11.25l6 6"
              />
            </svg>
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
            {imageFile && <p className="text-xs text-green-600 mt-2">Selected: {imageFile.name}</p>}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-base font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder="Write your discussion details..."
            className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#8A252C]/40 h-[200px]"
            required
          />
          <p className="text-sm text-gray-500 text-right">{description.length}/500</p>
        </div>

        {/* TAGS */}
        <div>
          <label className="block text-base font-bold mb-2">Tags</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag..."
              className="flex-1 border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#8A252C]/40"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-[#8A252C] text-white font-bold px-5 py-3 rounded-xl hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#8A252C] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:opacity-70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FFD700] text-black font-bold px-6 py-3 rounded-xl shadow-md hover:opacity-90 disabled:opacity-70 flex-1"
          >
            {loading ? "Publishing..." : "Post Discussion"}
          </button>
          <Link href="/forum" className="flex-1">
            <button
              type="button"
              className="w-full bg-gray-200 text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-300"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}
