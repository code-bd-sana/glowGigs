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
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [newUploadedItems, setNewUploadedItems] = useState<PortfolioItem[]>([]);

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
    setSaveError(null);

    try {
      const uploaded: PortfolioItem[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", 'dcirauywt');

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dcirauywt/auto/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        console.log("📁 Cloudinary Response:", data);

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

        const portfolioItem = {
          url: data.secure_url,
          publicId: data.public_id,
          resourceType: type,
          originalFilename: data.original_filename,
          format: ext,
          createdAt: data.created_at,
        };

        uploaded.push(portfolioItem);
      }

      // ✅ Temporary state-এ store করুন (এখনো database-এ save হয়নি)
      setNewUploadedItems(uploaded);
      console.log("✅ Files uploaded to Cloudinary. Ready to save:", uploaded);

    } catch (err: any) {
      console.error("❌ Upload Error:", err);
      setUploadError(err.message || "Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ==== Save to Database Handler ====
  const handleSaveToDatabase = async () => {
    if (newUploadedItems.length === 0) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // ✅ Database-এ save করুন

      console.log(newUploadedItems, "tomi amar personal vudai")
      const saveResponse = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioItems: newUploadedItems,
          email: (session as any)?.user?.email,
        }),
      });

      const saveResult = await saveResponse.json();
      
      if (!saveResponse.ok) {
        throw new Error(saveResult.message || 'Failed to save portfolio');
      }

      console.log("💾 Database Save Result:", saveResult);

      // ✅ State update করুন (permanent items-এ add করুন)
      setItems((prev) => [...newUploadedItems, ...prev]);
      
      // ✅ Temporary items clear করুন
      setNewUploadedItems([]);

      // ✅ Success message
      alert(`✅ ${newUploadedItems.length} items saved to portfolio successfully!`);

    } catch (err: any) {
      console.error("❌ Save Error:", err);
      setSaveError(err.message || "Failed to save to database.");
    } finally {
      setIsSaving(false);
    }
  };

  // ==== Cancel Save Handler ====
  const handleCancelSave = () => {
    setNewUploadedItems([]);
    setSaveError(null);
  };

  // ==== PREVIEW COMPONENT ====
  const renderThumb = (item: PortfolioItem) => {
    const ext = (item?.format || item?.resourceType || "file").toLowerCase();

    if (item.resourceType === "image") {
      return (
        <div className="relative w-full h-44 rounded-lg overflow-hidden">
          <img src={item.url} className="w-full h-full object-cover" alt={item.originalFilename} />
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
          title={item.originalFilename}
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
                  disabled={isUploading}
                />
              </label>
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm mt-3">{uploadError}</p>
            )}
          </div>

          {/* SAVE TO DATABASE SECTION - Show only when new items are uploaded */}
          {newUploadedItems.length > 0 && (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm mb-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-yellow-800">
                    Save to Portfolio?
                  </h2>
                  <p className="text-yellow-700 text-sm">
                    {newUploadedItems.length} file(s) uploaded successfully. 
                    Click Save to add them to your portfolio.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelSave}
                    className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveToDatabase}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      `Save ${newUploadedItems.length} File(s)`
                    )}
                  </button>
                </div>
              </div>

              {saveError && (
                <p className="text-red-500 text-sm mt-3">{saveError}</p>
              )}
            </div>
          )}

          {/* PORTFOLIO GRID */}
          <h3 className="text-lg font-semibold mb-4">Your Portfolio</h3>

          {items.length === 0 && newUploadedItems.length === 0 ? (
            <div className="p-10 border rounded-xl bg-gray-50 text-center">
              <p className="text-gray-600 text-sm">
                No items yet — upload your first portfolio piece.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show both saved items and temporary new items */}
              {[...newUploadedItems, ...items].map((item, index) => (
                <div
                  key={`${item.publicId}-${index}`}
                  className={`bg-white border rounded-xl shadow-sm p-3 ${
                    index < newUploadedItems.length ? 'border-yellow-400 border-2' : ''
                  }`}
                >
                  {index < newUploadedItems.length && (
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Unsaved
                      </span>
                    </div>
                  )}
                  
                  {renderThumb(item)}

                  <div className="mt-3">
                    <p className="font-medium truncate">{item.originalFilename}</p>
                    <p className="text-xs text-gray-500 uppercase">{item.format}</p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
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