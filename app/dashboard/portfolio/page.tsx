/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

// ==== TYPE ====
type PortfolioItem = {
  url: string;
  publicId: string;
  resourceType: string;
  originalFilename: string;
  format: string;
  createdAt: string;
};

const PortfolioPage = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const isPro = (session as any)?.user?.plan === "pro";

  // ==== Upload Handler ====
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!cloudName || !uploadPreset) {
      setUploadError("Cloudinary setup missing.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploaded: PortfolioItem[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();

        // 👇 Fix Cloudinary type bug
        let type = data.resource_type;
        const ext = data.format?.toLowerCase();

        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
          type = "image";
        else if (["mp4", "mov", "avi", "mkv"].includes(ext))
          type = "video";
        else if (["pdf"].includes(ext))
          type = "pdf";
        else type = "raw";

        uploaded.push({
          url: data.secure_url,
          publicId: data.public_id,
          resourceType: type,
          originalFilename: data.original_filename,
          format: ext,
          createdAt: data.created_at,
        });
      }

      setItems((prev) => [...uploaded, ...prev]);
    } catch (err: any) {
      console.error(err);
      setUploadError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ==== PREVIEW COMPONENT ====
  const renderThumb = (item: PortfolioItem) => {
 const ext = (item?.format || item?.resourceType || "file").toLowerCase();

    if (item.resourceType === "image") {
      return (
        <div className="relative w-full h-44 rounded-lg overflow-hidden">
          <img src={item.url} className="w-full h-full object-cover" />
        </div>
      );
    }

    if (item.resourceType === "video") {
      return (
        <video
          controls
          className="w-full h-44 rounded-lg object-cover bg-black"
        >
          <source src={item.url} />
        </video>
      );
    }

    if (item.resourceType === "pdf") {
      return (
        <iframe
          src={item.url}
          className="w-full h-44 rounded-lg bg-gray-100"
        ></iframe>
      );
    }

    // fallback for DOC, PPT, ZIP etc
    return (
      <div className="flex items-center justify-center h-44 rounded-lg bg-gray-100 border">
        <span className="text-gray-600 text-sm font-semibold">
          {ext.toUpperCase()} FILE
        </span>
      </div>
    );
  };

  // === LOADING ===
  if (status === "loading") {
    return (
      <div className="h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  // === NOT LOGGED IN ===
  if (!session) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold mb-3">Please sign in</h1>
        <Link href="/login" className="px-5 py-2 bg-black text-white rounded-md">
          Login
        </Link>
      </div>
    );
  }

  // === MAIN UI ===
  return (
    <div className="max-w-6xl mx-auto p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-4">Portfolio Showcase</h1>
      <p className="text-gray-600 mb-8">
        Upload your images, certificates, case studies, videos and documents.
      </p>

      {/* STATUS CARD */}
      <div className="p-6 bg-white border rounded-xl shadow-sm mb-10 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Membership Status</p>
          <p className="font-semibold text-lg">
            {(session as any)?.user?.plan?.toUpperCase()}
          </p>
        </div>

        {isPro ? (
          <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            PRO Active
          </span>
        ) : (
          <Link
            href="/pricing"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Upgrade to PRO
          </Link>
        )}
      </div>

      {/* IF NOT PRO */}
      {!isPro ? (
        <div className="border rounded-xl p-10 bg-gray-50 text-center">
          <h2 className="text-xl font-semibold mb-2">Pro Feature Locked</h2>
          <p className="text-gray-600 mb-4">
            Upgrade to PRO to unlock portfolio uploads.
          </p>
          <Link
            href="/pricing"
            className="px-5 py-2 bg-black text-white rounded-md"
          >
            Upgrade Now
          </Link>
        </div>
      ) : (
        <>
          {/* UPLOAD BOX */}
          <div className="p-6 bg-white border rounded-xl shadow-sm mb-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">Upload Portfolio Items</h2>
                <p className="text-gray-600 text-sm">
                  Supported: Images, Videos, PDFs, Docs, PPTs
                </p>
              </div>

              <label className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                {isUploading ? "Uploading…" : "Upload Files"}
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm mt-3">{uploadError}</p>
            )}
          </div>

          {/* PORTFOLIO GRID */}
          <h3 className="text-lg font-semibold mb-4">Your Portfolio</h3>

          {items.length === 0 ? (
            <div className="p-10 border rounded-xl bg-gray-50 text-center">
              <p className="text-gray-600 text-sm">
                No items yet — upload your first portfolio piece.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.publicId}
                  className="bg-white border rounded-xl shadow-sm p-3"
                >
                  {renderThumb(item)}

                  <div className="mt-3">
                    <p className="font-medium truncate">{item.originalFilename}</p>
                    <p className="text-xs text-gray-500 uppercase">{item.format}</p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                  >
                    Open File ↗
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
