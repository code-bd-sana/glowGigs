/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useGetSingleUserQuery } from "@/features/UserApi";

// ==== TYPE ====
type PortfolioItem = {
  url: string;
  publicId: string;
  resourceType: string;
  originalFilename: string;
  format: string;
  createdAt: string;
  _id?: string; // For existing items from database
};

const PortfolioPage = () => {
  const { data: session, status } = useSession();
  const [existingItems, setExistingItems] = useState<PortfolioItem[]>([]);
  const [newUploadedItems, setNewUploadedItems] = useState<PortfolioItem[]>([]);
  const [itemsToKeep, setItemsToKeep] = useState<PortfolioItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const id = session?.user?.id;
  const { data: userData, refetch } = useGetSingleUserQuery(id);

  const portfolio = userData?.data?.portfolio;
  const isPro = (session as any)?.user?.plan === "pro pack";

  // Load existing portfolio items when user data is available
  useEffect(() => {
    if (portfolio && Array.isArray(portfolio)) {
      setExistingItems(portfolio);
      setItemsToKeep(portfolio); // Initially keep all existing items
    }
  }, [portfolio]);

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

      // ✅ Add to new uploaded items
      setNewUploadedItems(prev => [...prev, ...uploaded]);
      console.log("✅ Files uploaded to Cloudinary. Ready to save:", uploaded);

    } catch (err: any) {
      console.error("❌ Upload Error:", err);
      setUploadError(err.message || "Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ==== Add Link Handler ====
  const handleAddLink = () => {
    if (!linkUrl.trim()) {
      setUploadError("Please enter a valid URL");
      return;
    }

    const linkItem: PortfolioItem = {
      url: linkUrl.trim(),
      publicId: `link-${Date.now()}`,
      resourceType: "link",
      originalFilename: linkTitle.trim() || "External Link",
      format: "link",
      createdAt: new Date().toISOString(),
    };

    setNewUploadedItems(prev => [...prev, linkItem]);
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkTitle("");
  };

  // ==== Toggle existing item (keep/remove) ====
  const toggleExistingItem = (item: PortfolioItem) => {
    const isCurrentlyKept = itemsToKeep.some(keptItem => 
      keptItem._id === item._id || keptItem.publicId === item.publicId
    );

    if (isCurrentlyKept) {
      // Remove from kept items
      setItemsToKeep(prev => 
        prev.filter(keptItem => 
          !(keptItem._id === item._id && keptItem.publicId === item.publicId)
        )
      );
    } else {
      // Add to kept items
      setItemsToKeep(prev => [...prev, item]);
    }
  };

  // ==== Remove new uploaded item ====
  const removeNewItem = (publicId: string) => {
    setNewUploadedItems(prev => prev.filter(item => item.publicId !== publicId));
  };

  // ==== Delete existing item permanently ====
  const deleteExistingItem = (item: PortfolioItem) => {
    // Remove from both existing items and items to keep
    setExistingItems(prev => prev.filter(existing => 
      !(existing._id === item._id && existing.publicId === item.publicId)
    ));
    setItemsToKeep(prev => prev.filter(kept => 
      !(kept._id === item._id && kept.publicId === item.publicId)
    ));
  };

  // ==== Save to Database Handler ====
  const handleSaveToDatabase = async () => {
    const finalItems = [...itemsToKeep, ...newUploadedItems];
    
    if (finalItems.length === 0) {
      setSaveError("Please select at least one item to save.");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      console.log("Saving to database:", finalItems);
      
      const saveResponse = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioItems: finalItems,
          email: (session as any)?.user?.email,
        }),
      });

      const saveResult = await saveResponse.json();
      
      if (!saveResponse.ok) {
        throw new Error(saveResult.message || 'Failed to save portfolio');
      }

      console.log("💾 Database Save Result:", saveResult);

      // ✅ Reset states after successful save
      setExistingItems(finalItems);
      setItemsToKeep(finalItems);
      setNewUploadedItems([]);

      // ✅ Refetch user data to get updated portfolio
      await refetch();

      // ✅ Success message
      alert(`✅ Portfolio updated successfully! ${finalItems.length} items saved.`);

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
    setItemsToKeep(existingItems); // Reset to original state
    setSaveError(null);
  };

  // ==== PREVIEW COMPONENT ====
  const renderThumb = (item: PortfolioItem) => {
    if (item.resourceType === "link") {
      return (
        <div className="flex items-center justify-center h-44 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300">
          <div className="text-center">
            <div className="text-3xl mb-2">🔗</div>
            <span className="text-blue-600 text-sm font-semibold">LINK</span>
          </div>
        </div>
      );
    }

    const ext = (item?.format || item?.resourceType || "file").toLowerCase();

    if (item.resourceType === "image") {
      return (
        <div className="relative w-full h-44 rounded-lg overflow-hidden">
          <img 
            src={item.url} 
            className="w-full h-full object-cover" 
            alt={item.originalFilename} 
          />
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

  const hasChanges = newUploadedItems.length > 0 || itemsToKeep.length !== existingItems.length;
  const totalItemsCount = itemsToKeep.length + newUploadedItems.length;

  // === MAIN UI ===
  return (
    <div className="max-w-6xl mx-auto p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-4">Portfolio Showcase</h1>
      <p className="text-gray-600 mb-8">
        Upload your images, certificates, case studies, videos, documents, or add external links.
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
            href="/plans-pricing"
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
            href="/plans-pricing"
            className="px-5 py-2 bg-black text-white rounded-md"
          >
            Upgrade Now
          </Link>
        </div>
      ) : (
        <>
          {/* UPLOAD BOX */}
          <div className="p-6 bg-white border rounded-xl shadow-sm mb-10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-semibold text-lg">Add Portfolio Items</h2>
                <p className="text-gray-600 text-sm">
                  Supported: Images, Videos, PDFs, Docs, PPTs, or External Links
                </p>
              </div>
            </div>

            <div className="flex gap-3">
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

              <button
                onClick={() => setShowLinkModal(true)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                + Add Link
              </button>
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm mt-3">{uploadError}</p>
            )}
          </div>

          {/* LINK MODAL */}
          {showLinkModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add External Link</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link URL *
                    </label>
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Title
                    </label>
                    <input
                      type="text"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="My Project / Case Study"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowLinkModal(false);
                      setLinkUrl("");
                      setLinkTitle("");
                    }}
                    className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Add Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SAVE TO DATABASE SECTION - Show when there are changes */}
          {hasChanges && (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm mb-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-yellow-800">
                    Save Portfolio Changes?
                  </h2>
                  <p className="text-yellow-700 text-sm">
                    {totalItemsCount} item(s) will be saved to your portfolio.
                    {newUploadedItems.length > 0 && ` ${newUploadedItems.length} new item(s) added.`}
                    {itemsToKeep.length !== existingItems.length && ` ${existingItems.length - itemsToKeep.length} existing item(s) removed.`}
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
                      `Save ${totalItemsCount} Item(s)`
                    )}
                  </button>
                </div>
              </div>

              {saveError && (
                <p className="text-red-500 text-sm mt-3">{saveError}</p>
              )}
            </div>
          )}

          {/* EXISTING PORTFOLIO ITEMS */}
          {existingItems.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Existing Portfolio Items</h3>
                <span className="text-sm text-gray-500">
                  {itemsToKeep.length} of {existingItems.length} selected
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {existingItems.map((item, index) => {
                  const isSelected = itemsToKeep.some(keptItem => 
                    keptItem._id === item._id && keptItem.publicId === item.publicId
                  );
                  
                  return (
                    <div
                      key={item._id || `existing-${index}`}
                      className={`bg-white border rounded-xl shadow-sm p-3 relative transition-all duration-200 ${
                        isSelected ? 'border-green-400 border-2' : 'border-red-400 border-2 opacity-70'
                      }`}
                    >
                      {/* Selection Toggle Button */}
                      <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                        <button
                          onClick={() => toggleExistingItem(item)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            isSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                          }`}
                          title={isSelected ? "Keep in portfolio" : "Remove from portfolio"}
                        >
                          {isSelected ? '✓' : '×'}
                        </button>
                        
                        <button
                          onClick={() => deleteExistingItem(item)}
                          className="w-8 h-8 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center text-white"
                          title="Delete permanently"
                        >
                          🗑️
                        </button>
                      </div>

                      {renderThumb(item)}

                      <div className="mt-3">
                        <p className="font-medium truncate">{item.originalFilename}</p>
                        <p className="text-xs text-gray-500 uppercase">
                          {item.resourceType === 'link' ? 'LINK' : item.format}
                        </p>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                      >
                        {item.resourceType === 'link' ? 'Visit Link ↗' : 'Open File ↗'}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NEW UPLOADED ITEMS */}
          {newUploadedItems.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4">New Items Ready to Save</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newUploadedItems.map((item, index) => (
                  <div
                    key={`new-${item.publicId}-${index}`}
                    className="bg-white border-2 border-blue-400 rounded-xl shadow-sm p-3 relative"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => removeNewItem(item.publicId)}
                      className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                      title="Remove this item"
                    >
                      ×
                    </button>

                    <div className="mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.resourceType === 'link' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.resourceType === 'link' ? 'New Link' : 'New Upload'}
                      </span>
                    </div>
                    
                    {renderThumb(item)}

                    <div className="mt-3">
                      <p className="font-medium truncate">{item.originalFilename}</p>
                      <p className="text-xs text-gray-500 uppercase">
                        {item.resourceType === 'link' ? 'LINK' : item.format}
                      </p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                    >
                      {item.resourceType === 'link' ? 'Visit Link ↗' : 'Open File ↗'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {existingItems.length === 0 && newUploadedItems.length === 0 && (
            <div className="p-10 border rounded-xl bg-gray-50 text-center">
              <p className="text-gray-600 text-sm">
                No items yet — upload files or add links to build your portfolio.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioPage;