"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { lostFoundAPI } from "@/lib/api";
import { getUserFromToken } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/upload";
import { Lightbulb, Package, Search } from "lucide-react";
import RequireAuth from "@/components/auth/require-auth";


export default function ReportItemPage() {
  const router = useRouter();
  const [itemStatus, setItemStatus] = useState("LOST");
  const [category, setCategory] = useState("Electronics");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categories = ["Electronics", "Bags", "Personal Items", "Keys", "Documents", "Clothing", "Others"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !location.trim() || !description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    const payload = getUserFromToken();
    if (!payload || !payload.userId) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      let uploadedImageUrl = "";

      if (imageFile) {
        uploadedImageUrl = await uploadToCloudinary(imageFile);
      }

      const backendBody = {
        title,
        description,
        location,
        category,
        status: itemStatus,
        itemType: category,
        imageUrl: uploadedImageUrl || "",
        user: { userId: payload.userId }
      };

      await lostFoundAPI.create(backendBody);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        router.push("/lost-and-found");
      }, 1200);

    } catch (err: any) {
      setError(err.message || "Failed to report item");
      console.error("Error reporting item:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">

        {/* BACK NAVIGATION */}
        <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2">
          <Link 
              href="/lost-and-found" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8A252C] hover:text-[#701e23] transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
          >
              <span>←</span> Back to Lost & Found
          </Link>
        </div>

        <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-8 mb-20 px-6">

          {/* MAIN FORM CARD */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <div className="mb-8 pb-6 border-b border-gray-100">
              <h1 className="text-3xl font-extrabold text-[#8A252C] mb-2">Report an Item</h1>
              <p className="text-gray-600">
                  Submit details about the lost or found item to help the community.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* STATUS SELECTOR */}
              <div>
                <p className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Item Status</p>
                <div className="flex gap-4">
                  {/* FOUND BUTTON */}
                  <button
                    type="button"
                    onClick={() => setItemStatus("FOUND")}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
                      itemStatus === "FOUND"
                        ? "bg-green-50 border-green-200 text-green-700 shadow-sm"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {/* Icon inherits text color */}
                      <Package className="w-8 h-8 mb-1" />
                      <span>I Found an Item</span>
                    </div>
                  </button>

                  {/* LOST BUTTON */}
                  <button
                    type="button"
                    onClick={() => setItemStatus("LOST")}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
                      itemStatus === "LOST"
                        ? "bg-red-50 border-red-200 text-[#8A252C] shadow-sm"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Search className="w-8 h-8 mb-1" />
                      <span>I Lost an Item</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* CATEGORY SELECTOR */}
              <div>
                <p className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Category</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                      <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                          category === cat
                              ? "bg-[#8A252C] text-white border-[#8A252C] shadow-md transform scale-[1.02]"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
                </div>
              </div>

              {/* TITLE & LOCATION GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <p className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Item Name</p>
                      <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Black iPhone 14"
                          className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                          required
                      />
                  </div>
                  <div>
                      <p className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Location</p>
                      <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Library 2nd Floor"
                          className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                          required
                      />
                  </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description</p>
                  <span className={`text-xs font-medium ${description.length > 450 ? "text-red-500" : "text-gray-400"}`}>
                      {description.length}/500
                  </span>
                </div>
                <textarea
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide distinct features, date lost/found, and other helpful details..."
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#8A252C] focus:border-transparent transition-all h-40 resize-none leading-relaxed placeholder-gray-400"
                  required
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <p className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Upload Photo (Optional)</p>
                <label className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-[140px] text-center cursor-pointer transition-colors group ${
                      imageFile 
                      ? "border-green-400 bg-green-50" 
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
                  }`}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />

                  {imageFile ? (
                      <div className="flex flex-col items-center text-green-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-sm font-bold">{imageFile.name}</p>
                          <p className="text-xs mt-1">Click to change</p>
                      </div>
                  ) : (
                      <>
                          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A252C" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25M3 16.5v1.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M3 16.5l4.5-4.5a1.5 1.5 0 012.121 0l1.879 1.879a1.5 1.5 0 002.121 0L15 11.25l6 6"/>
                              </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      </>
                  )}
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <Link href="/lost-and-found" className="flex-1">
                      <button
                      type="button"
                      className="w-full bg-white border border-gray-300 text-gray-700 font-bold px-6 py-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                      Cancel
                      </button>
                  </Link>
                  <button
                      type="submit"
                      disabled={loading}
                      className="flex-[2] bg-[#FFD700] text-black font-bold px-6 py-4 rounded-xl shadow-md hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                  >
                      {loading ? (
                          <span className="flex items-center justify-center gap-2">
                              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                              Submitting...
                          </span>
                      ) : itemStatus === "FOUND" ? "Report Found Item" : "Report Lost Item"}
                  </button>
              </div>
            </form>
          </div>

          {/* SIDEBAR TIPS */}
          <aside className="w-full lg:w-[360px] flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#8A252C] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tips for Success
              </h3>
              <ul className="space-y-4">
                {[
                    { title: "Be Specific", text: "Mention specific details to verify ownership." },
                    { title: "Act Quickly", text: "Send a message as soon as you can." },
                    { title: "Ask for Proof", text: "If returning an item, ask for photos or unique ID." }
                ].map((tip, i) => (
                    <li key={i} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold text-sm text-gray-900">{tip.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{tip.text}</p>
                    </li>
                ))}
              </ul>
            </div>
          </aside>

        </main>

        {/* SUCCESS POPUP */}
        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center w-[300px] animate-popup border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#16A34A" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-900">Item Reported!</p>
              <p className="text-gray-500 mt-2 text-sm">Thank you for helping the community.</p>
            </div>
          </div>
        )}

        <style jsx>{`
          .animate-popup { animation: popupAnim 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
          @keyframes popupAnim { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </div>
    </RequireAuth>
  );
}