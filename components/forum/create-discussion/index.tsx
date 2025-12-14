"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { forumAPI } from "@/lib/api";
import { getUserFromToken } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/upload";
import { BackNavigation } from "./back-navigation";
import { CategorySelector } from "./category-selector";
import { TitleInput } from "./title-input";
import { ImageUpload } from "./image-upload";
import { DescriptionInput } from "./description-input";
import { TagsInput } from "./tags-input";
import { FormButtons } from "./form-buttons";
import { DiscussionTips } from "./discussion-tips";
import { CommunityGuidelines } from "./community-guidelines";
import { SuccessPopup } from "./success-popup";
import { ErrorMessage } from "./error-message";

export function CreateDiscussionForm() {
  const router = useRouter();

  useEffect(() => {
    if (!getUserFromToken()) {
      router.push("/login");
    }
  }, [router]);

  const [selectedCategory, setSelectedCategory] = useState("Academic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = getUserFromToken();
      if (!payload?.userId) {
        router.push("/login");
        return;
      }

      let uploadedImageUrl = null;

      if (imageFile) {
        uploadedImageUrl = await uploadToCloudinary(imageFile);
      }

      await forumAPI.create({
        title,
        description,
        category: selectedCategory,
        userId: payload.userId,
        tags: tags.join(","),
        imageUrl: uploadedImageUrl || null,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        router.push("/forum");
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Failed to post discussion");
      console.error("Error creating discussion:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <BackNavigation />

      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-8 px-6 mb-20">
        <section className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="mb-8 pb-6 border-b border-gray-100">
            <h1 className="text-3xl font-extrabold text-[#8A252C] mb-2">Start a Discussion</h1>
            <p className="text-gray-600">
                Share your ideas, ask questions, or connect with the community.
            </p>
          </div>

          <ErrorMessage error={error} />

          <form onSubmit={handleSubmit} className="space-y-8">
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <TitleInput value={title} onChange={setTitle} />

            <DescriptionInput value={description} onChange={setDescription} />

            <ImageUpload imageFile={imageFile} onFileSelect={setImageFile} />

            <TagsInput
              tags={tags}
              tagInput={tagInput}
              onTagInputChange={setTagInput}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />

            <div className="pt-6 border-t border-gray-100">
                <FormButtons loading={loading} />
            </div>
          </form>
        </section>

        <aside className="w-full lg:w-[360px] flex flex-col gap-6">
          <DiscussionTips />
          <CommunityGuidelines />
        </aside>
      </main>

      <SuccessPopup show={success} />
    </div>
  );
}