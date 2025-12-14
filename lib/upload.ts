/**
 * uploadToCloudinary
 * - Uses unsigned upload preset (configure in .env.local)
 * - Returns secure_url string on success
 *
 * Required env:
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  if (!file) throw new Error("No file provided");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars not configured");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return data.secure_url || data.url;
}
