"use client";

import { useState, type ChangeEvent } from "react";

const MAX_DIMENSION = 2000; // longest side, in pixels
const QUALITY = 0.82; // WebP quality (0–1)

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

async function compress(file: File): Promise<File> {
  // createImageBitmap applies EXIF orientation, so phone photos stay upright.
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));
  if (!blob) throw new Error("Compression failed");

  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${baseName}.webp`, { type: "image/webp", lastModified: Date.now() });
}

/**
 * File input that resizes images to at most 2000px and re-encodes them as WebP
 * before the form is submitted, so uploads stay small (usually 200–600 KB).
 */
export function CompressedImageInput({ name = "file" }: { name?: string }) {
  const [status, setStatus] = useState<string>("");

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const original = input.files?.[0];
    if (!original) {
      setStatus("");
      return;
    }

    // Block form submission until compression finishes.
    input.setCustomValidity("Please wait, compressing image…");
    setStatus(`Compressing ${formatSize(original.size)}…`);

    try {
      const compressed = await compress(original);
      if (compressed.size < original.size) {
        const transfer = new DataTransfer();
        transfer.items.add(compressed);
        input.files = transfer.files;
        setStatus(`Compressed ${formatSize(original.size)} → ${formatSize(compressed.size)}`);
      } else {
        setStatus(`Already small (${formatSize(original.size)}), uploading as is`);
      }
    } catch {
      // e.g. HEIC in browsers that can't decode it: fall back to the original file.
      setStatus(`Couldn't compress this file, uploading original (${formatSize(original.size)})`);
    } finally {
      input.setCustomValidity("");
    }
  }

  return (
    <div className="grid gap-1">
      <input
        type="file"
        name={name}
        accept="image/*"
        required
        onChange={handleChange}
        className="rounded border p-2"
      />
      {status && <p className="text-xs text-slate-500">{status}</p>}
    </div>
  );
}
