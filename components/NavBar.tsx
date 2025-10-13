'use client';  

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  
import { MdOutlineShoppingBag } from 'react-icons/md';

const NavBar = () => {
  const pathname = usePathname(); 
  const getLinkClassName = (path: string) => {
    return pathname === path
      ? 'text-sm font-medium text-black text-[16px] cursor-pointer border-b' 
      : 'text-sm font-medium text-black text-[16px] cursor-pointer hover:border-b';
  };

  return (
    <nav className="sticky top-0 z-10 py-[28px] px-8 bg-white">
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <div>
          <Link href="/">
            <div className="text-2xl font-medium text-gray-800 cursor-pointer">GlowGigs</div>
          </Link>
        </div>

        <div className='flex gap-8'>
          <Link href="/">
            <div className={getLinkClassName('/')}>Home</div>
          </Link>
          <Link href="/jobs">
            <div className={getLinkClassName('/jobs')}>Jobs</div>
          </Link>
          <Link href="/plans-pricing">
            <div className={getLinkClassName('/plans-pricing')}>Plans & Pricing</div>
          </Link>
          <Link href="/list-business">
            <div className={getLinkClassName('/list-business')}>List Your Business</div>
          </Link>
          <Link href="/professionals">
            <div className={getLinkClassName('/professionals')}>Professionals</div>
          </Link>
          <Link href="/cart">
            <div className={getLinkClassName('/cart')}>
            <MdOutlineShoppingBag size={24} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
