'use client'
import React, { useState, useEffect } from 'react'
import { useGetSingleUserQuery } from "../../../../features/AuthApi"
import { useSession } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';



export default function PortfolioShowcasePage({ params }) {

  console.log("Hitr adljk;sf guif")
  const { data: session } = useSession();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = params?.id;
  console.log(userId, "baler user id")
  const { data: userData, isLoading, error, isError, } = useGetSingleUserQuery(userId);
  console.log(userData, "baler portfolio")
if(error){
  console.log(error)
}
  useEffect(() => {
    if (userData?.data?.portfolio) {
      setPortfolioItems(userData.data.portfolio);
    }
  }, [userData]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // ==== PREVIEW COMPONENT ====
  const renderThumb = (item) => {
    if (item.resourceType === "link") {
      return (
        <div className="flex items-center justify-center h-48 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔗</div>
            <span className="text-blue-600 text-sm font-semibold block">EXTERNAL LINK</span>
            <span className="text-blue-500 text-xs mt-1 block truncate">{item.originalFilename}</span>
          </div>
        </div>
      );
    }

   if (item.resourceType === "image") {
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden bg-gray-100">
        <img
          src={item.url}
          className="w-full max-h-96 object-contain"
          alt={item.originalFilename}
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{item.originalFilename}</h3>
        <p className="text-gray-600 text-sm">Image • {item.format.toUpperCase()}</p>
      </div>
    </div>
  );
}


    if (item.resourceType === "video") {
      return (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black group">
          <video className="w-full h-full object-cover opacity-90 transition-opacity duration-300">
            <source src={item.url} />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
            </div>
          </div>
        </div>
      );
    }

    if (item.resourceType === "pdf") {
      return (
        <div className="flex flex-col items-center justify-center h-48 rounded-lg bg-red-50 border-2 border-red-200 group hover:bg-red-100 transition-colors duration-300">
          <div className="text-4xl mb-3 text-red-500">📄</div>
          <span className="text-red-600 text-sm font-semibold">PDF DOCUMENT</span>
          <span className="text-red-500 text-xs mt-2 text-center px-2 truncate w-full">
            {item.originalFilename}
          </span>
        </div>
      );
    }

    // fallback for other file types
    return (
      <div className="flex flex-col items-center justify-center h-48 rounded-lg bg-gray-100 border group  transition-colors duration-300">
        <div className="text-3xl mb-3 text-gray-600">📁</div>
        <span className="text-gray-600 text-sm font-semibold uppercase">
          {item.format} FILE
        </span>
        <span className="text-gray-500 text-xs mt-2 text-center px-2 truncate w-full">
          {item.originalFilename}
        </span>
      </div>
    );
  };

  // ==== MODAL CONTENT ====
  const renderModalContent = (item) => {
    if (item.resourceType === "link") {
      return (
        <div className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.originalFilename}</h3>
          <p className="text-gray-600 mb-6">External Link</p>
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600  text-white rounded-lg transition-colors duration-200"
          >
            Visit Link
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      );
    }

    if (item.resourceType === "image") {
      return (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={item.url} 
              className="w-full max-h-96 object-contain" 
              alt={item.originalFilename} 
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{item.originalFilename}</h3>
            <p className="text-gray-600 text-sm">Image • {item.format.toUpperCase()}</p>
          </div>
        </div>
      );
    }

    if (item.resourceType === "video") {
      return (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-black">
            <video 
              controls 
              className="w-full max-h-96"
              autoPlay
            >
              <source src={item.url} />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{item.originalFilename}</h3>
            <p className="text-gray-600 text-sm">Video • {item.format.toUpperCase()}</p>
          </div>
        </div>
      );
    }

    if (item.resourceType === "pdf") {
      return (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-gray-100 h-96">
            <iframe 
              src={item.url} 
              className="w-full h-full"
              title={item.originalFilename}
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{item.originalFilename}</h3>
            <p className="text-gray-600 text-sm">PDF Document</p>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.originalFilename}</h3>
        <p className="text-gray-600 mb-4">{item.format.toUpperCase()} File</p>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600  text-white rounded-lg transition-colors duration-200"
        >
          Download File
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the portfolio you're looking for.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600  text-white rounded-lg transition-colors duration-200">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolioItems || portfolioItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Portfolio is Empty</h1>
          <p className="text-gray-600">This user hasn't added any portfolio items yet.</p>
        </div>
      </div>
    );
  }

  return (
 <div className="min-h-screen bg-gradient-to-b from-[#f3f7ff] to-[#fafafb] py-12 px-4 sm:px-10">
    
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">
      Portfolio Showcase
    </h1>
<div className='justify-end ml-auto'>
<Link href={'/dashboard/chat'}>
  <button className='text-left bg-gray-200 px-5 rounded py-2 cursor-pointer flex ml-auto items-center jusl'>Chat</button></Link>
</div>
    {/* GRID */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {portfolioItems.map((item, index) => (
        <div
          key={index}
          onClick={() => openModal(item)}
          className="cursor-pointer group bg-white rounded-2xl    overflow-hidden border border-gray-100"
        >
          {/* Thumbnail */}
          {renderThumb(item)}

          {/* Details */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 text-base truncate">
              {item.originalFilename}
            </h3>
            <p className="text-xs text-gray-500 mt-1 uppercase">{item.resourceType}</p>
          </div>
        </div>
      ))}
    </div>

    {/* MODAL */}
    {isModalOpen && selectedItem && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-600  text-2xl"
          >
            ×
          </button>

          {renderModalContent(selectedItem)}
        </div>
      </div>
    )}
  </div>
  );
}