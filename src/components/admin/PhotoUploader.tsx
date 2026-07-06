"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

type Photo = { id: string; url: string };

type Props = {
  shopId: string;
  initialPhotos: Photo[];
};

/** Reads a File as a base64 data URL — what the /api/upload route expects. */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PhotoUploader({ shopId, initialPhotos }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError("");
    setUploading(true);

    try {
      // Upload one at a time — simpler to reason about and to show
      // progress for, and shop owners rarely upload more than 10-20 photos.
      for (const file of Array.from(fileList)) {
        const dataUrl = await fileToDataUrl(file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shopId, fileDataUrl: dataUrl }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        setPhotos((prev) => [...prev, { id: data.photo.id, url: data.photo.url }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      router.refresh();
    }
  }

  async function handleDelete(photoId: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    await fetch(`/api/upload?photoId=${photoId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image src={photo.url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => handleDelete(photo.id)}
              className="absolute top-1.5 right-1.5 hidden h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white group-hover:flex"
              aria-label="Remove photo"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="ghost"
        loading={uploading}
        onClick={() => inputRef.current?.click()}
      >
        + Add photos
      </Button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
