import type React from "react";
import { useRef } from "react";

interface ImageUploadProps {
  imageFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export function ImageUpload({ imageFile, onFileSelect }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Upload Image (Optional)</label>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div
        className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-[140px] text-center cursor-pointer transition-colors group ${
            imageFile 
            ? "border-green-400 bg-green-50" 
            : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
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
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#8A252C"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25v8.25m-18 0A2.25 2.25 0 0 0 5.25 18h13.5A2.25 2.25 0 0 0 21 16.5m-18 0v1.5A2.25 2.25 0 0 0 5.25 20.25h13.5A2.25 2.25 0 0 0 21 18v-1.5M3 16.5l4.5-4.5a1.5 1.5 0 0 1 2.121 0l1.879 1.879a1.5 1.5 0 0 0 2.121 0L15 11.25l6 6"
                    />
                    </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </>
        )}
      </div>
    </div>
  );
}